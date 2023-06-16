import httpStatus from 'http-status'
import { IDepertment, IDepertmentFilter } from './depertment.interface'
import depertmentModel from './depertment.model'
import ApiError from '../../../errors/ApiError'
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface'
import { DepertmentSearchFields } from './depertment.constant'
import paginationHelper from '../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const createDepertment = async (
  depertmentData: IDepertment
): Promise<IDepertment> => {
  const depertment = (await depertmentModel.create(depertmentData)).populate(
    'faculty'
  )

  if (!depertment)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Depertment creation failed')

  return depertment
}

const getDepertments = async (
  filters: IDepertmentFilter,
  paginationOption: IPaginationOption
): Promise<IGenericDataWithMeta<IDepertment[]>> => {
  const { searchTerm, ...searchFields } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: DepertmentSearchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(searchFields).length) {
    andConditions.push({
      $and: Object.entries(searchFields).map(([key, value]) => ({
        [key]: value,
      })),
    })
  }

  const whereCondition = andConditions.length ? { $and: andConditions } : {}

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOption)

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const result = await depertmentModel
    .find(whereCondition)
    .populate('faculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number)
  const total = await depertmentModel.countDocuments()

  const responseData = {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }

  return responseData
}

const getDepertment = async (
  id: string
): Promise<IGenericDataWithMeta<IDepertment>> => {
  const depertment = await depertmentModel.findById(id).populate('faculty')

  if (!depertment)
    throw new ApiError(httpStatus.NOT_FOUND, 'Depertment not found')

  const responseData = {
    data: depertment,
  }

  return responseData
}

const updateDepertment = async (
  id: string,
  depertmentData: IDepertment
): Promise<IDepertment> => {
  const depertment = await depertmentModel
    .findOneAndUpdate({ _id: id }, depertmentData, { new: true })
    .populate('faculty')

  if (!depertment)
    throw new ApiError(httpStatus.NOT_FOUND, 'Depertment not found')

  return depertment
}

const deleteDepertment = async (id: string): Promise<IDepertment> => {
  const depertment = await depertmentModel.findByIdAndDelete(id)

  if (!depertment)
    throw new ApiError(httpStatus.NOT_FOUND, 'Depertment not found')

  return depertment
}

export const DepertmentService = {
  createDepertment,
  getDepertments,
  getDepertment,
  updateDepertment,
  deleteDepertment,
}

import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface'
import paginationHelper from '../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
import { IDepartment, IDepartmentFilter } from './depertment.interface'
import departmentModel from './depertment.model'
import { DepartmentSearchFields } from './depertment.constant'

const createDepartment = async (
  departmentData: IDepartment
): Promise<IDepartment> => {
  const department = (await departmentModel.create(departmentData)).populate(
    'faculty'
  )

  if (!department)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Department creation failed')

  return department
}

const getDepartments = async (
  filters: IDepartmentFilter,
  paginationOption: IPaginationOption
): Promise<IGenericDataWithMeta<IDepartment[]>> => {
  const { searchTerm, ...searchFields } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: DepartmentSearchFields.map(field => ({
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

  const result = await departmentModel
    .find(whereCondition)
    .populate('faculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number)
  const total = await departmentModel.countDocuments()

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

const getDepartment = async (
  id: string
): Promise<IGenericDataWithMeta<IDepartment>> => {
  const department = await departmentModel.findById(id).populate('faculty')

  if (!department)
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found')

  const responseData = {
    data: department,
  }

  return responseData
}

const updateDepartment = async (
  id: string,
  departmentData: IDepartment
): Promise<IDepartment> => {
  const department = await departmentModel
    .findOneAndUpdate({ _id: id }, departmentData, { new: true })
    .populate('faculty')

  if (!department)
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found')

  return department
}

const deleteDepartment = async (id: string): Promise<IDepartment> => {
  const department = await departmentModel.findByIdAndDelete(id)

  if (!department)
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found')

  return department
}

export const DepartmentService = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
}

import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IFaculty, IFacultyFilter } from './faculty.interface'
import facultyModel from './faculty.model'
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface'
import { FacultySearchFields } from '../../../constant/faculty.constant'
import paginationHelper from '../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const createFaculty = async (facultyData: IFaculty): Promise<IFaculty> => {
  const faculty = await facultyModel.create(facultyData)

  if (!faculty)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty creation failed')

  return faculty
}

const getFaculties = async (
  filters: IFacultyFilter,
  paginationOption: IPaginationOption
): Promise<IGenericDataWithMeta<IFaculty[]>> => {
  const { searchTerm, ...searchFields } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: FacultySearchFields.map(field => ({
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

  const result = await facultyModel
    .find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number)
  const total = await facultyModel.countDocuments()

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

const getFaculty = async (
  id: string
): Promise<IGenericDataWithMeta<IFaculty>> => {
  const faculty = await facultyModel.findById(id).exec()

  if (!faculty) throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found')

  const responseData = {
    data: faculty,
  }

  return responseData
}

const updateFaculty = async (
  id: string,
  facultyData: IFaculty
): Promise<IFaculty> => {
  const faculty = await facultyModel
    .findOneAndUpdate({ _id: id }, facultyData, { new: true })
    .exec()

  if (!faculty) throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found')

  return faculty
}

export const FacultyService = {
  createFaculty,
  getFaculties,
  getFaculty,
  updateFaculty,
}

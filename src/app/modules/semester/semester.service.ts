import { SortOrder } from 'mongoose'
import {
  SemesterSearchFields,
  SemesterTitleCodeMapper,
  SemesterTitleMonthMapper,
} from '../../../constant/semester.constant'
import ApiError from '../../../errors/ApiError'
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface'
import paginationHelper from '../../helpers/paginationHelper'
import { ISemester, ISemesterFilter } from './semester.interface'
import semesterModel from './semester.model'
import httpStatus from 'http-status'

const createSemester = async (semesterData: ISemester): Promise<ISemester> => {
  /* This code is checking if the `code` property of the `semesterData` object matches the value
  associated with the `title` property in the `SemesterTitleCodeMapper` object. If they do not
  match, it means that the `code` provided is invalid for the given `title`, so it throws an
  `ApiError` with a `BAD_REQUEST` status and an error message. */
  if (SemesterTitleCodeMapper[semesterData.title] !== semesterData.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }

  /* This code is checking if the `startMonth` property of the `semesterData` object matches the first
  value in the array associated with the `title` property in the `SemesterTitleMonthMapper` object.
  If they do not match, it means that the `startMonth` provided is invalid for the given `title`, so
  it throws an `ApiError` with a `BAD_REQUEST` status and an error message. */
  if (
    SemesterTitleMonthMapper[semesterData.title][0] !== semesterData.startMonth
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid start month')
  }

  if (
    SemesterTitleMonthMapper[semesterData.title][
      SemesterTitleMonthMapper[semesterData.title].length - 1
    ] !== semesterData.endMonth
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid end month')
  }

  const semester = await semesterModel.create(semesterData)

  if (!semester) throw new ApiError(400, 'Semester creation failed')
  return semester
}

const getSemesters = async (
  filters: ISemesterFilter,
  paginationOption: IPaginationOption
): Promise<IGenericDataWithMeta<ISemester[]>> => {
  const { searchTerm, ...searchFields } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: SemesterSearchFields.map(field => ({
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

  //  If there is no search term or search fields, the `andConditions` array will be empty, so the `whereCondition` object will be empty as well and we get all the semesters.

  const whereCondition = andConditions.length ? { $and: andConditions } : {}

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOption)

  /* This code is creating an empty object called `sortCondition` with a type definition that specifies
  that it should have string keys and values of type `SortOrder`. */
  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const result = await semesterModel
    .find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number)
  const total = await semesterModel.countDocuments()

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

const getSemester = async (
  id: string
): Promise<IGenericDataWithMeta<ISemester>> => {
  const semester = await semesterModel.findById(id)

  if (!semester) throw new ApiError(404, 'Semester not found')

  const responseData = {
    data: semester,
  }

  return responseData
}

export const SemesterService = {
  createSemester,
  getSemesters,
  getSemester,
}

import {
  SemesterTitleCodeMapper,
  SemesterTitleMonthMapper,
} from '../../../constant/semester.constant'
import ApiError from '../../../errors/ApiError'
import { ISemester } from './semester.interface'
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

export const SemesterService = {
  createSemester,
}

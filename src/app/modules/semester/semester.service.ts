import ApiError from '../../../errors/ApiError'
import { ISemester } from './semester.interface'
import semesterModel from './semester.model'

const createSemester = async (semesterData: ISemester): Promise<ISemester> => {
  const semester = await semesterModel.create(semesterData)

  if (!semester) throw new ApiError(400, 'Semester creation failed')
  return semester
}

export const SemesterService = {
  createSemester,
}

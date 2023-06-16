import { ISemester } from '../semester/semester.interface'
import userModel from './user.model'

export const findLastAdmittedStudentId = async (): Promise<
  string | undefined
> => {
  const lastAdmittedStudent = await userModel
    .findOne({ role: 'student' })
    .select({ id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return lastAdmittedStudent?.id || undefined
}

export const generateStudentId = async (
  semester: ISemester
): Promise<string> => {
  const { year, code } = semester

  const lastAdmittedStudentId =
    (await findLastAdmittedStudentId()) || (0).toString().padStart(5, '0')
  let newStudentIdNumber = (parseInt(lastAdmittedStudentId) + 1)
    .toString()
    .padStart(5, '0')

  newStudentIdNumber = `${year.substring(2)}${code}${newStudentIdNumber}`

  return newStudentIdNumber
}

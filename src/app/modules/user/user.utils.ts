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

  return lastAdmittedStudent?.id
    ? lastAdmittedStudent.id.substring(4)
    : undefined
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

export const findHeigherAuthorityLastId = async (
  role: string
): Promise<string | undefined> => {
  const lastFaculty = await userModel
    .findOne({ role: role })
    .select({ id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}

export const generateHeigherAuthorityId = async (
  role: string
): Promise<string> => {
  const lastFacultyId =
    (await findHeigherAuthorityLastId(role)) || (0).toString().padStart(5, '0')
  let newFacultyIdNumber = (parseInt(lastFacultyId) + 1)
    .toString()
    .padStart(5, '0')

  newFacultyIdNumber = `${role
    .substring(0, 1)
    .toLocaleUpperCase()}-${newFacultyIdNumber}`

  return newFacultyIdNumber
}

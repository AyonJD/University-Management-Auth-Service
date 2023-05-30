import userModel from './user.model'

export const findLastAdmittedStudentId = async (
  batch: number
): Promise<string> => {
  const lastAdmittedStudent = await userModel
    .findOne({ role: 'student' })
    .select({ id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  if (!lastAdmittedStudent) return `${batch}0000`
  return lastAdmittedStudent.id as string
}

export const generateStudentId = async (batch: number): Promise<string> => {
  const lastAdmittedStudentId = await findLastAdmittedStudentId(batch)
  const lastAdmittedStudentIdNumber = parseInt(lastAdmittedStudentId)
  const newStudentIdNumber = lastAdmittedStudentIdNumber + 1
  return newStudentIdNumber.toString()
}

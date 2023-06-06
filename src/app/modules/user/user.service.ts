import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import userModel from './user.model'
import { generateStudentId } from './user.utils'

const createUserService = async (userData: IUser): Promise<IUser | null> => {
  const { batch, ...userDataWithoutBatch } = userData
  const studentId = await generateStudentId(batch as number)
  userDataWithoutBatch.id = studentId

  if (!userDataWithoutBatch.password) {
    userDataWithoutBatch.password = config.default_student_password as string
  }

  const user = await userModel.create(userDataWithoutBatch)

  if (!user) throw new ApiError(400, 'User creation failed')
  return user
}

export const UserService = {
  createUserService,
}

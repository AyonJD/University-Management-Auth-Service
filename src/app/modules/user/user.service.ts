import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { ISemester } from '../semester/semester.interface'
import { IUser } from './user.interface'
import userModel from './user.model'
import { generateHeigherAuthorityId, generateStudentId } from './user.utils'

const createUserService = async (userData: IUser): Promise<IUser | null> => {
  const semester: ISemester = {
    title: 'Spring',
    year: '2024',
    code: 'SP',
    startMonth: 'September',
    endMonth: 'December',
  }
  if (userData.role === 'student') {
    const studentId = await generateStudentId(semester)
    userData.id = studentId

    if (!userData.password) {
      userData.password = config.default_student_password as string
    }
  } else {
    userData.id = await generateHeigherAuthorityId(userData.role)

    if (!userData.password) {
      userData.password = config.default_authority_password as string
    }
  }

  const user = await userModel.create(userData)

  if (!user) throw new ApiError(400, 'User creation failed')
  return user
}

export const UserService = {
  createUserService,
}

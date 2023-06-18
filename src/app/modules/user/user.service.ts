import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import semesterModel from '../semester/semester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import userModel from './user.model'
import { generateStudentId } from './user.utils'
import studentModel from '../student/student.model'
import httpStatus from 'http-status'

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_password as string
  }

  let newUserAllData = null
  user.role = 'student'
  const semester = await semesterModel.findById(student.semester)

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    if (semester) {
      const studentId = await generateStudentId(semester)
      user.id = studentId
      student.id = studentId

      const createStudent = await studentModel.create([student], { session })
      if (createStudent.length === 0)
        throw new ApiError(httpStatus.BAD_REQUEST, 'Student creation failed')

      // set student _id to user.student for reference
      user.student = createStudent[0]._id
      const createUser = await userModel.create([user], { session })

      if (createUser.length === 0)
        throw new ApiError(httpStatus.BAD_REQUEST, 'User creation failed')

      newUserAllData = createUser[0]

      await session.commitTransaction()
      session.endSession()
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }

  /* This code block is checking if `newUserAllData` is truthy, and if it is, it is querying the
  `userModel` to find the user with the same `id` as `newUserAllData.id`. It then populates the
  `student` field of the user with the corresponding `semester`, `department`, and `faculty` fields.
  The resulting data is then assigned back to `newUserAllData`. This is likely done to retrieve all
  the necessary data for the newly created student user, including their associated student
  information. */
  if (newUserAllData) {
    newUserAllData = await userModel
      .findOne({ id: newUserAllData.id })
      .populate({
        path: 'student',
        populate: [
          {
            path: 'semester',
          },
          {
            path: 'department',
          },
          {
            path: 'faculty',
          },
        ],
      })
  }

  return newUserAllData
}

export const UserService = {
  createStudent,
}

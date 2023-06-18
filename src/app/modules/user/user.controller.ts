import { Request, Response } from 'express'
import { sendSuccessResponse } from '../../utils/customResponse'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import { IUser } from './user.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body

  const result = await UserService.createStudent(student, userData)
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User creation failed')
  }

  const responseData = {
    data: result,
    message: 'User created successfully',
  }
  sendSuccessResponse<IUser>(res, responseData)
})

export const UserController = {
  createStudent,
}

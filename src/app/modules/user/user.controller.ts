import { Request, Response } from 'express'
import { sendSuccessResponse } from '../../utils/customResponse'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import { IUser } from './user.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUserService(req.body)
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
  createUser,
}

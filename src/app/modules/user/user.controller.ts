import { Request, Response } from 'express'
import { sendSuccessResponse } from '../../utils/customResponse'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUserService(req.body)
  sendSuccessResponse(res, result, 'User created successfully')
})

export const UserController = {
  createUser,
}

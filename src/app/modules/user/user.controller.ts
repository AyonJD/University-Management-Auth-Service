import { RequestHandler } from 'express'
import { sendSuccessResponse } from '../../utils/customResponse'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.createUserService(req.body)
    sendSuccessResponse(res, result, 'User created successfully')
  } catch (error: any) {
    next(error)
  }
}

export const UserController = {
  createUser,
}

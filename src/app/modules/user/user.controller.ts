import { Request, Response } from 'express'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../../utils/customResponse'
import { createUserService } from './user.service'

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await createUserService(req.body)
    sendSuccessResponse(res, result, 'User created successfully')
  } catch (error: any) {
    sendErrorResponse(res, 500, error.message)
  }
}

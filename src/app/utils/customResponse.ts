import { Response } from 'express'
import httpStatus from 'http-status'

export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  message?: string
): void => {
  const response = {
    success: true,
    data,
    message: message || 'Success',
  }
  res.status(httpStatus.OK).json(response)
}

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string
): void => {
  const response = {
    success: false,
    message,
  }
  res.status(statusCode).json(response)
}

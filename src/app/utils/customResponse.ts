import { Response } from 'express'

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
  res.status(200).json(response)
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

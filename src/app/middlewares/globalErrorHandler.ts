import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/errorInterface'
import ApiError from '../../errors/ApiError'
import handleValidationError from '../../errors/handleValidationError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error, '--------------------')
  const status = 'false'
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode
    message = error.message
    errorMessages = [{ message: error.message, path: '' }]
  } else if (error instanceof Error) {
    message = error.message
    errorMessages = [{ message: error.message, path: '' }]
  }

  res.status(statusCode).json({
    status,
    message,
    errorMessages,
    stack: config.env === 'development' ? error.stack : '',
  })

  // if (err instanceof ApiError) {
  //   res.status(err.statusCode).json({
  //     message: err.message,
  //     stack: config.env === 'development' ? err.stack : '',
  //   })
  // }
}

export default globalErrorHandler

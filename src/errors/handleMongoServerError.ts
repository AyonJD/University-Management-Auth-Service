import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../interfaces/errorInterface'
import httpStatus from 'http-status'
import { MongoServerError } from 'mongodb'

const handleMongoServerError = (
  error: MongoServerError
): IGenericErrorResponse => {
  const firstKey = Object.keys(error.keyPattern)[0]
  const errors: IGenericErrorMessage[] = [
    {
      path: firstKey,
      message: 'Duplicate value',
    },
  ]
  const statusCode = httpStatus.INTERNAL_SERVER_ERROR
  return {
    status: 'false',
    statusCode,
    message: 'Duplicate value',
    errorMessages: errors,
  }
}

export default handleMongoServerError

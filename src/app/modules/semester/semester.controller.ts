import { RequestHandler } from 'express'
import { SemesterService } from './semester.service'
import { sendSuccessResponse } from '../../utils/customResponse'

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const semesterData = req.body
    const result = await SemesterService.createSemester(semesterData)

    sendSuccessResponse(res, result, 'Semester created successfully')
  } catch (error: any) {
    next(error)
  }
}

export const SemesterController = {
  createSemester,
}

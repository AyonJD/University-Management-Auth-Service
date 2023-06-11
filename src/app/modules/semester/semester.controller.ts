import { Request, Response } from 'express'
import { SemesterService } from './semester.service'
import { sendSuccessResponse } from '../../utils/customResponse'
import catchAsync from '../../../shared/catchAsync'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const semesterData = req.body
  const result = await SemesterService.createSemester(semesterData)

  sendSuccessResponse(res, result, 'Semester created successfully')
})

export const SemesterController = {
  createSemester,
}

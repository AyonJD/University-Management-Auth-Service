import { Request, Response } from 'express'
import { SemesterService } from './semester.service'
import { sendSuccessResponse } from '../../utils/customResponse'
import catchAsync from '../../../shared/catchAsync'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constant/shared.constant'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const semesterData = req.body
  const result = await SemesterService.createSemester(semesterData)

  sendSuccessResponse(res, result, 'Semester created successfully')
})

const getSemesters = catchAsync(async (req: Request, res: Response) => {
  const paginationOption: IPaginationOption = pick(req.query, paginationFields)

  // const result = await SemesterService.getSemesters(paginationOption)

  // sendSuccessResponse(res, result, 'Semesters fetched successfully')
})

export const SemesterController = {
  createSemester,
  getSemesters,
}

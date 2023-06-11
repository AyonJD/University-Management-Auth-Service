import { Request, Response } from 'express'
import { SemesterService } from './semester.service'
import { sendSuccessResponse } from '../../utils/customResponse'
import catchAsync from '../../../shared/catchAsync'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constant/shared.constant'
import { ISemester } from './semester.interface'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const semesterData = req.body
  const result = await SemesterService.createSemester(semesterData)

  sendSuccessResponse<ISemester>(res, {
    data: result,
    message: 'Semester created successfully',
  })
})

const getSemesters = catchAsync(async (req: Request, res: Response) => {
  const paginationOption: IPaginationOption = pick(req.query, paginationFields)

  const result = await SemesterService.getSemesters(paginationOption)

  const responseData = {
    meta: result.meta || {},
    data: result.data || [],
    message: 'Semesters fetched successfully',
  }

  sendSuccessResponse<ISemester[]>(res, responseData)
})

export const SemesterController = {
  createSemester,
  getSemesters,
}

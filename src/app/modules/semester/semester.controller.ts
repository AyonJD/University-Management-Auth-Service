import { Request, Response } from 'express'
import { SemesterService } from './semester.service'
import { sendSuccessResponse } from '../../utils/customResponse'
import catchAsync from '../../../shared/catchAsync'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constant/shared.constant'
import { ISemester } from './semester.interface'
import { SemesterSearchFields } from '../../../constant/semester.constant'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const semesterData = req.body
  const result = await SemesterService.createSemester(semesterData)

  sendSuccessResponse<ISemester>(res, {
    data: result,
    message: 'Semester created successfully',
  })
})

const getSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', ...SemesterSearchFields])
  const paginationOption: IPaginationOption = pick(req.query, paginationFields)

  const result = await SemesterService.getSemesters(filters, paginationOption)

  const responseData = {
    meta: result.meta || {},
    data: result.data || [],
    message: 'Semesters fetched successfully',
  }

  sendSuccessResponse<ISemester[]>(res, responseData)
})

const getSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await SemesterService.getSemester(id)

  const responseData = {
    data: result.data,
    message: 'Semester fetched successfully',
  }

  sendSuccessResponse<ISemester>(res, responseData)
})

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const semesterData = req.body

  const result = await SemesterService.updateSemester(id, semesterData)

  const responseData = {
    data: result,
    message: 'Semester updated successfully',
  }

  sendSuccessResponse<ISemester>(res, responseData)
})

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await SemesterService.deleteSemester(id)

  const responseData = {
    data: result,
    message: 'Semester deleted successfully',
  }

  sendSuccessResponse<ISemester>(res, responseData)
})

export const SemesterController = {
  createSemester,
  getSemesters,
  getSemester,
  updateSemester,
  deleteSemester,
}

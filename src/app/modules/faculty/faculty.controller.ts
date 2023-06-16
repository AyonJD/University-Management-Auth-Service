import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { FacultyService } from './faculty.service'
import { sendSuccessResponse } from '../../utils/customResponse'
import { IFaculty } from './faculty.interface'
import pick from '../../../shared/pick'
import { FacultySearchFields } from '../../../constant/faculty.constant'
import { paginationFields } from '../../../constant/shared.constant'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const facultyData = req.body

  const result = await FacultyService.createFaculty(facultyData)

  const responseData = {
    data: result,
    message: 'Faculty created successfully',
  }

  sendSuccessResponse<IFaculty>(res, responseData)
})

const getFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', ...FacultySearchFields])
  const paginationOption = pick(req.query, paginationFields)

  const result = await FacultyService.getFaculties(filters, paginationOption)

  const responseData = {
    meta: result.meta || {},
    data: result.data || [],
    message: 'Semesters fetched successfully',
  }

  sendSuccessResponse<IFaculty[]>(res, responseData)
})

const getFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await FacultyService.getFaculty(id)

  const responseData = {
    data: result.data,
    message: 'Faculty fetched successfully',
  }

  sendSuccessResponse<IFaculty>(res, responseData)
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const facultyData = req.body

  const result = await FacultyService.updateFaculty(id, facultyData)

  const responseData = {
    data: result,
    message: 'Faculty updated successfully',
  }

  sendSuccessResponse<IFaculty>(res, responseData)
})

export const FacultyController = {
  createFaculty,
  getFaculties,
  getFaculty,
  updateFaculty,
}

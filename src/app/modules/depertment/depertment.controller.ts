import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { DepertmentService } from './depertment.service'
import { sendSuccessResponse } from '../../utils/customResponse'
import { IDepertment } from './depertment.interface'
import pick from '../../../shared/pick'
import { DepertmentSearchFields } from './depertment.constant'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import { paginationFields } from '../../../constant/shared.constant'

const createDepertment = catchAsync(async (req: Request, res: Response) => {
  const depertmentData = req.body
  const result = await DepertmentService.createDepertment(depertmentData)
  const responseData = {
    data: result,
    message: 'Depertment created successfully',
  }

  sendSuccessResponse<IDepertment>(res, responseData)
})

const getDepertments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', ...DepertmentSearchFields])
  const paginationOption: IPaginationOption = pick(req.query, paginationFields)

  const result = await DepertmentService.getDepertments(
    filters,
    paginationOption
  )

  const responseData = {
    meta: result.meta || {},
    data: result.data || [],
    message: 'Semesters fetched successfully',
  }

  sendSuccessResponse<IDepertment[]>(res, responseData)
})

const getDepertment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await DepertmentService.getDepertment(id)

  const responseData = {
    data: result.data,
    message: 'Depertment fetched successfully',
  }

  sendSuccessResponse<IDepertment>(res, responseData)
})

const updateDepertment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const depertmentData = req.body
  const result = await DepertmentService.updateDepertment(id, depertmentData)
  const responseData = {
    data: result,
    message: 'Depertment updated successfully',
  }

  sendSuccessResponse<IDepertment>(res, responseData)
})

const deleteDepertment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await DepertmentService.deleteDepertment(id)
  const responseData = {
    data: result,
    message: 'Depertment deleted successfully',
  }

  sendSuccessResponse<IDepertment>(res, responseData)
})

export const DepertmentController = {
  createDepertment,
  getDepertments,
  getDepertment,
  updateDepertment,
  deleteDepertment,
}

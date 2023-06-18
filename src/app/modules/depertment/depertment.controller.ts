import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import { paginationFields } from '../../../constant/shared.constant'
import { DepartmentService } from './depertment.service'
import { DepartmentSearchFields } from './depertment.constant'
import { sendSuccessResponse } from '../../utils/customResponse'
import { IDepartment } from './depertment.interface'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const departmentData = req.body
  const result = await DepartmentService.createDepartment(departmentData)
  const responseData = {
    data: result,
    message: 'Department created successfully',
  }

  sendSuccessResponse<IDepartment>(res, responseData)
})

const getDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', ...DepartmentSearchFields])
  const paginationOption: IPaginationOption = pick(req.query, paginationFields)

  const result = await DepartmentService.getDepartments(
    filters,
    paginationOption
  )

  const responseData = {
    meta: result.meta || {},
    data: result.data || [],
    message: 'Semesters fetched successfully',
  }

  sendSuccessResponse<IDepartment[]>(res, responseData)
})

const getDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await DepartmentService.getDepartment(id)

  const responseData = {
    data: result.data,
    message: 'Department fetched successfully',
  }

  sendSuccessResponse<IDepartment>(res, responseData)
})

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const departmentData = req.body
  const result = await DepartmentService.updateDepartment(id, departmentData)
  const responseData = {
    data: result,
    message: 'Department updated successfully',
  }

  sendSuccessResponse<IDepartment>(res, responseData)
})

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await DepartmentService.deleteDepartment(id)
  const responseData = {
    data: result,
    message: 'Department deleted successfully',
  }

  sendSuccessResponse<IDepartment>(res, responseData)
})

export const DepartmentController = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
}

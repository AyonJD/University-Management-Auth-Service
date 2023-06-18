import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { DepartmentValidation } from './depertment.validation'
import { DepartmentController } from './depertment.controller'

const router = express.Router()

router.post(
  '/create_department',
  validateRequest(DepartmentValidation.createDepartmentZodSchema),
  DepartmentController.createDepartment
)
router.get('/get_departments', DepartmentController.getDepartments)
router.get('/get_department/:id', DepartmentController.getDepartment)
router.patch(
  '/update_department/:id',
  validateRequest(DepartmentValidation.createDepartmentZodSchema),
  DepartmentController.updateDepartment
)
router.delete('/delete_department/:id', DepartmentController.deleteDepartment)

export const DepartmentRoute = router

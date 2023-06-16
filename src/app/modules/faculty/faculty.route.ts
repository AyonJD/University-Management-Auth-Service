import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { FacultyValidation } from './faculty.validation'
import { FacultyController } from './faculty.controller'

const router = express.Router()

router.post(
  '/create_faculty',
  validateRequest(FacultyValidation.createFacultyZodSchema),
  FacultyController.createFaculty
)

router.get('/get_faculties', FacultyController.getFaculties)

export const FacultyRoute = router

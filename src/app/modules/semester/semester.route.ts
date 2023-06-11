import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { SemesterValidation } from './semester.validation'
import { SemesterController } from './semester.controller'

const router = express.Router()

router.post(
  '/create_semester',
  validateRequest(SemesterValidation.createSemesterZodSchema), // This middleware is for validating the request body with Zod
  SemesterController.createSemester
)

router.get('/get_semesters', SemesterController.getSemesters)

export const SemesterRoute = router

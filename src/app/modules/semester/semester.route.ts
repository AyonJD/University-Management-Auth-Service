import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { SemesterValidation } from './semester.validation'

const router = express.Router()

router.post(
  '/create_semester',
  validateRequest(SemesterValidation.createSemesterZodSchema) // This middleware is for validating the request body with Zod
  //   UserController.createUser
)

export const SemesterRoute = router

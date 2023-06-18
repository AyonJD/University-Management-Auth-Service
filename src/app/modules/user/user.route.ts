import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create_student',
  validateRequest(UserValidation.createUserZodSchema), // This middleware is for validating the request body with Zod
  UserController.createStudent
)

export const UserRoute = router

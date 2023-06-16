import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { DepertmentValidation } from './depertment.validation'
import { DepertmentController } from './depertment.controller'

const router = express.Router()

router.post(
  '/create_depertment',
  validateRequest(DepertmentValidation.createDepertmentZodSchema),
  DepertmentController.createDepertment
)
router.get('/get_depertments', DepertmentController.getDepertments)
router.get('/get_depertment/:id', DepertmentController.getDepertment)
router.patch(
  '/update_depertment/:id',
  validateRequest(DepertmentValidation.createDepertmentZodSchema),
  DepertmentController.updateDepertment
)
router.delete('/delete_depertment/:id', DepertmentController.deleteDepertment)

export const DepertmentRoute = router

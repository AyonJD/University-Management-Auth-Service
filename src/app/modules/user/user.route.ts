import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.post('/create_user', UserController.createUser)

export const UserRoute = router

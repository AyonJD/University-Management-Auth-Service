import express from 'express'
import { UserRoute } from '../modules/user/user.route'
import { SemesterRoute } from '../modules/semester/semester.route'

const router = express.Router()

const routes = [
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/semester',
    route: SemesterRoute,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
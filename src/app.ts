import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

// Import routes
import { UserRoute } from './app/modules/user/user.route'
import { SemesterRoute } from './app/modules/semester/semester.route'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing route
app.get('/', async (req, res, next) => {
  Promise.reject(new Error('Unhandled promise rejection'))
})

// All routes
app.use('/api/v1/user', UserRoute)
app.use('/api/v1/semester', SemesterRoute)

// Global error handler
app.use(globalErrorHandler)

export default app

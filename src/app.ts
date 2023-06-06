import express, { Application } from 'express'
import cors from 'cors'

// Import routes
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoute } from './app/modules/user/user.route'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing route
// app.get('/',  (req, res, next) => {
//  throw new Error('Something went wrong')
// })

// All routes
app.use('/api/v1/user', UserRoute)

// Global error handler
app.use(globalErrorHandler)

export default app

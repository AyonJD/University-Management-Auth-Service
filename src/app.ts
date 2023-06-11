import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

// Import routes
import routes from './app/Routes/index'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing route
app.get('/', async (req, res, next) => {
  Promise.reject(new Error('Unhandled promise rejection'))
})

// All routes
app.use('/api/v1', routes)

// Global error handler
app.use(globalErrorHandler)

export default app

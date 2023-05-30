import express, { Application, Request, Response } from 'express'
import cors from 'cors'

// Import routes
import userRoutes from './app/modules/user/user.route'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing route
app.get('/', async (req: Request, res: Response) => {
  res.send('Route is working!')
})

// All routes
app.use('/api/v1/user', userRoutes)

export default app

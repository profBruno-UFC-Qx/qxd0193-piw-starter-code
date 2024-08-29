import express from 'express'
import userRoutes from './routes/userRoutes'
import authRotes from './routes/authRoutes'
import cors from "cors";
import { AppDataSource } from './DataSource'

async function startServer() {
  try {
    await AppDataSource.initialize()
    
    const app = express()
    const port  = 3000

    app.use(cors())
    
    app.use(express.json())
    app.use('/', authRotes)
    app.use('/users', userRoutes)
    
    
    app.listen(port, () => {
      console.log(`Servidor escutando a port ${port} em http://localhost:${port}`)
    })
  } catch(e) {
    throw e
  }
}

startServer()

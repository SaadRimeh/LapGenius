import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { router as apiRouter } from './v1/index.js'

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
// Disable caching for API responses to ensure fresh order statuses
app.use((req, res, next)=>{
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.set('Pragma', 'no-cache')
  res.set('Expires', '0')
  res.set('Surrogate-Control', 'no-store')
  next()
})

app.get('/', (_req, res)=> res.json({ ok: true, service: 'LapGenius API' }))
app.use('/api', apiRouter)
// Swagger UI
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const specPath = path.join(__dirname, 'docs', 'openapi.json')
const spec = JSON.parse(fs.readFileSync(specPath, 'utf-8'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec))

const PORT = process.env.PORT || 5001
const MONGO_URL = process.env.MONGO_URL || ''

mongoose.connect(MONGO_URL).then(()=>{
  app.listen(PORT, ()=> console.log(`API listening on http://localhost:${PORT}`))
}).catch((err)=>{
  console.error('Mongo connection error', err)
  process.exit(1)
})



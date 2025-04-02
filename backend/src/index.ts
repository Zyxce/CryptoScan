/// <reference types="node" />
import express from 'express'
import cors from 'cors'
import config from './config'
import newsRouter from './routes/news.route'
import errorMiddleware from './middlewares/error.middleware'
import type { Request, Response, NextFunction, Router } from 'express'

const app = express()

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://zyxce.github.io'],
    methods: 'GET',
    allowedHeaders: ['Content-Type'],
  })
)

app.use(express.json())

app.use('/api/news', newsRouter)

app.use(errorMiddleware)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
  console.log(
    `Allowed origins: ${[
      'http://localhost:3000',
      'https://zyxce.github.io',
    ].join(', ')}`
  )
})

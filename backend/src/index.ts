import express from 'express'
import cors from 'cors'
import config from './config'
import newsRouter from './routes/news.route'
import errorMiddleware from './middlewares/error.middleware'
import type { Request, Response, NextFunction, Router } from 'express'

const app = express()

// CORS Middleware с явным указанием источников
app.use(
  cors({
    origin: [
      'http://localhost:3000', // Локальная разработка
      'https://zyxce.github.io', // Продакшен
    ],
    methods: 'GET',
    allowedHeaders: ['Content-Type'],
  })
)

// Базовые middleware
app.use(express.json())

// Роуты
app.use('/api/news', newsRouter)

// Обработчик ошибок
app.use(errorMiddleware)

// Запуск сервера
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
  console.log(
    `Allowed origins: ${[
      'http://localhost:3000',
      'https://zyxce.github.io',
    ].join(', ')}`
  )
})

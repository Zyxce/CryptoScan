require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

// Настройки CORS
app.use(
  cors({
    origin: ['https://zyxce.github.io', 'http://localhost:3000'],
    methods: 'GET',
  })
)

// Middleware для логирования
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

app.get('/api/news', async (req, res) => {
  try {
    // Проверка API ключа
    if (!process.env.NEWS_API_KEY) {
      throw new Error('NewsAPI key is missing in environment variables')
    }

    // Параметры запроса
    const params = {
      q: req.query.q || 'crypto',
      pageSize: 10,
      apiKey: process.env.NEWS_API_KEY,
      language: 'en',
      sortBy: 'publishedAt',
    }

    console.log('Request params:', params)

    // Запрос к NewsAPI
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params,
      timeout: 10000,
    })

    // Валидация ответа
    if (response.data.status !== 'ok') {
      throw new Error(response.data.message || 'Invalid response from NewsAPI')
    }

    // Упрощённый ответ
    res.json({
      status: 'ok',
      articles: response.data.articles.slice(0, 10),
    })
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
    })

    res.status(500).json({
      error: 'Internal Server Error',
      details: error.response?.data?.message || error.message,
    })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} with Node.js ${process.version}`)
})

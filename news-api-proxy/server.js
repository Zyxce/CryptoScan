require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(
  cors({
    origin: '*', // Временно разрешить всем для теста
    methods: 'GET',
  })
)

app.get('/api/news', async (req, res) => {
  try {
    const { q = 'crypto' } = req.query

    if (!process.env.NEWS_API_KEY) {
      throw new Error('API key missing')
    }

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: String(q),
        pageSize: 10,
        apiKey: process.env.NEWS_API_KEY,
        language: 'en',
        sortBy: 'publishedAt',
      },
      timeout: 10000,
    })

    res.json(response.data)
  } catch (error) {
    console.error('Server Error:', error.message)
    res.status(500).json({
      error: error.response?.data?.message || 'News service unavailable',
    })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`)
})

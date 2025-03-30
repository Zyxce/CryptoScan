require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(cors())

app.get('/api/news', async (req, res) => {
  try {
    const { q, from, to, sortBy } = req.query

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: q || 'crypto',
        from: from || new Date(Date.now() - 864e5).toISOString().split('T')[0], // yesterday
        to: to || new Date().toISOString().split('T')[0], // today
        sortBy: sortBy || 'publishedAt',
        apiKey: process.env.NEWS_API_KEY,
        language: 'en',
      },
    })

    res.json(response.data)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: error.response?.data,
    })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

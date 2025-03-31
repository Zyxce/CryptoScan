import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.PORT || 3001,
  NEWS_API_KEY: process.env.NEWS_API_KEY,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
}

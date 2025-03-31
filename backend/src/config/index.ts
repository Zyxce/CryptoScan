import dotenv from 'dotenv'
declare const process: {
  env: {
    PORT?: string
    NEWS_API_KEY?: string
    CORS_ORIGIN?: string
    NODE_ENV?: string
  }
}
dotenv.config()

export default {
  PORT: process.env.PORT || 3001,
  NEWS_API_KEY: process.env.NEWS_API_KEY,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
}

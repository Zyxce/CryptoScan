import type { Request, Response, NextFunction } from 'express'
import { Router } from 'express'
declare const process: {
  env: {
    PORT?: string
    NEWS_API_KEY?: string
    CORS_ORIGIN?: string
    NODE_ENV?: string
  }
}
const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('[Error Middleware]', err.stack)
  res.status(500).json({
    error: 'Internal Server Error',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong',
  })
}
export default errorMiddleware

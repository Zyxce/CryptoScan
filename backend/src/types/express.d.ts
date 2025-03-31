import { Request } from 'express'

declare module 'express' {
  interface Request {
    user?: any
    query: {
      q?: string
      from?: string
      to?: string
      sortBy?: string
      pageSize?: string
    }
  }
}

import axios from 'axios'
import { Request, Response, NextFunction, Router } from 'express'
import config from '../config'
import { NewsAPIResponse } from '../types/news'

export class NewsService {
  static async getNews(req: Request) {
    const { q, from, to, sortBy, pageSize } = req.query

    const params = {
      q: q?.toString() || 'crypto',
      from:
        from?.toString() ||
        new Date(Date.now() - 864e5).toISOString().split('T')[0],
      to: to?.toString() || new Date().toISOString().split('T')[0],
      sortBy: ['relevancy', 'popularity', 'publishedAt'].includes(
        sortBy?.toString() || ''
      )
        ? sortBy?.toString()
        : 'publishedAt',
      pageSize: Number(pageSize) || 10,
      apiKey: config.NEWS_API_KEY,
      language: 'en',
    }

    const response = await axios.get<NewsAPIResponse>(
      'https://newsapi.org/v2/everything',
      { params, timeout: 10000 }
    )

    if (response.data.status !== 'ok') {
      throw new Error(response.data.status)
    }

    return response.data
  }
}

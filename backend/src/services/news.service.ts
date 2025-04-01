import axios from 'axios'
import { Request } from 'express'
import config from '../config'
import { NewsAPIResponse } from '../types/news'

export class NewsService {
  static async getNews(req: Request): Promise<NewsAPIResponse> {
    const { q, from, to, sortBy, pageSize } = req.query

    // Создаем URLSearchParams и добавляем параметры по одному
    const params = new URLSearchParams()
    params.append('q', q?.toString() || 'crypto')
    params.append(
      'from',
      from?.toString() ||
        new Date(Date.now() - 864e5).toISOString().split('T')[0]
    )
    params.append(
      'to',
      to?.toString() || new Date().toISOString().split('T')[0]
    )
    params.append(
      'sortBy',
      ['relevancy', 'popularity', 'publishedAt'].includes(
        sortBy?.toString() || ''
      )
        ? sortBy?.toString() || 'publishedAt'
        : 'publishedAt'
    )
    params.append('pageSize', (Number(pageSize) || 10).toString())
    params.append('language', 'en')

    const proxyUrl = `http://your-render-proxy.onrender.com/https://newsapi.org/v2/everything?${params.toString()}`

    const response = await axios.get<NewsAPIResponse>(proxyUrl, {
      headers: {
        'X-Api-Key': config.NEWS_API_KEY,
        Accept: 'application/json',
      },
      timeout: 10000,
    })

    if (response.data.status !== 'ok') {
      throw new Error(`NewsAPI error: ${response.data.status}`)
    }

    return response.data
  }
}

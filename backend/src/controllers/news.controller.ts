import { Request, Response, NextFunction, Router } from 'express'
import { NewsService } from '../services/news.service'

export const getNews = async (req: Request, res: Response) => {
  try {
    const newsData = await NewsService.getNews(req)
    res.json(newsData)
  } catch (error) {
    console.error('News Controller Error:', error)
    res.status(500).json({
      error: 'Failed to fetch news',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

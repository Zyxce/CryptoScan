import { Router } from 'express'
import { getNews } from '../controllers/news.controller'

const router = Router()

router.get('/', getNews)

export default router

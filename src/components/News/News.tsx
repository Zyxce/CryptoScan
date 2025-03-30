import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Loading from '../Events/Loading'
import ErrorComponent from '../Events/Error'
import NewsContainer from './NewsContainer'
import style from './News.module.css'
import { NewsApiResponse } from '../../types'

const News = () => {
  const { t } = useTranslation()
  const question = 'crypto'
  const language = 'en'
  const sortBy = 'popularity'
  const API_KEY = '131d568f01684970a25737e342974649'

  const today = new Date()
  const todayFormatted = today.toISOString().split('T')[0]

  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  const yesterdayFormatted = yesterday.toISOString().split('T')[0]

  const NEWS_API_URL = 'http://localhost:3001/api/news'

  const [news, setNews] = useState<NewsApiResponse | null>(null)
  const [error, setError] = useState<unknown>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(NEWS_API_URL)
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`)
        }
        const data: NewsApiResponse = await res.json()
        setNews(data)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [NEWS_API_URL])

  if (error) return <ErrorComponent error={error} />
  if (isLoading) return <Loading type={'News'} />

  return (
    <div>
      {news ? (
        <div className={style.newsSection}>
          <h2 className={style.newsHeader}>
            {t('news.currentnewson')} <span>{todayFormatted}</span>
          </h2>
          <h3 className={style.newsResults}>
            {t('news.totalresults')} {news.totalResults}
          </h3>
          <ul className={style.newsList}>
            {news.articles.map((article, index) => (
              <NewsContainer key={index} {...article} />
            ))}
          </ul>
        </div>
      ) : (
        <div>No news found</div>
      )}
    </div>
  )
}

export default News

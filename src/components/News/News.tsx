import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Loading from '../Events/Loading'
import ErrorComponent from '../Events/Error'
import NewsContainer from './NewsContainer'
import style from './News.module.css'
import { NewsApiResponse } from '../../types'

const News = () => {
  const { t } = useTranslation()
  const [news, setNews] = useState<NewsApiResponse | null>(null)
  const [error, setError] = useState<unknown>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const NEWS_API_URL = 'https://cryptoscan.onrender.com/api/news?q=crypto'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(NEWS_API_URL)

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(
            errorData.details || `HTTP error! Status: ${res.status}`
          )
        }

        const data: NewsApiResponse = await res.json()

        // Валидация структуры ответа
        if (!data.articles || !Array.isArray(data.articles)) {
          throw new Error('Invalid news data structure')
        }

        setNews(data)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (error) return <ErrorComponent error={error} />
  if (isLoading) return <Loading type={'News'} />

  return (
    <div className={style.newsSection}>
      <h2 className={style.newsHeader}>
        {t('news.currentnewson')}{' '}
        <span>{new Date().toISOString().split('T')[0]}</span>
      </h2>

      {news && news.articles.length > 0 ? (
        <>
          <h3 className={style.newsResults}>
            {t('news.totalresults')} {news.totalResults}
          </h3>
          <ul className={style.newsList}>
            {news.articles.map((article, index) => (
              <NewsContainer key={`${article.url}-${index}`} {...article} />
            ))}
          </ul>
        </>
      ) : (
        <div className={style.noNews}>{t('news.nonews')}</div>
      )}
    </div>
  )
}

export default News

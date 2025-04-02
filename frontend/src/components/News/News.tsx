import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Loading from '../Events/Loading'
import ErrorComponent from '../Events/Error'
import NewsContainer from './NewsContainer'
import style from './News.module.css'

// Тип для полного ответа API
type CoinGeckoNewsResponse = {
  data: {
    id: number
    title: string
    description: string
    url: string
    created_at: number
    thumb_2x: string
    author: string
    news_site: string
  }[]
  count: number
  page: number
}

const News = () => {
  const { t } = useTranslation()
  const [news, setNews] = useState<CoinGeckoNewsResponse['data'] | null>(null)
  const [error, setError] = useState<unknown>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const NEWS_API_URL = `https://api.coingecko.com/api/v3/news?category=cryptocurrency&page=1&per_page=10`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(NEWS_API_URL)
        console.log('Response status:', res.status)

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(
            errorData.details || `HTTP error! Status: ${res.status}`
          )
        }

        const response: CoinGeckoNewsResponse = await res.json()
        console.log('API Response:', response) // Для отладки

        // Валидация структуры
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid news data structure')
        }

        setNews(response.data)
      } catch (err) {
        setError(err)
        console.error('Fetch error:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [NEWS_API_URL])

  // Форматирование даты
  const todayFormatted = new Date().toLocaleDateString()

  if (error) return <ErrorComponent error={error} />
  if (isLoading) return <Loading type={'News'} />

  return (
    <div className={style.newsSection}>
      <h2 className={style.newsHeader}>
        {t('news.currentnewson')} <span>{todayFormatted}</span>
      </h2>

      {news && news.length > 0 ? (
        <>
          <h3 className={style.newsResults}>
            {t('news.totalresults')} {news.length}
          </h3>
          <ul className={style.newsList}>
            {news.map((article) => (
              <NewsContainer
                key={article.id}
                title={article.title}
                url={article.url}
                description={article.description}
                thumbnail={article.thumb_2x}
                publishedAt={new Date(article.created_at * 1000).toISOString()}
                author={article.author}
                source={article.news_site}
              />
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

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import testNewsData from '../../Data/testNewsData.json'
import Loading from '../Events/Loading'
import ErrorComponent from '../Events/Error'
import NewsContainer from './NewsContainer'
import style from './News.module.css'
import { ICoinGeckoNewsResponse } from '../../types'

const News = () => {
  const { t } = useTranslation()
  const NEWS_API_URL = `https://api.coingecko.com/api/v3/news?category=cryptocurrency&page=1&per_page=10`

  const [news, setNews] = useState<ICoinGeckoNewsResponse | null>(null)
  const [error, setError] = useState<unknown>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

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

        const data: ICoinGeckoNewsResponse = await res.json()

        if (!data.data || !Array.isArray(data.data)) {
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
  }, [NEWS_API_URL])

  const todayFormatted = new Date().toISOString().split('T')[0]

  if (error) return <ErrorComponent error={error} />
  if (isLoading) return <Loading type={'News'} />

  return (
    <div className={style.newsSection}>
      <h2 className={style.newsHeader}>
        {t('news.currentnewson')} <span>{todayFormatted}</span>
      </h2>

      {news && news.data.length > 0 ? (
        <>
          <h3 className={style.newsResults}>
            {t('news.totalresults')} {news.count}
          </h3>
          <ul className={style.newsList}>
            {news.data.map((article) => (
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

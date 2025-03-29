import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import defaultNewsIcon from '../../Images/newsDefault.png'
import style from './NewsContainer.module.css'
import { Article } from '../../types'

const NewsContainer: React.FC<Article> = ({
  title,
  description,
  url,
  urlToImage,
  author,
  content,
}) => {
  const { t } = useTranslation()

  const [imageSrc, setImageSrc] = useState(urlToImage || defaultNewsIcon)

  const formatAuthor = (author: string | null) => {
    if (!author) return t('news.unknownauthor')

    const formatted = author.split(' ').slice(0, 2).join(' ').replace(/,$/, '')

    return formatted
  }
  const calculateReadTime = (content: string | null) => {
    if (!content) return 0
    const charsMatch = content.match(/\[\+(\d+)\s?chars\]$/)
    const charsCount = charsMatch ? parseInt(charsMatch[1]) : content.length
    return Math.ceil(5 + charsCount / 1000)
  }

  useEffect(() => {
    if (!urlToImage) {
      setImageSrc(defaultNewsIcon)
      return
    }

    const img = new Image()
    img.src = urlToImage

    img.onload = () => {
      setImageSrc(urlToImage)
    }

    img.onerror = () => {
      setImageSrc(defaultNewsIcon)
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [urlToImage])

  return (
    <li className={style.newsItem}>
      <img
        className={style.newsImage}
        src={imageSrc}
        alt={title}
        style={{ maxWidth: '375px' }}
      />
      <div className={style.newsTextContainer}>
        <div className={style.newsParameters}>
          <p className={style.newsParametersText} title={author || ''}>
            {formatAuthor(author)}
          </p>
          <p className={style.newsParametersText}>
            {calculateReadTime(content)} {t('news.minsread')}
          </p>
        </div>
        <h3 className={style.newsHeader}>{title}</h3>
        <p className={style.newsDescription}>{description}</p>
        <a
          className={style.newsLink}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('news.readmore')}
        </a>
      </div>
    </li>
  )
}

export default NewsContainer

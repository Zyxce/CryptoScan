import React from 'react'
import style from './News.module.css'

type Article = {
  title: string
  url: string
  description: string
  thumbnail: string
  publishedAt: string
  author: string
  source: string
}

const NewsContainer: React.FC<Article> = ({
  title,
  url,
  description,
  thumbnail,
  publishedAt,
  author,
  source,
}) => {
  return (
    <li className="news-item">
      <img src={thumbnail} alt={title} className={style.thumbnail} />
      <div className={style.content}>
        <h3 className={style.title}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
        <p className={style.description}>{description}</p>
        <div className={style.meta}>
          {author && <span className={style.author}>By {author}</span>}
          {source && <span className={style.source}>Source: {source}</span>}
          <time className={style.time}>
            {new Date(publishedAt).toLocaleDateString()}
          </time>
        </div>
      </div>
    </li>
  )
}

export default NewsContainer

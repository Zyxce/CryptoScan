import React, { useEffect, useState } from 'react'
import style from './Exchange.module.css'
import notFoundIcon from '../../Images/notFoundIcon.png'

const Exchange = (props) => {
  const { name, name_id, volume_usd, active_pairs, url, country } = props

  const [imageSrc, setImageSrc] = useState(notFoundIcon)

  const NOT_AVAILABLE = 'N/A'
  const [trueData, setTrueData] = useState({
    name: name || NOT_AVAILABLE,
    nameId: name_id || NOT_AVAILABLE,
    volumeUsd: volume_usd || NOT_AVAILABLE,
    activePairs: active_pairs || NOT_AVAILABLE,
    url: url || NOT_AVAILABLE,
    country: country || NOT_AVAILABLE,
  })

  useEffect(() => {
    const loadImage = async () => {
      try {
        const ImageUrl = `https://www.coinlore.com/img/exchanges/${name_id}.png`

        const img = new Image()
        img.src = ImageUrl

        img.onload = () => setImageSrc(ImageUrl) // если картинка загрузилась заебись
        img.onerror = () => setImageSrc(notFoundIcon)
      } catch (error) {
        console.error('Error loading images:', error) // не круто
      }
    }
    loadImage()

    // Оптимизированная проверка данных

    setTrueData(() => ({
      name: name || NOT_AVAILABLE,
      nameId: name_id || NOT_AVAILABLE,
      volumeUsd: volume_usd || NOT_AVAILABLE,
      activePairs: active_pairs || NOT_AVAILABLE,
      url: url || NOT_AVAILABLE,
      country: country || NOT_AVAILABLE,
    }))
  }, [name, name_id, country, volume_usd, active_pairs, url])

  return (
    <>
      <div className={style.exchangeContainer}>
        <img className={style.exchangeIcon} src={imageSrc} alt="icon"></img>
        <p className={style.exchangeTableText}>{trueData.name}</p>
        <p className={style.exchangeTableText}>
          {trueData.volumeUsd === NOT_AVAILABLE
            ? trueData.volumeUsd
            : `$${trueData.volumeUsd}`}
        </p>
        <p className={style.exchangeTableText}>{trueData.activePairs}</p>
        <a href={trueData.url} className={style.exchangeTableUrl}>
          {trueData.url}
        </a>
        <p className={style.exchangeTableText}>{trueData.country}</p>
      </div>
    </>
  )
}

export default Exchange

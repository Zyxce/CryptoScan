import React, { useEffect, useState } from 'react'
import style from './reusableComponents.module.css'
import { useNavigate } from 'react-router-dom'
import upGraph from '../../Images/upGraph.png'
import downGraph from '../../Images/downGraph.png'
import notFoundIcon from '../../Images/notFoundIcon.png'

const CoinCard = (props) => {
  const {
    symbol,
    name,
    nameid,
    percent_change_1h,
    percent_change_24h,
    percent_change_7d,
    price_usd,
    toggleSelectedCoinId,
    id,
    percentTime,
  } = props

  const navigate = useNavigate()

  const [imageSrc, setImageSrc] = useState(notFoundIcon)
  const [currentPercent, setCurrentPercent] = useState('')

  const NOT_AVAILABLE = 'N/A'
  const [trueData, setTrueData] = useState({
    symbol: symbol || NOT_AVAILABLE,
    name: name || NOT_AVAILABLE,
    price: price_usd || NOT_AVAILABLE,
    percentChange1h: percent_change_1h || NOT_AVAILABLE,
    percentChange24h: percent_change_24h || NOT_AVAILABLE,
    percentChange7d: percent_change_7d || NOT_AVAILABLE,
  })

  useEffect(() => {
    //Загрузка картинки с запасным вариантом и дефолтным в случае ошибки
    const loadImage = async () => {
      try {
        const firstImageUrl = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/refs/heads/master/128/color/${symbol.toLowerCase()}.png`
        const secondImageUrl = `https://www.coinlore.com/img/${nameid.toLowerCase()}.webp`

        const img = new Image()
        img.src = firstImageUrl

        img.onload = () => setImageSrc(firstImageUrl) // если картинка загрузилась заебись
        img.onerror = () => {
          const backupImg = new Image()
          backupImg.src = secondImageUrl

          backupImg.onload = () => setImageSrc(secondImageUrl) // если первая нет то вторая
          backupImg.onerror = () => setImageSrc(notFoundIcon) // дефолтная картинка
        }
      } catch (error) {
        console.error('Error loading images:', error) // не круто
      }
    }
    loadImage()

    // Оптимизированная проверка данных

    setTrueData(() => ({
      symbol: symbol || NOT_AVAILABLE,
      name: name || NOT_AVAILABLE,
      price: price_usd || NOT_AVAILABLE,
      percentChange1h: percent_change_1h || NOT_AVAILABLE,
      percentChange24h: percent_change_24h || NOT_AVAILABLE,
      percentChange7d: percent_change_7d || NOT_AVAILABLE,
    }))

    if (percentTime === 'percent_change_1h') {
      setCurrentPercent(trueData.percentChange1h)
    } else if (percentTime === 'percent_change_7d') {
      setCurrentPercent(trueData.percentChange7d)
    } else {
      setCurrentPercent(trueData.percentChange24h)
    }
  }, [
    symbol,
    name,
    nameid,
    percent_change_1h,
    percent_change_24h,
    percent_change_7d,
    price_usd,
    percentTime,
    trueData.percentChange1h,
    trueData.percentChange7d,
    trueData.percentChange24h,
  ])

  //настройка цвета для текста процента и его графа, настройка типа процента
  const getPercentChangeColor = (percent_change) => {
    return percent_change >= 0 ? '#06B470' : '#EA3B5A'
  }
  const percentColor = getPercentChangeColor(currentPercent)
  const graph = currentPercent >= 0 ? upGraph : downGraph

  return (
    <div
      className={style.coinCardContainer}
      onClick={() => {
        toggleSelectedCoinId(id, name)
        navigate('/CryptoScan/markets')
      }}
    >
      <img className={style.coinCardIcon} src={imageSrc} alt="coin"></img>
      <div className={style.coinCardNameContainer}>
        <p className={style.coinCardSymbol}>{trueData.symbol}</p>
        <p className={style.coinCardName}>{trueData.name}</p>
      </div>
      <div className={style.coinCardPercentContainer}>
        <img className={style.coinCardGraph} src={graph} alt="graph"></img>
        <p className={style.coinCardPercent} style={{ color: percentColor }}>
          {currentPercent} %
        </p>
      </div>
      <p className={style.coinCardPrice}>{trueData.price} $</p>
    </div>
  )
}

export default CoinCard

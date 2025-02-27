import React, { useEffect, useState } from 'react'
import Button from '../Reusable/Button'
import { useNavigate } from 'react-router-dom'
import upGraph from '../../Images/upGraph.png'
import downGraph from '../../Images/downGraph.png'
import notFoundIcon from '../../Images/notFoundIcon.png'
import style from './Coin.module.css'

const Coin = (props) => {
  const {
    id,
    symbol,
    name,
    nameid,
    price_usd,
    // percent_change_1h,
    percent_change_24h,
    // percent_change_7d,
    rank,
    // price_btc,
    market_cap_usd,
    volume24,
    // volume24a,
    csupply,
    // tsupply,
    // msupply,
    toggleSelectedCoinId,
  } = props

  const navigate = useNavigate()

  const [imageSrc, setImageSrc] = useState('')

  const NOT_AVAILABLE = 'N/A'
  const [trueData, setTrueData] = useState({
    symbol: symbol || NOT_AVAILABLE,
    name: name || NOT_AVAILABLE,
    price: price_usd || NOT_AVAILABLE,
    volume: volume24 || NOT_AVAILABLE,
    csupply: csupply || NOT_AVAILABLE,
    percentChange24h: percent_change_24h || NOT_AVAILABLE,
    marketCap: market_cap_usd || NOT_AVAILABLE,
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
      volume: volume24 || NOT_AVAILABLE,
      csupply: csupply || NOT_AVAILABLE,
      percentChange24h: percent_change_24h || NOT_AVAILABLE,
      marketCap: market_cap_usd || NOT_AVAILABLE,
    }))
  }, [
    nameid,
    symbol,
    name,
    price_usd,
    percent_change_24h,
    market_cap_usd,
    volume24,
    csupply,
  ])

  //настройка цвета для текста процента и его графа
  const getPercentChangeColor = (percent_change) => {
    return percent_change >= 0 ? '#06B470' : '#EA3B5A'
  }
  const percentColor = getPercentChangeColor(percent_change_24h)
  const graph = percent_change_24h >= 0 ? upGraph : downGraph

  return (
    <>
      <div className={style.coinContainer}>
        <img className={style.coinIcon} src={imageSrc} alt="icon" />
        <div className={style.coinNameContainer}>
          <p className={style.coinSymbol}>{trueData.symbol}</p>
          <p className={style.coinTableText}>{trueData.name}</p>
        </div>
        <p className={style.coinTableText}>${trueData.price}</p>
        <div className={style.coinPercentContainer}>
          <img className={style.coinPercentImg} src={graph} alt="graph" />
          <p style={{ color: percentColor }} className={style.coinTableText}>
            {trueData.percentChange24h}%
          </p>
        </div>
        <p className={style.coinTableText}>${trueData.volume}</p>
        <p className={style.coinTableText}>${trueData.csupply}</p>
        <p className={style.coinTableText}>${trueData.marketCap}</p>
        <Button
          className={style.coinTableBtn}
          onClick={() => {
            toggleSelectedCoinId(id, name)
            navigate('/CryptoScan/markets')
          }}
        >
          <span>{trueData.symbol}</span> Market statistics
        </Button>
      </div>
    </>
  )
}

export default Coin

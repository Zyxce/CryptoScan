import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from './MarketCoin.module.css'
import notFoundIcon from '../../Images/notFoundIcon.png'
import upGraph from '../../Images/upGraph.png'
import downGraph from '../../Images/downGraph.png'

const MarketCoin = (props) => {
  const { t } = useTranslation()
  const {
    symbol,
    name,
    nameid,
    price_usd,
    percent_change_1h,
    percent_change_24h,
    percent_change_7d,
    rank,
    price_btc,
    market_cap_usd,
    volume24,
    volume24a,
    csupply,
    tsupply,
    msupply,
  } = props

  const [imageSrc, setImageSrc] = useState(notFoundIcon)

  const NOT_AVAILABLE = 'N/A'
  const [trueData, setTrueData] = useState({
    symbol: symbol || NOT_AVAILABLE,
    name: name || NOT_AVAILABLE,
    nameid: nameid || NOT_AVAILABLE,
    price: price_usd || NOT_AVAILABLE,
    priceBtc: price_btc || NOT_AVAILABLE,
    rank: rank || NOT_AVAILABLE,
    volume: volume24 || NOT_AVAILABLE,
    volumeAlt: volume24a || NOT_AVAILABLE,
    csupply: csupply || NOT_AVAILABLE,
    tsupply: tsupply || NOT_AVAILABLE,
    msupply: msupply || NOT_AVAILABLE,
    percentChange1h: percent_change_1h || NOT_AVAILABLE,
    percentChange24h: percent_change_24h || NOT_AVAILABLE,
    percentChange7d: percent_change_7d || NOT_AVAILABLE,
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
      nameid: nameid || NOT_AVAILABLE,
      price: price_usd || NOT_AVAILABLE,
      priceBtc: price_btc || NOT_AVAILABLE,
      rank: rank || NOT_AVAILABLE,
      volume: volume24 || NOT_AVAILABLE,
      volumeAlt: volume24a || NOT_AVAILABLE,
      csupply: csupply || NOT_AVAILABLE,
      tsupply: tsupply || NOT_AVAILABLE,
      msupply: msupply || NOT_AVAILABLE,
      percentChange1h: percent_change_1h || NOT_AVAILABLE,
      percentChange24h: percent_change_24h || NOT_AVAILABLE,
      percentChange7d: percent_change_7d || NOT_AVAILABLE,
      marketCap: market_cap_usd || NOT_AVAILABLE,
    }))
  }, [
    symbol,
    name,
    nameid,
    price_usd,
    percent_change_1h,
    percent_change_24h,
    percent_change_7d,
    rank,
    price_btc,
    market_cap_usd,
    volume24,
    volume24a,
    csupply,
    tsupply,
    msupply,
  ])

  //функция получения правильного цвета графы и текста процентов
  const getPercentChangeColor = (percent_change) => {
    return percent_change >= 0 ? '#06B470' : '#EA3B5A'
  }
  const getGraphColor = (percent_change) => {
    return percent_change >= 0 ? upGraph : downGraph
  }

  const percentColor1h = getPercentChangeColor(percent_change_1h)
  const percentColor24h = getPercentChangeColor(percent_change_24h)
  const percentColor7d = getPercentChangeColor(percent_change_7d)

  const graph1h = getGraphColor(percent_change_1h)
  const graph24h = getGraphColor(percent_change_24h)
  const graph7d = getGraphColor(percent_change_7d)

  //цвет ранга
  const getRankColor = (rankNumber) => {
    if (rankNumber === 1) {
      return '#FFD700'
    } else if (rankNumber === 2) {
      return '#c0c0c0'
    } else if (rankNumber === 3) {
      return '#CD7F32'
    } else {
      return '#1B70F1'
    }
  }
  const rankColor = getRankColor(rank)

  return (
    <div className={style.coinContainer}>
      <div className={style.coinTopContainer}>
        <p className={style.coinHeroRank} style={{ color: rankColor }}>
          #{trueData.rank}
        </p>
        <p className={style.coinHeroSymbol} style={{ color: rankColor }}>
          {trueData.symbol}
        </p>
        <p className={style.coinHeroName}>{name}</p>
        <p className={style.coinHeroCap}>
          {t('marketCoin.capitalization')}: ${trueData.marketCap}
        </p>
      </div>

      <div className={style.coinBottomContainer}>
        <div className={style.coinImgContainer}>
          <img className={style.coinImage} src={imageSrc} alt="icon"></img>
        </div>
        <div className={style.coinMetricsLeftContainer}>
          <div className={style.coinMetricsContainer}>
            <h3 className={style.coinMetricsHeader}>
              {t('marketCoin.marketMetrics')}:
            </h3>
            <p className={style.coinMetricsText}>
              {t('marketCoin.marketRank')}: {trueData.rank}
            </p>
            <p className={style.coinMetricsText}>
              {t('marketCoin.priceUsd')}: ${trueData.price}
            </p>
            <p className={style.coinMetricsText}>
              {t('marketCoin.priceBtc')}: {trueData.priceBtc}
            </p>
          </div>
          <div className={style.coinMetricsContainer}>
            <h3 className={style.coinMetricsHeader}>
              {t('marketCoin.supplyMetrics')}:
            </h3>
            <p className={style.coinMetricsText}>
              {t('marketCoin.circulating')}: {trueData.csupply}
            </p>
            <p className={style.coinMetricsText}>
              {t('marketCoin.total')}: {trueData.tsupply}
            </p>
            <p className={style.coinMetricsText}>
              {t('marketCoin.max')}: {trueData.msupply}
            </p>
          </div>
        </div>
        <div className={style.coinMetricsRightContainer}>
          <div className={style.coinMetricsContainer}>
            <h3 className={style.coinMetricsHeader}>
              {' '}
              {t('marketCoin.percentChange')}:
            </h3>
            <p className={style.coinMetricsText}>
              {t('marketCoin.last1h')}: <img src={graph1h} alt="graph"></img>
              <span style={{ color: percentColor1h }}>
                {trueData.percentChange1h}%
              </span>
            </p>
            <p className={style.coinMetricsText}>
              {t('marketCoin.last24h')}: <img src={graph24h} alt="graph"></img>
              <span style={{ color: percentColor24h }}>
                {trueData.percentChange24h}%
              </span>
            </p>
            <p className={style.coinMetricsText}>
              {t('marketCoin.last7d')}: <img src={graph7d} alt="graph"></img>
              <span style={{ color: percentColor7d }}>
                {trueData.percentChange7d}%
              </span>
            </p>
          </div>
          <div className={style.coinMetricsContainer}>
            <h3 className={style.coinMetricsHeader}>
              {t('marketCoin.tradingVolume')}:
            </h3>
            <p className={style.coinMetricsText}>
              {' '}
              {t('marketCoin.last24h')}: {trueData.volume}
            </p>
            <p className={style.coinMetricsText}>
              {t('marketCoin.previous')}: {trueData.volumeAlt}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketCoin

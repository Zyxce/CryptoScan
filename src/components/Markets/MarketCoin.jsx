import React, { useEffect, useState } from 'react'
import style from './MarketCoin.module.css'

const MarketCoin = (props) => {
  const {
    id,
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

  const [imageSrc, setImageSrc] = useState('')

  useEffect(() => {
    const firstImageUrl = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/refs/heads/master/128/color/${symbol.toLowerCase()}.png`
    const secondImageUrl = `https://www.coinlore.com/img/${nameid.toLowerCase()}.webp`

    const checkImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = url
        img.onload = () => resolve(true) // если картинка загрузилась заебись
        img.onerror = () => resolve(false) // не круто
      })
    }

    checkImage(firstImageUrl).then((exists) => {
      console.log(exists)
      if (exists) {
        setImageSrc(firstImageUrl)
      } else {
        setImageSrc(secondImageUrl)
      }
    })
  }, [nameid, symbol])

  //функция получения правильного цвета графы и текста процентов
  const getPercentChangeColor = (percent_change) => {
    return percent_change >= 0 ? '#06B470' : '#EA3B5A'
  }
  const getGraphColor = (percent_change) => {
    return percent_change >= 0 ? 'upGraph' : 'downGraph'
  }
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
  //проверка даты на правильность
  const getData = (newData) => {
    if (!newData) {
      return <span style={{ color: 'red' }}>NotFound</span>
    } else {
      return newData
    }
  }

  // для получения цвета текста процентов
  const percentColor1h = getPercentChangeColor(percent_change_1h)
  const percentColor24h = getPercentChangeColor(percent_change_24h)
  const percentColor7d = getPercentChangeColor(percent_change_7d)
  // для получения типа графы процентов
  const selectedGraph1h = getGraphColor(percent_change_1h)
  const selectedGraph24h = getGraphColor(percent_change_24h)
  const selectedGraph7d = getGraphColor(percent_change_7d)
  //запрос правильного типа графы процентов
  const graph1h = require(`../../Images/${selectedGraph1h}.png`)
  const graph24h = require(`../../Images/${selectedGraph24h}.png`)
  const graph7d = require(`../../Images/${selectedGraph7d}.png`)
  //цвет ранга
  const rankColor = getRankColor(rank)
  //обьект с проверенной датой что она существует
  const coinData = {
    symbol: getData(symbol),
    name: getData(name),
    price_usd: getData(price_usd),
    percent_change_1h: getData(percent_change_1h),
    percent_change_24h: getData(percent_change_24h),
    percent_change_7d: getData(percent_change_7d),
    rank: getData(rank),
    price_btc: getData(price_btc),
    market_cap_usd: getData(market_cap_usd),
    volume24: getData(volume24),
    volume24a: getData(volume24a),
    csupply: getData(csupply),
    tsupply: getData(tsupply),
    msupply: getData(msupply),
  }

  return (
    <div className={style.coinContainer}>
      <div className={style.coinTopContainer}>
        <p className={style.coinHeroRank} style={{ color: rankColor }}>
          #{coinData.rank}
        </p>
        <p className={style.coinHeroSymbol} style={{ color: rankColor }}>
          {coinData.symbol}
        </p>
        <p className={style.coinHeroName}>{name}</p>
        <p className={style.coinHeroCap}>
          Market Capitalization (USD): ${coinData.market_cap_usd}
        </p>
      </div>

      <div className={style.coinBottomContainer}>
        <div className={style.coinImgContainer}>
          <img className={style.coinImage} src={imageSrc} alt="icon"></img>
        </div>
        <div className={style.coinMetricsLeftContainer}>
          <div className={style.coinMetricsContainer}>
            <h3 className={style.coinMetricsHeader}>Market metrics:</h3>
            <p className={style.coinMetricsText}>
              Market Rank: {coinData.rank}
            </p>
            <p className={style.coinMetricsText}>
              Price (in USD): ${coinData.price_usd}
            </p>
            <p className={style.coinMetricsText}>
              Price (in BTC): {coinData.price_btc} btc
            </p>
          </div>
          <div className={style.coinMetricsContainer}>
            <h3 className={style.coinMetricsHeader}>Supply metrics:</h3>
            <p className={style.coinMetricsText}>
              Circulating: {coinData.csupply}
            </p>
            <p className={style.coinMetricsText}>Total: {coinData.tsupply}</p>
            <p className={style.coinMetricsText}>Max: {coinData.msupply}</p>
          </div>
        </div>
        <div className={style.coinMetricsRightContainer}>
          <div className={style.coinMetricsContainer}>
            <h3 className={style.coinMetricsHeader}>Percent change:</h3>
            <p className={style.coinMetricsText}>
              Last 1h: <img src={graph1h} alt="graph"></img>
              <span style={{ color: percentColor1h }}>
                {coinData.percent_change_1h}%
              </span>
            </p>
            <p className={style.coinMetricsText}>
              Last 24h: <img src={graph24h} alt="graph"></img>
              <span style={{ color: percentColor24h }}>
                {coinData.percent_change_24h}%
              </span>
            </p>
            <p className={style.coinMetricsText}>
              Last 7d: <img src={graph7d} alt="graph"></img>
              <span style={{ color: percentColor7d }}>
                {coinData.percent_change_7d}%
              </span>
            </p>
          </div>
          <div className={style.coinMetricsContainer}>
            <h3 className={style.coinMetricsHeader}>Trading Volume:</h3>
            <p className={style.coinMetricsText}>
              Last 24h: {coinData.volume24}
            </p>
            <p className={style.coinMetricsText}>
              Previous: {coinData.volume24a}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketCoin

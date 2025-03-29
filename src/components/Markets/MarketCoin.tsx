import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IMarketCoin } from '../../types'
import useFormatNumber from '../../Hooks/useFormatNumber'
import style from './MarketCoin.module.css'
import notFoundIcon from '../../Images/notFoundIcon.png'
import upGraph from '../../Images/upGraph.png'
import downGraph from '../../Images/downGraph.png'

const MarketCoin: React.FC<IMarketCoin> = (props) => {
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
    isMobileBig,
  } = props

  const [imageSrc, setImageSrc] = useState<string>(notFoundIcon)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { formatNumberOrNA, NOT_AVAILABLE } = useFormatNumber()

  const [trueData, setTrueData] = useState({
    symbol: NOT_AVAILABLE,
    name: NOT_AVAILABLE,
    nameid: NOT_AVAILABLE,
    price: NOT_AVAILABLE,
    priceBtc: NOT_AVAILABLE,
    rank: NOT_AVAILABLE,
    volume: NOT_AVAILABLE,
    volumeAlt: NOT_AVAILABLE,
    csupply: NOT_AVAILABLE,
    tsupply: NOT_AVAILABLE,
    msupply: NOT_AVAILABLE,
    percentChange1h: NOT_AVAILABLE,
    percentChange24h: NOT_AVAILABLE,
    percentChange7d: NOT_AVAILABLE,
    marketCap: NOT_AVAILABLE,
  })

  useEffect(() => {
    ///* функция для получения актуальных данных
    const getCurrentData = () => ({
      symbol: symbol || NOT_AVAILABLE,
      name: name || NOT_AVAILABLE,
      nameid: nameid || NOT_AVAILABLE,
      price: formatNumberOrNA(price_usd, 8),
      priceBtc: formatNumberOrNA(price_btc, 8),
      rank: rank || NOT_AVAILABLE,
      volume: formatNumberOrNA(volume24, 2),
      volumeAlt: formatNumberOrNA(volume24a, 2),
      csupply: formatNumberOrNA(csupply, 0),
      tsupply: formatNumberOrNA(tsupply, 0),
      msupply: formatNumberOrNA(msupply, 0),
      percentChange1h: formatNumberOrNA(percent_change_1h, 2),
      percentChange24h: formatNumberOrNA(percent_change_24h, 2),
      percentChange7d: formatNumberOrNA(percent_change_7d, 2),
      marketCap: formatNumberOrNA(market_cap_usd, 0),
    })

    //загрузка картинки
    const loadImage = async () => {
      try {
        const firstImageUrl = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/refs/heads/master/128/color/${symbol.toLowerCase()}.png`
        const secondImageUrl = `https://www.coinlore.com/img/${nameid.toLowerCase()}.webp`

        const img = new Image()
        img.src = firstImageUrl

        img.onload = () => setImageSrc(firstImageUrl)
        img.onerror = () => {
          const backupImg = new Image()
          backupImg.src = secondImageUrl
          backupImg.onload = () => setImageSrc(secondImageUrl)
          backupImg.onerror = () => setImageSrc(notFoundIcon)
        }
      } catch (error) {
        console.error('Error loading images:', error)
      }
    }

    loadImage()
    setTrueData(getCurrentData())
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
    NOT_AVAILABLE,
    formatNumberOrNA,
  ])
  //функция получения правильного цвета графы и текста процентов
  //мемои проценты
  const percent1h = useMemo(
    () => parseFloat(percent_change_1h),
    [percent_change_1h]
  )
  const percent24h = useMemo(
    () => parseFloat(percent_change_24h),
    [percent_change_24h]
  )
  const percent7d = useMemo(
    () => parseFloat(percent_change_7d),
    [percent_change_7d]
  )

  //мемо цвета
  const percentColor1h = useMemo(
    () => (percent1h >= 0 ? '#06B470' : '#EA3B5A'),
    [percent1h]
  )
  const percentColor24h = useMemo(
    () => (percent24h >= 0 ? '#06B470' : '#EA3B5A'),
    [percent24h]
  )
  const percentColor7d = useMemo(
    () => (percent7d >= 0 ? '#06B470' : '#EA3B5A'),
    [percent7d]
  )

  //Мемографики
  const graph1h = useMemo(
    () => (percent1h >= 0 ? upGraph : downGraph),
    [percent1h]
  )
  const graph24h = useMemo(
    () => (percent24h >= 0 ? upGraph : downGraph),
    [percent24h]
  )
  const graph7d = useMemo(
    () => (percent7d >= 0 ? upGraph : downGraph),
    [percent7d]
  )

  //цвет ранга
  const getRankColor = useCallback((rankNumber: number): string => {
    switch (rankNumber) {
      case 1:
        return '#FFD700'
      case 2:
        return '#c0c0c0'
      case 3:
        return '#CD7F32'
      default:
        return '#1B70F1'
    }
  }, [])

  const rankColor = useMemo(
    () => getRankColor(parseFloat(rank)),
    [rank, getRankColor]
  )

  if (isMobileBig) {
    return (
      <div className={style.coinContainerMobile}>
        <div className={style.coinHeader}>
          <div className={style.coinBadge}>
            <span className={style.coinRank} style={{ color: rankColor }}>
              #{trueData.rank}
            </span>
            <span className={style.coinSymbol}>{trueData.symbol}</span>
            <span className={style.coinHeroName}>{name}</span>
          </div>
        </div>

        <div className={style.coinImageWrapper}>
          <img className={style.coinImage} src={imageSrc} alt="icon" />
        </div>

        <div className={style.priceSection}>
          <div className={style.priceMain}>${trueData.price}</div>
          <div className={style.priceChangeGroup}>
            <div className={style.priceChangeContainer}>
              <p className={style.priceChangeDescription}>
                {t('marketCoin.last1h')}
              </p>
              <div
                className={`${style.priceChangeItem} ${
                  parseFloat(percent_change_1h) >= 0
                    ? style.positive
                    : style.negative
                }`}
              >
                <img src={graph1h} alt="1h" />
                {trueData.percentChange1h}%
              </div>
            </div>
            <div className={style.priceChangeContainer}>
              <p className={style.priceChangeDescription}>
                {t('marketCoin.last24h')}
              </p>
              <div
                className={`${style.priceChangeItem} ${
                  parseFloat(percent_change_24h) >= 0
                    ? style.positive
                    : style.negative
                }`}
              >
                <img src={graph24h} alt="24h" />
                {trueData.percentChange24h}%
              </div>
            </div>
            <div className={style.priceChangeContainer}>
              <p className={style.priceChangeDescription}>
                {t('marketCoin.last7d')}
              </p>
              <div
                className={`${style.priceChangeItem} ${
                  parseFloat(percent_change_7d) >= 0
                    ? style.positive
                    : style.negative
                }`}
              >
                <img src={graph7d} alt="7d" />
                {trueData.percentChange7d}%
              </div>
            </div>
          </div>
        </div>

        <div className={style.metricsGrid}>
          <div className={style.metricCard}>
            <div className={style.metricLabel}>
              {t('marketCoin.capitalization')}
            </div>
            <div className={style.metricValue}>${trueData.marketCap}</div>
          </div>
        </div>

        <div className={style.metricsGrid}>
          <div className={style.metricCard}>
            <div className={style.metricLabel}>{t('marketCoin.priceBtc')}</div>
            <div className={style.metricValue}>₿{trueData.priceBtc}</div>
          </div>
          <div className={style.metricCard}>
            <div className={style.metricLabel}>{t('marketCoin.volume24h')}</div>
            <div className={style.metricValue}>${trueData.volume}</div>
          </div>
        </div>
        {isOpen && (
          <>
            <div className={style.metricsGrid}>
              <div className={style.metricCard}>
                <div className={style.metricLabel}>
                  {t('marketCoin.volumeAlt')}
                </div>
                <div className={style.metricValue}>${trueData.volumeAlt}</div>
              </div>
              <div className={style.metricCard}>
                <div className={style.metricLabel}>
                  {t('marketCoin.csupply')}
                </div>
                <div className={style.metricValue}>{trueData.csupply}</div>
              </div>
            </div>
            <div className={style.metricsGrid}>
              {trueData.tsupply !== NOT_AVAILABLE && (
                <div className={style.metricCard}>
                  <div className={style.metricLabel}>
                    {t('marketCoin.tsupply')}
                  </div>
                  <div className={style.metricValue}>{trueData.tsupply}</div>
                </div>
              )}
              {trueData.msupply !== NOT_AVAILABLE && (
                <div className={style.metricCard}>
                  <div className={style.metricLabel}>
                    {t('marketCoin.msupply')}
                  </div>
                  <div className={style.metricValue}>{trueData.msupply}</div>
                </div>
              )}
            </div>
          </>
        )}

        <button
          className={style.toggleButton}
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        >
          {!isOpen ? t('marketCoin.showMore') : t('marketCoin.close')}
        </button>
      </div>
    )
  }

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

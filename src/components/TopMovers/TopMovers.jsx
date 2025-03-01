import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from '../TopMovers/TopMovers.module.css'
import Loading from '../Events/Loading'
import Error from '../Events/Error'
import CoinCard from '../Reusable/CoinCard'
import Button from '../Reusable/Button'

const TopMovers = (props) => {
  const { t } = useTranslation()
  const { toggleSelectedCoinId } = props
  const [coins, setCoins] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [percentTime, setPercentTime] = useState('percent_change_24h')

  const TIME_PERIODS = [
    { key: 'percent_change_1h', label: t('topMovers.1h') },
    { key: 'percent_change_24h', label: t('topMovers.24h') },
    { key: 'percent_change_7d', label: t('topMovers.7d') },
  ]

  const HEADERS = {
    percent_change_1h: t('topMovers.by1Hour'),
    percent_change_24h: t('topMovers.by24Hours'),
    percent_change_7d: t('topMovers.by7Days'),
  }

  const fetchResource = async (url) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`${url} failed to fetch`)
    const data = await res.json()
    if (!data) throw new Error(`No data found for ${url}`)
    return data
  }

  const fetchData = useCallback(async () => {
    try {
      const fetchPromises = []
      for (let i = 0; i < 10; i++) {
        const fetchStart = i * 100
        const COINS_API_URL = `https://api.coinlore.net/api/tickers/?start=${fetchStart}&limit=100`
        fetchPromises.push(fetchResource(COINS_API_URL))
      }
      const responses = await Promise.all(fetchPromises)
      const allCoins = responses.flatMap((response) => response.data)

      setCoins(allCoins)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const intervalId = setInterval(() => {
      fetchData()
    }, 10000)

    return () => clearInterval(intervalId)
  }, [fetchData, percentTime])

  const sortCoins = (typeSort, sortDirection) => {
    return [...coins].sort((a, b) => {
      const valueA = a[typeSort] ? parseFloat(a[typeSort]) : 0
      const valueB = b[typeSort] ? parseFloat(b[typeSort]) : 0

      if (sortDirection === 'down') return valueB - valueA
      else return valueA - valueB
    })
  }

  if (error) return <Error error={error} />
  if (isLoading) return <Loading type={t('topMovers.loading')} />

  const sortedByPercentDown = sortCoins(percentTime, 'down')
  const sortedByPercentUp = sortCoins(percentTime, 'up')

  return (
    <div className={style.topMoversSection}>
      <div className={style.topMoversContainer}>
        <h1 className={style.topMoversHeader}>
          {t('topMovers.header')} <span>{HEADERS[percentTime]}</span>
        </h1>
        <div className={style.topSelectorContainer}>
          {TIME_PERIODS.map(({ key, label }) => (
            <Button
              key={key}
              onClick={() => setPercentTime(key)}
              className={style.topSelectorBtn}
              style={{ color: percentTime === key ? '#007bff' : 'white' }}
            >
              {label}
            </Button>
          ))}
        </div>
        <div className={style.topMidLine}></div>
        <div className={style.topMoversCoinCard}>
          {sortedByPercentDown.slice(0, 6).map((coin) => (
            <CoinCard
              percentTime={percentTime}
              key={coin.id}
              {...coin}
              toggleSelectedCoinId={toggleSelectedCoinId}
            />
          ))}
        </div>
        <div className={style.topMidLine}></div>
      </div>
      <div className={style.topMoversContainer}>
        <div className={style.topMoversCoinCard}>
          {sortedByPercentUp.slice(0, 6).map((coin) => (
            <CoinCard
              percentTime={percentTime}
              key={coin.id}
              {...coin}
              toggleSelectedCoinId={toggleSelectedCoinId}
            />
          ))}
        </div>
        <div className={style.topMidLine}></div>
      </div>
    </div>
  )
}

export default TopMovers

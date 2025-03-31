import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import style from './TopMovers.module.css'
import Error from '../Events/Error'
import SelectorDirector from '../Reusable/SelectorDirector'
import Midline from '../Reusable/Midline'
import SwiperDirector from '../Reusable/SwiperDirector'

const TopMovers = (props) => {
  const { t } = useTranslation()
  const { toggleSelectedCoinId, allCoinsArray } = props

  const isDesktop = useMediaQuery({ minWidth: 1441 })
  const isLaptop = useMediaQuery({ minWidth: 1101, maxWidth: 1440 })
  const isTablet = useMediaQuery({ minWidth: 511, maxWidth: 1100 })
  const isMobile = useMediaQuery({ maxWidth: 510 })
  const isSmallScreen = isTablet || isMobile

  const [error, setError] = useState('')
  const [percentTime, setPercentTime] = useState('percent_change_1h')
  const [currentMovers, setCurrentMovers] = useState('gainers')

  const TIME_PERIODS = [
    {
      key: 'percent_change_1h',
      label: t('topMovers.1h'),
      selectColor: '#007bff',
      selectBackground:
        'radial-gradient(rgba(0, 42, 255, 0.04), rgba(0, 42, 255, 0.03), rgba(0, 42, 255, 0.02) , rgba(0, 42, 255, 0.01), rgba(0, 42, 255, 0) 72%)',
    },
    {
      key: 'percent_change_24h',
      label: t('topMovers.24h'),
      selectColor: '#007bff',
      selectBackground:
        'radial-gradient(rgba(0, 42, 255, 0.04), rgba(0, 42, 255, 0.03), rgba(0, 42, 255, 0.02) , rgba(0, 42, 255, 0.01), rgba(0, 42, 255, 0) 72%)',
    },
    {
      key: 'percent_change_7d',
      label: t('topMovers.7d'),
      selectColor: '#007bff',
      selectBackground:
        'radial-gradient(rgba(0, 42, 255, 0.04), rgba(0, 42, 255, 0.03), rgba(0, 42, 255, 0.02) , rgba(0, 42, 255, 0.01), rgba(0, 42, 255, 0) 72%)',
    },
  ]

  const TIME_HEADERS = {
    percent_change_1h: t('topMovers.by1Hour'),
    percent_change_24h: t('topMovers.by24Hours'),
    percent_change_7d: t('topMovers.by7Days'),
  }

  const MOVERS = [
    {
      key: 'gainers',
      label: t('topMovers.gainers'),
      selectColor: '#06B470',
      selectBackground:
        'radial-gradient(rgba(76, 255, 70, 0.04), rgba(76, 255, 70, 0.03), rgba(76, 255, 70, 0.02) , rgba(76, 255, 70, 0.01), rgba(76, 255, 70, 0) 72%)',
    },
    {
      key: 'losers',
      label: t('topMovers.losers'),
      selectColor: '#EA3B5A',
      selectBackground:
        'radial-gradient(rgba(255, 70, 70, 0.04), rgba(255, 70, 70, 0.03), rgba(255, 70, 70, 0.02) , rgba(255, 70, 70, 0.01), rgba(255, 70, 70, 0) 72%)',
    },
  ]

  const MOVERS_HEADERS = {
    gainers: t('topMovers.gainers'),
    losers: t('topMovers.losers'),
  }

  const sortCoins = (typeSort, sortDirection) => {
    return [...allCoinsArray].sort((a, b) => {
      const valueA = a[typeSort] ? parseFloat(a[typeSort]) : 0
      const valueB = b[typeSort] ? parseFloat(b[typeSort]) : 0

      if (sortDirection === 'down') return valueB - valueA
      else return valueA - valueB
    })
  }

  if (error) return <Error error={error} />
  // if (isLoading) return <Loading type={t('topMovers.loading')} />

  const sortedByPercentDown = sortCoins(percentTime, 'down')
  const sortedByPercentUp = sortCoins(percentTime, 'up')

  let currentArray = sortedByPercentDown
  if (currentMovers === 'gainers') currentArray = sortedByPercentDown
  else if (currentMovers === 'losers') currentArray = sortedByPercentUp

  if (isSmallScreen) {
    return (
      <div className={style.topMoversSection}>
        <div className={style.topMoversContainer}>
          <h1 className={style.topMoversHeader}>
            {t('topMovers.top')} {MOVERS_HEADERS[currentMovers]}{' '}
            <span>{TIME_HEADERS[percentTime]}</span>
          </h1>
          <div className={style.topMoversSelectorContainer}>
            <SelectorDirector
              arrayParameters={TIME_PERIODS}
              styleParameter={percentTime}
              toggleFunction={setPercentTime}
              isSmallScreen={isSmallScreen}
            />
            <SelectorDirector
              arrayParameters={MOVERS}
              styleParameter={currentMovers}
              toggleFunction={setCurrentMovers}
              isSmallScreen={isSmallScreen}
            />
          </div>
          <Midline size={'small'} />
          <div className={style.topMoversCoinCard}>
            <SwiperDirector
              array={currentArray}
              percentTime={percentTime}
              toggleSelectedCoinId={toggleSelectedCoinId}
              isSmallScreen={isSmallScreen}
            />
          </div>
          <Midline size={'small'} />
        </div>
      </div>
    )
  }

  return (
    <div className={style.topMoversSection}>
      <div className={style.topMoversContainer}>
        <h1 className={style.topMoversHeader}>
          {t('topMovers.top')}
          {MOVERS_HEADERS[currentMovers]}{' '}
          <span>{TIME_HEADERS[percentTime]}</span>
        </h1>
        <SelectorDirector
          arrayParameters={TIME_PERIODS}
          styleParameter={percentTime}
          toggleFunction={setPercentTime}
        />
        <Midline size={'small'} />
        <div className={style.topMoversCoinCard}>
          <SwiperDirector
            array={currentArray}
            percentTime={percentTime}
            toggleSelectedCoinId={toggleSelectedCoinId}
            isSmallScreen={isSmallScreen}
          />
        </div>
        <Midline size={'small'} />
        <SelectorDirector
          arrayParameters={MOVERS}
          styleParameter={currentMovers}
          toggleFunction={setCurrentMovers}
        />
      </div>
    </div>
  )
}

export default TopMovers

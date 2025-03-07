import { useMediaQuery } from 'react-responsive'
import React, { useEffect, useState } from 'react'
import style from './reusableComponents.module.css'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import upGraph from '../../Images/upGraph.png'
import downGraph from '../../Images/downGraph.png'
import notFoundIcon from '../../Images/notFoundIcon.png'
import Midline from './Midline'
import TableParameter from '../Reusable/TableParameter'

const CoinCard = (props) => {
  const {
    symbol,
    name,
    rank,
    nameid,
    percent_change_1h,
    percent_change_24h,
    percent_change_7d,
    price_usd,
    toggleSelectedCoinId,
    id,
    percentTime,
  } = props

  const isDesktop = useMediaQuery({ minWidth: 1441 })
  const isLaptop = useMediaQuery({ minWidth: 1101, maxWidth: 1440 })
  const isTablet = useMediaQuery({ minWidth: 511, maxWidth: 1100 })
  const isMobile = useMediaQuery({ maxWidth: 510 })

  const isSmallScreen = isTablet || isMobile

  const { t } = useTranslation()

  const navigate = useNavigate()

  const [imageSrc, setImageSrc] = useState(notFoundIcon)
  const [currentPercent, setCurrentPercent] = useState('')

  const NOT_AVAILABLE = 'N/A'
  const [trueData, setTrueData] = useState({
    symbol: symbol || NOT_AVAILABLE,
    name: name || NOT_AVAILABLE,
    price: price_usd || NOT_AVAILABLE,
    rank: rank || NOT_AVAILABLE,
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
      rank: rank || NOT_AVAILABLE,
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
    rank,
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
  const getPercentData = (percentChange) => {
    const color = percentChange >= 0 ? '#06B470' : '#EA3B5A'
    const background =
      percentChange >= 0
        ? 'radial-gradient(rgba(76, 255, 70, 0.1), rgba(76, 255, 70, 0.075), rgba(76, 255, 70, 0.050), rgba(76, 255, 70, 0.025), rgba(76, 255, 70, 0) 72%)'
        : 'radial-gradient(rgba(255, 70, 70, 0.1), rgba(255, 70, 70, 0.075), rgba(255, 70, 70, 0.050), rgba(255, 70, 70, 0.025), rgba(255, 70, 70, 0) 72%)'
    const graph = percentChange >= 0 ? upGraph : downGraph

    return { color, background, graph }
  }

  const percentData = getPercentData(currentPercent)

  const PERCENT_DESCRIPTIONS = {
    percent_change_1h: t('coinCard.1h'),
    percent_change_24h: t('coinCard.24h'),
    percent_change_7d: t('coinCard.7d'),
  }

  const tableArray = [
    {
      label: symbol,
      labelDescription: '',
      imageSrc: imageSrc,
      type: 'imgtext',
      visible: true,
      divType: 'left',
    },
    {
      label: `${trueData.name}`,
      labelDescription: t('coinCard.name'),
      imageSrc: imageSrc,
      type: 'text',
      visible: !isMobile,
      divType: 'top',
    },
    {
      label: `$${trueData.price}`,
      labelDescription: !isMobile && t('coinCard.price'),
      imageSrc: imageSrc,
      type: 'text',
      visible: true,
      divType: 'top',
    },
    {
      label: `#${trueData.rank}`,
      labelDescription: t('coinCard.rank'),
      imageSrc: imageSrc,
      type: 'text',
      visible: !isMobile,
      divType: 'bottom',
    },
    {
      label: trueData.percentChange24h,
      labelDescription: !isMobile && PERCENT_DESCRIPTIONS[percentTime],
      imageSrc: percentData.graph,
      type: 'percent',
      visible: true,
      divType: 'bottom',
      percentParam: {
        background: percentData.background,
        color: percentData.color,
        period: percentTime,
      },
    },
  ]

  const filteredTableArray = tableArray.filter((item) => item.visible)

  const action = {
    href: 'https://www.binance.com/ru',
    nav: {
      id: id,
      name: name,
      isNavigate: 1,
    },
  }

  if (isSmallScreen) {
    return (
      <TableParameter
        tableArray={filteredTableArray}
        isSmallScreen={isSmallScreen}
        action={action}
        toggleSelectedCoinId={toggleSelectedCoinId}
      />
    )
  }

  //Desktop
  return (
    <div
      className={style.coinCardContainer}
      onClick={() => {
        toggleSelectedCoinId(id, name)
        navigate('/CryptoScan/markets')
      }}
    >
      <p className={style.coinCardRank}>#{rank}</p>
      <div className={style.coinCardIconContainer}>
        <img className={style.coinCardIcon} src={imageSrc} alt="coin"></img>
      </div>
      <div className={style.coinCardNameContainer}>
        <p className={style.coinCardSymbol}>{trueData.symbol}</p>
        <p className={style.coinCardName}>{trueData.name}</p>
      </div>
      <Midline />
      <div className={style.coinCardPercentContainer}>
        <img
          className={style.coinCardGraph}
          src={percentData.graph}
          alt="graph"
        ></img>
        <p
          className={style.coinCardPercent}
          style={{
            color: percentData.color,
            background: percentData.background,
          }}
        >
          {currentPercent} %
        </p>
      </div>
      <p className={style.coinCardPrice}>${trueData.price}</p>
    </div>
  )
}

export default CoinCard

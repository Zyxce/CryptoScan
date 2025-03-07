import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import upGraph from '../../Images/upGraph.png'
import downGraph from '../../Images/downGraph.png'
import notFoundIcon from '../../Images/notFoundIcon.png'
import TableParameter from '../Reusable/TableParameter'
import { useTranslation } from 'react-i18next'

const Coin = (props) => {
  const {
    id,
    symbol,
    name,
    nameid,
    price_usd,
    // percent_change_1h,
    percent_change_24h,
    percent_change_7d,
    // rank,
    // price_btc,
    market_cap_usd,
    volume24,
    // volume24a,
    csupply,
    // tsupply,
    // msupply,
    toggleSelectedCoinId,
  } = props

  const { t } = useTranslation()

  const isDesktop1601 = useMediaQuery({ minWidth: 1601 })
  const isDesktop1441 = useMediaQuery({ minWidth: 1441, maxWidth: 1600 })
  const isLaptop = useMediaQuery({ minWidth: 1101, maxWidth: 1440 })
  const isTablet = useMediaQuery({ minWidth: 511, maxWidth: 1100 })
  const isMobile = useMediaQuery({ maxWidth: 510 })

  const isSmallScreen = isTablet || isMobile

  const [imageSrc, setImageSrc] = useState('')

  const NOT_AVAILABLE = 'N/A'
  const [trueData, setTrueData] = useState({
    symbol: symbol || NOT_AVAILABLE,
    name: name || NOT_AVAILABLE,
    price: price_usd || NOT_AVAILABLE,
    volume: volume24 || NOT_AVAILABLE,
    csupply: csupply || NOT_AVAILABLE,
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
      price: price_usd || NOT_AVAILABLE,
      volume: volume24 || NOT_AVAILABLE,
      csupply: csupply || NOT_AVAILABLE,
      percentChange24h: percent_change_24h || NOT_AVAILABLE,
      percentChange7d: percent_change_7d || NOT_AVAILABLE,
      marketCap: market_cap_usd || NOT_AVAILABLE,
    }))
  }, [
    nameid,
    symbol,
    name,
    price_usd,
    percent_change_24h,
    percent_change_7d,
    market_cap_usd,
    volume24,
    csupply,
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
  const percentData24 = getPercentData(percent_change_24h)
  const percentData7 = getPercentData(percent_change_7d)

  const tableArray = [
    {
      label: trueData.symbol,
      labelDescription: '',
      imageSrc: imageSrc,
      type: 'imgtext',
      visible: isSmallScreen,
      divType: 'left',
    },
    {
      label: 'icon',
      labelDescription: '',
      imageSrc: imageSrc,
      type: 'img',
      visible: true,
    },
    {
      label: trueData.symbol,
      labelDescription: trueData.name,
      imageSrc: imageSrc,
      type: 'symboltext',
      visible: true,
    },
    {
      label: `$${trueData.price}`,
      labelDescription: isSmallScreen && t('coin.price'),
      imageSrc: imageSrc,
      type: 'text',
      visible: true,
      divType: 'top',
    },
    {
      label: trueData.percentChange24h,
      labelDescription: isSmallScreen && t('coin.24h'),
      imageSrc: percentData24.graph,
      type: 'percent',
      visible: true,
      divType: 'bottom',
      percentParam: {
        background: percentData24.background,
        color: percentData24.color,
        period: 'percent_change_24h',
      },
    },
    {
      label: trueData.percentChange7d,
      labelDescription: isSmallScreen && t('coin.7d'),
      imageSrc: percentData7.graph,
      type: 'percent',
      visible: (!isMobile && isDesktop1601) || (!isMobile && isSmallScreen),
      divType: 'bottom',
      percentParam: {
        background: percentData7.background,
        color: percentData7.color,
        period: 'percent_change_7d',
      },
    },
    {
      label: `$${trueData.volume}`,
      labelDescription: isSmallScreen && t('coin.volume'),
      imageSrc: imageSrc,
      type: 'text',
      visible: !isMobile,
      divType: 'top',
    },
    {
      label: `$${trueData.csupply}`,
      labelDescription: '',
      imageSrc: imageSrc,
      type: 'text',
      visible: isLaptop || isDesktop1441 || isDesktop1601,
      divType: '',
    },
    {
      label: `$${trueData.marketCap}`,
      labelDescription: '',
      imageSrc: imageSrc,
      type: 'text',
      visible: isDesktop1601 || isDesktop1441,
      divType: '',
    },
  ]

  //Адаптив делает только видимым то что нужно
  const filteredTableArray = tableArray.filter((item) => item.visible)

  let tableColumns = 0
  if (isDesktop1601) {
    tableColumns = 8
  } else if (isDesktop1441) {
    tableColumns = 7
  } else if (isLaptop) {
    tableColumns = 6
  }

  const action = {
    href: 'https://www.binance.com/ru',
    nav: {
      id: id,
      name: name,
      isNavigate: 1,
    },
  }

  return (
    <TableParameter
      tableArray={filteredTableArray}
      tableColumns={tableColumns}
      isSmallScreen={isSmallScreen}
      action={action}
      toggleSelectedCoinId={toggleSelectedCoinId}
    />
  )
}

export default Coin

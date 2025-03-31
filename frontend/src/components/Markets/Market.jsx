import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import TableParameter from '../Reusable/TableParameter'
import style from './Market.module.css'

const Market = (props) => {
  const { name, base, quote, price, price_usd, volume, volume_usd } = props
  const isDesktop = useMediaQuery({ minWidth: 1441 })
  const isLaptop = useMediaQuery({ minWidth: 1101, maxWidth: 1440 })
  const isTablet = useMediaQuery({ minWidth: 511, maxWidth: 1100 })
  const isMobile = useMediaQuery({ maxWidth: 510 })

  const isSmallScreen = isTablet || isMobile

  const NOT_AVAILABLE = 'N/A'
  const [trueData, setTrueData] = useState({
    name: name || NOT_AVAILABLE,
    base: base || NOT_AVAILABLE,
    quote: quote || NOT_AVAILABLE,
    price: price || NOT_AVAILABLE,
    priceUsd: price_usd || NOT_AVAILABLE,
    volume: volume || NOT_AVAILABLE,
    volumeUsd: volume_usd || NOT_AVAILABLE,
  })
  const tableArray = [
    {
      label: trueData.name,
      labelDescription: '',
      imageSrc: '',
      type: 'url',
      visible: true,
      divType: 'top',
    },
    {
      label: `${trueData.base} / ${trueData.quote}`,
      labelDescription: isSmallScreen && '',
      imageSrc: 'imageSrc',
      type: 'text',
      visible: true,
      divType: 'bottom',
    },
    {
      label: trueData.priceUsd,
      labelDescription: isSmallScreen && 'Price: $',
      imageSrc: 'imageSrc',
      type: 'text',
      visible: true,
      divType: 'bottom',
    },
    {
      label: trueData.price,
      labelDescription: isSmallScreen && 'Price Base: ',
      imageSrc: 'imageSrc',
      type: 'text',
      visible: true,
    },
    {
      label: trueData.volumeUsd,
      labelDescription: isSmallScreen && 'Volume: $',
      imageSrc: 'imageSrc',
      type: 'text',
      visible: true,
      divType: 'top',
    },
    {
      label: trueData.volume,
      labelDescription: '',
      imageSrc: 'imageSrc',
      type: 'text',
      visible: isDesktop,
    },
  ]

  //Адаптив делает только видимым то что нужно
  const filteredTableArray = tableArray.filter((item) => item.visible)

  let tableColumns = 0
  if (isDesktop) {
    tableColumns = 6
  } else if (isLaptop) {
    tableColumns = 5
  }

  useEffect(() => {
    // Оптимизированная проверка данных
    setTrueData(() => ({
      name: name || NOT_AVAILABLE,
      base: base || NOT_AVAILABLE,
      quote: quote || NOT_AVAILABLE,
      price: price || NOT_AVAILABLE,
      priceUsd: price_usd || NOT_AVAILABLE,
      volume: volume || NOT_AVAILABLE,
      volumeUsd: volume_usd || NOT_AVAILABLE,
    }))
  }, [name, base, quote, price, price_usd, volume, volume_usd])

  return (
    <TableParameter
      tableArray={filteredTableArray}
      tableColumns={tableColumns}
      isSmallScreen={isSmallScreen}
      action={''}
    />
  )
}

export default Market

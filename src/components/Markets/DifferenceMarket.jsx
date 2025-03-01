import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from './DifferenceMarket.module.css'

const DifferenceMarket = (props) => {
  const { t } = useTranslation()
  const {
    name,
    base,
    quote,
    price,
    price_usd,
    // volume,
    // volume_usd,
    headerMarket,
  } = props

  const NOT_AVAILABLE = 'N/A'
  const [trueData, setTrueData] = useState({
    name: name || NOT_AVAILABLE,
    base: base || NOT_AVAILABLE,
    quote: quote || NOT_AVAILABLE,
    price: price || NOT_AVAILABLE,
    priceUsd: price_usd || NOT_AVAILABLE,
  })

  useEffect(() => {
    // Оптимизированная проверка данных
    setTrueData(() => ({
      name: name || NOT_AVAILABLE,
      base: base || NOT_AVAILABLE,
      quote: quote || NOT_AVAILABLE,
      price: price || NOT_AVAILABLE,
      priceUsd: price_usd || NOT_AVAILABLE,
    }))
  }, [name, base, quote, price, price_usd])

  return (
    <div className={style.marketContainer}>
      <h2 className={style.marketHeader}>{headerMarket}</h2>
      <div className={style.marketTextContainer}>
        <p className={style.marketText}>
          {t('differenceMarket.exchange')}:{' '}
          <span style={{ color: '#1B70F1' }}>{trueData.name}</span>
        </p>
        <p className={style.marketText}>
          {' '}
          {t('differenceMarket.base')}: {trueData.base}
        </p>
        <p className={style.marketText}>
          {t('differenceMarket.currentPrice')} (
          <span>
            {trueData.base}/{trueData.quote}
          </span>
          ): {trueData.price}
        </p>
        <p className={style.marketText}>
          {t('differenceMarket.price')}: ${trueData.priceUsd}
        </p>
      </div>
    </div>
  )
}

export default DifferenceMarket

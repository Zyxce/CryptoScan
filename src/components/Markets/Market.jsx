import React, { useEffect, useState } from 'react'
import style from './Market.module.css'

const Market = (props) => {
  const { name, base, quote, price, price_usd, volume, volume_usd } = props

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
    <div className={style.marketContainer}>
      <p className={style.marketTableUrl}>{trueData.name}</p>
      <p
        className={style.marketTableText}
      >{`${trueData.base}/${trueData.quote}`}</p>
      <p className={style.marketTableText}>
        {trueData.priceUsd === NOT_AVAILABLE
          ? trueData.priceUsd
          : `$${trueData.priceUsd}`}
      </p>
      <p className={style.marketTableText}>{trueData.price}</p>
      <p className={style.marketTableText}>
        {trueData.volumeUsd === NOT_AVAILABLE
          ? trueData.volumeUsd
          : `$${trueData.volumeUsd}`}
      </p>
      <p className={style.marketTableText}>{trueData.volume}</p>
    </div>
  )
}

export default Market

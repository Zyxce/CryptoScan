import React from 'react'
import style from './DifferenceMarket.module.css'

const DifferenceMarket = (props) => {
  const {
    name,
    base,
    quote,
    price,
    price_usd,
    volume,
    volume_usd,
    time,
    headerMarket,
  } = props
  return (
    <div className={style.marketContainer}>
      <h2 className={style.marketHeader}>{headerMarket}</h2>
      <div className={style.marketTextContainer}>
        <p className={style.marketText}>
          Exchange: <span style={{ color: '#1B70F1' }}>{name}</span>
        </p>
        <p className={style.marketText}> Base Currency: {base}</p>
        <p className={style.marketText}>
          Current Price (
          <span>
            {base}/{quote}
          </span>
          ): {price}
        </p>
        <p className={style.marketText}>Price in USD: ${price_usd}</p>
      </div>
    </div>
  )
}

export default DifferenceMarket

import React from 'react'
import style from './Market.module.css'

const Market = (props) => {
  const { name, base, quote, price, price_usd, volume, volume_usd, time } =
    props
  return (
    <div style={{ borderBottom: '1px solid black' }}>
      <div className={style.marketTopContainer}>
        <p>Exchange: {name}</p>
        <p>Base Currency: {base}</p>
      </div>
      <div className={style.marketBottomContainer}>
        <p>
          Current Price ({base}/{quote}): {price}
        </p>
        <p>Price in USD: {price_usd}$</p>
      </div>
      <p>base: {base}</p>
      <p>quote: {quote}</p>
      <p>volume: {volume}</p>
      <p>volume_usd: {volume_usd}</p>
      <p>time: {time}</p>
    </div>
  )
}

export default Market

import React, { useState } from 'react'
import style from './Coin.module.css'
import Button from '../Reusable/Button'
import { useNavigate } from 'react-router-dom'

const Coin = (props) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const {
    id,
    symbol,
    name,
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
    toggleSelectedCoinId,
  } = props

  //переходит в маркет с нужным айди
  function handleNewId() {
    toggleSelectedCoinId(id)
  }

  const getPercentChangeColor = (percent_change) => {
    return percent_change >= 0 ? 'green' : 'red'
  }

  const percent_change_1h_color = getPercentChangeColor(percent_change_1h)
  const percent_change_24h_color = getPercentChangeColor(percent_change_24h)
  const percent_change_7d_color = getPercentChangeColor(percent_change_7d)

  return (
    <>
      <div className={style.coinContainer} onClick={() => setIsOpen(!isOpen)}>
        <div className={style.coinTopContainer}>
          <div className={style.coinNameContainer}>
            <h1 className={style.coinSymbolName}>{symbol}</h1>
            <p className={style.coinFullName}>{name}</p>
          </div>
          <p className={style.coinPrice}>{price_usd}$</p>
        </div>
        <div className={style.coinBottomContainer}>
          <div className={style.coinPercentContaner}>
            <span>24h:</span>
            <p
              style={{ color: percent_change_24h_color }}
              className={style.coinPercentChange}
            >
              {percent_change_24h}%
            </p>
          </div>
          <div className={style.coinPercentContaner}>
            <span>7d:</span>
            <p
              style={{ color: percent_change_7d_color }}
              className={style.coinPercentChange}
            >
              {percent_change_7d}%
            </p>
          </div>
        </div>
      </div>
      {isOpen && ( // при нажатии всплывает нижняя часть
        <div className={style.coinOpenContainer}>
          <div className={style.coinOpenParametersContainer}>
            <h3 className={style.coinOpenHeader}>Market metrics:</h3>
            <p className={style.coinOpenParagraph}>Market Rank: {rank}</p>
            <p className={style.coinOpenParagraph}>
              Price (in USD): {price_usd}$
            </p>
            <p className={style.coinOpenParagraph}>
              Price (in BTC): {price_btc} btc
            </p>
            <p className={style.coinOpenParagraph}>
              Market Capitalization (USD): {market_cap_usd}$
            </p>
          </div>
          <div className={style.coinOpenParametersContainer}>
            <h3 className={style.coinOpenHeader}>Supply metrics:</h3>
            <p className={style.coinOpenParagraph}>
              Circulating Supply: {csupply}
            </p>
            <p className={style.coinOpenParagraph}>Total Supply: {tsupply}</p>
            <p className={style.coinOpenParagraph}>Max Supply: {msupply}</p>
          </div>
          <div className={style.coinOpenParametersContainer}>
            <h3 className={style.coinOpenHeader}>Trading Volume:</h3>
            <p className={style.coinOpenParagraph}>
              Trading Volume (Last 24h): {volume24}
            </p>
            <p className={style.coinOpenParagraph}>
              Trading Volume (Previous): {volume24a}
            </p>
          </div>
          <div className={style.coinOpenParametersContainer}>
            <h3 className={style.coinOpenHeader}>Percent change:</h3>
            <p className={style.coinOpenParagraph}>
              Percent Change (Last 1h):{' '}
              <span style={{ color: percent_change_1h_color }}>
                {percent_change_1h}
              </span>
            </p>
            <p className={style.coinOpenParagraph}>
              Percent Change (Last 24h):{' '}
              <span style={{ color: percent_change_24h_color }}>
                {percent_change_24h}
              </span>
            </p>
            <p className={style.coinOpenParagraph}>
              Percent Change (Last 7d):{' '}
              <span style={{ color: percent_change_7d_color }}>
                {percent_change_7d}
              </span>
            </p>
          </div>
          <div className={style.coinBtnContainer}>
            <Button onClick={() => setIsOpen(!isOpen)}>Close {symbol}</Button>
            <Button
              onClick={() => {
                handleNewId()
                navigate('/markets')
              }}
              className={style.coinMarketBtn}
            >
              Open market statistics
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Coin

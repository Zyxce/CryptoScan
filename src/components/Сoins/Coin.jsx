import React, { useEffect, useState } from 'react'
import style from './Coin.module.css'
import Button from '../Reusable/Button'
import { useNavigate } from 'react-router-dom'

const Coin = (props) => {
  const navigate = useNavigate()
  const [imageSrc, setImageSrc] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const {
    id,
    symbol,
    name,
    nameid,
    price_usd,
    // percent_change_1h,
    percent_change_24h,
    // percent_change_7d,
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

  useEffect(() => {
    const firstImageUrl = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/refs/heads/master/128/color/${symbol.toLowerCase()}.png`
    const secondImageUrl = `https://www.coinlore.com/img/${nameid.toLowerCase()}.webp`

    const checkImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = url
        img.onload = () => resolve(true) // если картинка загрузилась заебись
        img.onerror = () => resolve(false) // не круто
      })
    }

    checkImage(firstImageUrl).then((exists) => {
      console.log(exists)
      if (exists) {
        setImageSrc(firstImageUrl)
      } else {
        setImageSrc(secondImageUrl)
      }
    })
  }, [nameid, symbol])

  //переходит в маркет с нужным айди
  function handleNewId() {
    toggleSelectedCoinId(id)
  }

  const getPercentChangeColor = (percent_change) => {
    return percent_change >= 0 ? '#06B470' : '#EA3B5A'
  }
  const getGraphColor = (percent_change) => {
    return percent_change >= 0 ? 'upGraph' : 'downGraph'
  }

  const percentColor = getPercentChangeColor(percent_change_24h)
  const selectedGraph = getGraphColor(percent_change_24h)

  const graph = require(`../../Images/${selectedGraph}.png`)

  return (
    <>
      <div className={style.coinContainer} onClick={() => setIsOpen(!isOpen)}>
        <img className={style.coinIcon} src={imageSrc} alt="icon"></img>
        <div className={style.coinNameContainer}>
          <p className={style.coinSymbol}>{symbol}</p>
          <p className={style.coinTableText}>{name}</p>
        </div>
        <p className={style.coinTableText}>{price_usd}$</p>
        <div className={style.coinPercentContainer}>
          <img className={style.coinPercentImg} src={graph} alt="graph"></img>
          <p style={{ color: percentColor }} className={style.coinTableText}>
            {percent_change_24h}%
          </p>
        </div>
        <p className={style.coinTableText}>{volume24}$</p>
        <p className={style.coinTableText}>{csupply}$</p>
        <p className={style.coinTableText}>{market_cap_usd}$</p>
        <Button
          className={style.coinTableBtn}
          onClick={() => {
            handleNewId()
            navigate('/markets')
          }}
        >
          <span>{symbol}</span> Market statistics
        </Button>
      </div>
    </>
  )
}

export default Coin

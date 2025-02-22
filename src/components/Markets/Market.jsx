import React, { useEffect, useState } from 'react'
import style from './Market.module.css'

const Market = (props) => {
  const { name, base, quote, price, price_usd, volume, volume_usd, time } =
    props

  const [nameText, setNameText] = useState(name || 'N/A')
  const [baseText, setBaseText] = useState(base || 'N/A')
  const [quoteText, setQuoteText] = useState(quote || 'N/A')
  const [priceText, setPriceText] = useState(price || 'N/A')
  const [priceUsdText, setPriceUsdTextText] = useState(price_usd || 'N/A')
  const [volumeText, setVolumeText] = useState(volume || 'N/A')
  const [volumeUsdText, setVolumeUsdText] = useState(volume_usd || 'N/A')

  useEffect(() => {
    //проверка на существование данных
    const checkData = (inputData) => {
      return inputData ? inputData : 'N/A'
    }
    setNameText(checkData(name))
    setBaseText(checkData(base))
    setQuoteText(checkData(quote))
    setPriceText(checkData(price))
    setPriceUsdTextText(checkData(price_usd))
    setVolumeText(checkData(volume))
    setVolumeUsdText(checkData(volume_usd))
  }, [name, base, quote, price, price_usd, volume, volume_usd])

  return (
    <div className={style.marketContainer}>
      <p className={style.marketTableUrl}>{nameText}</p>
      <p className={style.marketTableText}>{`${baseText}/${quoteText}`}</p>
      <p className={style.marketTableText}>
        {priceUsdText === 'N/A' ? priceUsdText : `$${priceUsdText}`}
      </p>
      <p className={style.marketTableText}>{priceText}</p>
      <p className={style.marketTableText}>
        {volumeUsdText === 'N/A' ? volumeUsdText : `$${volumeUsdText}`}
      </p>
      <p className={style.marketTableText}>{volumeText}</p>
    </div>
  )
}

export default Market

import React, { useEffect, useState } from 'react'
import style from './Exchange.module.css'
import sadnessPeppa from '../../Images/sadnessPepe.png'

const Exchange = (props) => {
  const { name, name_id, volume_usd, active_pairs, url, country } = props

  const [imageSrc, setImageSrc] = useState(sadnessPeppa)
  const [countryText, setCountryText] = useState(country || 'N/A')
  const [urlText, setUrlText] = useState(url || 'N/A')
  const [pairsText, setPairsText] = useState(active_pairs || 'N/A')
  const [volumeText, setVolumeText] = useState(volume_usd || 'N/A')

  useEffect(() => {
    const ImageUrl = `https://www.coinlore.com/img/exchanges/${name_id}.png`

    const checkImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = url
        img.onload = () => resolve(true) // если картинка загрузилась
        img.onerror = () => resolve(false) // если ошибка
      })
    }

    checkImage(ImageUrl).then((exists) => {
      if (exists) {
        setImageSrc(ImageUrl)
      } else {
        setImageSrc(sadnessPeppa)
      }
    })
    // Оптимизированная проверка данных
    const checkData = (inputData) => {
      return inputData ? inputData : 'N/A'
    }

    setCountryText(checkData(country))
    setVolumeText(checkData(volume_usd))
    setPairsText(checkData(active_pairs))
    setUrlText(checkData(url))
  }, [name_id, country, volume_usd, active_pairs, url])

  return (
    <>
      <div className={style.exchangeContainer}>
        <img className={style.exchangeIcon} src={imageSrc} alt="icon"></img>
        <p className={style.exchangeTableText}>{name}</p>
        <p className={style.exchangeTableText}>
          {volumeText === 'N/A' ? volumeText : `$${volumeText}`}
        </p>
        <p className={style.exchangeTableText}>{pairsText}</p>
        <a href={urlText} className={style.exchangeTableUrl}>
          {urlText}
        </a>
        <p className={style.exchangeTableText}>{countryText}</p>
      </div>
    </>
  )
}

export default Exchange

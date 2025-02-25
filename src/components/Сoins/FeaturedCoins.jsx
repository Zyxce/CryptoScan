import { useNavigate } from 'react-router-dom'
import style from './FeaturedCoins.module.css'
import { useEffect, useState } from 'react'
import upGraph from '../../Images/upGraph.png'
import downGraph from '../../Images/downGraph.png'
import notFoundIcon from '../../Images/notFoundIcon.png'

const FeaturedCoins = (props) => {
  const {
    symbol,
    name,
    nameid,
    percent_change_24h,
    price_usd,
    toggleSelectedCoinId,
    id,
  } = props

  const navigate = useNavigate()

  const [imageSrc, setImageSrc] = useState(notFoundIcon)

  const NOT_AVAILABLE = 'N/A'
  const [trueData, setTrueData] = useState({
    symbol: symbol || NOT_AVAILABLE,
    name: name || NOT_AVAILABLE,
    price: price_usd || NOT_AVAILABLE,
    percentChange24h: percent_change_24h || NOT_AVAILABLE,
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
      percentChange24h: percent_change_24h || NOT_AVAILABLE,
    }))
  }, [nameid, symbol, name, percent_change_24h, price_usd])

  //настройка цвета для текста процента и его графа
  const getPercentChangeColor = (percent_change) => {
    return percent_change >= 0 ? '#06B470' : '#EA3B5A'
  }
  const percentColor = getPercentChangeColor(percent_change_24h)
  const graph = percent_change_24h >= 0 ? upGraph : downGraph
  return (
    <div
      className={style.featuredContainer}
      onClick={() => {
        toggleSelectedCoinId(id, name)
        navigate('/CryptoScan/markets')
      }}
    >
      <img className={style.featuredCoinIcon} src={imageSrc} alt="coin"></img>
      <div className={style.featuredNameContainer}>
        <p className={style.featuredSymbol}>{trueData.symbol}</p>
        <p className={style.featuredName}>{trueData.name}</p>
      </div>
      <div className={style.featuredPercentContainer}>
        <img className={style.featuredGraph} src={graph} alt="graph"></img>
        <p className={style.featuredPercent} style={{ color: percentColor }}>
          {trueData.percentChange24h} %
        </p>
      </div>
      <p className={style.featuredPrice}>{trueData.price} $</p>
    </div>
  )
}

export default FeaturedCoins

import { useNavigate } from 'react-router-dom'
import style from './FeaturedCoins.module.css'

const FeaturedCoins = (props) => {
  const {
    symbol,
    name,
    percent_change_24h,
    price_usd,
    toggleSelectedCoinId,
    id,
  } = props

  const navigate = useNavigate()

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
    <div
      className={style.featuredContainer}
      onClick={() => {
        handleNewId()
        navigate('/CryptoScan/markets')
      }}
    >
      <img
        className={style.featuredCoinIcon}
        src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/refs/heads/master/128/color/${symbol.toLowerCase()}.png`}
        alt="coin"
      ></img>
      <div className={style.featuredNameContainer}>
        <p className={style.featuredSymbol}>{symbol}</p>
        <p className={style.featuredName}>{name}</p>
      </div>
      <div className={style.featuredPercentContainer}>
        <img className={style.featuredGraph} src={graph} alt="graph"></img>
        <p className={style.featuredPercent} style={{ color: percentColor }}>
          {percent_change_24h} %
        </p>
      </div>
      <p className={style.featuredPrice}>{price_usd} $</p>
    </div>
  )
}

export default FeaturedCoins

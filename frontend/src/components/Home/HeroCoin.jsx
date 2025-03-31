import React from 'react'
import style from './HeroCoin.module.css'
import downGraph from '../../Images/downGraph.png'
import upGraph from '../../Images/upGraph.png'

const HomeCoin = (props) => {
  const { symbol, percent_change_24h, price_usd, rank } = props
  // забрать цвет процента
  const getPercentColor = (percentColor) => {
    return percentColor >= 0 ? '#06B470' : '#EA3B5A'
  }
  // забрать цвет графика
  const getGraphColor = (graphColor) => {
    return graphColor >= 0 ? upGraph : downGraph
  }

  const percentColor = getPercentColor(percent_change_24h)
  const graphColor = getGraphColor(percent_change_24h)

  return (
    <div className={style.coinContainer}>
      <div className={style.coinTopContainer}>
        <p className={style.coinSymbol}>{symbol} / USD</p>
        <p className={style.coinRank}># {rank}</p>
      </div>
      <div className={style.coinBottomContainer}>
        <div className={style.coinPercentContainer}>
          <img src={graphColor} alt="tikers"></img>
          <p className={style.coinPercent} style={{ color: percentColor }}>
            {percent_change_24h}%
          </p>
        </div>
        <p className={style.coinPrice}>{price_usd}$</p>
      </div>
    </div>
  )
}

export default HomeCoin

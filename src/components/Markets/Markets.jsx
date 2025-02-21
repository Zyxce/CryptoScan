import React, { useEffect, useState } from 'react'
import Market from './Market'
import MarketCoin from './MarketCoin'
import DifferenceMarket from './DifferenceMarket'
import style from './Markets.module.css'
import Loading from '../Events/Loading'

const Markets = ({ selectedCoinId }) => {
  const MARKETS_API_URL = `https://api.coinlore.net/api/coin/markets/?id=${selectedCoinId}`
  const COIN_API_URL = `https://api.coinlore.net/api/ticker/?id=${selectedCoinId}`

  const [coin, setCoin] = useState([])
  const [markets, setMarkets] = useState([])

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState('Price up')

  const [highestMarket, setHighestMarket] = useState(null)
  const [lowestMarket, setLowestMarket] = useState(null)
  const [differencePrice, setDifferencePrice] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        //запрос маркетов
        const resMarket = await fetch(MARKETS_API_URL)
        const dataMarket = await resMarket.json()
        //проверка данных маркетов на наличие
        if (!dataMarket) throw new Error('No market data found')
        setMarkets(dataMarket)
        //запрос монеты
        const resСoin = await fetch(COIN_API_URL)
        const dataCoin = await resСoin.json()
        //проверка данных монеты на наличие
        if (!dataCoin) throw new Error('No coin data found')
        setCoin(dataCoin)

        // Находим рынок с самой высокой ценой
        const highest = dataMarket.reduce((prev, current) => {
          return parseFloat(prev.price_usd) > parseFloat(current.price_usd)
            ? prev
            : current
        })
        // Находим рынок с самой низкой ценой
        const lowest = dataMarket.reduce((prev, current) => {
          return parseFloat(prev.price_usd) < parseFloat(current.price_usd)
            ? prev
            : current
        })

        // Рассчитываем разницу цен
        const difference =
          parseFloat(highest.price_usd) - parseFloat(lowest.price_usd)
        setDifferencePrice(difference)

        setHighestMarket(highest)
        setLowestMarket(lowest)
      } catch (error) {
        setError(error.message)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [MARKETS_API_URL, COIN_API_URL])

  const handleSortChange = (event) => {
    setSortOrder(event.target.value)
  }

  // Сортировка рынков в зависимости от выбранного порядка
  const sortedMarkets = [...markets].sort((a, b) => {
    const priceA = parseFloat(a.price_usd)
    const priceB = parseFloat(b.price_usd)
    return sortOrder === 'Price up' ? priceA - priceB : priceB - priceA
  })

  if (error) {
    return <h1 style={{ color: 'red' }}>Error: {error}</h1>
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={style.marketsContainer}>
          <div className={style.coinStatisticsContainer}>
            {coin.map((parameters) => (
              <MarketCoin key={parameters.id} {...parameters}></MarketCoin>
            ))}
          </div>
          <div className={style.topMarkets}>
            <div className={style.topMarketsContainer}>
              {lowestMarket && (
                <div className={style.lowestMarket}>
                  <DifferenceMarket
                    {...lowestMarket}
                    headerMarket={'Lowest Market'}
                  />
                </div>
              )}
              {highestMarket && (
                <div className={style.highestMarket}>
                  <DifferenceMarket
                    {...highestMarket}
                    headerMarket={'Highest Market'}
                  />
                </div>
              )}
            </div>
            <div className={style.coinsMidLine}></div>
            {differencePrice !== 0 && (
              <div className={style.differencePriceContainer}>
                <p className={style.differencePrice}>
                  Difference in Price: ${differencePrice}
                </p>
              </div>
            )}
          </div>

          <div className={style.otherMarkets}>
            <h2>Markets Price Overview</h2>
            <select value={sortOrder} onChange={handleSortChange}>
              <option value="Price up">Price up</option>
              <option value="Price low">Price low</option>
            </select>
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              sortedMarkets.map((market) => {
                return <Market key={market.id} {...market} />
              })
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Markets

import React, { useEffect, useState } from 'react'
import Market from './Market'
import style from './Markets.module.css'

const Markets = ({ selectedCoinId }) => {
  const COINS_API_URL = `https://api.coinlore.net/api/coin/markets/?id=${selectedCoinId}`
  const [markets, setMarkets] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState('Price up')
  const [highestMarket, setHighestMarket] = useState(null)
  const [lowestMarket, setLowestMarket] = useState(null)
  const [differencePrice, setDifferencePrice] = useState(0)
  const [coinName, setCoinName] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(COINS_API_URL)
        const data = await res.json()
        setMarkets(data)

        // Находим рынок с самой высокой и низкой ценами
        const highest = data.reduce((prev, current) => {
          return parseFloat(prev.price_usd) > parseFloat(current.price_usd)
            ? prev
            : current
        })

        const lowest = data.reduce((prev, current) => {
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
  }, [COINS_API_URL])

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
    <div className={style.marketsContainer}>
      <h1>Markets</h1>
      <div className={style.topMarkets}>
        {lowestMarket && (
          <div className={style.marketCard}>
            <h2>Lowest Market</h2>
            <Market {...lowestMarket} />
          </div>
        )}
        {highestMarket && (
          <>
            <div className={style.arrow}></div>
            <div className={style.marketCard}>
              <h2>Highest Market</h2>
              <Market {...highestMarket} />
            </div>
          </>
        )}
      </div>
      {differencePrice !== 0 && (
        <div className={style.differencePriceContainer}>
          <p>Difference in Price: ${differencePrice}</p>
        </div>
      )}
      <div className={style.otherMarkets}>
        <h2>Other Markets</h2>
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
  )
}

export default Markets

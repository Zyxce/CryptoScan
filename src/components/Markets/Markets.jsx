import React, { useEffect, useState } from 'react'
import Market from './Market'

const Markets = () => {
  const COINS_API_URL = 'https://api.coinlore.net/api/coin/markets/?id=90'
  const [markets, setMarkets] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState('Price up')

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(COINS_API_URL)
        const data = await res.json()
        setMarkets(data)
      } catch (error) {
        setError(error.message)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const handleSortChange = (event) => {
    setSortOrder(event.target.value)
  }

  // Сортировка рынков в зависимости от выбранного порядка
  const sortedMarkets = markets.sort((a, b) => {
    const priceA = parseFloat(a.price_usd)
    const priceB = parseFloat(b.price_usd)
    return sortOrder === 'Price up' ? priceA - priceB : priceB - priceA
  })

  if (error) {
    return <h1 style={{ color: 'red' }}>Error:{error}</h1>
  }

  return (
    <div>
      <h1>Markets</h1>
      <select value={sortOrder} onChange={handleSortChange}>
        <option value="Price up">Price up</option>
        <option value="Price low">Price low</option>
      </select>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        markets.map((market) => {
          return <Market key={market.id} {...market}></Market>
        })
      )}
    </div>
  )
}

export default Markets

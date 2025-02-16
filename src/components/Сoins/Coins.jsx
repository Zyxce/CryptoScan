import React, { useEffect, useState } from 'react'
import Coin from './Coin'

const Coins = (props) => {
  const { toggleSelectedCoinId } = props
  const COINS_API_URL = 'https://api.coinlore.net/api/tickers/'
  const [coins, setCoins] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true) // Устанавливаем isLoading в true перед началом запроса
    try {
      const res = await fetch(COINS_API_URL)
      const data = await res.json()
      setCoins(data.data)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false) // Устанавливаем isLoading в false после завершения запроса
  }

  useEffect(() => {
    fetchData() // Первоначальный запрос

    const intervalId = setInterval(() => {
      fetchData() // Периодическое обновление данных
    }, 10000) // Обновляем каждые 10 секунд

    return () => clearInterval(intervalId) // Очистка интервала при размонтировании компонента
  }, [])

  if (error) {
    return <h1 style={{ color: 'red' }}>Error: {error}</h1>
  }

  return (
    <div>
      <h1>Coins</h1>
      {isLoading ? <p> Fetching latest coins... ⛔</p> : <p>Data updated ✅</p>}
      {coins.length === 0 ? (
        <h1>No coins available</h1> // Показать альтернативное сообщение, если нет данных
      ) : (
        coins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              {...coin}
              toggleSelectedCoinId={toggleSelectedCoinId}
            ></Coin>
          )
        })
      )}
    </div>
  )
}

export default Coins

import React, { useEffect, useState } from 'react'
import Coin from './Coin'
import FeaturedCoins from './FeaturedCoins'
import style from './Coins.module.css'
import arrowTable from '../../Images/arrowTable.png'
import Loading from '../Events/Loading'
import Error from '../Events/Error'

const Coins = (props) => {
  const { toggleSelectedCoinId } = props

  const COINS_API_URL = 'https://api.coinlore.net/api/tickers/'
  const NOT_AVAILABLE = 'N/A'

  const [coins, setCoins] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [sortDirection, setSortDirection] = useState(true) // true - по возрастанию
  const [sortField, setSortField] = useState('price_usd')

  const fetchData = async () => {
    try {
      const res = await fetch(COINS_API_URL)
      const data = await res.json()
      setCoins(data.data)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData() // Первоначальный запрос

    const intervalId = setInterval(() => {
      fetchData() // Периодическое обновление данных
    }, 10000) // Обновляем каждые 10 секунд

    return () => clearInterval(intervalId) // Очистка интервала при размонтировании компонента
  }, [])
  // Сортировка монет
  const sortedCoins = [...coins].sort((a, b) => {
    // Получаем значения для сортировки
    const valueA =
      a[sortField] !== undefined && a[sortField] !== null
        ? a[sortField]
        : NOT_AVAILABLE // Если undefined или null, то N/A
    const valueB =
      b[sortField] !== undefined && b[sortField] !== null
        ? b[sortField]
        : NOT_AVAILABLE

    // проверяем значение число?
    const isNumberA = !isNaN(parseFloat(valueA)) && isFinite(valueA)
    const isNumberB = !isNaN(parseFloat(valueB)) && isFinite(valueB)

    if (isNumberA && isNumberB) {
      //оба числа
      return sortDirection
        ? parseFloat(valueA) - parseFloat(valueB)
        : parseFloat(valueB) - parseFloat(valueA)
    } else {
      // хотя бы одно не число
      return sortDirection
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA)
    }
  })

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => !prev)
    } else {
      setSortField(field)
      setSortDirection(true)
    }
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <>
      {isLoading ? (
        <Loading type={'Coins'} />
      ) : (
        <div className={style.coinsContainer}>
          <div className={style.coinsFeaturedContainer}>
            <h1 className={style.coinsFeaturedHeader}>Featured Coins</h1>
            <div className={style.coinsFeaturedBox}>
              {coins.slice(0, 6).map((coin) => {
                return (
                  <FeaturedCoins
                    key={coin.id}
                    {...coin}
                    toggleSelectedCoinId={toggleSelectedCoinId}
                  ></FeaturedCoins>
                )
              })}
            </div>
          </div>
          <div className={style.coinsMidLine}></div>
          <div className={style.coinsTable}>
            <div className={style.coinsTableHeader}>
              <div className={style.coinsTableParameters}>
                <p className={style.coinsTableParametersText}>Coin Icon</p>
              </div>
              {[
                { label: 'Coin Name', field: 'name' },
                { label: 'Price', field: 'price_usd' },
                { label: '24h Change', field: 'percent_change_24h' },
                { label: '24h Volume', field: 'volume24' },
                { label: 'Current supply', field: 'csupply' },
                { label: 'Market Cap', field: 'market_cap_usd' },
              ].map(({ label, field }) => (
                <div
                  className={style.coinsTableParametersSort}
                  onClick={() => handleSort(field)}
                  key={field}
                >
                  <p
                    className={style.coinsTableParametersText}
                    style={
                      sortField === field ? { textDecoration: 'underline' } : {}
                    }
                  >
                    {label}
                  </p>
                  <img
                    style={
                      sortField === field
                        ? sortDirection
                          ? {}
                          : { transform: 'rotate(180deg)' }
                        : {}
                    }
                    src={arrowTable}
                    alt={'img'}
                    className={style.coinsTableParametersImg}
                  ></img>
                </div>
              ))}
              <div className={style.coinsTableParameters}>
                <p className={style.coinsTableParametersText}>Action</p>
              </div>
            </div>
          </div>
          {coins.length === 0 ? (
            <h1>No coins available</h1> // убрать либо переработать
          ) : (
            <div className={style.coinTableContainer}>
              {sortedCoins.map((coin) => {
                return (
                  <Coin
                    key={coin.id}
                    {...coin}
                    toggleSelectedCoinId={toggleSelectedCoinId}
                  ></Coin>
                )
              })}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Coins

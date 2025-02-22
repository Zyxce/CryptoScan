import React, { useEffect, useState } from 'react'
import Coin from './Coin'
import FeaturedCoins from './FeaturedCoins'
import style from './Coins.module.css'
import arrowTable from '../../Images/arrowTable.png'
import Loading from '../Events/Loading'

const Coins = (props) => {
  const { toggleSelectedCoinId } = props
  const COINS_API_URL = 'https://api.coinlore.net/api/tickers/'
  const [coins, setCoins] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

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

  if (error) {
    return <h1 style={{ color: 'red' }}>Error: {error}</h1>
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
              <div className={style.coinsTableParameters}>
                <p className={style.coinsTableParametersText}>Coin Name</p>
                <img
                  src={arrowTable}
                  alt={'img'}
                  className={style.coinsTableParametersImg}
                ></img>
              </div>
              <div className={style.coinsTableParameters}>
                <p className={style.coinsTableParametersText}>Price</p>
                <img
                  src={arrowTable}
                  alt={'img'}
                  className={style.coinsTableParametersImg}
                ></img>
              </div>
              <div className={style.coinsTableParameters}>
                <p className={style.coinsTableParametersText}>24h Change</p>
                <img
                  src={arrowTable}
                  alt={'img'}
                  className={style.coinsTableParametersImg}
                ></img>
              </div>
              <div className={style.coinsTableParameters}>
                <p className={style.coinsTableParametersText}>24h Volume</p>
                <img
                  src={arrowTable}
                  alt={'img'}
                  className={style.coinsTableParametersImg}
                ></img>
              </div>
              <div className={style.coinsTableParameters}>
                <p className={style.coinsTableParametersText}>Current supply</p>
                <img
                  src={arrowTable}
                  alt={'img'}
                  className={style.coinsTableParametersImg}
                ></img>
              </div>
              <div className={style.coinsTableParameters}>
                <p className={style.coinsTableParametersText}>Market Cap</p>
                <img
                  src={arrowTable}
                  alt={'img'}
                  className={style.coinsTableParametersImg}
                ></img>
              </div>
              <div className={style.coinsTableParameters}>
                <p className={style.coinsTableParametersText}>Action</p>
              </div>
            </div>
          </div>
          {coins.length === 0 ? (
            <h1>No coins available</h1> // Показать альтернативное сообщение, если нет данных
          ) : (
            <div className={style.coinTableContainer}>
              {coins.map((coin) => {
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

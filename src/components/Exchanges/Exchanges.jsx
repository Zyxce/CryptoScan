import React, { useEffect, useState } from 'react'
import style from './Exchanges.module.css'
import arrowTable from '../../Images/arrowTable.png'
import Exchange from './Exchange'
import Loading from '../Events/Loading'

const Exchanges = () => {
  const EXCHANGES_API_URL = 'https://api.coinlore.net/api/exchanges/'
  const [exchanges, setExchanges] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res = await fetch(EXCHANGES_API_URL)
      const data = await res.json()

      // Проверка, является ли data объектом и преобразование в массив
      const exchangesArray = Object.values(data) // Преобразуем объект в массив
      setExchanges(exchangesArray)
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
    <>
      {isLoading ? (
        <Loading type={'Exchanges'} />
      ) : (
        <div className={style.exchangesContainer}>
          <h1 className={style.exchangesFeaturedHeader}>
            Top Crypto Exchanges By 24 Hour Volume
          </h1>
          <div className={style.exchangesMidLine}></div>
          <div className={style.exchangesTable}>
            <div className={style.exchangesTableHeader}>
              <div className={style.exchangesTableParameters}>
                <p className={style.exchangesTableParametersText}>
                  Exchange Icon
                </p>
              </div>
              <div className={style.exchangesTableParameters}>
                <p className={style.exchangesTableParametersText}>
                  Exchange Name
                </p>
                <img
                  src={arrowTable}
                  alt={'img'}
                  className={style.exchangesTableParametersImg}
                ></img>
              </div>
              <div className={style.exchangesTableParameters}>
                <p className={style.exchangesTableParametersText}>Volume</p>
                <img
                  src={arrowTable}
                  alt={'img'}
                  className={style.exchangesTableParametersImg}
                ></img>
              </div>
              <div className={style.exchangesTableParameters}>
                <p className={style.exchangesTableParametersText}>Markets</p>
                <img
                  src={arrowTable}
                  alt={'img'}
                  className={style.exchangesTableParametersImg}
                ></img>
              </div>
              <div className={style.exchangesTableParameters}>
                <p className={style.exchangesTableParametersText}>Url</p>
              </div>
              <div className={style.exchangesTableParameters}>
                <p className={style.exchangesTableParametersText}>Country</p>
              </div>
            </div>
          </div>
          {exchanges.length === 0 ? (
            <h1>No exchanges available</h1> // Показать альтернативное сообщение, если нет данных
          ) : (
            <div className={style.exchangeTableContainer}>
              {exchanges.map((exchange) => {
                return <Exchange key={exchange.id} {...exchange}></Exchange>
              })}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Exchanges

import React, { useEffect, useState } from 'react'
import style from './Exchanges.module.css'
import arrowTable from '../../Images/arrowTable.png'
import Exchange from './Exchange'
import Loading from '../Events/Loading'
import Error from '../Events/Error'

const Exchanges = () => {
  const EXCHANGES_API_URL = 'https://api.coinlore.net/api/exchanges/'
  const NOT_AVAILABLE = 'N/A'

  const [exchanges, setExchanges] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [sortDirection, setSortDirection] = useState(true) // true - по возрастанию
  const [sortField, setSortField] = useState('price_usd')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(EXCHANGES_API_URL)
        const data = await res.json()

        // Проверка, является ли data объектом и преобразование в массив
        const exchangesArray = Object.values(data) // Преобразуем объект в массив
        setExchanges(exchangesArray)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData() // Первоначальный запрос

    const intervalId = setInterval(() => {
      fetchData() // Периодическое обновление данных
    }, 10000) // Обновляем каждые 10 секунд

    return () => clearInterval(intervalId) // Очистка интервала при размонтировании компонента
  }, [])

  //сортировка рынков
  const sortedExchanges = [...exchanges].sort((a, b) => {
    //получаем значения для сортировки
    const valueA =
      a[sortField] !== undefined && a[sortField] !== null
        ? a[sortField]
        : NOT_AVAILABLE
    const valueB =
      b[sortField] !== undefined && b[sortField] !== null
        ? b[sortField]
        : NOT_AVAILABLE

    // Проверяем, являются ли значения числами
    const isNumberA = !isNaN(parseFloat(valueA)) && isFinite(valueA)
    const isNumberB = !isNaN(parseFloat(valueB)) && isFinite(valueB)

    if (isNumberA && isNumberB) {
      // Оба значения - числа
      return sortDirection
        ? parseFloat(valueA) - parseFloat(valueB)
        : parseFloat(valueB) - parseFloat(valueA)
    } else {
      // Если хоть одно значение не число
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
              {[
                { label: 'Exchange Name', field: 'name' },
                { label: 'Volume', field: 'volume_usd' },
                { label: 'Markets', field: 'active_pairs' },
              ].map(({ label, field }) => (
                <div
                  className={style.exchangesTableParametersSort}
                  onClick={() => handleSort(field)}
                  key={field}
                >
                  <p
                    className={style.exchangesTableParametersText}
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
                    className={style.exchangesTableParametersImg}
                  ></img>
                </div>
              ))}
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
              {sortedExchanges.map((exchange) => {
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

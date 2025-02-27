import React, { useCallback, useEffect, useState } from 'react'
import Coin from './Coin'
import FeaturedCoins from './FeaturedCoins'
import style from './Coins.module.css'
import arrowTable from '../../Images/arrowTable.png'
import Loading from '../Events/Loading'
import Error from '../Events/Error'
import CoinsSelector from './CoinsSelector'

const Coins = (props) => {
  const { toggleSelectedCoinId } = props

  const [currentStart, setCurrentStart] = useState(100)
  const [prevStart, setPrevStart] = useState(0)
  const [fetchStart, setFetchStart] = useState(0)

  const COINS_API_URL_FEATURED =
    'https://api.coinlore.net/api/tickers/?start=0&limit=6'
  const NOT_AVAILABLE = 'N/A'

  const [coins, setCoins] = useState([])
  const [featuredCoins, setFeaturedCoins] = useState([])

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [sortDirection, setSortDirection] = useState(false) // true - по возрастанию
  const [sortField, setSortField] = useState('market_cap_usd')

  const fetchResource = async (url) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`${url} failed to fetch`)
    const data = await res.json()
    if (!data) throw new Error(`No data found for ${url}`)
    return data
  }

  const fetchData = useCallback(async () => {
    const COINS_API_URL = `https://api.coinlore.net/api/tickers/?start=${fetchStart}&limit=100`
    try {
      const dataCoins = await fetchResource(COINS_API_URL)
      setCoins(dataCoins.data)
      const dataFeaturedCoins = await fetchResource(COINS_API_URL_FEATURED)
      setFeaturedCoins(dataFeaturedCoins.data)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [fetchStart])

  useEffect(() => {
    fetchData() // Первоначальный запрос

    const intervalId = setInterval(() => {
      fetchData() // Периодическое обновление данных
    }, 10000) // Обновляем каждые 10 секунд

    return () => clearInterval(intervalId) // Очистка интервала при размонтировании компонента
  }, [fetchData])

  //coins selector переключение страниц
  const handleStartNext = () => {
    setFetchStart((prev) => {
      const newStart = prev + 100
      setCurrentStart(currentStart + 100)
      setPrevStart(prevStart + 100)
      return newStart
    })
  }
  const handleStartBack = () => {
    setFetchStart((prev) => {
      const newStart = prev - 100
      setCurrentStart(currentStart - 100)
      setPrevStart(prevStart - 100)
      return newStart
    })
  }

  //обновление страницы
  const handleStartRefresh = () => {
    fetchData(fetchStart)
  }

  // Сортировка монет
  const sortedCoins = [...coins].sort((a, b) => {
    // Получаем значения для сортировки
    const valueA =
      a[sortField] !== undefined && a[sortField] !== null
        ? a[sortField]
        : NOT_AVAILABLE
    const valueB =
      b[sortField] !== undefined && b[sortField] !== null
        ? b[sortField]
        : NOT_AVAILABLE

    //проверяем что числа
    const isNumberA = !isNaN(parseFloat(valueA)) && isFinite(valueA)
    const isNumberB = !isNaN(parseFloat(valueB)) && isFinite(valueB)
    //если оба числа
    if (isNumberA && isNumberB) {
      return sortDirection
        ? parseFloat(valueA) - parseFloat(valueB)
        : parseFloat(valueB) - parseFloat(valueA)
      //если хотя бы 1 не число
    } else {
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
              {featuredCoins.slice(0, 6).map((featuredCoin) => (
                <FeaturedCoins
                  key={featuredCoin.id}
                  {...featuredCoin}
                  toggleSelectedCoinId={toggleSelectedCoinId}
                />
              ))}
            </div>
          </div>

          <div className={style.coinsMidLine}></div>
          <CoinsSelector
            toggleStartNext={handleStartNext}
            toggleStartBack={handleStartBack}
            toggleStartRefresh={handleStartRefresh}
            toggleIsRefresh={setIsRefreshing}
            currentStart={currentStart}
            prevStart={prevStart}
          />
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
                  />
                </div>
              ))}
              <div className={style.coinsTableParameters}>
                <p className={style.coinsTableParametersText}>Action</p>
              </div>
            </div>
          </div>
          {isRefreshing ? (
            <Loading type={`Top ${prevStart + 1} - ${currentStart} coins `} />
          ) : (
            <div className={style.coinTableContainer}>
              {sortedCoins.map((coin) => (
                <Coin
                  key={coin.id}
                  {...coin}
                  toggleSelectedCoinId={toggleSelectedCoinId}
                />
              ))}
            </div>
          )}
          <div className={style.coinsMidLine}></div>
          <CoinsSelector
            toggleStartNext={handleStartNext}
            toggleStartBack={handleStartBack}
            toggleStartRefresh={handleStartRefresh}
            toggleIsRefresh={setIsRefreshing}
            currentStart={currentStart}
            prevStart={prevStart}
          />
          <div className={style.coinsMidLine}></div>
        </div>
      )}
    </>
  )
}

export default Coins

import React, { useEffect, useState } from 'react'
import Market from './Market'
import MarketCoin from './MarketCoin'
import DifferenceMarket from './DifferenceMarket'
import style from './Markets.module.css'
import Loading from '../Events/Loading'
import Error from '../Events/Error'
import arrowTable from '../../Images/arrowTable.png'

const Markets = ({ selectedCoinId }) => {
  const MARKETS_API_URL = `https://api.coinlore.net/api/coin/markets/?id=${selectedCoinId}`
  const COIN_API_URL = `https://api.coinlore.net/api/ticker/?id=${selectedCoinId}`

  const [coin, setCoin] = useState([])
  const [markets, setMarkets] = useState([])

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [sortDirection, setSortDirection] = useState(true) // true - по возрастанию
  const [sortField, setSortField] = useState('price_usd')

  const [highestMarket, setHighestMarket] = useState(null)
  const [lowestMarket, setLowestMarket] = useState(null)
  const [differencePrice, setDifferencePrice] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        //запрос маркетов, проверка на успешный запрос, получение ответа JSON, проверка данных маркетов на наличие
        const resMarket = await fetch(MARKETS_API_URL)
        if (!resMarket.ok) throw new Error('MARKETS_API_URL failed to fetch')
        const dataMarket = await resMarket.json()
        if (!dataMarket) throw new Error('No MARKETS_API_URL data found')
        setMarkets(dataMarket)
        //запрос монеты, проверка на успешный запрос, получение ответа JSON, проверка данных монеты на наличие
        const resСoin = await fetch(COIN_API_URL)
        if (!resСoin.ok) throw new Error('COIN_API_URL failed to fetch')
        const dataCoin = await resСoin.json()
        if (!dataCoin) throw new Error('No COIN_API_URL data found')
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
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()

    const intervalId = setInterval(() => {
      fetchData() // Периодическое обновление данных
    }, 10000) // Обновляем каждые 10 секунд

    return () => clearInterval(intervalId) // Очистка интервала при размонтировании компонента
  }, [MARKETS_API_URL, COIN_API_URL])

  // Сортировка рынков в зависимости от выбранного порядка
  const sortedMarkets = [...markets].sort((a, b) => {
    const valueA = parseFloat(a[sortField])
    const valueB = parseFloat(b[sortField])

    if (sortDirection) {
      return valueA - valueB // по возрастанию
    } else {
      return valueB - valueA // по убыванию
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
            <h2 className={style.otherMarketsHeader}>Markets Price Overview</h2>
            <div className={style.marketsMidLine}></div>
            <div className={style.otherMarketsTable}>
              <div className={style.otherMarketsTableHeader}>
                {[
                  { label: 'Exchange Name', field: 'name' },
                  { label: 'Base Currency', field: 'base_currency' },
                  { label: 'Price (USD)', field: 'price_usd' },
                  { label: 'Price (Base/Quote)', field: 'price' },
                  { label: 'Volume (USD)', field: 'volume_usd' },
                  { label: 'Volume (Base/Quote)', field: 'volume' },
                ].map(({ label, field }) => (
                  <div
                    className={style.otherMarketsTableParameters}
                    onClick={() => handleSort(field)}
                    key={field}
                  >
                    <p
                      className={style.otherMarketsTableParametersText}
                      style={
                        sortField === field
                          ? { textDecoration: 'underline' }
                          : {}
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
                      className={style.otherMarketsTableParametersImg}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={style.marketContainer}>
              {sortedMarkets.map((market) => (
                <Market key={market.id} {...market} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Markets

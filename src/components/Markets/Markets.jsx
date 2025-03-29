import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Market from './Market'
import MarketCoin from './MarketCoin'
import TopDifferenceMarkets from './TopDifferenceMarkets'
import style from './Markets.module.css'
import Loading from '../Events/Loading'
import Error from '../Events/Error'
import TableHeader from '../Reusable/TableHeader'
import { useMediaQuery } from 'react-responsive'

const Markets = ({ selectedCoinMarkets }) => {
  const { t } = useTranslation()

  const isDesktop = useMediaQuery({ minWidth: 1441 })
  const isLaptop = useMediaQuery({ minWidth: 1101, maxWidth: 1440 })
  const isTablet = useMediaQuery({ minWidth: 511, maxWidth: 1100 })
  const isMobile = useMediaQuery({ maxWidth: 510 })
  const isMobileBig = useMediaQuery({ maxWidth: 690 })

  const isSmallScreen = isTablet || isMobile

  const MARKETS_API_URL = `https://api.coinlore.net/api/coin/markets/?id=${selectedCoinMarkets[0]}`
  const COIN_API_URL = `https://api.coinlore.net/api/ticker/?id=${selectedCoinMarkets[0]}`
  const NOT_AVAILABLE = 'N/A'

  const [coin, setCoin] = useState([])
  const [markets, setMarkets] = useState([])

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [sortDirection, setSortDirection] = useState(true) // true - по возрастанию
  const [sortField, setSortField] = useState('price_usd')

  const [highestMarket, setHighestMarket] = useState(null)
  const [lowestMarket, setLowestMarket] = useState(null)
  const [differencePrice, setDifferencePrice] = useState(0)

  //массив с заголовками таблицы
  const tableArray = [
    {
      label: t('markets.tableName'),
      field: 'name',
      isSorting: true,
      visible: true,
    },
    {
      label: t('markets.tableBase'),
      field: 'quote',
      isSorting: false,
      visible: true,
    },
    {
      label: t('markets.tablePriceUsd'),
      field: 'price_usd',
      isSorting: true,
      visible: true,
    },
    {
      label: t('markets.tablePrice'),
      field: 'price',
      isSorting: true,
      visible: true,
    },
    {
      label: t('markets.tableVolumeUsd'),
      field: 'volume_usd',
      isSorting: false,
      visible: true,
    },
    {
      label: t('markets.tableVolume'),
      field: 'volume',
      isSorting: false,
      visible: isDesktop,
    },
  ]
  //обязательно иначе не будет работать Visible
  const filteredTableArray = tableArray.filter((item) => item.visible)

  let tableColumns = 0
  if (isDesktop) {
    tableColumns = 6
  } else if (isLaptop) {
    tableColumns = 5
  }

  useEffect(() => {
    const fetchData = async () => {
      //запрос данных, проверка на успешный запрос, получение ответа JSON, проверка данных на наличие
      const fetchResource = async (url) => {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`${url} failed to fetch`)
        const data = await res.json()
        if (!data) throw new Error(`No data found for ${url}`)
        return data
      }

      try {
        const dataMarket = await fetchResource(MARKETS_API_URL)
        setMarkets(dataMarket)
        const dataCoin = await fetchResource(COIN_API_URL)
        setCoin(dataCoin)
        //защита маркета на null и undefined при сравнении, без него все будет NaN
        const validMarkets = dataMarket.filter(
          (market) =>
            market.price_usd !== null && market.price_usd !== undefined
        )
        // Находим рынок с самой высокой ценой
        const highest = validMarkets.reduce((prev, current) => {
          return parseFloat(prev.price_usd) > parseFloat(current.price_usd)
            ? prev
            : current
        })
        // Находим рынок с самой низкой ценой
        const lowest = validMarkets.reduce((prev, current) => {
          return parseFloat(prev.price_usd) < parseFloat(current.price_usd)
            ? prev
            : current
        })

        // разница цен
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
      fetchData()
    }, 10000) // обновление каждые 10 секунд

    return () => clearInterval(intervalId)
  }, [MARKETS_API_URL, COIN_API_URL])

  // Сортировка рынков
  const sortedMarkets = [...markets].sort((a, b) => {
    // Получаем значения для сортировки
    const valueA =
      a[sortField] !== undefined && a[sortField] !== null
        ? a[sortField]
        : NOT_AVAILABLE // Если undefined или null, то N/A
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
        <Loading type={`${selectedCoinMarkets[1]}`} />
      ) : (
        <div className={style.marketsContainer}>
          <div className={style.coinStatisticsContainer}>
            {coin.map((parameters) => (
              <MarketCoin
                key={parameters.id}
                {...parameters}
                isMobileBig={isMobileBig}
              ></MarketCoin>
            ))}
          </div>
          <TopDifferenceMarkets
            highestMarket={highestMarket}
            lowestMarket={lowestMarket}
            differencePrice={differencePrice}
            isMobileBig={isMobileBig}
          />
          <div className={style.otherMarkets}>
            <h2 className={style.otherMarketsHeader}>
              {t('markets.priceOverview')}
            </h2>
            <div className={style.marketsMidLine}></div>
            <div className={style.otherMarketsTable}>
              <TableHeader
                tableArray={filteredTableArray}
                sortField={sortField}
                sortDirection={sortDirection}
                toggleSort={handleSort}
                tableColumns={tableColumns}
                isSmallScreen={isSmallScreen}
              />
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

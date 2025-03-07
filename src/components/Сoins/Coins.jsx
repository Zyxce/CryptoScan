import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import Coin from './Coin'
import style from './Coins.module.css'
import Loading from '../Events/Loading'
import Error from '../Events/Error'
import CoinsSelector from './CoinsSelector'
import TopMovers from './TopMovers'
import TableHeader from '../Reusable/TableHeader'
import Midline from '../Reusable/Midline'

const Coins = (props) => {
  const { toggleSelectedCoinId } = props
  const { t } = useTranslation()

  const isDesktop1601 = useMediaQuery({ minWidth: 1601 })
  const isDesktop1441 = useMediaQuery({ minWidth: 1441, maxWidth: 1600 })
  const isLaptop = useMediaQuery({ minWidth: 1101, maxWidth: 1440 })
  const isTablet = useMediaQuery({ minWidth: 511, maxWidth: 1100 })
  const isMobile = useMediaQuery({ maxWidth: 510 })

  const isSmallScreen = isTablet || isMobile

  const NOT_AVAILABLE = 'N/A'

  const [currentStart, setCurrentStart] = useState(100)
  const [prevStart, setPrevStart] = useState(0)
  const [fetchStart, setFetchStart] = useState(0)

  const [coins, setCoins] = useState([])

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [sortDirection, setSortDirection] = useState(false) // true - по возрастанию
  const [sortField, setSortField] = useState('market_cap_usd')

  //массив с заголовками таблицы
  const tableArray = [
    {
      label: t('coins.tableIcon'),
      field: '',
      isSorting: false,
      visible: true,
    },
    {
      label: t('coins.tableName'),
      field: 'name',
      isSorting: true,
      visible: true,
    },
    {
      label: t('coins.tablePrice'),
      field: 'price_usd',
      isSorting: true,
      visible: true,
    },
    {
      label: t('coins.tableChange24h'),
      field: 'percent_change_24h',
      isSorting: true,
      visible: true,
    },
    {
      label: t('coins.tableChange7d'),
      field: 'percent_change_7d',
      isSorting: true,
      visible: isDesktop1601,
    },
    {
      label: t('coins.tableVolume'),
      field: 'volume24',
      isSorting: true,
      visible: true,
    },
    {
      label: t('coins.tableSupply'),
      field: 'csupply',
      isSorting: true,
      visible: isLaptop || isDesktop1441 || isDesktop1601,
    },
    {
      label: t('coins.tableCap'),
      field: 'market_cap_usd',
      isSorting: true,
      visible: isDesktop1601 || isDesktop1441,
    },
  ]
  //обязательно иначе не будет работать Visible
  const filteredTableArray = tableArray.filter((item) => item.visible)

  let tableColumns = 0
  if (isDesktop1601) {
    tableColumns = 8
  } else if (isDesktop1441) {
    tableColumns = 7
  } else if (isLaptop) {
    tableColumns = 6
  }

  const fetchResource = async (url) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`${url} failed to fetch`)
    const data = await res.json()
    if (!data) throw new Error(`No data found for ${url}`)
    return data
  }

  const fetchData = useCallback(async () => {
    try {
      const fetchPromises = []
      for (let i = 0; i < 10; i++) {
        const fetchStart = i * 100
        const COINS_API_URL = `https://api.coinlore.net/api/tickers/?start=${fetchStart}&limit=100`
        fetchPromises.push(fetchResource(COINS_API_URL))
      }
      const responses = await Promise.all(fetchPromises)
      const allCoins = responses.flatMap((response) => response.data)

      setCoins(allCoins)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

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
  if (isLoading) {
    return <Loading type={t('coins.loading')} />
  }

  if (isSmallScreen) {
    return (
      <div className={style.coinsContainer}>
        <div className={style.coinsFeaturedContainer}>
          <TopMovers
            toggleSelectedCoinId={toggleSelectedCoinId}
            allCoinsArray={coins}
          />
        </div>
        <CoinsSelector
          toggleStartNext={handleStartNext}
          toggleStartBack={handleStartBack}
          toggleStartRefresh={handleStartRefresh}
          toggleIsRefresh={setIsRefreshing}
          currentStart={currentStart}
          prevStart={prevStart}
          sortField={sortField}
          isSmallScreen={isSmallScreen}
        />
        <Midline size={'standart'} gradient={'small'} />
        <div className={style.coinsTable}>
          <TableHeader
            tableArray={filteredTableArray}
            sortField={sortField}
            sortDirection={sortDirection}
            toggleSort={handleSort}
            tableColumns={tableColumns}
            isSmallScreen={isSmallScreen}
          />
        </div>
        <Midline size={'standart'} gradient={'small'} />
        {isRefreshing ? (
          <Loading type={`Top ${prevStart + 1} - ${currentStart} coins `} />
        ) : (
          <div className={style.coinTableContainer}>
            {sortedCoins.slice(prevStart, currentStart).map((coin) => (
              <Coin
                key={coin.id}
                {...coin}
                toggleSelectedCoinId={toggleSelectedCoinId}
              />
            ))}
          </div>
        )}
        <Midline size={'standart'} gradient={'small'} />
        <CoinsSelector
          toggleStartNext={handleStartNext}
          toggleStartBack={handleStartBack}
          toggleStartRefresh={handleStartRefresh}
          toggleIsRefresh={setIsRefreshing}
          currentStart={currentStart}
          prevStart={prevStart}
          sortField={sortField}
          isSmallScreen={isSmallScreen}
        />
        <Midline size={'standart'} gradient={'small'} />
      </div>
    )
  }

  return (
    <div className={style.coinsContainer}>
      <div className={style.coinsFeaturedContainer}>
        <TopMovers
          toggleSelectedCoinId={toggleSelectedCoinId}
          allCoinsArray={coins}
        />
      </div>
      <Midline size={'standart'} gradient={'small'} />
      <CoinsSelector
        toggleStartNext={handleStartNext}
        toggleStartBack={handleStartBack}
        toggleStartRefresh={handleStartRefresh}
        toggleIsRefresh={setIsRefreshing}
        currentStart={currentStart}
        prevStart={prevStart}
        sortField={sortField}
        isSmallScreen={isSmallScreen}
      />
      <Midline size={'standart'} gradient={'small'} />
      <div className={style.coinsTable}>
        <TableHeader
          tableArray={filteredTableArray}
          sortField={sortField}
          sortDirection={sortDirection}
          toggleSort={handleSort}
          tableColumns={tableColumns}
          isSmallScreen={isSmallScreen}
        />
      </div>
      {isRefreshing ? (
        <Loading type={`Top ${prevStart + 1} - ${currentStart} coins `} />
      ) : (
        <div className={style.coinTableContainer}>
          {sortedCoins.slice(prevStart, currentStart).map((coin) => (
            <Coin
              key={coin.id}
              {...coin}
              toggleSelectedCoinId={toggleSelectedCoinId}
            />
          ))}
        </div>
      )}
      <Midline size={'standart'} gradient={'small'} />
      <CoinsSelector
        toggleStartNext={handleStartNext}
        toggleStartBack={handleStartBack}
        toggleStartRefresh={handleStartRefresh}
        toggleIsRefresh={setIsRefreshing}
        currentStart={currentStart}
        prevStart={prevStart}
        sortField={sortField}
        isSmallScreen={isSmallScreen}
      />
      <Midline size={'standart'} gradient={'small'} />
    </div>
  )
}

export default Coins

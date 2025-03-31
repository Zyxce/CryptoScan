/**
 * Компонент Exchanges - отображает список бирж с возможностью сортировки и периодическим обновлением данных.
 *
 * @property {Array} exchanges - Массив данных о биржах.
 * @property {string} error - Сообщение об ошибке, если запрос данных не удался.
 * @property {boolean} isLoading - Флаг загрузки данных.
 * @property {boolean} sortDirection - Направление сортировки:
 *   - true: по возрастанию.
 *   - false: по убыванию.
 * @property {string} sortField - Поле, по которому происходит сортировка.
 *
 * @function fetchData - Асинхронная функция для загрузки данных о биржах.
 * @function handleSort - Функция для переключения сортировки по выбранному полю.
 *
 */
import { useMediaQuery } from 'react-responsive'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from './Exchanges.module.css'
import Exchange from './Exchange'
import Loading from '../Events/Loading'
import Error from '../Events/Error'
import TableHeader from '../Reusable/TableHeader'

const Exchanges = () => {
  const { t } = useTranslation()
  const EXCHANGES_API_URL = 'https://api.coinlore.net/api/exchanges/'
  const NOT_AVAILABLE = 'N/A'

  const isDesktop = useMediaQuery({ minWidth: 1441 })
  const isLaptop = useMediaQuery({ minWidth: 1101, maxWidth: 1440 })
  const isTablet = useMediaQuery({ minWidth: 511, maxWidth: 1100 })
  const isMobile = useMediaQuery({ maxWidth: 510 })

  const isSmallScreen = isTablet || isMobile

  const [exchanges, setExchanges] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [sortDirection, setSortDirection] = useState(true) // true - по возрастанию
  const [sortField, setSortField] = useState('price_usd')

  //массив с заголовками таблицы
  const tableArray = [
    {
      label: t('exchanges.tableIcon'),
      field: '',
      isSorting: false,
      visible: true,
    },
    {
      label: t('exchanges.tableName'),
      field: 'name',
      isSorting: true,
      visible: true,
    },
    {
      label: t('exchanges.tableVolume'),
      field: 'volume_usd',
      isSorting: true,
      visible: true,
    },
    {
      label: t('exchanges.tableMarkets'),
      field: 'active_pairs',
      isSorting: true,
      visible: true,
    },
    {
      label: t('exchanges.tableUrl'),
      field: '',
      isSorting: false,
      visible: true,
    },
    {
      label: t('exchanges.tableCountry'),
      field: '',
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
    if (!isSmallScreen) {
      if (sortField === field) {
        setSortDirection((prev) => !prev)
      } else {
        setSortField(field)
        setSortDirection(true)
      }
    } else {
      setSortField(field)
      setSortDirection(false)
    }
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <>
      {isLoading ? (
        <Loading type={t('exchanges.loading')} />
      ) : (
        <div className={style.exchangesContainer}>
          <h1 className={style.exchangesFeaturedHeader}>
            {t('exchanges.header')}
          </h1>
          <div className={style.exchangesMidLine}></div>
          <div className={style.exchangesTable}>
            <TableHeader
              tableArray={filteredTableArray}
              sortField={sortField}
              sortDirection={sortDirection}
              toggleSort={handleSort}
              tableColumns={tableColumns}
              isSmallScreen={isSmallScreen}
            />
          </div>
          <div className={style.exchangeTableContainer}>
            {sortedExchanges.map((exchange) => {
              return <Exchange key={exchange.id} {...exchange}></Exchange>
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default Exchanges

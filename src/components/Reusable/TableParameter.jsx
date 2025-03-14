/**
 * Компонент TableParameter - отображает данные в виде таблицы с поддержкой различных типов элементов.
 * Компонент адаптируется под разные размеры экранов, обеспечивая корректное отображение на мобильных устройствах и десктопах.
 * Поддерживает отображение текста, изображений, ссылок и комбинаций изображений с текстом.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {Array} props.tableArray - Массив объектов с данными для отображения.
 *   Каждый объект содержит:
 *     - label {string}: Текст или URL для отображения.
 *     - imageSrc {string}: Ссылка на изображение (если тип 'img' или 'imgtext').
 *     - type {string}: Тип элемента:
 *       - 'img': Изображение.
 *       - 'text': Текст.
 *       - 'url': Ссылка.
 *       - 'imgtext': Изображение и текст.
 *     - labelDescription {string}: Дополнительный текст (описание) для элемента.
 *     - divType {string}: Тип контейнера для мобильных устройств ('top', 'bottom', 'left').
 * @param {number} props.tableColumns - Количество колонок для отображения на больших экранах.
 * @param {boolean} props.isSmallScreen - Флаг, указывающий, что устройство имеет маленький экран (мобильное).
 * @param {string} props.url - Ссылка, которая будет использована как общий контейнер для таблицы.
 *
 * @component
 * @example
 * <TableParameter
 *   tableArray={[
 *     { type: 'imgtext', label: 'Example', imageSrc: 'example.png', labelDescription: 'Description', divType: 'left' },
 *     { type: 'text', label: 'Some text', divType: 'top' },
 *     { type: 'url', label: 'https://example.com', divType: 'bottom' },
 *   ]}
 *   tableColumns={3}
 *   isSmallScreen={false}
 *   url="https://example.com"
 * />
 */
import React from 'react'
import style from './reusableComponents.module.css'
import { useNavigate } from 'react-router-dom'

// Функция для сокращения URL
const shortenUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch (error) {
    return url
  }
}

const TableParameter = (props) => {
  const {
    tableArray,
    tableColumns,
    isSmallScreen,
    action = {},
    toggleSelectedCoinId,
  } = props

  const { href, nav = {} } = action

  const { id, name, isNavigate } = nav

  const navigate = useNavigate()

  const renderItem = (
    { type, label, labelDescription, imageSrc, percentParam },
    index
  ) => {
    switch (type) {
      case 'img':
        return (
          <img
            key={index}
            className={`${style.tableParameterIcon} ${style.tableParameterComponent}`}
            src={imageSrc}
            alt={label}
          />
        )
      case 'text':
        return (
          <p
            key={index}
            className={`${style.tableParameterText} ${style.tableParameterComponent}`}
          >
            {labelDescription}
            {label}
          </p>
        )
      case 'url':
        return (
          <a
            key={index}
            href={label}
            className={`${style.tableParameterUrl} ${style.tableParameterComponent}`}
          >
            {labelDescription}
            {shortenUrl(label)}
          </a>
        )
      case 'imgtext':
        return (
          <div key={index} className={style.tableParameterIconText}>
            <img
              className={style.tableParameterIcon}
              src={imageSrc}
              alt={label}
            />
            <p className={style.tableParameterText}>
              {labelDescription}
              {label}
            </p>
          </div>
        )
      case 'symboltext':
        return (
          <div key={index} className={style.tableParameterSymbolText}>
            <p className={style.tableParameterText}>{label}</p>
            <p className={style.tableParameterText}>{labelDescription}</p>
          </div>
        )
      case 'percent':
        let percentPeriod = ''
        if (percentParam.period === 'percent_change_1h') {
          percentPeriod = '1h :'
        } else if (percentParam.period === 'percent_change_7d') {
          percentPeriod = '7d :'
        } else if (percentParam.period === 'percent_change_24h') {
          percentPeriod = '24h :'
        } else {
          percentPeriod = ''
        }
        return (
          <div className={style.tableParameterPercent}>
            <p className={style.tableParameterPercentDescription}>
              {labelDescription}
            </p>
            <img
              className={style.tableParameterPercentGraph}
              src={imageSrc}
              alt={label}
            ></img>
            <p
              className={style.tableParameterPercentText}
              style={{
                color: percentParam.color,
                background: percentParam.background,
              }}
            >
              {label} %
            </p>
          </div>
        )
      default:
        return null
    }
  }

  //рендеринг для мелких экранов
  if (isSmallScreen) {
    const topArray = []
    const bottomArray = []
    const leftArray = []

    tableArray.forEach(
      ({ type, label, imageSrc, labelDescription, divType, percentParam }) => {
        switch (divType) {
          case 'top':
            topArray.push({
              type,
              label,
              imageSrc,
              labelDescription,
              percentParam,
            })
            break
          case 'bottom':
            bottomArray.push({
              type,
              label,
              imageSrc,
              labelDescription,
              percentParam,
            })
            break
          case 'left':
            leftArray.push({
              type,
              label,
              imageSrc,
              labelDescription,
              percentParam,
            })
            break
          default:
            break
        }
      }
    )

    //mobile
    if (!isNavigate) {
      return (
        <a href={href} className={style.tableParameterContainerUrl}>
          <div className={style.tableParameterContainer}>
            <div className={style.tableParameterContainerLeft}>
              {leftArray.map(renderItem)}
            </div>
            <div div className={style.tableParameterContainerRight}>
              <div className={style.tableParameterContainerTop}>
                {topArray.map(renderItem)}
              </div>
              <div className={style.tableParameterContainerBottom}>
                {bottomArray.map(renderItem)}
              </div>
            </div>
          </div>
        </a>
      )
    }
    if (isNavigate) {
      return (
        <div
          className={style.tableParameterContainer}
          onClick={() => {
            toggleSelectedCoinId(id, name)
            navigate('/CryptoScan/markets')
          }}
        >
          <div className={style.tableParameterContainerLeft}>
            {leftArray.map(renderItem)}
          </div>
          <div div className={style.tableParameterContainerRight}>
            <div className={style.tableParameterContainerTop}>
              {topArray.map(renderItem)}
            </div>
            <div className={style.tableParameterContainerBottom}>
              {bottomArray.map(renderItem)}
            </div>
          </div>
        </div>
      )
    }
  }

  //рендеринг для больших экранов
  if (!isNavigate) {
    return (
      <a href={href}>
        <div
          className={style.tableParameterContainer}
          style={{
            gridTemplateColumns: `repeat(${tableColumns}, minmax(0, 1fr))`,
          }}
        >
          {tableArray.map(renderItem)}
        </div>
      </a>
    )
  }
  if (isNavigate) {
    return (
      <div
        onClick={() => {
          toggleSelectedCoinId(id, name)
          navigate('/CryptoScan/markets')
        }}
        className={style.tableParameterContainer}
        style={{
          gridTemplateColumns: `repeat(${tableColumns}, minmax(0, 1fr))`,
        }}
      >
        {tableArray.map(renderItem)}
      </div>
    )
  }
}

export default TableParameter

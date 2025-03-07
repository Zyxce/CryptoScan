import React from 'react'
import style from './CoinsSelector.module.css'
import Button from '../Reusable/Button'
import btnArrow from '../../Images/btnArrow.png'
import { useTranslation } from 'react-i18next'

const CoinsSelector = (props) => {
  const {
    toggleStartNext,
    toggleStartBack,
    toggleStartRefresh,
    toggleIsRefresh,
    currentStart,
    prevStart,
    sortField,
    isSmallScreen,
  } = props
  const { t } = useTranslation()

  let sortFieldTranslate = 'Translate Error: coinsSelector'

  switch (sortField) {
    case 'name':
      sortFieldTranslate = t('coinsSelector.name')
      break
    case 'price_usd':
      sortFieldTranslate = t('coinsSelector.price')
      break
    case 'percent_change_24h':
      sortFieldTranslate = t('coinsSelector.change24h')
      break
    case 'percent_change_7d':
      sortFieldTranslate = t('coinsSelector.change7d')
      break
    case 'volume24':
      sortFieldTranslate = t('coinsSelector.volume')
      break
    case 'csupply':
      sortFieldTranslate = t('coinsSelector.csupply')
      break
    case 'market_cap_usd':
      sortFieldTranslate = t('coinsSelector.marketCap')
      break
    default:
      sortFieldTranslate = 'Translate Error: coinsSelector' // Значение по умолчанию
      break
  }

  if (isSmallScreen) {
    return (
      <div className={style.coinSelectorContainer}>
        <p className={style.coinsSelectorInfo}>
          {t('coinsSelector.info', {
            prevStart: prevStart + 1,
            currentStart: currentStart,
          })}{' '}
          <span style={{ color: '#007bff' }}>{sortFieldTranslate}</span>
        </p>
        <div className={style.coinSelectorCenter}>
          {prevStart >= 99 ? (
            <Button
              className={style.coinsSelectorPrevious}
              onClick={() => {
                toggleIsRefresh(true)
                toggleStartBack()
              }}
            >
              <img src={btnArrow} alt="Arrow" />
              {t('coinsSelector.btnPrevious')}
            </Button>
          ) : (
            <Button className={style.coinsSelectorPreviousOff}>
              <img src={btnArrow} alt="Arrow" />
              {t('coinsSelector.btnPrevious')}
            </Button>
          )}
          {currentStart <= 999 ? (
            <Button
              className={style.coinsSelectorNext}
              onClick={() => {
                toggleIsRefresh(true)
                toggleStartNext()
              }}
            >
              {t('coinsSelector.btnNext')}
              <img src={btnArrow} alt="Arrow" />
            </Button>
          ) : (
            <Button className={style.coinsSelectorNextOff}>
              {t('coinsSelector.btnNext')}
              <img src={btnArrow} alt="Arrow" />
            </Button>
          )}
        </div>
      </div>
    )
  }
  return (
    <div className={style.coinSelectorContainer}>
      <div className={style.coinSelectorCenter}>
        {prevStart >= 99 ? (
          <Button
            className={style.coinsSelectorPrevious}
            onClick={() => {
              toggleIsRefresh(true)
              toggleStartBack()
            }}
          >
            <img src={btnArrow} alt="Arrow" />
            {t('coinsSelector.btnPrevious')}
          </Button>
        ) : (
          <Button className={style.coinsSelectorPreviousOff}>
            <img src={btnArrow} alt="Arrow" />
            {t('coinsSelector.btnPrevious')}
          </Button>
        )}
        <p className={style.coinsSelectorInfo}>
          {t('coinsSelector.info', {
            prevStart: prevStart + 1,
            currentStart: currentStart,
          })}{' '}
          <span style={{ color: '#007bff' }}>{sortFieldTranslate}</span>
        </p>
        {currentStart <= 999 ? (
          <Button
            className={style.coinsSelectorNext}
            onClick={() => {
              toggleIsRefresh(true)
              toggleStartNext()
            }}
          >
            {t('coinsSelector.btnNext')}
            <img src={btnArrow} alt="Arrow" />
          </Button>
        ) : (
          <Button className={style.coinsSelectorNextOff}>
            {t('coinsSelector.btnNext')}
            <img src={btnArrow} alt="Arrow" />
          </Button>
        )}
      </div>

      {/* <Button
        className={style.coinsSelectorRefresh}
        onClick={() => {
          toggleIsRefresh(true)
          toggleStartRefresh()
        }}
      >
        Refresh
      </Button> */}
    </div>
  )
}

export default CoinsSelector

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
  } = props
  const { t } = useTranslation()
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
          })}
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

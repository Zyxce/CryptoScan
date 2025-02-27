import React from 'react'
import style from './CoinsSelector.module.css'
import Button from '../Reusable/Button'
import btnArrow from '../../Images/btnArrow.png'

const CoinsSelector = (props) => {
  const {
    toggleStartNext,
    toggleStartBack,
    toggleStartRefresh,
    toggleIsRefresh,
    currentStart,
    prevStart,
  } = props
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
            Previous 100
          </Button>
        ) : (
          <Button className={style.coinsSelectorPreviousOff}>
            <img src={btnArrow} alt="Arrow" />
            Previous 100
          </Button>
        )}
        <p className={style.coinsSelectorInfo}>
          Top {prevStart + 1} - {currentStart} coins by Market Rank
        </p>
        {currentStart <= 999 ? (
          <Button
            className={style.coinsSelectorNext}
            onClick={() => {
              toggleIsRefresh(true)
              toggleStartNext()
            }}
          >
            Next 100
            <img src={btnArrow} alt="Arrow" />
          </Button>
        ) : (
          <Button className={style.coinsSelectorNextOff}>
            Next 100
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

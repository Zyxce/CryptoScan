import React, { useState } from 'react'
import style from './reusableComponents.module.css'
import Button from './Button'
import { FaSyncAlt } from 'react-icons/fa' // Импортируем иконку

const SelectorDirector = (props) => {
  const { arrayParameters, styleParameter, toggleFunction, isSmallScreen } =
    props
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleToggle = () => {
    const nextIndex = (currentIndex + 1) % arrayParameters.length
    setCurrentIndex(nextIndex)
    toggleFunction(arrayParameters[nextIndex].key)
  }

  if (isSmallScreen) {
    const currentParameter = arrayParameters[currentIndex]

    return (
      <div className={style.selectorDirectorContainer}>
        <Button
          onClick={handleToggle}
          className={style.selectorDirectorBtn}
          style={{
            color:
              styleParameter === currentParameter.key
                ? currentParameter.selectColor
                : 'white',
            background:
              styleParameter === currentParameter.key
                ? currentParameter.selectBackground
                : '',
          }}
        >
          {currentParameter.label}{' '}
          <FaSyncAlt className={style.selectorDirectorBtnIcon} />
        </Button>
      </div>
    )
  }

  return (
    <div className={style.selectorDirectorContainer}>
      {arrayParameters.map(({ key, label, selectColor, selectBackground }) => (
        <Button
          key={key}
          onClick={() => toggleFunction(key)}
          className={style.selectorDirectorBtn}
          style={{
            color: styleParameter === key ? selectColor : 'white',
            background: styleParameter === key ? selectBackground : '',
          }}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}

export default SelectorDirector

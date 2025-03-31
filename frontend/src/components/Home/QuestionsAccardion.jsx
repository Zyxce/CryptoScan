import React from 'react'
import style from '../../components/Home/QuestionsAccardion.module.css'
import { useTranslation } from 'react-i18next'

const QuestionsAccardion = (props) => {
  const { id, question, answer, isOpen, onAccardionClick } = props
  const { t } = useTranslation()
  return isOpen ? (
    <div
      style={{
        borderImage:
          'linear-gradient(to right, #31313162, #1B70F1, #31313162) 1',
      }}
      className={style.accardionContainer}
      onClick={onAccardionClick}
    >
      <div className={style.accardionTopContainer}>
        <span style={{ color: '#1B70F1 ' }} className={style.accardionSpan}>
          {id}
        </span>
        <p className={style.accardionText}>{t(question)}</p>
        <span className={style.accardionChar} style={{ color: '#1B70F1 ' }}>
          -
        </span>
      </div>
      <p className={style.accardionAnswer}>{t(answer)}</p>
    </div>
  ) : (
    <div className={style.accardionContainer} onClick={onAccardionClick}>
      <div className={style.accardionTopContainer}>
        <span className={style.accardionSpan}>{id}</span>
        <p className={style.accardionText}>{t(question)}</p>
        <span className={style.accardionChar}>+</span>
      </div>
    </div>
  )
}

export default QuestionsAccardion

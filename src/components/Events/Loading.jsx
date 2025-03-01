import React from 'react'
import { useTranslation } from 'react-i18next'
import style from './Loading.module.css'
import happyPeppa from '../../Images/happyPepe.png'

const LoadingEvent = ({ type }) => {
  const { t } = useTranslation()
  return (
    <div className={style.pageContainer}>
      <h1 className={style.pageHeader}>
        {t('loading.text')} <span>{type}</span>...
      </h1>
      <img className={style.pageImg} src={happyPeppa} alt="happyPeppa"></img>
    </div>
  )
}

export default LoadingEvent

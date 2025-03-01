import React from 'react'
import { useTranslation } from 'react-i18next'
import style from './Error.module.css'
import angryPeppa from '../../Images/angryPepe.png'

const Error = ({ error }) => {
  const { t } = useTranslation()
  return (
    <div className={style.pageContainer}>
      <h1 className={style.pageHeader}>
        {t('error.text')}: <span>{error}</span>
      </h1>
      <img className={style.pageImg} src={angryPeppa} alt="angryPeppa"></img>
    </div>
  )
}

export default Error

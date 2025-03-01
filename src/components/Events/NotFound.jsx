import { useTranslation } from 'react-i18next'
import React from 'react'
import cryingPepe from '../../Images/cryingPepe.png'
import style from './NotFound.module.css'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <div className={style.pageContainer}>
      <h1 className={style.pageHeader}>
        {t('notFound.ooops')}... <span>404</span> {t('notFound.notFoundText')}
      </h1>
      <img className={style.pageImg} src={cryingPepe} alt="kitty"></img>
    </div>
  )
}

export default NotFound

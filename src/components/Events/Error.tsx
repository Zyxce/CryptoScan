import React from 'react'
import { useTranslation } from 'react-i18next'
import style from './Error.module.css'
import angryPeppa from '../../Images/angryPepe.png'

interface ErrorProps {
  error: unknown
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  const { t } = useTranslation()

  const getErrorMessage = (err: unknown): string => {
    if (typeof err === 'string') return err

    if (err && typeof err === 'object') {
      if ('message' in err && typeof err.message === 'string') {
        return err.message
      }
      return JSON.stringify(err)
    }

    return t('error.unknown') || 'Unknown error occurred'
  }

  const errorMessage = getErrorMessage(error)

  return (
    <div className={style.pageContainer}>
      <h1 className={style.pageHeader}>
        {t('error.text')}: <span>{errorMessage}</span>
      </h1>
      <img className={style.pageImg} src={angryPeppa} alt="angryPeppa" />
    </div>
  )
}

export default Error

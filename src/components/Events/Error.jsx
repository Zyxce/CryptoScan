import React from 'react'
import style from './Error.module.css'
import angryPeppa from '../../Images/angryPepe.png'

const Error = ({ error }) => {
  return (
    <div className={style.pageContainer}>
      <h1 className={style.pageHeader}>
        Error: <span>{error}</span>
      </h1>
      <img className={style.pageImg} src={angryPeppa} alt="angryPeppa"></img>
    </div>
  )
}

export default Error

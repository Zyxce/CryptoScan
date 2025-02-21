import React from 'react'
import style from './Loading.module.css'
import happyPeppa from '../../Images/happyPepe.png'

const LoadingEvent = ({ type }) => {
  return (
    <div className={style.pageContainer}>
      <h1 className={style.pageHeader}>
        Loading <span>{type}</span>...
      </h1>
      <img className={style.pageImg} src={happyPeppa} alt="happyPeppa"></img>
    </div>
  )
}

export default LoadingEvent

import React from 'react'
import cryingPepe from '../../Images/cryingPepe.png'
import style from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={style.pageContainer}>
      <h1 className={style.pageHeader}>
        Ooops... <span>404</span> Not Found
      </h1>
      <img className={style.pageImg} src={cryingPepe} alt="kitty"></img>
    </div>
  )
}

export default NotFound

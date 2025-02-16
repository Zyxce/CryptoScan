import React from 'react'
import sadnessKitty from '../Images/sadnessPeppa.png'
import style from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={style.pageContainer}>
      <h1 className={style.pageHeader}>Ooops... Not Found </h1>
      <img className={style.pageImg} src={sadnessKitty} alt="kitty"></img>
    </div>
  )
}

export default NotFound

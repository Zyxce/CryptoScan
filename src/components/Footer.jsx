import React from 'react'
import style from './Footer.module.css' // Исходите из того, что вы используете CSS-модули
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className={style.footerContainer}>
      <div className={style.linksContainer}>
        <Link className={style.footerLink} to="/CryptoScan">
          Home
        </Link>
        <Link className={style.footerLink} to="/CryptoScan/coins">
          Coins
        </Link>
        <Link className={style.footerLink} to="/CryptoScan/exchanges">
          Exchanges
        </Link>
        <Link className={style.footerLink} to="/CryptoScan/settings">
          Settings
        </Link>
      </div>
      <div className={style.copyRight}>
        © 2025 Developed by Vitaly Sokolov. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

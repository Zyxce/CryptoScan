import React from 'react'
import style from './Footer.module.css' // Исходите из того, что вы используете CSS-модули

const Footer = () => {
  return (
    <footer className={style.footerContainer}>
      <div className={style.linksContainer}>
        <a href="/about" className={style.footerLink}>
          Home
        </a>
        <a href="/contact" className={style.footerLink}>
          Coins
        </a>
        <a href="/privacy" className={style.footerLink}>
          Markets
        </a>
        <a href="/terms" className={style.footerLink}>
          Settings
        </a>
      </div>
      <div className={style.copyRight}>
        © 2025 Developed by Vitaly Sokolov. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

import React from 'react'
import style from './Footer.module.css' // Исходите из того, что вы используете CSS-модули

const Footer = () => {
  return (
    <footer className={style.footerContainer}>
      <div className={style.linksContainer}>
        <a href="/about" className={style.footerLink}>
          About Us
        </a>
        <a href="/contact" className={style.footerLink}>
          Contact
        </a>
        <a href="/privacy" className={style.footerLink}>
          Privacy Policy
        </a>
        <a href="/terms" className={style.footerLink}>
          Terms of Service
        </a>
      </div>
      <div className={style.copyRight}>
        © 2025 Developed by Vitaly Sokolov. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

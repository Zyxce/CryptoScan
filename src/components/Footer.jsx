import React from 'react'
import style from './Footer.module.css' // Исходите из того, что вы используете CSS-модули
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className={style.footerContainer}>
      <div className={style.linksContainer}>
        <Link className={style.footerLink} to="/CryptoScan">
          {t('nav.home')}
        </Link>
        <Link className={style.footerLink} to="/CryptoScan/coins">
          {t('nav.coins')}
        </Link>
        <Link className={style.footerLink} to="/CryptoScan/exchanges">
          {t('nav.exchanges')}
        </Link>
        <Link className={style.footerLink} to="/CryptoScan/topmovers">
          {t('nav.topMovers')}
        </Link>
      </div>
      <div className={style.copyRight}>
        © 2025 {t('footer.developedBy')} Vitaly Sokolov.{' '}
        {t('footer.rightsReserved')}
      </div>
    </footer>
  )
}

export default Footer

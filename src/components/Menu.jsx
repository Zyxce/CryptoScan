import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import style from './Menu.module.css'
import logo from '../Images/LogoMenu.png'
import englishLanguage from '../Images/languageEnglish.jpg'
import russianLanguage from '../Images/languageRussian.png'

const Menu = () => {
  const { t, i18n } = useTranslation() // Используем `useTranslation`

  const currentLanguage = i18n.language

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ru' : 'en'
    i18n.changeLanguage(newLanguage)
  }

  return (
    <div className={style.menuContainer}>
      <img src={logo} alt="Crypto Scan logo" className={style.logoImage} />
      <h2 className={style.menuLogo}>
        <span>Crypto</span>
        <span>Scan</span>
      </h2>
      <nav className={style.navContainer}>
        <Link className={style.navItem} to="/CryptoScan">
          {t('nav.home')}
        </Link>
        <Link className={style.navItem} to="/CryptoScan/coins">
          {t('nav.coins')}
        </Link>
        <Link className={style.navItem} to="/CryptoScan/exchanges">
          {t('nav.exchanges')}
        </Link>
        <Link className={style.navItem} to="/CryptoScan/topmovers">
          {t('nav.topMovers')}
        </Link>
      </nav>
      <div className={style.languageContainer} onClick={toggleLanguage}>
        <p className={style.textLanguage}>{currentLanguage.toUpperCase()}</p>
        <img
          src={currentLanguage === 'en' ? englishLanguage : russianLanguage}
          alt="language"
          className={style.languageIcon}
        />
      </div>
    </div>
  )
}

export default Menu

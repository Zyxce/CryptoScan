import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import style from './Menu.module.css'
import logo from '../Images/LogoMenu.png'
import englishLanguage from '../Images/languageEnglish.jpg'
import russianLanguage from '../Images/languageRussian.png'

const Menu = () => {
  const { t, i18n } = useTranslation()

  const currentLanguage = i18n.language

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ru' : 'en'
    i18n.changeLanguage(newLanguage)
  }

  // Адаптив
  const isDesktop = useMediaQuery({ minWidth: 1101 })
  const isTablet = useMediaQuery({ minWidth: 511, maxWidth: 1100 })
  const isMobile = useMediaQuery({ maxWidth: 510 })

  return (
    <div className={style.menuContainer}>
      {isDesktop && (
        <>
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
            <Link className={style.navItem} to="/CryptoScan/news">
              {t('nav.news')}
            </Link>
          </nav>
          <div className={style.languageContainer} onClick={toggleLanguage}>
            <p className={style.textLanguage}>
              {currentLanguage.toUpperCase()}
            </p>
            <img
              src={currentLanguage === 'en' ? englishLanguage : russianLanguage}
              alt="language"
              className={style.languageIcon}
            />
          </div>
        </>
      )}
      {(isTablet || isMobile) && (
        <>
          <div className={style.menuTopContainer}>
            <div className={style.logoContainer}>
              <img
                src={logo}
                alt="Crypto Scan logo"
                className={style.logoImage}
              />
              <h2 className={style.menuLogo}>
                <span>Crypto</span>
                <span>Scan</span>
              </h2>
            </div>
            <div className={style.languageContainer} onClick={toggleLanguage}>
              <p className={style.textLanguage}>
                {currentLanguage.toUpperCase()}
              </p>
              <img
                src={
                  currentLanguage === 'en' ? englishLanguage : russianLanguage
                }
                alt="language"
                className={style.languageIcon}
              />
            </div>
          </div>
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
            <Link className={style.navItem} to="/CryptoScan/news">
              {t('nav.news')}
            </Link>
          </nav>
        </>
      )}
    </div>
  )
}

export default Menu

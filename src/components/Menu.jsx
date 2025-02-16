import React from 'react'
import { Link } from 'react-router-dom'
import style from './Menu.module.css'
import logo from '../Images/LogoMenu.png'
import englishLanguage from '../Images/languageEnglish.jpg'

const Menu = () => {
  return (
    <div className={style.menuContainer}>
      <img src={logo} alt="Crypto Scan logo" className={style.logoImage} />
      <h2 className={style.menuLogo}>
        <span>Crypto</span>
        <span>Scan</span>
      </h2>
      <nav className={style.navContainer}>
        <Link className={style.navItem} to="/">
          Home
        </Link>
        <Link className={style.navItem} to="/coins">
          Coins
        </Link>
        <Link className={style.navItem} to="/Markets">
          Markets
        </Link>
        <Link className={style.navItem} to="/settings">
          Settings
        </Link>
      </nav>
      <div className={style.languageContainer}>
        <p className={style.textLanguage}>EN</p>
        <img src={englishLanguage} alt="language"></img>
      </div>
    </div>
  )
}

export default Menu

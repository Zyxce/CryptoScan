import { useNavigate } from 'react-router-dom'
import React from 'react'
import style from './HeroSection.module.css'
import heroImage from '../../Images/HeroImage.png'
import btnArrow from '../../Images/btnArrow.png'
import Button from '../Reusable/Button'
import HeroCoin from './HeroCoin'

const HeroSection = ({ coins }) => {
  const navigate = useNavigate()

  return (
    <div className={style.heroSection}>
      <div className={style.heroTopContent}>
        <div className={style.heroTextContainer}>
          <p className={style.appVersion}>— Crypto Scan V 0.4.1</p>
          <h1 className={style.mainHeading}>
            Buy & Sell Crypto Easy <br />
            With CryptoScan
          </h1>
          <div className={style.heroDottedLine}></div>
          <p className={style.heroDescription}>
            Effortlessly trade cryptocurrencies with CryptoScan — secure, fast,
            and designed <br /> for both beginners and experts
          </p>
          <Button
            className={style.heroButton}
            onClick={() => navigate('/CryptoScan/coins')}
          >
            Start now
            <img src={btnArrow} alt="Arrow" />
          </Button>
        </div>
        <div className={style.heroImageContainer}>
          <img src={heroImage} alt="Hero illustration" />
        </div>
      </div>
      <div className={style.heroBottomContent}>
        {coins.slice(0, 6).map((coin) => (
          <HeroCoin key={coin.id} {...coin} />
        ))}
      </div>
    </div>
  )
}

export default HeroSection

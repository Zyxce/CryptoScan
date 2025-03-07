import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import React from 'react'
import { useTranslation } from 'react-i18next'
import style from './HeroSection.module.css'
import heroImage from '../../Images/HeroImage.png'
import btnArrow from '../../Images/btnArrow.png'
import Button from '../Reusable/Button'
import HeroCoin from './HeroCoin'

const HeroSection = ({ coins }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Адаптив
  const isDesktop = useMediaQuery({ minWidth: 1101 })
  const isTablet = useMediaQuery({ minWidth: 511, maxWidth: 1100 })
  const isMobile = useMediaQuery({ maxWidth: 510 })

  return (
    <div className={style.heroSection}>
      <div className={style.heroTopContent}>
        {isDesktop && (
          <>
            <div className={style.heroTextContainer}>
              <p className={style.appVersion}>— Crypto Scan V 1.1.0</p>
              <h1 className={style.mainHeading}>{t('hero.header')}</h1>
              <div className={style.heroDottedLine}></div>
              <p className={style.heroDescription}>{t('hero.description')}</p>
              <Button
                className={style.heroButton}
                onClick={() => navigate('/CryptoScan/coins')}
              >
                {t('startNow')}
                <img src={btnArrow} alt="Arrow" />
              </Button>
            </div>
            <div className={style.heroImageContainer}>
              <img src={heroImage} alt="Hero illustration" />
            </div>
          </>
        )}
        {(isTablet || isMobile) && (
          <>
            {isTablet && (
              <div className={style.heroImageContainer}>
                <img src={heroImage} alt="Hero illustration" />
              </div>
            )}
            <div className={style.heroTextContainer}>
              <p className={style.appVersion}>— Crypto Scan V 1.1.1</p>
              <h1 className={style.mainHeading}>{t('hero.header')}</h1>
              <div className={style.heroDottedLine}></div>
              <p className={style.heroDescription}>{t('hero.description')}</p>
              <Button
                className={style.heroButton}
                onClick={() => navigate('/CryptoScan/coins')}
              >
                {t('startNow')}
                <img src={btnArrow} alt="Arrow" />
              </Button>
            </div>
          </>
        )}
      </div>
      <div className={style.heroBottomContent}>
        {isDesktop &&
          coins.slice(0, 5).map((coin) => <HeroCoin key={coin.id} {...coin} />)}
      </div>
    </div>
  )
}

export default HeroSection

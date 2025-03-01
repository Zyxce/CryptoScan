import React from 'react'
import style from './WhyChooseSection.module.css'
import whyImage from '../../Images/whyImage.png'
import btnArrow from '../../Images/btnArrow.png'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const WhyChooseSection = () => {
  const { t } = useTranslation() // Подключаем перевод
  const navigate = useNavigate()

  return (
    <div className={style.whyContainer}>
      <div className={style.whyContainerTop}>
        <h2 className={style.whyContainerTopHeader}>
          {t('whyChoose.header')} <span>CryptoScan</span>
        </h2>
        <p className={style.whyContainerTopDescription}>
          {t('whyChoose.headerDescription')}
        </p>
      </div>
      <div className={style.whyMidLine}></div>
      <div className={style.whyContainerBottom}>
        <div className={style.whyContainerLeft}>
          <ul className={style.whyContainerLeftList}>
            {[
              {
                listNumber: '01',
                midHeader: t('whyChoose.fastService'),
                midDescription: t('whyChoose.fastServiceDescription'),
                leftLine: <div className={style.whyContainerLeftLine}></div>,
              },
              {
                listNumber: '02',
                midHeader: t('whyChoose.userFriendlyInterface'),
                midDescription: t('whyChoose.userFriendlyInterfaceDescription'),
                leftLine: <div className={style.whyContainerLeftLine}></div>,
              },
              {
                listNumber: '03',
                midHeader: t('whyChoose.extensiveDatabase'),
                midDescription: t('whyChoose.extensiveDatabaseDescription'),
                leftLine: <div className={style.whyContainerLeftLine}></div>,
              },
              {
                listNumber: '04',
                midHeader: t('whyChoose.crossPlatformSupport'),
                midDescription: t('whyChoose.crossPlatformSupportDescription'),
                leftLine: '',
              },
            ].map(({ listNumber, midHeader, midDescription, leftLine }) => (
              <React.Fragment key={listNumber}>
                <li className={style.whyContainerLeftItem}>
                  <div className={style.whyContainerLeftLeft}>
                    <h3 className={style.whyContainerLeftNumber}>
                      {listNumber}
                    </h3>
                    <div className={style.whyContainerLeftMid}>
                      <h4 className={style.whyContainerLeftMidHeader}>
                        {midHeader}
                      </h4>
                      <p className={style.whyContainerLeftMidDescription}>
                        {midDescription}
                      </p>
                    </div>
                  </div>
                  <p
                    className={style.whyContainerLeftRightDescription}
                    onClick={() => navigate('/CryptoScan/coins')}
                  >
                    {t('startNow')}
                    <img
                      className={style.whyContainerLeftRightImage}
                      src={btnArrow}
                      alt="arrow"
                    ></img>
                  </p>
                </li>
                {leftLine}
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div className={style.whyContainerRight}>
          <img
            className={style.whyContainerRightImage}
            src={whyImage}
            alt="whychoose"
          ></img>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseSection

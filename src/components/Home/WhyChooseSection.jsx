import React from 'react'
import style from './WhyChooseSection.module.css'
import whyImage from '../../Images/whyImage.png'
import btnArrow from '../../Images/btnArrow.png'
import { useNavigate } from 'react-router-dom'

const WhyChooseSection = () => {
  const navigate = useNavigate()
  return (
    <div className={style.whyContainer}>
      <div className={style.whyContainerTop}>
        <h2 className={style.whyContainerTopHeader}>
          Why Choose <span>CryptoScan</span>
        </h2>
        <p className={style.whyContainerTopDescription}>
          When an unknown printer took a galley of type and scrambled it to make
          a type specimen book.
        </p>
      </div>
      <div className={style.whyMidLine}></div>
      <div className={style.whyContainerBottom}>
        <div className={style.whyContainerLeft}>
          <ul className={style.whyContainerLeftList}>
            {[
              {
                listNumber: '01',
                midHeader: 'Fast Service',
                midDescription:
                  'Lightning-fast transaction processing with no delays, \nkeeping you ahead of the market.',
                leftLine: <div className={style.whyContainerLeftLine}></div>,
              },
              {
                listNumber: '02',
                midHeader: 'User-Friendly Interface',
                midDescription:
                  'A simple and intuitive design that makes crypto \ntrading accessible to everyone.',
                leftLine: <div className={style.whyContainerLeftLine}></div>,
              },
              {
                listNumber: '03',
                midHeader: 'Extensive Database',
                midDescription:
                  'A vast database of cryptocurrencies, providing \nreal-time access to the latest market data.',
                leftLine: <div className={style.whyContainerLeftLine}></div>,
              },
              {
                listNumber: '04',
                midHeader: 'Cross-Platform Support',
                midDescription:
                  'Seamlessly works across all devices—web, mobile apps, \nand tablets for maximum convenience.',
                leftLine: '',
              },
            ].map(({ listNumber, midHeader, midDescription, leftLine }) => (
              <>
                <li className={style.whyContainerLeftItem} key={listNumber}>
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
                    Start Now
                    <img
                      className={style.whyContainerLeftRightImage}
                      src={btnArrow}
                      alt="arrow"
                    ></img>
                  </p>
                </li>
                {leftLine}
              </>
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

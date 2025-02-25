import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import heroImage from '../Images/HeroImage.png'
import Button from './Reusable/Button'
import btnArrow from '../Images/btnArrow.png'
import HomeCoin from './HomeCoin'
import Loading from './Events/Loading'

const Home = () => {
  const navigate = useNavigate()
  const COINS_API_URL = 'https://api.coinlore.net/api/tickers/'
  const [coins, setCoins] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res = await fetch(COINS_API_URL)
      const data = await res.json()
      setCoins(data.data)
    } catch (error) {
      setError(error.message)
    } //finally
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()

    const intervalId = setInterval(() => {
      fetchData()
    }, 10000)

    return () => clearInterval(intervalId)
  })

  if (error) {
    return <h1 style={{ color: 'red' }}>Error: {error}</h1>
  }

  return (
    <>
      {isLoading ? (
        <Loading type={'Home'} />
      ) : (
        <div className={style.heroSection}>
          <div className={style.heroTopContent}>
            <div className={style.heroTextContainer}>
              <p className={style.appVersion}> — Crypto Scan V 0.3.0</p>
              <h1 className={style.mainHeading}>
                Buy & Sell Crypto Easy <br />
                With CryptoScan
              </h1>
              <div className={style.heroDottedLine}></div>
              <p className={style.heroDescription}>
                It is a long established fact that a reader will be distracted
                by the readable content <br /> of a page when looking at its
                layout.
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
            {coins.slice(0, 6).map((coin) => {
              return <HomeCoin key={coin.id} {...coin}></HomeCoin>
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default Home

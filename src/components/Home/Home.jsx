import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Loading from '../Events/Loading'
import Error from '../Events/Error'
import HeroSection from './HeroSection'
import WhyChooseSection from './WhyChooseSection'
import QuestionsSection from './QuestionsSection'

const Home = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const COINS_API_URL = 'https://api.coinlore.net/api/tickers/'
  const [coins, setCoins] = useState([])
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      const res = await fetch(COINS_API_URL)
      const data = await res.json()
      setCoins(data.data)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    const intervalId = setInterval(() => {
      fetchData()
    }, 10000)

    return () => clearInterval(intervalId)
  })

  if (isLoading) {
    return <Loading type={t('home.loading')} />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <>
      <HeroSection coins={coins} />
      <WhyChooseSection />
      <QuestionsSection />
    </>
  )
}

export default Home

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import CoinCard from './CoinCard'

const SwiperDirector = (props) => {
  const { array, percentTime, toggleSelectedCoinId, isSmallScreen } = props

  if (isSmallScreen) {
    return (
      <Swiper
        style={{ width: '100%' }}
        loop={true}
        grabCursor={true}
        direction={'vertical'}
        pagination={{
          clickable: true,
        }}
        slidesPerView={3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {array.slice(0, 20).map((coin) => (
          <SwiperSlide key={coin.id} style={{ width: '100%' }}>
            <CoinCard
              percentTime={percentTime}
              {...coin}
              toggleSelectedCoinId={toggleSelectedCoinId}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    )
  }
  //desktop
  return (
    <Swiper
      speed={2500}
      loop={true}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      initialSlide={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      pagination={true}
      modules={[EffectCoverflow, Autoplay]}
      className="mySwiper"
    >
      {array.slice(0, 20).map((coin) => (
        <SwiperSlide key={coin.id} style={{ width: '200px' }}>
          <CoinCard
            percentTime={percentTime}
            {...coin}
            toggleSelectedCoinId={toggleSelectedCoinId}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperDirector

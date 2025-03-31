import React from 'react'
import { useMediaQuery } from 'react-responsive'
import style from './reusableComponents.module.css'

const Midline = (props) => {
  const { size, gradient } = props
  const isDesktop = useMediaQuery({ minWidth: 1441 })
  const isLaptop = useMediaQuery({ minWidth: 1101, maxWidth: 1440 })
  const isTablet = useMediaQuery({ minWidth: 511, maxWidth: 1100 })
  const isMobile = useMediaQuery({ maxWidth: 510 })

  const isSmallScreen = isTablet || isMobile
  let vPadding = '0px'
  if (size === 'standart') {
    vPadding = '60px'
    if (isSmallScreen) vPadding = '30px'
  }

  if (size === 'small') vPadding = '30px'

  let backgroundGradient =
    'rgba(85, 113, 254, 0.040), rgba(85, 113, 254, 0.030), rgba(85, 113, 254, 0.020) , rgba(85, 113, 254, 0.010), rgba(85, 113, 254, 0) 72%'

  if (gradient === 'small') {
    backgroundGradient =
      'rgba(85, 113, 254, 0.020), rgba(85, 113, 254, 0.015), rgba(85, 113, 254, 0.010) , rgba(85, 113, 254, 0.005), rgba(85, 113, 254, 0) 72%'
  }
  return (
    <div
      className={style.midLine}
      style={{
        padding: `${vPadding} 0`,
        background: `radial-gradient(${backgroundGradient})`,
      }}
    ></div>
  )
}

export default Midline

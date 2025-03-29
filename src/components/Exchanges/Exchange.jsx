/**
 * Компонент Exchange - отображает информацию о бирже, включая её название, объём торгов, количество активных пар, ссылку на сайт и страну регистрации.
 * Компонент адаптируется под разные размеры экранов и использует компонент @component TableParameter для отображения данных.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.name - Название биржи. Если значение отсутствует, отображается "N/A".
 * @param {string} props.name_id - Уникальный идентификатор биржи, используемый для загрузки изображения логотипа биржи.
 * @param {number} props.volume_usd - Объем торгов в USD. Если значение отсутствует, отображается "N/A".
 * @param {number} props.active_pairs - Количество активных торговых пар. Если значение отсутствует, отображается "N/A".
 * @param {string} props.url - Ссылка на сайт биржи. Если значение отсутствует, отображается "N/A".
 * @param {string} props.country - Страна, в которой зарегистрирована биржа. Если значение отсутствует, отображается "N/A".
 *
 * @component
 * @example
 * <Exchange
 *   name="Binance"
 *   name_id="binance"
 *   volume_usd={5000000000}
 *   active_pairs={1500}
 *   url="https://binance.com"
 *   country="Cayman Islands"
 * />
 */
import { useMediaQuery } from 'react-responsive'
import React, { useEffect, useState } from 'react'
import style from './Exchange.module.css'
import notFoundIcon from '../../Images/notFoundIcon.png'
import TableParameter from '../Reusable/TableParameter'

const Exchange = (props) => {
  const { name, name_id, volume_usd, active_pairs, url, country } = props

  const isDesktop = useMediaQuery({ minWidth: 1441 })
  const isLaptop = useMediaQuery({ minWidth: 1101, maxWidth: 1440 })
  const isTablet = useMediaQuery({ minWidth: 511, maxWidth: 1100 })
  const isMobile = useMediaQuery({ maxWidth: 510 })

  const isSmallScreen = isTablet || isMobile

  const [imageSrc, setImageSrc] = useState(notFoundIcon)

  const NOT_AVAILABLE = 'N/A'
  const [trueData, setTrueData] = useState({
    name: name || NOT_AVAILABLE,
    nameId: name_id || NOT_AVAILABLE,
    volumeUsd: Number(Math.floor(volume_usd)) || NOT_AVAILABLE,
    activePairs: active_pairs || NOT_AVAILABLE,
    url: url || NOT_AVAILABLE,
    country: country || NOT_AVAILABLE,
  })

  const tableArray = [
    {
      label: trueData.name,
      labelDescription: '',
      imageSrc: imageSrc,
      type: 'imgtext',
      visible: isSmallScreen,
      divType: 'left',
    },
    {
      label: 'icon',
      labelDescription: '',
      imageSrc: imageSrc,
      type: 'img',
      visible: !isSmallScreen,
    },
    {
      label: trueData.name,
      labelDescription: '',
      imageSrc: imageSrc,
      type: 'text',
      visible: !isSmallScreen,
    },
    {
      label: trueData.volumeUsd,
      labelDescription: isSmallScreen && 'Volume: $',
      imageSrc: imageSrc,
      type: 'text',
      visible: true,
      divType: 'bottom',
    },
    {
      label: `${trueData.activePairs}`,
      labelDescription: isSmallScreen && 'Markets: ',
      imageSrc: imageSrc,
      type: 'text',
      visible: true,
      divType: 'top',
    },
    {
      label: trueData.url,
      labelDescription: '',
      imageSrc: imageSrc,
      type: 'url',
      visible: !isMobile,
      divType: 'top',
    },
    {
      label: trueData.country.split(/[,;]/)[0].trim(),
      labelDescription: '',
      imageSrc: imageSrc,
      type: 'text',
      visible: isDesktop || (isSmallScreen && !isMobile),
      divType: 'bottom',
    },
  ]

  //Адаптив делает только видимым то что нужно
  const filteredTableArray = tableArray.filter((item) => item.visible)

  let tableColumns = 0
  if (isDesktop) {
    tableColumns = 6
  } else if (isLaptop) {
    tableColumns = 5
  }

  useEffect(() => {
    const loadImage = async () => {
      try {
        const ImageUrl = `https://www.coinlore.com/img/exchanges/${name_id}.png`

        const img = new Image()
        img.src = ImageUrl

        img.onload = () => setImageSrc(ImageUrl) // если картинка загрузилась заебись
        img.onerror = () => setImageSrc(notFoundIcon)
      } catch (error) {
        console.error('Error loading images:', error) // не круто
      }
    }
    loadImage()

    // Оптимизированная проверка данных

    setTrueData(() => ({
      name: name || NOT_AVAILABLE,
      nameId: name_id || NOT_AVAILABLE,
      volumeUsd: Number(Math.floor(volume_usd)) || NOT_AVAILABLE,
      activePairs: active_pairs || NOT_AVAILABLE,
      url: url || NOT_AVAILABLE,
      country: country || NOT_AVAILABLE,
    }))
  }, [name, name_id, country, volume_usd, active_pairs, url])

  const action = {
    href: trueData.url,
    nav: {
      id: '',
      name: '',
      isNavigate: false,
    },
  }

  return (
    <TableParameter
      tableArray={filteredTableArray}
      tableColumns={tableColumns}
      isSmallScreen={isSmallScreen}
      action={action}
    />
  )
}

export default Exchange

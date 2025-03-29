import React, { useEffect, useState } from 'react'
import { IMarketData, ITopDifferenceMarkets } from '../../types'
import { useTranslation } from 'react-i18next'
import useFormatNumber from '../../Hooks/useFormatNumber'
import style from './TopDifferenceMarket.module.css'

const TopDifferenceMarkets: React.FC<ITopDifferenceMarkets> = ({
  highestMarket,
  lowestMarket,
  differencePrice,
  isMobileBig,
}) => {
  const { t } = useTranslation()

  const { formatNumberOrNA, NOT_AVAILABLE } = useFormatNumber()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [formattedHigh, setFormattedHigh] = useState({
    name: NOT_AVAILABLE,
    base: NOT_AVAILABLE,
    quote: NOT_AVAILABLE,
    price: NOT_AVAILABLE,
    priceUsd: NOT_AVAILABLE,
  })
  const [formattedLow, setFormattedLow] = useState({
    name: NOT_AVAILABLE,
    base: NOT_AVAILABLE,
    quote: NOT_AVAILABLE,
    price: NOT_AVAILABLE,
    priceUsd: NOT_AVAILABLE,
  })

  useEffect(() => {
    const formatMarketData = (data: IMarketData) => ({
      name: data.name || NOT_AVAILABLE,
      base: data.base || NOT_AVAILABLE,
      quote: data.quote || NOT_AVAILABLE,
      price: formatNumberOrNA(data.price, 8),
      priceUsd: formatNumberOrNA(data.price_usd, 2),
    })

    setFormattedHigh(formatMarketData(highestMarket))
    setFormattedLow(formatMarketData(lowestMarket))
  }, [highestMarket, lowestMarket, NOT_AVAILABLE, formatNumberOrNA])

  if (isMobileBig)
    return (
      <div className={style.marketContainerMobile}>
        <div className={style.marketsWrapper}>
          <h3 className={style.sectionTitle}>{t('markets.differencePrice')}</h3>
          {!isOpen && (
            <>
              <div className={style.metricsGrid}>
                <div className={style.metricCard}>
                  <div className={style.metricLabel}>
                    {t('markets.lowestMarket')}
                  </div>
                  <div className={style.metricValue}>
                    <span style={{ color: '#1B70F1' }}>
                      {formattedLow.name}
                    </span>
                  </div>
                </div>
                <div className={style.metricCard}>
                  <div className={style.metricLabel}>
                    {t('markets.highestMarket')}
                  </div>
                  <div className={style.metricValue}>
                    <span style={{ color: '#1B70F1' }}>
                      {formattedHigh.name}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className={style.metricsGrid}>
            <div className={style.metricCard}>
              <div className={style.metricValue}>
                <span style={{ color: '#06B470' }}>${differencePrice}</span>
              </div>
            </div>
          </div>
          {isOpen && (
            <>
              <h4 className={style.sectionTitleLow}>
                {t('markets.lowestMarket')}
              </h4>
              <div className={style.metricsGrid}>
                <div className={style.metricCard}>
                  <div className={style.metricLabel}>
                    {t('differenceMarket.exchange')}
                  </div>
                  <div className={style.metricValue}>
                    <span style={{ color: '#1B70F1' }}>
                      {formattedLow.name}
                    </span>
                  </div>
                </div>
                <div className={style.metricCard}>
                  <div className={style.metricLabel}>
                    {t('differenceMarket.base')}
                  </div>
                  <div className={style.metricValue}>{formattedLow.base}</div>
                </div>
              </div>
              <div className={style.metricsGrid}>
                <div className={style.metricCard}>
                  <div className={style.metricLabel}>
                    {t('differenceMarket.currentPrice')}{' '}
                    <span>
                      {formattedLow.base}/{formattedLow.quote}
                    </span>
                  </div>
                  <div className={style.metricValue}>{formattedLow.price}</div>
                </div>
                <div className={style.metricCard}>
                  <div className={style.metricLabel}>
                    {t('differenceMarket.price')}
                  </div>
                  <div className={style.metricValue}>
                    ${formattedLow.priceUsd}
                  </div>
                </div>
              </div>
              <h4 className={style.sectionTitleHigh}>
                {t('markets.highestMarket')}
              </h4>
              <div className={style.metricsGrid}>
                <div className={style.metricCard}>
                  <div className={style.metricLabel}>
                    {t('differenceMarket.exchange')}
                  </div>
                  <div className={style.metricValue}>
                    <span style={{ color: '#1B70F1' }}>
                      {formattedHigh.name}
                    </span>
                  </div>
                </div>
                <div className={style.metricCard}>
                  <div className={style.metricLabel}>
                    {t('differenceMarket.base')}
                  </div>
                  <div className={style.metricValue}>{formattedHigh.base}</div>
                </div>
              </div>
              <div className={style.metricsGrid}>
                <div className={style.metricCard}>
                  <div className={style.metricLabel}>
                    {t('differenceMarket.currentPrice')}{' '}
                    <span>
                      {formattedHigh.base}/{formattedHigh.quote}
                    </span>
                  </div>
                  <div className={style.metricValue}>{formattedHigh.price}</div>
                </div>
                <div className={style.metricCard}>
                  <div className={style.metricLabel}>
                    {t('differenceMarket.price')}
                  </div>
                  <div className={style.metricValue}>
                    ${formattedHigh.priceUsd}
                  </div>
                </div>
              </div>
            </>
          )}
          <button
            className={style.toggleButton}
            onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          >
            {!isOpen
              ? t('differenceMarket.showMarkets')
              : t('differenceMarket.close')}
          </button>
        </div>
      </div>
    )
  return (
    <div className={style.marketContainer}>
      <div className={style.marketsWrapper}>
        <div className={style.marketsSection}>
          <div className={style.marketsItem}>
            <h3 className={style.sectionTitle}>{t('markets.lowestMarket')}</h3>
            <div className={style.marketTextContainer}>
              <p className={style.marketText}>
                {t('differenceMarket.exchange')}:{' '}
                <span style={{ color: '#1B70F1' }}>{formattedLow.name}</span>
              </p>
              <p className={style.marketText}>
                {' '}
                {t('differenceMarket.base')}: {formattedLow.base}
              </p>
              <p className={style.marketText}>
                {t('differenceMarket.currentPrice')} (
                <span>
                  {formattedLow.base}/{formattedLow.quote}
                </span>
                ): {formattedLow.price}
              </p>
              <p className={style.marketText}>
                {t('differenceMarket.price')}: ${formattedLow.priceUsd}
              </p>
            </div>
          </div>

          <div className={style.marketsItem}>
            <h3 className={style.sectionTitle}>{t('markets.highestMarket')}</h3>
            <div className={style.marketTextContainer}>
              <p className={style.marketText}>
                {t('differenceMarket.exchange')}:{' '}
                <span style={{ color: '#1B70F1' }}>{formattedHigh.name}</span>
              </p>
              <p className={style.marketText}>
                {' '}
                {t('differenceMarket.base')}: {formattedHigh.base}
              </p>
              <p className={style.marketText}>
                {t('differenceMarket.currentPrice')} (
                <span>
                  {formattedHigh.base}/{formattedHigh.quote}
                </span>
                ): {formattedHigh.price}
              </p>
              <p className={style.marketText}>
                {t('differenceMarket.price')}: ${formattedHigh.priceUsd}
              </p>
            </div>
          </div>
        </div>

        <div className={style.differencePriceSection}>
          <p className={style.differencePriceText}>
            {t('markets.differencePrice')}: ${differencePrice}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TopDifferenceMarkets

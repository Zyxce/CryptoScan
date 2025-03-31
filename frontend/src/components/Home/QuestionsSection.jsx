import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import questionsData from '../../Data/questionsData.json'
import style from './QuestionsSection.module.css'
import QuestionsAccardion from './QuestionsAccardion'

const QuestionsSection = () => {
  const { t } = useTranslation()
  const [openId, setOpenId] = useState(false)

  const isDesktop = useMediaQuery({ minWidth: 1441 })
  const isLaptop = useMediaQuery({ minWidth: 1101, maxWidth: 1440 })
  const isTablet = useMediaQuery({ minWidth: 511, maxWidth: 1100 })
  const isMobile = useMediaQuery({ maxWidth: 510 })

  function handleAccardionClick(id) {
    if (openId === id) {
      setOpenId(null)
    } else {
      setOpenId(id)
    }
  }

  return (
    <div className={style.questionsContainer}>
      <div className={style.questionsContainerTop}>
        <h2 className={style.questionsHeader}>
          {t('faq.title')} <span>{t('faq.titleHighlight')}</span>
        </h2>
        <p className={style.questionsHeaderDescription}>
          {t('faq.description')}
        </p>
      </div>
      <div className={style.questionsMidLine}></div>
      <div className={style.questionsContainerBottom}>
        {isDesktop && (
          <>
            <div className={style.questionsContainerLeft}>
              {questionsData.slice(0, 4).map((accardion) => (
                <QuestionsAccardion
                  key={accardion.id}
                  {...accardion}
                  isOpen={openId === accardion.id}
                  onAccardionClick={() => handleAccardionClick(accardion.id)}
                />
              ))}
            </div>
            <div className={style.questionsContainerRight}>
              {questionsData.slice(4, 8).map((accardion) => (
                <QuestionsAccardion
                  key={accardion.id}
                  {...accardion}
                  isOpen={openId === accardion.id}
                  onAccardionClick={() => handleAccardionClick(accardion.id)}
                />
              ))}
            </div>
          </>
        )}
        {!isDesktop && (
          <div className={style.questionsContainerLeft}>
            {questionsData.slice(0, 8).map((accardion) => (
              <QuestionsAccardion
                key={accardion.id}
                {...accardion}
                isOpen={openId === accardion.id}
                onAccardionClick={() => handleAccardionClick(accardion.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionsSection

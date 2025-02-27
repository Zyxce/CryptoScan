import React, { useState } from 'react'
import questionsData from '../../Data/questionsData.json'
import style from './QuestionsSection.module.css'
import QuestionsAccardion from './QuestionsAccardion'

const QuestionsSection = () => {
  const [openId, setOpenId] = useState(false)

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
          Frequently Asked <span>Questions</span>
        </h2>
        <p className={style.questionsHeaderDescription}>
          When an unknown printer took a galley of type and scrambled it to make
          a type specimen book.
        </p>
      </div>
      <div className={style.questionsMidLine}></div>
      <div className={style.questionsContainerBottom}>
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
      </div>
    </div>
  )
}

export default QuestionsSection

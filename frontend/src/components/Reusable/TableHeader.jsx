/**
 * Компонент TableHeader - отображает заголовки таблицы с возможностью сортировки.
 *
 * @param {Array} tableArray - Массив объектов с данными для заголовков таблицы.
 *   Каждый объект содержит:
 *     - label {string}: Текст заголовка.
 *     - field {string}: Поле, по которому будет происходить сортировка (если пустое, сортировка недоступна).
 *     - image {boolean}: Флаг, указывающий, нужно ли отображать иконку стрелки для сортировки.
 * @param {string} sortField - Текущее поле, по которому происходит сортировка.
 * @param {boolean} sortDirection - Направление сортировки:
 *   - true: по возрастанию.
 *   - false: по убыванию.
 * @param {function} toggleSort - Функция для переключения сортировки при клике на заголовок.
 *   Принимает field (поле, по которому нужно сортировать) в качестве аргумента.
 *
 */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from './reusableComponents.module.css'
import arrowTable from '../../Images/arrowTable.png'

const TableHeader = (props) => {
  const {
    tableArray,
    sortField,
    sortDirection,
    toggleSort,
    tableColumns,
    isSmallScreen,
  } = props
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const defaultOptionName = t('tableHeader.selectoption')
  const [selectedOption, setSelectedOption] = useState(defaultOptionName)

  if (isSmallScreen) {
    // const renderItem = ({ label, field, isSorting }, index) => {
    //   switch (isSorting) {
    //     case true:
    //       return (
    //         <option
    //           key={index}
    //           value={field}
    //           className={style.tableHeaderSortOption}
    //         >
    //           {label}
    //         </option>
    //       )
    //     default:
    //       return null
    //   }
    // }

    const handleSelect = (field, label) => {
      setSelectedOption(label)
      toggleSort(field)
      setIsOpen(false)
    }

    return (
      <div className={style.tableHeaderSortContainer}>
        <h4 className={style.tableHeaderSortHeader}>
          {t('tableHeader.sortby')}
        </h4>
        <div className={style.tableHeaderSortSelect}>
          {isOpen ? (
            <div
              className={style.tableHeaderCustomSelect}
              onClick={() => setIsOpen(!isOpen)}
            >
              <p className={style.tableHeaderCustomSelected}>
                {selectedOption}
              </p>

              <ul className={style.dropdownList}>
                {tableArray.map(
                  ({ label, field, isSorting }, index) =>
                    isSorting && (
                      <li
                        key={index}
                        onClick={() => handleSelect(field, label)}
                        className={style.dropdownItem}
                      >
                        {label}
                      </li>
                    )
                )}
              </ul>
            </div>
          ) : (
            <div
              className={style.tableHeaderCustomSelect}
              onClick={() => setIsOpen(!isOpen)}
            >
              <p className={style.tableHeaderCustomSelected}>
                {selectedOption}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
  return (
    <div
      className={style.tableHeader}
      style={{ gridTemplateColumns: `repeat(${tableColumns}, minmax(0, 1fr))` }}
    >
      {tableArray.map(({ label, field, isSorting }) => (
        <div
          className={
            isSorting
              ? style.tableHeaderParametersSort
              : style.tableHeaderParameters
          }
          {...(isSorting && { onClick: () => toggleSort(field) })}
        >
          <p
            className={style.tableHeaderParametersText}
            style={sortField === field ? { textDecoration: 'underline' } : {}}
          >
            {label}
          </p>
          {isSorting && (
            <img
              style={
                sortField === field
                  ? sortDirection
                    ? {}
                    : { transform: 'rotate(180deg)' }
                  : {}
              }
              src={arrowTable}
              alt={'img'}
              className={style.tableHeaderParametersImg}
            ></img>
          )}
        </div>
      ))}
    </div>
  )
}

export default TableHeader

import { useState, useEffect, useRef } from 'react'
import { GoChevronDown } from 'react-icons/go'
import classNames from 'classnames'

/**
 * Компонент выпадающего списка.
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.options - Массив объектов-опций для выбора (Обязательный).
 * @param {Object} props.options.name - Имя выпадающего списка (Обязательный).
 * @param {string} props.name - Уникальное имя элемента (Обязательный).
 * @param {boolean} props.disabled - Элемент активен/неактивен.
 * @param {string} props.label - Подпись элемента формы.
 * @param {string} props.defaultValue - Дефолтное значение компонента.
 * @param {boolean} props.required - Поле обязательно к заполнению.
 * @param {MouseEvent} onChange - Событие на изменение выбранного пункта меню.
 */
const Select = ({
  options,
  disabled,
  label,
  name,
  onChange,
  defaultValue,
  required,
}) => {
  // Стили компонента
  const selectClasses = classNames(
    'relative inline-block w-full'
    // required && error ? 'border-red-500' : ''
  )

  // Состояние, отвечающее за открытие/закрытие списка
  const [isOpen, setIsOpen] = useState(false)

  // Состояние, отвечающее за выбранную опцию
  const [selectedOption, setSelectedOption] = useState(defaultValue || '')

  // Реф для доступа к DOM-элементу списка
  const selectRef = useRef(null)

  /**
   * Обработчик открытия/закрытия списка.
   */
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  /**
   * Обработчик клика по опции списка.
   * @param {Object} option - Выбранная опция.
   */
  const handleOptionClick = (option) => {
    if (option?.value !== selectedOption) {
      setSelectedOption(option?.value)

      // Создаем объект события, аналогичный событию изменения формы
      const event = {
        target: {
          name, // Название поля формы
          value: option?.value, // Значение выбранной опции
        },
      }

      onChange && onChange(event)
    }

    setIsOpen(false)
  }

  /**
   * Обработчик клика вне компонента для закрытия списка.
   * @param {Object} event - Событие клика.
   */
  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  /**
   * Обработчик нажатия клавиши.
   * @param {Object} event - Событие нажатия клавиши.
   */
  const handleKeyPress = (event) => {
    switch (event.key) {
      case 'Escape':
        setIsOpen(false)
        break
      case 'Enter':
        setIsOpen(false)
        break
      default:
        break
    }
  }

  /**
   * Эффект для установки начального значения и добавления слушателя событий при загрузке компонента.
   */
  useEffect(() => {
    setSelectedOption(defaultValue || 'Выберите категорию:')

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [defaultValue])

  return (
    <div className={selectClasses} ref={selectRef}>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        disabled={disabled}
        type="text"
        required={required}
        value={selectedOption}
        onClick={handleToggle}
        readOnly
        className={`${
          disabled
            ? ' shadow cursor-not-allowed w-full py-2 px-3 text-gray-700 bg-gray-200 appearance-none border rounded focus:outline-none focus:shadow-outline'
            : 'max-w-80 w-full cursor-pointer border focus:outline-none focus:border-orange-500 p-2 rounded-md '
        }`}
      />
      <GoChevronDown
        className={`absolute top-1/2 mt-[4px] right-3 transform transition-transform ${
          isOpen ? 'rotate-180' : ''
        } cursor-pointer ${
          disabled ? 'pointer-events-none cursor-not-allowed' : ''
        }`}
        onClick={() => handleToggle()}
      />
      {isOpen && (
        <div className="absolute w-full mt-2 py-2 bg-white border shadow-md rounded-md">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
            >
              {option?.value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select

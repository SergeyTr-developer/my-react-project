import TextCell from './TextCell'

/**
 * Компонент строка таблицы.
 * @param {object} props - Свойства компонента.
 * @param {object} props.rowData - Объект с характеристиками передавайемой сущности.
 * @param {function} props.onDoubleClick - Функция для обработки двойного клика (событие браузера).
 * @returns {JSX.Element} Элемент JSX.
 */
const TableRow = ({ rowData, onDoubleClick }) => {
  // Получает все ключи объекта rowData, кроме ключа id
  //   const rowKeys = Object.keys(rowData || {}).filter((key) => key !== 'id')

  // Деструктурируем нужные поля из rowData
  const { name, category, description, rating, card, regular } = rowData

  // Создаем массив из этих полей
  const rowValues = [name, category, description, rating, card, regular]

  return (
    <div className="container">
      <div
        className="flex flex-row cursor-pointer hover:bg-orange-100"
        onDoubleClick={() => onDoubleClick(rowData)}
      >
        {rowValues?.map((value, index) => (
          <TextCell key={index} value={value} />
        ))}
      </div>
    </div>
  )
}

export default TableRow

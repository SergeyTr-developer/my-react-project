import { useState } from "react";

/**
 * Компонент увеличения/уменьшения количества товара.
 * @param {object} props - Свойства компонента.
 * @param {string} [props.minValue = 1] - Минимальное значение.
 * @param {string} [props.maxValue = 10] - Максимальное значение.
 * @param {number} [props.step = 1] - Шаг изменения значения.
 * @param {function} props.onQuantityUpdate - Функция коллбек для передачи данных родителю.
 * @returns {JSX.Element} Элемент JSX.
 */
export const Stepper = ({
  minValue = 1,
  maxValue = 10,
  step = 1,
  onQuantityUpdate,
}) => {
  // Стейт для увеличения/уменьшения значения в компоненте.
  const [value, setValue] = useState(minValue);

  /**
   * Обработчик увеличения значения
   */
  const handleBtnIncrement = () => {
    if (value + step <= maxValue) {
      setValue(value + step);

      onQuantityUpdate && onQuantityUpdate(value + step);
    }
  };

  /**
   * Обработчик уменьшения значения
   */
  const handleBtnDecrement = () => {
    if (value - step >= minValue) {
      setValue(value - step);

      onQuantityUpdate && onQuantityUpdate(value - step);
    }
  };

  return (
    <div className="flex items-center justify-end mb-4">
      <button
        disabled={value === 1}
        onClick={handleBtnDecrement}
        type="button"
        className="w-10 h-10 px-4 rounded-l py-2 bg-gray-200 text-gray-600 text-sm disabled:opacity-75 disabled:cursor-not-allowed"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        min={minValue}
        max={maxValue}
        readOnly
        style={{ MozAppearance: "textfield" }}
        className="w-10 h-10 text-center border-0 bg-gray-200 pointer-events-none focus:outline-none rounded-none appearance-none"
      />
      <button
        onClick={handleBtnIncrement}
        disabled={value === 10}
        type="button"
        className="w-10 h-10 px-4 rounded-r py-2 bg-gray-200 text-gray-600 text-sm disabled:opacity-75 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
};

export default Stepper;

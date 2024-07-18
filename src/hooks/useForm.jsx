import { validateForm } from '../utils/validators'
import { useState } from 'react'

/**
 * Хук для управления обработки, обновления и отправки данных формы.
 *
 * @param {Object} initialValues - Начальное состояние формы (Объект).
 * @returns {formValues} - Объект с состоянием формы.
 * @returns {handleInputChange} - Функция обработчик при смене данных в инпуте.
 * @returns {resetForm} - Функция сброса состояния формы.
 */
export function useForm(initialValues) {
  // Состояние формы, хранит значения полей
  const [formValues, setFormValues] = useState(initialValues)

  // Состояние для отслеживания ошибок валидации
  const [formErrors, setFormErrors] = useState({})

  // Обработчик при смене данных на элементе формы
  // const handleInputChange = (event) => {
  //   // Извлекаем имя поля и его новое значение из события
  //   const { name, value } = event.target;

  //   // Обновляем state формы
  //   setFormValues({
  //     ...formValues,
  //     [name]: value, // Обновляем значение поля в state
  //   });
  // };

  /**
   * Обработчик изменения значения полей формы.
   *
   * @param {Object} e - Событие изменения.
   */
  const handleInput = (e) => {
    const { name, value } = e.target

    // Обновляем состояние формы для текущего поля
    const updatedFormState = { ...formValues, [name]: value }

    setFormValues(updatedFormState)

    // Валидируем только текущее поле
    const validationErrors = {
      ...formErrors,
      [name]: validateForm({ [name]: value })[name],
    }

    console.log('ошибки в хуке', validationErrors)

    // Обновляем состояние ошибок
    setFormErrors(validationErrors)
  }

  // Функция для сброса состояния формы
  // const resetForm = () => setFormValues(initialValues)
  const resetForm = () => {
    setFormValues(initialValues);
    setFormErrors({}); // Сброс ошибок
  };

  return {
    formValues,
    formErrors,
    handleInput,
    resetForm,
  }
}

export default useForm

/**
 * Валидаторы для полей формы.
 * @property {function(string): string|null} text - Валидатор для текстового поля.
 * @property {function(string): string|null} email - Валидатор для электронной почты.
 * @property {function(string): string|null} phone - Валидатор для телефона.
 * @property {function(string): string|null} password - Валидатор для пароля.
 * @property {function(string): string|null} number - Валидатор для числовых полей.
 */
const validators = {
  /**
   * Валидатор для текстового поля.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  surname: (value) => {
    if (!value) return 'Поле, обязательное для заполнения'

    // Удаление начальных и конечных пробелов
    const trimmedValue = value.trim()

    const regexText = /^[^!>?<_\-$№#@]+$/

    if (!regexText.test(trimmedValue))
      return 'Текст не должен содержать символов !>?<_-$№#@'

    return null
  },

  name: (value) => {
    if (!value) return 'Поле, обязательное для заполнения'

    // Удаление начальных и конечных пробелов
    const trimmedValue = value.trim()

    const regexText = /^[^!>?<_\-$№#@]+$/

    if (!regexText.test(trimmedValue))
      return 'Текст не должен содержать символов !>?<_-$№#@'

    return null
  },

  /**
   * Валидатор для электронной почты.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  email: (value) => {
    if (!value) return 'field is required'

    // Удаление начальных и конечных пробелов
    const trimmedValue = value.trim()

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(trimmedValue))
      return 'Invalid email'

    return null
  },
  /**
   * Валидатор для телефона.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  // phone: (value) => {
  //   if (!value) return 'field is required'

  //   if (!/^\+?[0-9-]+$/.test(value)) return 'Invalid phone number'

  //   return null
  // },

  phone: (value) => {
    if (!value) return 'Поле, обязательное для заполнения'

    // Удаление начальных и конечных пробелов
    const trimmedValue = value.trim()

    // Маска для телефона: +7(XXX) XXX-XX-XX
    const regex = /^\+7\(\d{3}\) \d{3}-\d{2}-\d{2}$/

    if (!regex.test(trimmedValue)) return 'Неправильный номер телефона'

    return null
  },

  /**
   * Валидатор для пароля.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  password: (value) => {
    if (!value) return 'Поле, обязательное для заполнения'

    // Удаление начальных и конечных пробелов
    const trimmedValue = value.trim()

    if (trimmedValue.length < 8)
      return 'Пароль должен быть длиной не менее 8 символов'

    return null
  },

  repeatPassword: (value) => {
    if (!value) return 'Поле, обязательное для заполнения'

    // Удаление начальных и конечных пробелов
    const trimmedValue = value.trim()

    if (trimmedValue.length < 8)
      return 'Пароль должен быть длиной не менее 8 символов'

    return null
  },
  /**
   * Валидатор для числовых полей.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  number: (value) => {
    if (!value) return 'field is required'

    // Удаление начальных и конечных пробелов
    const trimmedValue = value.trim()

    if (isNaN(trimmedValue)) return 'Must be a number'

    return null
  },
}

/**
 * Функция для валидации формы на основе предоставленных валидаторов.
 *
 * @param {Object} formData - Данные формы, представленные в виде объекта.
 * @returns {Object} - Объект с сообщениями об ошибках для каждого поля формы.
 */
export function validateForm(formData) {
  // Объект для хранения сообщений об ошибках

  const validationErrors = {}

  // Итерация по каждому полю формы
  Object.entries(formData).forEach(([fieldName, value]) => {
    // Получение валидатора для текущего поля
    const validator = validators[fieldName]

    // Если валидатор существует, выполняем проверку
    if (validator) {
      // Вызов валидатора для текущего значения поля
      const errorMessage = validator(value, fieldName)

      // Если есть сообщение об ошибке, добавляем его в объект ошибок
      if (errorMessage) {
        validationErrors[fieldName] = errorMessage
      }
    }
  })

  // Возвращаем объект с сообщениями об ошибках
  return validationErrors
}

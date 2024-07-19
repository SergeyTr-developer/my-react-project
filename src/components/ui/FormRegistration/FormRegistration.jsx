import MaskedInput from 'react-text-mask'
import { useState } from 'react'
import styles from './FormRegistration.module.css'
import useForm from '../../../hooks/useForm'
import { useAuth } from '../../../hooks/useAuth'
import Input from '../Input/Input'

export const FormRegistration = ({ onClose }) => {
  const { formValues, handleInput, formErrors, resetForm } = useForm({
    phone: '',
    surname: '',
    name: '',
    password: '',
    repeatPassword: '',
  })

  console.log('данные регистрации', formValues)

  const { onRegister } = useAuth()

  // Состояние для видимости пароля
  const [passwordVisible, setPasswordVisible] = useState(false)

  const [repeatPassword, setRepeatPassword] = useState(false)

  // Обработчик для переключения видимости пароля
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  // Обработчик для переключения видимости пароля
  const toggleRepeatPassword = () => {
    setRepeatPassword(!repeatPassword)
  }

  // Функция для обработки успешной отправки формы
  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (formValues.password === formValues.repeatPassword) {
      onRegister(formValues)
      onClose() //Закрываем modal
    }
    resetForm() // Сбрасываем форму
    // setAlertOpen(true); // Показываем Alert
  }

  return (
    <div className={styles['formOverlay']}>
      <div className={styles['formContainer']}>
        <button onClick={onClose} className={styles['closeButton']}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.3536 5.64645C18.5488 5.84171 18.5488 6.15829 18.3536 6.35355L6.35355 18.3536C6.15829 18.5488 5.84171 18.5488 5.64645 18.3536C5.45118 18.1583 5.45118 17.8417 5.64645 17.6464L17.6464 5.64645C17.8417 5.45118 18.1583 5.45118 18.3536 5.64645Z"
              fill="currentColor"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.64645 5.64645C5.84171 5.45118 6.15829 5.45118 6.35355 5.64645L18.3536 17.6464C18.5488 17.8417 18.5488 18.1583 18.3536 18.3536C18.1583 18.5488 17.8417 18.5488 17.6464 18.3536L5.64645 6.35355C5.45118 6.15829 5.45118 5.84171 5.64645 5.64645Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        <dialog className={styles['dialog']}>
          <div className={styles['form-content-column']}>
            <h3 className={styles['form-title']}>Регистрация</h3>
            <form
              onSubmit={handleFormSubmit}
              className={styles['registration-form-column']}
            >
              <div className={styles['container-form-column']}>
                <div className={styles['tel-flex-wrap']}>
                  <label htmlFor="tel">
                    Телефон
                    {!formValues?.phone && (
                      <span className={styles['required']}>*</span>
                    )}
                  </label>
                  <MaskedInput
                    mask={[
                      '+',
                      '7',
                      '(',
                      /[1-9]/,
                      /\d/,
                      /\d/,
                      ')',
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                    ]}
                    
                    className={`${styles['form-input']} ${
                      formErrors.phone ? styles['error-border'] : ''
                    }`}
                    type="tel"
                    name="phone"
                    placeholder="+7(___) ___-__-__"
                    value={formValues?.phone}
                    onChange={handleInput}
                    required
                    autoComplete="off"
                  />
                  {formErrors.phone && (
                    <span className={styles['error-title']}>
                      {formErrors.phone}
                    </span>
                  )}
                </div>

                <Input
                  label="Фамилия"
                  name="surname"
                  type="text"
                  value={formValues?.surname}
                  onChange={handleInput}
                  error={formErrors?.surname}
                  autoComplete="off"
                  required
                />

                <Input
                  label="Имя"
                  name="name"
                  type="text"
                  value={formValues?.name}
                  onChange={handleInput}
                  error={formErrors?.name}
                  autoComplete="off"
                  required
                />

                <div className={styles['position']}>
                  <label htmlFor="password">
                    Пароль
                    {!formValues?.password && (
                      <span className={styles['required']}>*</span>
                    )}
                  </label>
                  <div className={styles['password-wrapper']}>
                    <input
                      className={`${styles['form-input']} ${
                        formErrors.password ? styles['error-border'] : ''
                      }`}
                      type={passwordVisible ? 'text' : 'password'}
                      name="password"
                      placeholder="Введите пароль"
                      value={formValues?.password}
                      onInput={handleInput}
                    />
                    <button
                      type="button"
                      className={styles['password-control']}
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? (
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.56643 18C7.58302 18.0301 7.60133 18.063 7.62133 18.0986C7.73999 18.3096 7.91836 18.6133 8.15439 18.9787C8.62709 19.7107 9.32783 20.6853 10.2398 21.658C12.0728 23.6132 14.6998 25.5 18 25.5C21.3002 25.5 23.9272 23.6132 25.7602 21.658C26.6722 20.6853 27.3729 19.7107 27.8456 18.9787C28.0816 18.6133 28.26 18.3096 28.3787 18.0986C28.3987 18.0631 28.417 18.0301 28.4336 18C28.417 17.9699 28.3987 17.937 28.3787 17.9014C28.26 17.6904 28.0816 17.3867 27.8456 17.0213C27.3729 16.2893 26.6722 15.3147 25.7602 14.342C23.9272 12.3868 21.3002 10.5 18 10.5C14.6998 10.5 12.0728 12.3868 10.2398 14.342C9.32783 15.3147 8.62709 16.2893 8.15439 17.0213C7.91836 17.3867 7.73999 17.6904 7.62133 17.9014C7.60133 17.937 7.58302 17.9699 7.56643 18ZM29 18C29.4472 17.7764 29.4471 17.7762 29.447 17.776L29.4459 17.7737L29.443 17.7681L29.433 17.7484C29.4243 17.7316 29.4118 17.7074 29.3953 17.6763C29.3624 17.6141 29.314 17.5244 29.2502 17.4111C29.1228 17.1846 28.934 16.8633 28.6856 16.4787C28.1896 15.7107 27.4528 14.6853 26.4898 13.658C24.5728 11.6132 21.6998 9.5 18 9.5C14.3002 9.5 11.4272 11.6132 9.51023 13.658C8.54717 14.6853 7.81041 15.7107 7.31436 16.4787C7.06602 16.8633 6.87719 17.1846 6.74976 17.4111C6.68602 17.5244 6.63759 17.6141 6.60469 17.6763C6.58824 17.7074 6.57567 17.7316 6.56701 17.7484L6.55696 17.7681L6.55414 17.7737L6.55328 17.7754C6.55317 17.7756 6.55279 17.7764 7 18L6.55279 17.7764C6.4824 17.9172 6.4824 18.0828 6.55279 18.2236L7 18C6.55279 18.2236 6.55268 18.2234 6.55279 18.2236L6.55328 18.2246L6.55414 18.2263L6.55696 18.2319L6.56701 18.2516C6.57567 18.2684 6.58824 18.2926 6.60469 18.3237C6.63759 18.3859 6.68602 18.4756 6.74976 18.5889C6.87719 18.8154 7.06602 19.1367 7.31436 19.5213C7.81041 20.2893 8.54717 21.3147 9.51023 22.342C11.4272 24.3868 14.3002 26.5 18 26.5C21.6998 26.5 24.5728 24.3868 26.4898 22.342C27.4528 21.3147 28.1896 20.2893 28.6856 19.5213C28.934 19.1367 29.1228 18.8154 29.2502 18.5889C29.314 18.4756 29.3624 18.3859 29.3953 18.3237C29.4118 18.2926 29.4243 18.2684 29.433 18.2516L29.443 18.2319L29.4459 18.2263L29.4467 18.2246C29.4468 18.2244 29.4472 18.2236 29 18ZM29 18L29.4472 18.2236C29.5176 18.0828 29.5174 17.9168 29.447 17.776L29 18Z"
                            fill="#414141"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.5 18C14.5 16.067 16.067 14.5 18 14.5C19.933 14.5 21.5 16.067 21.5 18C21.5 19.933 19.933 21.5 18 21.5C16.067 21.5 14.5 19.933 14.5 18ZM18 15.5C16.6193 15.5 15.5 16.6193 15.5 18C15.5 19.3807 16.6193 20.5 18 20.5C19.3807 20.5 20.5 19.3807 20.5 18C20.5 16.6193 19.3807 15.5 18 15.5Z"
                            fill="#414141"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.9973 10.5C17.3291 10.4985 16.663 10.5746 16.0124 10.7269C15.7435 10.7898 15.4745 10.6229 15.4116 10.354C15.3487 10.0851 15.5156 9.81612 15.7845 9.75318C16.5104 9.58327 17.2535 9.49832 17.999 9.50003C21.6985 9.50025 24.5713 11.6134 26.4882 13.6581C27.4513 14.6853 28.188 15.7107 28.6841 16.4788C28.9324 16.8633 29.1212 17.1846 29.2487 17.4111C29.3124 17.5245 29.3608 17.6142 29.3937 17.6763C29.4102 17.7074 29.4228 17.7316 29.4314 17.7485L29.4415 17.7681L29.4443 17.7737L29.4452 17.7754C29.4453 17.7757 29.4457 17.7764 28.9984 18L28.5575 17.7643C28.5158 17.8424 28.4735 17.9201 28.4306 17.9975C28.4144 17.9681 28.3966 17.936 28.3771 17.9014C28.2584 17.6905 28.0801 17.3868 27.844 17.0213C27.3713 16.2894 26.6706 15.3147 25.7587 14.342C23.9257 12.3868 21.2987 10.5 17.9984 10.5L17.9973 10.5ZM28.4306 17.9975C27.8668 19.0158 27.2055 19.9772 26.4559 20.8681C26.2781 21.0794 26.3052 21.3948 26.5165 21.5726C26.7278 21.7504 27.0432 21.7232 27.221 21.5119C28.0725 20.5001 28.816 19.402 29.4394 18.2357C29.5158 18.0927 29.5182 17.9215 29.4457 17.7764L28.9984 18C28.5512 18.2236 28.5513 18.2238 28.5513 18.2238L28.5495 18.2203L28.5421 18.2057C28.5352 18.1923 28.5244 18.1715 28.5099 18.144C28.4903 18.1071 28.4639 18.0578 28.4306 17.9975ZM12.4574 11.7566C12.625 11.976 12.5829 12.2898 12.3635 12.4574C10.3997 13.9569 8.76752 15.8451 7.56807 18.003C7.58423 18.0323 7.60198 18.0642 7.62133 18.0986C7.73999 18.3096 7.91836 18.6133 8.15439 18.9788C8.62709 19.7107 9.32783 20.6853 10.2398 21.6581C12.072 23.6124 14.6976 25.4985 17.9959 25.5C20.0369 25.4658 22.0134 24.7799 23.6369 23.5424C23.8565 23.375 24.1702 23.4173 24.3377 23.6369C24.5051 23.8565 24.4627 24.1703 24.2431 24.3377C22.4488 25.7054 20.264 26.4631 18.0082 26.5L18 26.5001C14.3002 26.5001 11.4272 24.3868 9.51023 22.342C8.54717 21.3147 7.81041 20.2894 7.31436 19.5213C7.06602 19.1368 6.87719 18.8155 6.74976 18.5889C6.68602 18.4756 6.63759 18.3859 6.60469 18.3237C6.58824 18.2926 6.57567 18.2684 6.56701 18.2516L6.55696 18.2319L6.55414 18.2263L6.55328 18.2246C6.55317 18.2244 6.55279 18.2236 7 18L6.55279 18.2236C6.48013 18.0783 6.48261 17.9068 6.55942 17.7636C7.83702 15.3827 9.60902 13.3025 11.7565 11.6626C11.976 11.495 12.2898 11.5371 12.4574 11.7566ZM16.2458 15.5392C16.4341 15.7412 16.4229 16.0576 16.2209 16.2458C15.552 16.8691 15.2767 17.8077 15.5029 18.6935C15.7291 19.5792 16.4208 20.2709 17.3066 20.4971C18.1923 20.7233 19.131 20.448 19.7542 19.7792C19.9424 19.5771 20.2588 19.566 20.4609 19.7542C20.6629 19.9425 20.6741 20.2589 20.4858 20.4609C19.6133 21.3973 18.2992 21.7827 17.0591 21.466C15.819 21.1493 14.8507 20.181 14.534 18.9409C14.2173 17.7008 14.6028 16.3867 15.5391 15.5142C15.7412 15.326 16.0576 15.3371 16.2458 15.5392Z"
                            fill="#414141"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.64645 6.64645C6.84171 6.45118 7.15829 6.45118 7.35355 6.64645L29.3536 28.6464C29.5488 28.8417 29.5488 29.1583 29.3536 29.3536C29.1583 29.5488 28.8417 29.5488 28.6464 29.3536L6.64645 7.35355C6.45118 7.15829 6.45118 6.84171 6.64645 6.64645Z"
                            fill="#414141"
                          ></path>
                        </svg>
                      )}
                    </button>
                  </div>
                  {formErrors.password && (
                    <span className={styles['error-title']}>
                      {formErrors.password}
                    </span>
                  )}
                </div>

                <div className={styles['position']}>
                  <label htmlFor="repeatPassword">
                    Повторите пароль
                    {!formValues?.repeatPassword && (
                      <span className={styles['required']}>*</span>
                    )}
                  </label>
                  <div className={styles['password-wrapper']}>
                    <input
                      className={`${styles['form-input']} ${
                        formErrors.repeatPassword ? styles['error-border'] : ''
                      }`}
                      type={repeatPassword ? 'text' : 'password'}
                      name="repeatPassword"
                      placeholder="Введите пароль"
                      value={formValues?.repeatPassword}
                      onInput={handleInput}
                    />
                    <button
                      type="button"
                      className={styles['password-control']}
                      onClick={toggleRepeatPassword}
                    >
                      {repeatPassword ? (
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.56643 18C7.58302 18.0301 7.60133 18.063 7.62133 18.0986C7.73999 18.3096 7.91836 18.6133 8.15439 18.9787C8.62709 19.7107 9.32783 20.6853 10.2398 21.658C12.0728 23.6132 14.6998 25.5 18 25.5C21.3002 25.5 23.9272 23.6132 25.7602 21.658C26.6722 20.6853 27.3729 19.7107 27.8456 18.9787C28.0816 18.6133 28.26 18.3096 28.3787 18.0986C28.3987 18.0631 28.417 18.0301 28.4336 18C28.417 17.9699 28.3987 17.937 28.3787 17.9014C28.26 17.6904 28.0816 17.3867 27.8456 17.0213C27.3729 16.2893 26.6722 15.3147 25.7602 14.342C23.9272 12.3868 21.3002 10.5 18 10.5C14.6998 10.5 12.0728 12.3868 10.2398 14.342C9.32783 15.3147 8.62709 16.2893 8.15439 17.0213C7.91836 17.3867 7.73999 17.6904 7.62133 17.9014C7.60133 17.937 7.58302 17.9699 7.56643 18ZM29 18C29.4472 17.7764 29.4471 17.7762 29.447 17.776L29.4459 17.7737L29.443 17.7681L29.433 17.7484C29.4243 17.7316 29.4118 17.7074 29.3953 17.6763C29.3624 17.6141 29.314 17.5244 29.2502 17.4111C29.1228 17.1846 28.934 16.8633 28.6856 16.4787C28.1896 15.7107 27.4528 14.6853 26.4898 13.658C24.5728 11.6132 21.6998 9.5 18 9.5C14.3002 9.5 11.4272 11.6132 9.51023 13.658C8.54717 14.6853 7.81041 15.7107 7.31436 16.4787C7.06602 16.8633 6.87719 17.1846 6.74976 17.4111C6.68602 17.5244 6.63759 17.6141 6.60469 17.6763C6.58824 17.7074 6.57567 17.7316 6.56701 17.7484L6.55696 17.7681L6.55414 17.7737L6.55328 17.7754C6.55317 17.7756 6.55279 17.7764 7 18L6.55279 17.7764C6.4824 17.9172 6.4824 18.0828 6.55279 18.2236L7 18C6.55279 18.2236 6.55268 18.2234 6.55279 18.2236L6.55328 18.2246L6.55414 18.2263L6.55696 18.2319L6.56701 18.2516C6.57567 18.2684 6.58824 18.2926 6.60469 18.3237C6.63759 18.3859 6.68602 18.4756 6.74976 18.5889C6.87719 18.8154 7.06602 19.1367 7.31436 19.5213C7.81041 20.2893 8.54717 21.3147 9.51023 22.342C11.4272 24.3868 14.3002 26.5 18 26.5C21.6998 26.5 24.5728 24.3868 26.4898 22.342C27.4528 21.3147 28.1896 20.2893 28.6856 19.5213C28.934 19.1367 29.1228 18.8154 29.2502 18.5889C29.314 18.4756 29.3624 18.3859 29.3953 18.3237C29.4118 18.2926 29.4243 18.2684 29.433 18.2516L29.443 18.2319L29.4459 18.2263L29.4467 18.2246C29.4468 18.2244 29.4472 18.2236 29 18ZM29 18L29.4472 18.2236C29.5176 18.0828 29.5174 17.9168 29.447 17.776L29 18Z"
                            fill="#414141"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.5 18C14.5 16.067 16.067 14.5 18 14.5C19.933 14.5 21.5 16.067 21.5 18C21.5 19.933 19.933 21.5 18 21.5C16.067 21.5 14.5 19.933 14.5 18ZM18 15.5C16.6193 15.5 15.5 16.6193 15.5 18C15.5 19.3807 16.6193 20.5 18 20.5C19.3807 20.5 20.5 19.3807 20.5 18C20.5 16.6193 19.3807 15.5 18 15.5Z"
                            fill="#414141"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.9973 10.5C17.3291 10.4985 16.663 10.5746 16.0124 10.7269C15.7435 10.7898 15.4745 10.6229 15.4116 10.354C15.3487 10.0851 15.5156 9.81612 15.7845 9.75318C16.5104 9.58327 17.2535 9.49832 17.999 9.50003C21.6985 9.50025 24.5713 11.6134 26.4882 13.6581C27.4513 14.6853 28.188 15.7107 28.6841 16.4788C28.9324 16.8633 29.1212 17.1846 29.2487 17.4111C29.3124 17.5245 29.3608 17.6142 29.3937 17.6763C29.4102 17.7074 29.4228 17.7316 29.4314 17.7485L29.4415 17.7681L29.4443 17.7737L29.4452 17.7754C29.4453 17.7757 29.4457 17.7764 28.9984 18L28.5575 17.7643C28.5158 17.8424 28.4735 17.9201 28.4306 17.9975C28.4144 17.9681 28.3966 17.936 28.3771 17.9014C28.2584 17.6905 28.0801 17.3868 27.844 17.0213C27.3713 16.2894 26.6706 15.3147 25.7587 14.342C23.9257 12.3868 21.2987 10.5 17.9984 10.5L17.9973 10.5ZM28.4306 17.9975C27.8668 19.0158 27.2055 19.9772 26.4559 20.8681C26.2781 21.0794 26.3052 21.3948 26.5165 21.5726C26.7278 21.7504 27.0432 21.7232 27.221 21.5119C28.0725 20.5001 28.816 19.402 29.4394 18.2357C29.5158 18.0927 29.5182 17.9215 29.4457 17.7764L28.9984 18C28.5512 18.2236 28.5513 18.2238 28.5513 18.2238L28.5495 18.2203L28.5421 18.2057C28.5352 18.1923 28.5244 18.1715 28.5099 18.144C28.4903 18.1071 28.4639 18.0578 28.4306 17.9975ZM12.4574 11.7566C12.625 11.976 12.5829 12.2898 12.3635 12.4574C10.3997 13.9569 8.76752 15.8451 7.56807 18.003C7.58423 18.0323 7.60198 18.0642 7.62133 18.0986C7.73999 18.3096 7.91836 18.6133 8.15439 18.9788C8.62709 19.7107 9.32783 20.6853 10.2398 21.6581C12.072 23.6124 14.6976 25.4985 17.9959 25.5C20.0369 25.4658 22.0134 24.7799 23.6369 23.5424C23.8565 23.375 24.1702 23.4173 24.3377 23.6369C24.5051 23.8565 24.4627 24.1703 24.2431 24.3377C22.4488 25.7054 20.264 26.4631 18.0082 26.5L18 26.5001C14.3002 26.5001 11.4272 24.3868 9.51023 22.342C8.54717 21.3147 7.81041 20.2894 7.31436 19.5213C7.06602 19.1368 6.87719 18.8155 6.74976 18.5889C6.68602 18.4756 6.63759 18.3859 6.60469 18.3237C6.58824 18.2926 6.57567 18.2684 6.56701 18.2516L6.55696 18.2319L6.55414 18.2263L6.55328 18.2246C6.55317 18.2244 6.55279 18.2236 7 18L6.55279 18.2236C6.48013 18.0783 6.48261 17.9068 6.55942 17.7636C7.83702 15.3827 9.60902 13.3025 11.7565 11.6626C11.976 11.495 12.2898 11.5371 12.4574 11.7566ZM16.2458 15.5392C16.4341 15.7412 16.4229 16.0576 16.2209 16.2458C15.552 16.8691 15.2767 17.8077 15.5029 18.6935C15.7291 19.5792 16.4208 20.2709 17.3066 20.4971C18.1923 20.7233 19.131 20.448 19.7542 19.7792C19.9424 19.5771 20.2588 19.566 20.4609 19.7542C20.6629 19.9425 20.6741 20.2589 20.4858 20.4609C19.6133 21.3973 18.2992 21.7827 17.0591 21.466C15.819 21.1493 14.8507 20.181 14.534 18.9409C14.2173 17.7008 14.6028 16.3867 15.5391 15.5142C15.7412 15.326 16.0576 15.3371 16.2458 15.5392Z"
                            fill="#414141"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.64645 6.64645C6.84171 6.45118 7.15829 6.45118 7.35355 6.64645L29.3536 28.6464C29.5488 28.8417 29.5488 29.1583 29.3536 29.3536C29.1583 29.5488 28.8417 29.5488 28.6464 29.3536L6.64645 7.35355C6.45118 7.15829 6.45118 6.84171 6.64645 6.64645Z"
                            fill="#414141"
                          ></path>
                        </svg>
                      )}
                    </button>
                  </div>
                  {formErrors.repeatPassword && (
                    <span className={styles['error-title']}>
                      {formErrors.repeatPassword}
                    </span>
                  )}
                </div>
              </div>
              <button type="submit" className={styles['login-button']}>
                Зарегистрироваться
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  )
}

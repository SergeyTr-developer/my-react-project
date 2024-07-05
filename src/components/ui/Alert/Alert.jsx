import { useEffect } from 'react'
import styles from './Alert.module.css'
import { useNavigate } from 'react-router-dom'

//  Стили для variant
const variantClasses = {
  info: styles['alert-variant-info'],
  warning: styles['alert-variant-warning'],
  success: styles['alert-variant-success'],
  error: styles['alert-variant-error'],
  neutral: styles['alert-variant-neutral'],
}

export const Alert = ({ variant = 'neutral', isOpen, subtitle, onClose }) => {
  const navigate = useNavigate() // хук для роутинга
  // Обработчик нажатия на кнопку
  const handleButtonClick = () => {
    navigate('/favorites') // переход на страницу избранного
  }
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      // Очистка таймера при размонтировании компонента или изменении `isOpen`
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  return (
    <div
      id="Alert"
      className={`${styles['alert-wraper']} ${variantClasses[variant]} ${
        isOpen ? styles['translate-y-0'] : styles['translate-y-96']
      } 
       
  
      `}
      role="alert"
    >
      {subtitle && (
        <button onClick={handleButtonClick} className={styles['alert-button']}>
          {subtitle}
        </button>
      )}
    </div>
  )
}

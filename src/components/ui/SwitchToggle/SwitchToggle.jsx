import { useState } from 'react'
import styles from './SwitchToggle.module.css'

export const SwitchToggle = () => {
  const [isChecked, setIsChecked] = useState(true) // По умолчанию включен

  const handleChange = () => {
    setIsChecked(!isChecked)
  }
  return (
    <>
      <div className={styles['toggle-flex-container']}>
        <label className={styles['switch']}>
          <input
            type="checkbox"
            className={styles['switch__input']}
            checked={isChecked}
            onChange={handleChange}
          />
          <span className={`${styles.switch__slider}`}></span>
        </label>
        <span>В наличии</span>
      </div>
    </>
  )
}

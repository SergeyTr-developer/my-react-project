import styles from './DoubleSlider.module.css'

export const DoubleSlider = () => {
  return (
    <>
      <div className={styles['doubleSlider-container']}>
        <div className={styles['circle']}></div>
        <div className={styles['line']}></div>
        <div className={styles['circle']}></div>
      </div>
    </>
  )
}

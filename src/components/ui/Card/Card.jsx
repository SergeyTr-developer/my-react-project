import styles from './Card.module.css'
/**
 * Компонент карточка.
 * @param {object} props - Свойства компонента.
 * @param {object} props.details - Детали карточки.
 * @param {string} props.details.id - Идентификатор карточки.
 * @param {string} props.details.title - Название карточки.
 * @param {string} props.details.description - Описание карточки (необязательно).
 * @param {string} [props.details.price] - Цена карточки  (необязательно).
 * @param {string} [props.details.card] - Цена карточки с картой (необязательно).
 * @param {string} [props.details.regular] - Цена карточки обычная (необязательно).
 * @param {number} [props.details.rating] - Рейтинг карточки (необязательно).
 * @param {string} props.details.imgSrc - Путь к изображению.
 * @param {string} [props.details.category] - Категория карточки.
 * @param {boolean} props.isFavorite - Карточка добавлена в сохраненки или нет (необязательно).
 * @returns {JSX.Element} Элемент JSX.
 */
export const Card = (props) => {
  const {
    id,
    title,
    description,
    price,
    card,
    regular,
    rating,
    imgSrc,
    category,
    isFavorite,
  } = props.details

  const { onToggleFavorite } = props

  // Обработчик клика на иконку сердечка
  const handleFavorite = () => {
    event.stopPropagation() // Предотвр. всплытие события
    onToggleFavorite(id)
  }

  return (
    <>
      <div className={styles['card-products']}>
        <div className={styles['pic-wrap']}>
          <img src={imgSrc} alt={title} />
          <button
            onClick={handleFavorite}
            className={`${styles['btn-icon']} ${
              isFavorite ? styles['btn-icon-active'] : ''
            }`}
          >
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.7046 2.25644C12.8299 1.13067 14.3564 0.498169 15.9482 0.498169C17.5399 0.498169 19.0664 1.13063 20.1916 2.25636C21.3174 3.38164 21.95 4.90829 21.95 6.49999C21.95 8.09174 21.3175 9.61826 20.1917 10.7435C20.1917 10.7436 20.1917 10.7435 20.1917 10.7435L11.3517 19.5835C11.1565 19.7788 10.8399 19.7788 10.6446 19.5835L1.80461 10.7435C-0.539037 8.3999 -0.539037 4.60009 1.80461 2.25644C4.14826 -0.0872086 7.94807 -0.0872087 10.2917 2.25644L10.9982 2.96289L11.7046 2.25644C11.7046 2.25641 11.7046 2.25647 11.7046 2.25644ZM15.9482 1.49817C14.6217 1.49817 13.3496 2.02528 12.4118 2.96346L11.3517 4.02355C11.258 4.11732 11.1308 4.16999 10.9982 4.16999C10.8656 4.16999 10.7384 4.11732 10.6446 4.02355L9.58461 2.96355C7.63149 1.01042 4.46484 1.01042 2.51172 2.96355C0.558594 4.91667 0.558594 8.08332 2.51172 10.0364L10.9982 18.5229L19.4846 10.0364C20.4228 9.09869 20.95 7.82648 20.95 6.49999C20.95 5.17351 20.4229 3.90138 19.4847 2.96363C18.5469 2.02544 17.2747 1.49817 15.9482 1.49817Z"
                fill="#414141"
              ></path>
            </svg>
          </button>
          <div>
            {category === 'Stock' && (
              <div className={styles['discount']}>
                <p>-50%</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles['card-description']}>
          <div className={styles['price-wrap']}>
            {category === 'Stock' ? (
              <>
                <p className={styles['price-flex-column-card']}>
                  {card} Р
                  <span className={styles['price-desc-card']}>С картой</span>
                </p>
                <p className={styles['price-flex-column-regular']}>
                  {regular} Р
                  <span className={styles['price-desc-regular']}>Обычная</span>
                </p>
              </>
            ) : (
              <>
                <p className={styles['price-flex-column-card']}>{price} Р</p>
              </>
            )}
          </div>
          <h3 className={styles['card-title']}>{description}</h3>
          <div className={styles['rating-wrap']}>
            {rating && (
              <div className={styles['card-rating']}>
                {'★'.repeat(Math.floor(rating)) +
                  '☆'.repeat(5 - Math.floor(rating))}
              </div>
            )}
          </div>

          <button className={styles['card-btn']}>В корзину</button>
        </div>
      </div>
    </>
  )
}

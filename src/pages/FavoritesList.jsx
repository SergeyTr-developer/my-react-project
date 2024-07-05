import { useState, useEffect } from 'react'
import { Card } from '../components/ui/Card/Card'
import { Alert } from '../components/ui/Alert/Alert'
import { DoubleSlider } from '../components/ui/DoubleSlider/DoubleSlider'
import { SwitchToggle } from '../components/ui/SwitchToggle/SwitchToggle'
import useProductsStore from '../store/useProductsStore'
import styles from '../styles/pages/FavoritesList.module.css'

const FavoritesList = () => {
  const { getFavoriteProducts, setFavorite, getProductById } =
    useProductsStore()

  // Локальное состояние для избранных продуктов
  const [favoritesProducts, setFavoritesProducts] = useState(
    getFavoriteProducts()
  )

  // Стейт для скрытия/показа и передачи сообщения в Alert
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: '',
  })

  // Обработчик закрытия компонента Alert
  const handleCloseAlert = () => {
    setAlertState({ ...alertState, isOpen: false })
  }

  // Обработчик добавления товара в сохраненки и показа уведомления
  const handleFavoriteAndShowAlert = (id) => {
    // Достаем из стора поле isFavorite выбранного продукта
    const { isFavorite } = getProductById(id)

    setFavorite(id) // вкл/выкл товара в сохраненки

    setAlertState({
      isOpen: true,
      message: isFavorite
        ? 'Товар удален из избранного'
        : 'Товар добавлен в избранное',
    })
  }

  useEffect(() => {
    // Обновляем локальное состояние при изменении избранных продуктов
    setFavoritesProducts(getFavoriteProducts())
  }, [getFavoriteProducts])

  return (
    <section>
      <div className="container">
        <div className={styles['position-relative']}>
          <h1 className={styles['favorites-title']}>Избранное</h1>

          <div className={styles['favorites-flex-container']}>
            <div className={styles['filter-options-box']}>
              <div className={styles['filter-options-title']}>
                <span>Фильтр</span>
              </div>
              <div className={styles['filter-flex-wraper']}>
                <div className={styles['filter-price-flex']}>
                  <span>Цена</span>
                  <button className={styles['clear-price-button']}>
                    Очистить
                  </button>
                </div>

                <div className={styles['price-input-flex']}>
                  <input
                    className={styles['filter-price-input']}
                    type="text"
                    defaultValue="10"
                  />
                  <svg
                    width="16"
                    height="2"
                    viewBox="0 0 16 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.5 1C0.5 0.723858 0.723858 0.5 1 0.5H15C15.2761 0.5 15.5 0.723858 15.5 1C15.5 1.27614 15.2761 1.5 15 1.5H1C0.723858 1.5 0.5 1.27614 0.5 1Z"
                      fill="#414141"
                    ></path>
                  </svg>
                  <input
                    className={styles['filter-price-input']}
                    type="text"
                    defaultValue="1000"
                  />
                </div>

                <DoubleSlider />
              </div>

              <div className={styles['products-name-flex']}>
                {!!favoritesProducts &&
                  favoritesProducts.map((product) => (
                    <span key={product.id}>{product.name}</span>
                  ))}
              </div>
              <div>
                <SwitchToggle />
              </div>

              <button className={styles['options-filter-button']}>
                Применить
              </button>
            </div>

            <div>
              <div className={styles['price-button-container']}>
                <button className={styles['filter-price-button']}>
                  <span className={styles['mr-8']}>Цена от 10 до 1000</span>
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
                      fill="#414141"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.64645 5.64645C5.84171 5.45118 6.15829 5.45118 6.35355 5.64645L18.3536 17.6464C18.5488 17.8417 18.5488 18.1583 18.3536 18.3536C18.1583 18.5488 17.8417 18.5488 17.6464 18.3536L5.64645 6.35355C5.45118 6.15829 5.45118 5.84171 5.64645 5.64645Z"
                      fill="#414141"
                    ></path>
                  </svg>
                </button>
                <button className={styles['filter-button-clear']}>
                  <span className={styles['mr-8']}>Очистить</span>
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
                      fill="#414141"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.64645 5.64645C5.84171 5.45118 6.15829 5.45118 6.35355 5.64645L18.3536 17.6464C18.5488 17.8417 18.5488 18.1583 18.3536 18.3536C18.1583 18.5488 17.8417 18.5488 17.6464 18.3536L5.64645 6.35355C5.45118 6.15829 5.45118 5.84171 5.64645 5.64645Z"
                      fill="#414141"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className={styles['favorites-flex-cards']}>
                {!!favoritesProducts && favoritesProducts.length > 0 ? (
                  favoritesProducts.map((product) => (
                    <Card
                      key={product.id}
                      details={product}
                      onToggleFavorite={handleFavoriteAndShowAlert}
                    />
                  ))
                ) : (
                  <div className={styles['wrapper-no_products']}>
                    <span className={styles['fw-bold']}>В избранном пусто</span>
                    <span>Добавляйте товары с помощью 🧡</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Alert
        variant="neutral"
        subtitle={alertState?.message}
        isOpen={alertState?.isOpen}
        onClose={handleCloseAlert}
      />
    </section>
  )
}

export default FavoritesList

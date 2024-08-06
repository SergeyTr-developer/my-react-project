import { useState } from 'react'
import { Card } from '../components/ui/Card/Card.jsx'
import { Alert } from '../components/ui/Alert/Alert.jsx'
import { Banner } from '../components/ui/Banner/Banner.jsx'
import useProductsStore from '../store/useProductsStore.js'
import styles from '../components/ui/Card/Card.module.css'

const Home = () => {
  // Стор для работы с продуктами
  const {
    promotionsProducts,
    newProducts,
    purchasedProducts,
    onToggleFavorite,
    getProductById,
  } = useProductsStore()

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

    onToggleFavorite(id) // вкл/выкл товара в сохраненки

    setAlertState({
      isOpen: true,
      message: isFavorite
        ? 'Товар удален из избранного'
        : 'Товар добавлен в избранное.Нажмите,чтобы перейти к списку.',
    })
  }

  

  return (
    <>
      <Banner />
      <section className="mb-120">
        <div className="container">
          <div className="heading">
            <h1>Акции</h1>
            <div>
              <button className={styles['cards-button-list']}>
                Все акции
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L7.35355 6.64645C7.54882 6.84171 7.54882 7.15829 7.35355 7.35355L1.35355 13.3536C1.15829 13.5488 0.841709 13.5488 0.646447 13.3536C0.451184 13.1583 0.451184 12.8417 0.646447 12.6464L6.29289 7L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
                    fill="#606060"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className={styles['cards-flex-wraper']}>
            {!!promotionsProducts &&
              promotionsProducts.map((product) => (
                <Card
                  key={product?.id}
                  details={product}
                  onHeartClick={handleFavoriteAndShowAlert}
                />
              ))}
          </div>
        </div>
      </section>

      <section className="mb-120">
        <div className="container">
          <div className="heading">
            <h1>Новинки</h1>
            <div>
              <button className={styles['cards-button-list']}>
                Все новинки
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L7.35355 6.64645C7.54882 6.84171 7.54882 7.15829 7.35355 7.35355L1.35355 13.3536C1.15829 13.5488 0.841709 13.5488 0.646447 13.3536C0.451184 13.1583 0.451184 12.8417 0.646447 12.6464L6.29289 7L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
                    fill="#606060"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className={styles['cards-flex-wraper']}>
            {!!newProducts &&
              newProducts.map((product) => (
                <Card
                  key={product?.id}
                  details={product}
                  onHeartClick={handleFavoriteAndShowAlert}
                />
              ))}
          </div>
        </div>
      </section>

      <section className="mb-120">
        <div className="container">
          <div className="heading">
            <h1>Покупали раньше</h1>
            <div>
              <button className={styles['cards-button-list']}>
                Все покупки
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L7.35355 6.64645C7.54882 6.84171 7.54882 7.15829 7.35355 7.35355L1.35355 13.3536C1.15829 13.5488 0.841709 13.5488 0.646447 13.3536C0.451184 13.1583 0.451184 12.8417 0.646447 12.6464L6.29289 7L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
                    fill="#606060"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className={styles['cards-flex-wraper']}>
            {!!purchasedProducts &&
              purchasedProducts.map((product) => (
                <Card
                  key={product?.id}
                  details={product}
                  onHeartClick={handleFavoriteAndShowAlert}
                />
              ))}
          </div>
        </div>
      </section>

      <Alert
        variant="neutral"
        subtitle={alertState?.message}
        isOpen={alertState?.isOpen}
        onClose={handleCloseAlert}
      />
    </>
  )
}

export default Home

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/Card/Card.jsx'
import { Alert } from '../components/ui/Alert/Alert.jsx'
import { Banner } from '../components/ui/Banner/Banner.jsx'
import Shops from '../components/Shops/Shops.jsx'
import useProductsStore from '../store/useProductsStore.js'
import useItemsStore from '../store/useItemsStore.js'
import styles from '../components/ui/Card/Card.module.css'

const Home = () => {
  const navigate = useNavigate() // хук для роутинга

  // Стор для работы с продуктами
  const { products, onToggleFavorite, getProductById } = useProductsStore()

  // Извлекаем функцию filteredProducts из хука useItemsStore,
  // которая предназначена для фильтрации списка продуктов на основе заданных критериев
  const { filteredProducts } = useItemsStore()

  // Получаем отфильтрованный список продуктов, используя функцию filteredProducts.
  // Передаем в эту функцию массив продуктов
  const productsList = filteredProducts(products)

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

  // Обработчик клика по карточке
  const handleCardClick = (id) => {
    navigate(`/cards/${id}`)
  }

  return (
    <>
      <Banner />
      <section className="mb-28">
        <div className="container">
          <div className="heading">
            <h1 className="text-4xl font-bold text-neutral-700">Акции</h1>
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
            {!!productsList && productsList.length > 0 ? (
              productsList
                .filter((product) => product.category === 'Акции') // Фильтруем продукты по категории
                .map((product) => (
                  <Card
                    key={product?.id}
                    details={product}
                    onCardClick={handleCardClick}
                    onHeartClick={handleFavoriteAndShowAlert}
                  />
                ))
            ) : (
              <span className="text-2xl">Товар отсутствует</span>
            )}
          </div>
        </div>
      </section>

      <section className="mb-28">
        <div className="container">
          <div className="heading">
            <h1 className="text-4xl font-bold text-neutral-700">Новинки</h1>
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
            {!!productsList && productsList.length > 0 ? (
              productsList
                .filter((product) => product.category === 'Новинки') // Фильтруем продукты по категории
                .map((product) => (
                  <Card
                    key={product?.id}
                    details={product}
                    onCardClick={handleCardClick}
                    onHeartClick={handleFavoriteAndShowAlert}
                  />
                ))
            ) : (
              <span className="text-2xl">Товар отсутствует</span>
            )}
          </div>
        </div>
      </section>

      <section className="mb-28">
        <div className="container">
          <div className="heading">
            <h1 className="text-4xl font-bold text-neutral-700">
              Покупали раньше
            </h1>
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
            {!!productsList && productsList.length > 0 ? (
              productsList
                .filter((product) => product.category === 'Популярные товары') // Фильтруем продукты по категории
                .map((product) => (
                  <Card
                    key={product?.id}
                    details={product}
                    onCardClick={handleCardClick}
                    onHeartClick={handleFavoriteAndShowAlert}
                  />
                ))
            ) : (
              <span className="text-2xl">Товар отсутствует</span>
            )}
          </div>
        </div>
      </section>

      <section>
        <Shops />
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

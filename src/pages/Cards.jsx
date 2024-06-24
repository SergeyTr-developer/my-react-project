import { Card } from '../components/ui/Card/Card.jsx'
import useProductsStore from '../store/useProductsStore.js'
import styles from '../components/ui/Card/Card.module.css'

const Cards = () => {
  // Стор для работы с продуктами
  const { products, setFavorite } = useProductsStore()

  const salesItems = products.filter((product) => product.category === 'Stock')
  const newItems = products.filter(
    (product) => product.category === 'New items'
  )

  const purchasedBefore = products.filter(
    (product) => product.category === 'Purchased before'
  )
  return (
    <main className="container">
      <section className="mb">
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
          {salesItems.map((product) => (
            <Card
              key={product?.id}
              details={product}
              onToggleFavorite={setFavorite}
            />
          ))}
        </div>
      </section>

      <section className="mb">
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
          {newItems.map((product) => (
            <Card
              key={product?.id}
              details={product}
              onToggleFavorite={setFavorite}
            />
          ))}
        </div>
      </section>

      <section className="mb">
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
          {purchasedBefore.map((product) => (
            <Card
              key={product?.id}
              details={product}
              onToggleFavorite={setFavorite}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Cards

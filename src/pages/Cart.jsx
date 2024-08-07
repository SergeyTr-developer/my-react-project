import { useState } from 'react'
import useProductsStore from '../store/useProductsStore'
import { Alert } from '../components/ui/Alert/Alert'
import Stepper from '../components/ui/Stepper/Stepper'
import styles from '../styles/pages/Cart.module.css'

const Cart = () => {
  // Стейт для скрытия/показа и передачи сообщения в Alert
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: '',
  })

  // Получение данных из стора (корзина товаров)
  const { cart, deleteProductFromCart } = useProductsStore()

  // Обработчик закрытия компонента Alert
  const handleCloseAlert = () => {
    setAlertState({ ...alertState, isOpen: false })
  }

  /**
   * Обработчик для удаления товара из корзины
   * @param {string} productId - id товара, который нужно удалить.
   */
  const handleDeleteProduct = (productId) => {
    deleteProductFromCart(productId)
    setAlertState({
      isOpen: true,
      message: 'Товар был удален из корзины.',
    })
  }

  return (
    <section>
      <div className="container">
        {}
        <h1 className={styles['cart-title']}>
          {!cart?.length ? 'Корзина пуста' : 'Корзина'}
        </h1>
        {cart?.length > 0 && (
          <div className={styles['cart-flex-container']}>
            {cart?.map((item) => (
              <div key={crypto?.randomUUID()}>
                <div className={styles['cart-flex-wrapper']}>
                  <div></div>
                  <div className="pb-3">
                    <img
                      src={item?.imgSrc}
                      alt={item?.title}
                      className={styles['cart-small-image']}
                    />
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div>
                      <p className={styles['cart-item-description']}>
                        {item?.description}
                      </p>
                      {item.category === 'Акции' ? (
                        <div className="flex gap-2">
                          <p className="flex flex-col ">
                            <span className={styles['cart-item-card']}>
                              {item?.card} ₽
                            </span>
                            <span className={styles['cart-price-desc']}>
                              С картой
                            </span>
                          </p>

                          <p className="flex flex-col">
                            <span className={styles['cart-item-regular']}>
                              {item?.regular} ₽
                            </span>
                            <span className={styles['cart-price-desc']}>
                              Обычная
                            </span>
                          </p>
                          <span className={styles['cart-item-one']}>
                            за шт.
                          </span>
                          <span className={styles['cart-item-discount']}>
                            -50%
                          </span>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <span className={styles['cart-item-card']}>
                            {item?.regular} ₽
                          </span>
                          <span className={styles['cart-item-one']}>
                            за шт.
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mr-36">
                      <Stepper
                        step={1}
                        minValue="1"
                        maxValue="10"
                        id={item?.id}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteProduct(item.id)}
                    className="absolute top-0 right-0"
                  >
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
                </div>
              </div>
            ))}
          </div>
        )}
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

export default Cart

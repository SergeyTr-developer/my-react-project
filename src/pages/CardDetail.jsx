import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useProductsStore from '../store/useProductsStore'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
// import Alert from '../components/ui/Alert/Alert'
import { Alert } from '../components/ui/Alert/Alert'

const CardDetail = () => {
  // Получение id из адресной строки через React-router-dom
  const { id } = useParams()

  // Стор для работы с продуктами
  const { getProductById, onToggleFavorite, addToCart } = useProductsStore()

  // Стейт для показа/скрытия и передачи сообщения в Alert
  //   const [alertState, setAlertState] = useState({
  //     isOpen: false,
  //     title: '',
  //     subtitle: '',
  //   })

  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: '',
  })

  // Обработчик закрытия компонента Alert
  const handleCloseAlert = () => {
    setAlertState({ ...alertState, isOpen: false })
  }

  // Находим карточку по id.
  const product = getProductById(id)

  // Обработчик добавления товара в корзину
  const handleAddToCart = () => {
    addToCart(product)
    setAlertState({
      isOpen: true,
      message: 'Товар успешно добавлен в корзину.',
    })
  }

  return (
    <section className="card-details mt-5">
      <div className="container">
        <Link
          to="/"
          className="inline-flex text-orange-700 hover:text-orange-800 mb-8"
        >
          <IoIosArrowBack className="mr-1 w-5 h-5" />
          Назад
        </Link>
        <h2 className="mb-4 text-4xl font-bold text-zinc-800">
          {product?.name}
        </h2>
        <div className="max-w-md rounded shadow-lg relative">
          <div className="relative">
            <div className="absolute inset-0   rounded"></div>
            <img
              className="w-full rounded"
              src={product?.imgSrc}
              alt={product?.title}
            />
          </div>

          <button
            className={`absolute top-0 right-0 m-2 p-2 rounded-full ${
              product?.isFavorite ? 'text-orange-500' : 'text-slate-500'
            }`}
            onClick={() => onToggleFavorite(id)}
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
            </svg>
          </button>
          <div className="px-6 py-4">
            <p className="text-gray-600 text-lg mb-2">{product?.description}</p>
            <p className="text-gray-600 text-base mb-2">{product?.category}</p>
            {product?.rating && (
              <div className="text-orange-500 mb-2">
                {'★'.repeat(Math.floor(product?.rating)) +
                  '☆'.repeat(5 - Math.floor(product?.rating))}
              </div>
            )}
            {/* <div className="text-lg font-bold mb-2">{product?.card} Р</div> */}
            {product.category === 'Акции' ? (
              <>
                <div className="flex justify-between mb-2  ">
                  <p className="flex flex-col">
                    {product.card} Р<span>С картой</span>
                  </p>
                  <p className="flex flex-col">
                    {product.regular} Р<span>Обычная</span>
                  </p>
                </div>
              </>
            ) : (
              <div className="text-lg font-bold mb-2">{product?.regular} Р</div>
            )}

            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              В корзину
            </button>
          </div>
        </div>
      </div>

      {/* <Alert
        title={alertState?.title}
        subtitle={alertState?.subtitle}
        variant="neutral"
        isOpen={alertState?.isOpen}
        onClose={() => setAlertState(!alertState?.isOpen)}
      /> */}

      <Alert
        variant="neutral"
        subtitle={alertState?.message}
        isOpen={alertState?.isOpen}
        onClose={handleCloseAlert}
      />
    </section>
  )
}

export default CardDetail

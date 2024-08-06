import { create } from 'zustand'
// import { initialProducts } from '../../data'

/**
 * Стор для управления продуктами и состоянием сохраненных продуктов.
 */
const useProductsStore = create((set, get) => {
  // Инициализация переменной для хранения продуктов
  let products
  let promotionsProducts
  let newProducts
  let purchasedProducts

  // Загрузка избранных продуктов из localStorage.
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []

  // Загрузка товаров корзины из localStorage.
  const storedCart = JSON?.parse(localStorage?.getItem('cart')) || []

  ;(async () => {
    try {
      // Выполнение запроса
      const response = await fetch('http://localhost:3000/products')

      if (!response?.ok) {
        throw new Error('Failed to fetch products')
      }

      // Асинхронная сериализация
      const data = await response?.json()

      // Перезапись переменной на полученные данные
      products = data?.map((product) => ({
        ...product,
        isFavorite: storedFavorites?.includes(product?.id),
      }))

      // Карточки товара по категориям
      const promotionsProducts = products.filter(
        (product) => product.category === 'Акции'
      )

      const newProducts = products.filter(
        (product) => product.category === 'Новинки'
      )

      const purchasedProducts = products.filter(
        (product) => product.category === 'Покупали'
      )

      set({ products, promotionsProducts, newProducts, purchasedProducts })
    } catch (error) {
      console.error('Error fetching products')
    }
  })()

  // Инициализация продуктов с учетом сохраненных состояний
  // const products = initialProducts?.map((product) => ({
  //   ...product,
  //   isFavorite: storedFavorites?.includes(product?.id),
  // }))

  /**
    Находит продукт по id.
    @param {string} id - id продукта.
    @returns {Object|null} Возвращает найденный продукт или null.
    */
  const getProductById = (id) =>
    products?.find((product) => product?.id === id) || null

  /**
   * Переключает состояние сохраненного продукта по id.
   * @param {string} id - id продукта.
   */
  const onToggleFavorite = (id) => {
    // Обновляем продукты на странице, переключая состояние сохраненного продукта
    const updatedProducts = products?.map((product) => {
      if (product?.id === id) {
        product.isFavorite = !product?.isFavorite
      }

      return product
    })

    // Обновляем id сохраненок для записи в localStorage
    const updatedFavorites = updatedProducts
      ?.filter((product) => product?.isFavorite)
      ?.map((product) => product?.id)

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))

    // Обновляем состояние.
    set({
      products: updatedProducts,
    })
  }

  /**
   * Получает все сохраненные продукты.
   * @returns {Array} Массив всех сохраненных продуктов.
   */
  const getFavoriteProducts = () =>
    products?.filter((product) => product?.isFavorite)

  /**
   * Функция добавления товаров в корзину
   * @param {Object} product - Данные товара.
   * @returns {void}
   */
  const addToCart = (product) => {
    const updatedCart = [...get().cart, { ...product, quantity: 1 }]

    localStorage?.setItem('cart', JSON?.stringify(updatedCart))

    set({ cart: updatedCart })
  }

  /**
   * Функция удаления товара из корзины
   * @param {string} productId - id товара.
   * @returns {void}
   */
  const deleteProductFromCart = (productId) => {
    const updatedCart = get()?.cart?.filter(
      (product) => product?.id !== productId
    )

    localStorage?.setItem('cart', JSON?.stringify(updatedCart))

    set({ cart: updatedCart })
  }

  return {
    products,
    promotionsProducts,
    newProducts,
    purchasedProducts,
    getProductById,
    onToggleFavorite,
    getFavoriteProducts,
    cart: storedCart,
    addToCart,
    deleteProductFromCart,
  }
})

export default useProductsStore

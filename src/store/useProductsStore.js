import { create } from 'zustand'
// import { initialProducts } from '../../data'

/**
 * Стор для управления продуктами и состоянием сохраненных продуктов.
 */
const useProductsStore = create((set, get) => {
  // Инициализация переменной для хранения продуктов

  let products = []

  // Загрузка избранных продуктов из localStorage.
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []

  // Загрузка товаров корзины из localStorage.
  const storedCart = JSON?.parse(localStorage?.getItem('cart')) || []

  // /**
  //  * Асинхронная функция для получения списка товаров и обновления состояния.
  //  */

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

      set({ products })
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

  /**
   * Функция увеличения/уменьшения количества товара.
   * @param {string} quantity - Количество (значение).
   * @param {string} productId - id товара.
   */
  const updateCartQuantity = (quantity, productId) => {
    const updatedCart = get()?.cart?.map((item) => {
      if (item?.id === productId) {
        return { ...item, quantity }
      }
      return item
    })

    localStorage.setItem('cart', JSON.stringify(updatedCart))

    set({ cart: updatedCart })
  }

  /**
   * Получает общее количество добавленных ранее товаров в корзину.
   * @returns {Array} Массив всех добавленных ранее товаров.
   */
  const getAllCartProducts = () => {
    return get().cart?.reduce((total, product) => {
      return total + product?.quantity
    }, 0)
  }

  return {
    products,
    getProductById,
    onToggleFavorite,
    getFavoriteProducts,
    cart: storedCart,
    addToCart,
    updateCartQuantity,
    getAllCartProducts,
    deleteProductFromCart,
  }
})

export default useProductsStore

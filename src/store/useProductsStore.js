import { create } from 'zustand'
import { initialProducts } from '../../data.js'

/**
 * Стор для управления продуктами и состоянием сохраненных продуктов.
 */
const useProductsStore = create((set) => {
  // Загрузка избранных продуктов из localStorage.
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []

  // Инициализация продуктов с учетом сохраненных состояний
  const products = initialProducts?.map((product) => ({
    ...product,
    isFavorite: storedFavorites?.includes(product?.id),
  }))

  /**
   * Переключает состояние сохраненного продукта по id.
   * @param {string} id - id продукта.
   * @returns {Object} Возвращает обновленное состояние продуктов.
   */
  const setFavorite = (id) =>
    set((state) => {
      // Обновляем продукты на странице, переключая состояние сохраненного продукта
      const updatedProducts = state?.products?.map((product) => {
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

      // Возвращаем обновленное состояние продуктов
      return { products: updatedProducts }
    })

  return {
    products,
    setFavorite,
  }

  // {
  //   products: [...], // массив продуктов (это и есть state, который принимает стор)
  //   toggleFavorite: function, // функция для переключения состояния сохраненного продукта по id
  // }
})

export default useProductsStore

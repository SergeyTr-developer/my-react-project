import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import useProductsStore from '../../../store/useProductsStore'
import { AuthModal } from '../AuthModal/AuthModal'
import { useAuth } from '../../../hooks/useAuth'
import styles from './Header.module.css'

/**
 * Компонент Шапка.
 * @returns {JSX.Element} Элемент header.
 */
const Header = () => {
  const location = useLocation()

  const navigate = useNavigate() // хук для роутинга

  const { user, onLogout } = useAuth()

  const bodyRef = useRef(document.body)

  // Стейт для скрытия/показа модалки
  const [isModal, setIsModal] = useState(false)

  //функцию которая показывает модалку
  const handleOpenModal = () => {
    setIsModal(true)
  }

  // Использование useEffect для управления классом 'no-scroll'
  useEffect(() => {
    const bodyLink = bodyRef.current

    if (isModal) {
      bodyLink.classList.add('no-scroll')
    } else {
      bodyLink.classList.remove('no-scroll')
    }

    // Очистка при размонтировании компонента
    return () => {
      bodyLink.classList.remove('no-scroll')
    }
  }, [isModal]) // Зависимость от состояния isModal

  //функцию которая скрывает модалку
  const handleCloseModal = () => {
    setIsModal(false)
  }

  // Количество сохраненных ранее товаров, корзины и общего кол-ва в корзине
  const { getFavoriteProducts, getAllCartProducts, cart } = useProductsStore()

  // Стейт для хранения количества товаров в корзине
  const [cartCount, setCartCount] = useState(0)

  const favoriteProducts = getFavoriteProducts()

  useEffect(() => {
    setCartCount(getAllCartProducts())
  }, [cart, getAllCartProducts])

  // Показ страницы с сохраненками
  const handleOpenFavorites = () => {
    navigate(`/favorites`)
  }

  // Показ страницы админ
  const handleOpenAdmin = () => {
    navigate(`/admin`)
  }

  // Показ страницы корзина товаров
  const handleToCartOpen = () => {
    navigate(`/cart`)
  }

  /**
   * Определяет, активна ли ссылка.
   * @param {string} path - Путь ссылки.
   * @returns {boolean} ссылка активна или нет.
   */
  const isActiveLink = (path) => {
    return (
      location?.pathname === path ||
      (path === '/favorites' && location?.pathname?.startsWith('/favorites'))
    )
  }

  return (
    <header>
      <nav className="container">
        <div className={styles['header-flex-wraper']}>
          <Link to="/">
            <picture>
              <source
                srcSet="/assets/products/logo-header-table.svg"
                media="(max-width: 975px)"
              />
              <img
                className="max-w-none"
                src="/assets/products/logo-header.svg"
                alt="logo-image"
              />
            </picture>
          </Link>

          <div className={styles['catalog-flex']}>
            {!user || user?.role === 'user' ? (
              <button className={styles['catalog-btn_menu']}>
                <img
                  src="../assets/products/catalog-icon _ menu.svg"
                  alt="catalog-icon_menu"
                />
                <span className={`${styles['mr-8']} ${styles['pl-16']}`}>
                  Каталог
                </span>
              </button>
            ) : null}

            <form className={styles['search-wrapper']}>
              <input
                className={styles['search__input']}
                type="text"
                placeholder="Найти товар"
              />
              <button className={styles['search-btn-icon']}>
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
                    d="M2.5 10.5C2.5 6.08172 6.08172 2.5 10.5 2.5C14.9183 2.5 18.5 6.08172 18.5 10.5C18.5 14.9183 14.9183 18.5 10.5 18.5C6.08172 18.5 2.5 14.9183 2.5 10.5ZM10.5 3.5C6.63401 3.5 3.5 6.63401 3.5 10.5C3.5 14.366 6.63401 17.5 10.5 17.5C14.366 17.5 17.5 14.366 17.5 10.5C17.5 6.63401 14.366 3.5 10.5 3.5Z"
                    fill="#414141"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.4463 15.4464C15.6415 15.2512 15.9581 15.2512 16.1534 15.4464L21.3534 20.6464C21.5486 20.8417 21.5486 21.1583 21.3534 21.3535C21.1581 21.5488 20.8415 21.5488 20.6463 21.3535L15.4463 16.1535C15.251 15.9583 15.251 15.6417 15.4463 15.4464Z"
                    fill="#414141"
                  ></path>
                </svg>
              </button>
            </form>
          </div>

          <div className={styles['authorization-flex']}>
            <div className={styles['list-items-flex']}>
              <button
                onClick={handleOpenFavorites}
                className={`${styles['list-items-btn']} ${
                  isActiveLink('/favorites') ? 'active' : ''
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 23 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.2046 2.25644C13.3299 1.13067 14.8564 0.498169 16.4482 0.498169C18.0399 0.498169 19.5664 1.13063 20.6916 2.25636C21.8174 3.38164 22.45 4.90829 22.45 6.49999C22.45 8.09174 21.8175 9.61826 20.6917 10.7435C20.6917 10.7436 20.6917 10.7435 20.6917 10.7435L11.8517 19.5835C11.6565 19.7788 11.3399 19.7788 11.1446 19.5835L2.30461 10.7435C-0.0390375 8.3999 -0.0390373 4.60009 2.30461 2.25644C4.64826 -0.0872086 8.44807 -0.0872087 10.7917 2.25644L11.4982 2.96289L12.2046 2.25644C12.2046 2.25641 12.2046 2.25647 12.2046 2.25644ZM16.4482 1.49817C15.1217 1.49817 13.8496 2.02528 12.9118 2.96346L11.8517 4.02355C11.758 4.11732 11.6308 4.16999 11.4982 4.16999C11.3656 4.16999 11.2384 4.11732 11.1446 4.02355L10.0846 2.96355C8.13149 1.01042 4.96484 1.01042 3.01172 2.96355C1.05859 4.91667 1.05859 8.08332 3.01172 10.0364L11.4982 18.5229L19.9846 10.0364C20.9228 9.09869 21.45 7.82648 21.45 6.49999C21.45 5.17351 20.9229 3.90138 19.9847 2.96363C19.0469 2.02544 17.7747 1.49817 16.4482 1.49817Z"
                    fill="#414141"
                  ></path>
                </svg>
                {!!favoriteProducts?.length && (
                  <span className={styles['favorites-counter']}>
                    {favoriteProducts?.length}
                  </span>
                )}
                <span>Избранное</span>
              </button>

              <button className={styles['list-items-btn']}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 22 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.3325 1.89776C10.3324 1.89785 10.3327 1.89767 10.3325 1.89776L2.33366 5.89721L2.33255 5.89776C1.82288 6.15102 1.50045 6.67089 1.50005 7.24V16.7635C1.49608 17.3334 1.81541 17.8563 2.32416 18.113C2.32387 18.1129 2.32445 18.1132 2.32416 18.113L10.3237 22.1128C10.7462 22.3242 11.2438 22.3243 11.6663 22.1129L19.6664 18.1128L19.6675 18.1122C20.1773 17.8589 20.4997 17.3389 20.5 16.7697V7.24026C20.4997 6.67105 20.1773 6.15106 19.6675 5.89776L19.6664 5.89721L11.6675 1.89776C11.6674 1.89767 11.6677 1.89786 11.6675 1.89776C11.2474 1.6892 10.7527 1.68919 10.3325 1.89776ZM9.88755 1.00223C10.5883 0.654 11.4118 0.654 12.1125 1.00223L12.1137 1.00278L20.1125 5.00223C20.1124 5.00215 20.1127 5.00231 20.1125 5.00223C20.9618 5.42448 21.4995 6.29123 21.5 7.23973V16.77C21.4995 17.7184 20.9624 18.5852 20.1132 19.0074C20.113 19.0075 20.1134 19.0073 20.1132 19.0074L12.1138 23.0071C12.1138 23.0072 12.1138 23.0071 12.1138 23.0071C11.4097 23.3594 10.5806 23.3595 9.87644 23.0072C9.87639 23.0072 9.87649 23.0072 9.87644 23.0072L1.87644 19.0072L1.87506 19.0065C1.02685 18.5791 0.494133 17.708 0.500049 16.7584V7.24C0.500552 6.29154 1.03772 5.4248 1.88695 5.00253C1.88675 5.00263 1.88715 5.00243 1.88695 5.00253L9.88644 1.00278L9.88755 1.00223Z"
                    fill="#414141"
                  ></path>
                </svg>
                <span>Заказы</span>
              </button>

              <button
                onClick={handleToCartOpen}
                className={`${styles['list-items-btn']} ${
                  isActiveLink('/cart') ? 'active' : ''
                }`}
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
                    d="M5.5 21C5.5 19.6193 6.61929 18.5 8 18.5C9.38071 18.5 10.5 19.6193 10.5 21C10.5 22.3807 9.38071 23.5 8 23.5C6.61929 23.5 5.5 22.3807 5.5 21ZM8 19.5C7.17157 19.5 6.5 20.1716 6.5 21C6.5 21.8284 7.17157 22.5 8 22.5C8.82843 22.5 9.5 21.8284 9.5 21C9.5 20.1716 8.82843 19.5 8 19.5Z"
                    fill="#414141"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.5 21C17.5 19.6193 18.6193 18.5 20 18.5C21.3807 18.5 22.5 19.6193 22.5 21C22.5 22.3807 21.3807 23.5 20 23.5C18.6193 23.5 17.5 22.3807 17.5 21ZM20 19.5C19.1716 19.5 18.5 20.1716 18.5 21C18.5 21.8284 19.1716 22.5 20 22.5C20.8284 22.5 21.5 21.8284 21.5 21C21.5 20.1716 20.8284 19.5 20 19.5Z"
                    fill="#414141"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 0.5C0.723858 0.5 0.5 0.723858 0.5 1C0.5 1.27614 0.723858 1.5 1 1.5H4.58051C5.33783 5.79147 6.10333 10.0643 6.74931 14.3709C6.93288 15.5947 7.98416 16.5 9.22165 16.5H19.3597C20.5514 16.5 21.5774 15.6588 21.8111 14.4903L23.2503 7.29417C23.436 6.36599 22.726 5.5 21.7795 5.5H7.16046C6.8575 5.5 6.57797 5.58901 6.34436 5.74093L5.49239 0.913107C5.45023 0.674179 5.24262 0.5 5 0.5H1ZM6.666 7.07417C6.62065 6.77187 6.85478 6.5 7.16046 6.5H21.7795C22.095 6.5 22.3316 6.78866 22.2698 7.09806L20.8305 14.2942C20.6903 14.9953 20.0747 15.5 19.3597 15.5H9.22165C8.47916 15.5 7.84839 14.9568 7.73825 14.2225L6.666 7.07417Z"
                    fill="#414141"
                  ></path>
                </svg>
                <span>Корзина</span>
                {!!cartCount && (
                  <span className="absolute top-[-4px] right-[5px] bg-[#f63] text-white flex justify-center items-center px-1 font-size-[10px] leading-[14px] rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {user?.role === 'admin' && (
                <button
                  onClick={handleOpenAdmin}
                  className={`${styles['list-items-btn']} ${
                    isActiveLink('/admin') ? 'active' : ''
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 14V16C8.686 16 6 18.686 6 22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM21 17H22V22H14V17H15V16C15 14.3431 16.3431 13 18 13C19.6569 13 21 14.3431 21 16V17ZM19 17V16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16V17H19Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    ></path>
                  </svg>

                  <span className="font-black ">Админка</span>
                </button>
              )}
            </div>
            {!user ? (
              <button
                onClick={handleOpenModal}
                className={styles['authorization-button']}
              >
                <span className="w-10 h-10"></span>
                <span>Войти</span>
                <span className="w-10 h-10"></span>
              </button>
            ) : (
              <button
                onClick={onLogout}
                className={styles['authorization-button']}
              >
                <span className="w-10 h-10"></span>

                {user?.role === 'admin' ? 'Админ' : user?.name}
                <span className="w-10 h-10"></span>
              </button>
            )}
          </div>
        </div>
      </nav>
      {isModal && <AuthModal onClose={handleCloseModal} />}
    </header>
  )
}

export default Header

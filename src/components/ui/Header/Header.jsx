import { NavLink, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

/** Массив пунктов меню */
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Cards', path: '/cards' },
]

/**
 * Компонент Шапка.
 * @returns {JSX.Element} Элемент header.
 */
const Header = () => {
  const location = useLocation()

  /**
   * Определяет, активна ли ссылка.
   * @param {string} path - Путь ссылки.
   * @returns {boolean} ссылка активна или нет.
   */
  const isActiveLink = (path) => {
    return (
      location?.pathname === path ||
      (path === '/cards' && location?.pathname?.startsWith('/cards'))
    )
  }

  return (
    <header>
      <nav className="container">
        <div className={styles['header-flex-wraper']}>
          <NavLink to="/">My App</NavLink>
          <div className={styles['link-item']}>
            {navItems?.map((item) => (
              <NavLink
                to={item?.path}
                key={item?.path}
                className={` ${isActiveLink(item?.path) ? 'active' : ''}`}
              >
                {item?.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

import { NavLink } from 'react-router-dom'
import styles from './Footer.module.css'

/** Массив пунктов меню */
const navItems = [
  { name: 'О компании', path: '/aboutCompany' },
  { name: 'Контакты', path: '/contacts' },
  { name: 'Вакансии', path: '/vacancies' },
  { name: 'Статьи', path: '/articles' },
  { name: 'Политика обработки персональных данных', path: '/dataProcessing' },
]

const Footer = () => {
  const isActiveLink = (path) => {
    return (
      location?.pathname === path ||
      (path === '/aboutCompany' &&
        location?.pathname?.startsWith('/aboutCompany'))
    )
    // return location?.pathname === path; // Если нет вложенных страниц
  }

  return (
    <footer className={styles['footer']}>
      <img
        className={styles['footer__bg-image']}
        src="../assets/products/footer_background_picture.png"
        alt="footer_background"
      />
      <div className="container">
        <div className={styles['footer-nav-container']}>
          <div className={styles['logo-nav-flex']}>
            <div>
              <img
                src="../assets/products/logo-footer.svg"
                alt="logo_footer_picture"
              />
            </div>

            <div className={styles['footer-nav-flex']}>
              {navItems.map((item) => {
                return (
                  <NavLink
                    to={item.path}
                    key={item.path}
                    className={`${styles['nav-link']} ${
                      isActiveLink(item?.path) ? 'nav-link-active' : ''
                    }`}
                  >
                    {item.name}
                  </NavLink>
                )
              })}
            </div>
          </div>
          <div className={styles['social-tel-flex']}>
            <div className={styles['footer-social-box']}>
              <button>
                <img
                  src="../assets/products/instagram.svg"
                  alt="instagram-picture"
                />
              </button>
              <button>
                <img src="../assets/products/vk.svg" alt="vk-picture" />
              </button>
              <button>
                <img
                  src="../assets/products/facebook.svg"
                  alt="facebook-picture"
                />
              </button>
              <button>
                <img src="../assets/products/ok.svg" alt="ok-picture" />
              </button>
            </div>
            <div>
              <button className={styles['tel-btn-flex']}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.530549 3.62795C0.29859 1.78205 1.87862 0.5 3.57554 0.5H7.1672C7.89213 0.5 8.51333 1.01844 8.64301 1.73167L9.24935 5.06653C9.43046 6.06268 9.17133 7.08845 8.53884 7.87906L7.81545 8.7833C7.68654 8.94444 7.67475 9.15809 7.77434 9.32047C8.2439 10.0862 9.08857 11.3797 9.85533 12.1464C10.6221 12.9132 11.9156 13.7579 12.6813 14.2274C12.8437 14.327 13.0573 14.3152 13.2185 14.1863L14.1227 13.4629C14.9133 12.8304 15.9391 12.5713 16.9352 12.7524L20.2701 13.3588C20.9833 13.4885 21.5018 14.1096 21.5018 14.8346V18.1816C21.5018 20.0032 20.0508 21.624 18.1171 21.313C14.8045 20.7803 10.0694 19.0768 6.13538 14.8402C2.31033 10.7209 0.893311 6.51475 0.530549 3.62795ZM3.57554 1.5C2.31103 1.5 1.38547 2.41084 1.52275 3.50326C1.86104 6.19537 3.19444 10.2034 6.86818 14.1598C10.6177 18.1977 15.1307 19.8199 18.2758 20.3257C19.4703 20.5178 20.5018 19.5285 20.5018 18.1816V14.8346C20.5018 14.5929 20.329 14.3859 20.0912 14.3426L16.7564 13.7363C16.0448 13.6069 15.3121 13.792 14.7474 14.2438L13.8432 14.9672C13.3653 15.3495 12.6937 15.4081 12.1585 15.0799C11.3953 14.6119 10.008 13.7133 9.14823 12.8536C8.28849 11.9938 7.3899 10.6064 6.92187 9.84326C6.59367 9.30809 6.65231 8.63644 7.03458 8.15861L7.75797 7.25437C8.20975 6.68964 8.39485 5.95695 8.26548 5.24541L7.65914 1.91056C7.61591 1.67281 7.40885 1.5 7.1672 1.5H3.57554Z"
                    fill="#414141"
                  ></path>
                </svg>
                8 800 777 33 33
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import SwiperComponent from '../../../libs/swiper/SwiperComponent'
import styles from './Banner.module.css'

export const Banner = () => {
  return (
    <section>
      <div className={styles['banner-position']}>
        <img
          className={styles['banner-image']}
          src="../assets/products/banner.svg"
          alt="banner-image"
        />
        <div className="container">
          <div className={styles['products-banner-position']}>
            <div className={styles['banner__image']}>
              <picture>
                <source
                  srcSet="../assets/products/products-banner-smail.png"
                  media="(max-width: 975px)"
                />
                <img
                  className={styles['products-banner']}
                  src="../assets/products/products-banner.png"
                  alt="products-image"
                />
              </picture>
            </div>

            {/* <div className={styles['banner__text']}>
              <h1 className="text-6xl text-neutral-700">
                Доставка бесплатно от 1000 ₽
              </h1>
            </div> */}
            <SwiperComponent />
          </div>
        </div>
      </div>
    </section>
  )
}

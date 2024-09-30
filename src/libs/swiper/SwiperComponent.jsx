import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import styles from '../../components/ui/Banner/Banner.module.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'

const SwiperComponent = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 3000, //  Задержка перед переключением слайдов (в миллисекундах)
      }}
    >
      <SwiperSlide>
        <div className={styles['banner__text']}>
          <h2 className="text-6xl text-neutral-700">
            Северяночка — Доставим с улыбкой бесплатно от 1000 ₽.
          </h2>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles['banner__text']}>
          <h2 className="text-6xl text-neutral-700">
            Северяночка — Лучшие продукты для вашей семьи.
          </h2>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles['banner__text']}>
          <h2 className="text-6xl text-neutral-700">
            Северяночка — Свежесть, которой можно доверять.
          </h2>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default SwiperComponent

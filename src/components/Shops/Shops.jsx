import { useState } from 'react'

/** Массив пунктов маршрута */
const navItems = [
  { name: 'п.Щельяюр' },
  { name: 'д.Вертеп' },
  { name: 'с.Краснобор' },
  { name: 'д.Диюр' },
]

const Shops = () => {
  const [isActiveButton, setIsActiveButton] = useState(0)

  return (
    <div>
      <div className="container">
        <h1 className="text-4xl font-bold text-neutral-700 mb-10">
          Наши магазины
        </h1>
        <div className="flex gap-6 mb-6">
          {navItems.map((item, index) => {
            return (
              <button
                key={index}
                className={`p-2 rounded bg-gray-100 text-sm font-normal text-neutral-600 ${
                  isActiveButton === index ? 'bg-green-400 text text-white' : ''
                }`}
                onClick={() => setIsActiveButton(index)}
              >
                {item.name}
              </button>
            )
          })}
        </div>
        {isActiveButton === 0 && (
          <div className="pointer-events-none">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=53.4076685%2C65.325498&z=11&l=map&pt=53.4076685%2C65.325498,pm2rdl"
              width="100%"
              height="354"
              frameBorder="0"
            ></iframe>
          </div>
        )}

        {isActiveButton === 1 && (
          <div className="pointer-events-none">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=23.1372915%2C48.225068&z=12&l=map&pt=23.1372915%2C48.225068,pm2rdl"
              width="100%"
              height="354"
              frameBorder="0"
            ></iframe>
          </div>
        )}

        {isActiveButton === 2 && (
          <div className="pointer-events-none">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=53.289886%2C65.294158&z=12&l=map&pt=53.289886%2C65.294158,pm2rdl"
              width="100%"
              height="354"
              frameBorder="0"
            ></iframe>
          </div>
        )}

        {isActiveButton === 3 && (
          <div className="pointer-events-none">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=53.360000%2C65.275278&z=12&l=map&pt=53.360000%2C65.275278,pm2rdl"
              width="100%"
              height="354"
              frameBorder="0"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  )
}

export default Shops

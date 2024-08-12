import { Routes, Route } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import Home from '../../pages/Home'
import CardDetail from '../../pages/CardDetail'
import FavoritesList from '../../pages/FavoritesList'
import Admin from '../../pages/Admin'
import Cart from '../../pages/Cart'
import PrivateRoute from './PrivateRoute'
import AboutCompany from '../../pages/AboutCompany'
import Contacts from '../../pages/Contacts'
import Vacancies from '../../pages/Vacancies'
import Articles from '../../pages/Articles'
import DataProcessing from '../../pages/DataProcessing'

/** Массив роутов приложения */
const routes = [
  { path: '/', element: <Home /> },
  // { path: "admin", element: <Admin /> },
  // Приватный маршрут для администратора
  {
    path: 'admin',
    element: <PrivateRoute element={<Admin />} requiredRole="admin" />,
  },
  { path: 'cards/:id', element: <CardDetail /> },
  { path: 'favorites', element: <FavoritesList /> },
  { path: 'cart', element: <Cart /> },
  { path: 'aboutCompany', element: <AboutCompany /> },
  { path: 'contacts', element: <Contacts /> },
  { path: 'vacancies', element: <Vacancies /> },
  { path: 'articles', element: <Articles /> },
  { path: 'dataProcessing', element: <DataProcessing /> },
]

/**
 * Рекурсивно отображает роуты и и дочерние роуты.
 * @param {RouteItem[]} routes - Массив роутов.
 * @returns {JSX.Element[]} Массив JSX элементов роутов.
 */
const renderRoutes = (routes) => {
  return routes.map((route) => (
    <Route key={route?.path} path={route?.path} element={route?.element}>
      {route?.children && renderRoutes(route.children)}
    </Route>
  ))
}

/** Корневой компонент приложения с роутами */
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      {renderRoutes(routes)}
    </Route>
  </Routes>
)

export default AppRoutes

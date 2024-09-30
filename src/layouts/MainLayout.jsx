import { Outlet } from 'react-router-dom'
import Header from '../components/ui/Header/Header'
import Footer from '../components/ui/Footer/Footer'

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout

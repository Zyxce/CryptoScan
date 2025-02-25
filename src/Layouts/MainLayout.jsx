import { Outlet } from 'react-router-dom'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import style from './MainLayout.module.css'

const MainLayout = () => {
  return (
    <div className={style.mainContainer}>
      <Menu />
      <div className={style.mainContent}>
        <Outlet />
      </div>
      <Footer className={style.mainFooter} />
    </div>
  )
}

export default MainLayout

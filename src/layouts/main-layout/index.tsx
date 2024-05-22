import { Header } from '../../components'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: 100 }}>
        <Outlet />
      </div>
    </>
  )
}

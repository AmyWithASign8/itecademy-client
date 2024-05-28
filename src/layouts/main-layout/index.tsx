import { Footer, Header } from '../../components'
import { Outlet } from 'react-router-dom'
import BgImage2 from '../../assets/background-variant-2.jpg'

export const MainLayout = () => {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          height: '100%',
          width: '100%',
          backgroundImage: `url(${BgImage2})`,
          backgroundRepeat: 'repeat',
          zIndex: -1
        }}
      />
      <Header />

      <div style={{ marginTop: 100, marginBottom: 50 }}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

import { Route, Routes } from 'react-router-dom'
import { GeneralPage, LoginPage, RegistrationPage } from './pages'
import { MainLayout } from './layouts'
import { observer } from 'mobx-react-lite'
import UserStore from './common/store/user'

function App() {
  const { getIsAuth } = UserStore

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<GeneralPage />} />
        {!getIsAuth && (
          <>
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="login" element={<LoginPage />} />
          </>
        )}
      </Route>
    </Routes>
  )
}

export default observer(App)

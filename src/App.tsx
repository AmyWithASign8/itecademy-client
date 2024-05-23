import { Route, Routes } from 'react-router-dom'
import { GeneralPage, LoginPage, RegistrationPage } from './pages'
import { MainLayout } from './layouts'
import { observer } from 'mobx-react-lite'
import UserStore from './common/store/user'
import { useEffect } from 'react'
import { getAllCourses } from './common/services/course/course'

function App() {
  const { getIsAuth } = UserStore

  useEffect(() => {
    getAllCourses()
  }, [])

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

// eslint-disable-next-line react-refresh/only-export-components
export default observer(App)

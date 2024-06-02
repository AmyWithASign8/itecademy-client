import { Route, Routes } from 'react-router-dom'
import {
  AboutUsPage,
  AdminPanelPage,
  GeneralPage,
  LoginPage,
  RegistrationPage
} from './pages'
import { MainLayout } from './layouts'
import { observer } from 'mobx-react-lite'
import UserStore from './common/store/user'
import { useEffect } from 'react'
import { getAllCourses } from './common/services/course/course'
import { getAllReviews } from './common/services/review/review'
import { getUserToLc } from './common/helpers/get-user-to-lc'
import { login } from './common/services/user/user'
import { User } from './common/store/user/user.interface'
import { TeachersPage } from './pages/teachers-page'

function App() {
  const { getIsAuth, getUser } = UserStore

  const autoLogin = async (data: User) => {
    const user = await login(data)

    UserStore.setUser = user as User
    UserStore.setIsAuth = true
  }

  useEffect(() => {
    const user = getUserToLc()

    if (user) {
      autoLogin(user)
    }

    getAllCourses()
    getAllReviews()

    const interval = setInterval(() => {
      getAllCourses()
      getAllReviews()
    }, 60_000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<GeneralPage />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="teachers" element={<TeachersPage />} />
        {!getIsAuth && (
          <>
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="login" element={<LoginPage />} />
          </>
        )}
        {getUser?.role === 'admin' && (
          <Route path="admin-panel" element={<AdminPanelPage />} />
        )}
      </Route>
    </Routes>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(App)

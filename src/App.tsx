import { Route, Routes } from 'react-router-dom'
import { GeneralPage, LoginPage, RegistrationPage } from './pages'
import { MainLayout } from './layouts'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<GeneralPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import { GeneralPage } from './pages'
import { MainLayout } from './layouts'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<GeneralPage />} />
      </Route>
    </Routes>
  )
}

export default App

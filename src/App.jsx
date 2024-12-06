import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import SinglePage from './pages/SinglePage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/contacts-react-app" element={<Layout />}>
          <Route index element={<HomePage />}/>
          <Route path="/contacts-react-app/:id" element={<SinglePage />}/>
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App

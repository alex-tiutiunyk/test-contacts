import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './main.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter 
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </Provider>
)

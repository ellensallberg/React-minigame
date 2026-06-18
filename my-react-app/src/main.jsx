import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/reset.css'
import './index.css'
import './API.css'
import './LoginPage.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <App />
)

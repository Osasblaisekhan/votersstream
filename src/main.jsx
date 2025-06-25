import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToggleProvider } from './admin/Mobile/MobilePages/ToggleContext.jsx'

createRoot(document.getElementById('root')).render(
  <ToggleProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </ToggleProvider>
)

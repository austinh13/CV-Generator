import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/body.css'
import './styles/userInfo.css'
import App from "./App"

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App></App>
  </StrictMode>,
)

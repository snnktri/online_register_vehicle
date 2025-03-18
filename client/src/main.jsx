import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './context/UserAuth.context.jsx'
import { AdmiinContextProvider } from './context/AdminAuth.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AdmiinContextProvider>
   <UserContextProvider>
      <App />
    </UserContextProvider>
   </AdmiinContextProvider>
  </StrictMode>,
)

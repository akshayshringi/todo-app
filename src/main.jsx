import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import { AlertProvider } from './context/AlertContext.jsx'
import TodoApp from './components/todo/TodoApp.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AlertProvider>
    <TodoApp />
  </AlertProvider>
    
  // </StrictMode>,
)

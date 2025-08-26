import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import route from './routes/Router/Router'
import AuthProvider from './contexts/AuthProvider/AuthProvider'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <RouterProvider router={route}></RouterProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>

)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root'
import './style.scss'
import ErrorPage from './routes/ErrorPage'
import ProductList from './routes/ProductList'
import HomePage from './routes/HomePage'
import Clients from './routes/Clients'
import Configs from './routes/Configs'

const router = createBrowserRouter([
  {
  path: '/',
  element: <Root />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: '/home',
      element: <HomePage />
    },
    {
      path: '/products',
      element: <ProductList />
    },
    {
      path: '/clients',
      element: <Clients />
    },
    {
      path: '/config',
      element: <Configs />
    }
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
)

// Use contextBridge
// window.ipcRenderer.on('main-process-message', (_event, message) => {
//   console.log(message)
// })

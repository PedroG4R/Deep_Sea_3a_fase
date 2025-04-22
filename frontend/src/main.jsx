import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router/routes'
import { GlobalContextProvider } from './contexts/GlobalContext'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <GlobalContextProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </GlobalContextProvider>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import SessionContextProvider from '@context/SessionContext'
import { PrimeReactProvider } from 'primereact/api';
import '@styles/main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <SessionContextProvider>
        <RouterProvider router={router} />
      </SessionContextProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
)

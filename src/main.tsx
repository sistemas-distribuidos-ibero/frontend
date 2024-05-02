import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import SessionContextProvider from '@context/SessionContext'
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import '@styles/main.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionContextProvider>
      <PrimeReactProvider value={{ appendTo: 'self' }}>
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </SessionContextProvider>
  </React.StrictMode >,
)

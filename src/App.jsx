import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './RootLayout/RootLayout'
import HomePage from './Pages/HomePage'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/LoginPage/Login'
import ErrorPage from './Pages/ErrorPage/ErrorPage'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [

        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

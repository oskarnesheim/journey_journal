import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Button, ChakraProvider} from '@chakra-ui/react'
import Home from './pages/Home'
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom'

import Profile from './pages/Profile'
import About from './pages/About'
import Login from './pages/Login'
import { Root } from './components/Root'

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
                <Route index  element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
            </Route>
        )
    )

  return (
    <ChakraProvider>
        <RouterProvider router={router}/>
    </ChakraProvider>
  )
}

export default App


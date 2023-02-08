import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Button, ChakraProvider} from '@chakra-ui/react'
import Home from './pages/Home'
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom'

import Profile from './pages/Profile'
import About from './pages/About'
import Login from './pages/Login'

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

const Root = () => {
    return (
        <div>
            <div>
                <Link to={'/'}>Home</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/about'}>AboutUs</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}
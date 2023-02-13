import './App.css'
import {Button, ChakraProvider} from '@chakra-ui/react'
import Home from './pages/Home'
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider, Routes, Router, BrowserRouter } from 'react-router-dom'

import Profile from './pages/Profile'
import About from './pages/About'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'

function App() {


  return (
    <ChakraProvider>
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path='/'  element={<LoginPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </ChakraProvider>
  )
}

export default App


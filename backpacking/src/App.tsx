import './App.css'
import Home from './pages/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Profile from './pages/Profile'
import About from './pages/About'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'

function App() {
  return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path='/'  element={<LoginPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
  )
}

export default App


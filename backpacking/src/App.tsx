import './App.css'
import Home from './pages/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './index.css'

import Profile from './pages/Profile'
import About from './pages/About'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'

function App() {
  return (
      <BrowserRouter>
        <Navbar/>
        <div className='w-full h-[80vh] flex flex-col justify-center items-center'>
            <Routes>
                <Route path='/'  element={<LoginPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </div>
        </BrowserRouter>
  )
}

export default App


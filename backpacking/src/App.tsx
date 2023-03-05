import "./App.css";
import Home from "./pages/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./index.css";

import Profile from "./pages/Profile";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import JourneyPage from "./pages/JourneyPage";
import { useRecoilState } from "recoil";
import { JourneyState } from "./recoil/atoms";
import { useEffect, useState } from "react";

function App() {
  const [editJourney, setEditJourney] = useRecoilState(JourneyState);

  return (
    <BrowserRouter>
      <Navbar />
      {/* <div className="w-full h-[80vh] flex flex-col justify-center items-center"> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/home/*" element={<Home />} />
        <Route
          path="/journey"
          element={<JourneyPage journey={editJourney} />}
        />
      </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Bitcoin from "./pages/Bitcoin";
import About from "./pages/About";
import QRcode from "./pages/QRCode";

const App = () => {
  return (
    <div className="p-0 m-0 box-border">
      <div className="min-h-screen bg-gradient-to-b from-[#5b0f4e] to-[#002834] h-full w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:coinId" element={<Coin />} />
          <Route path="/bitcoin" element={<Bitcoin />} />
          <Route path="/qrcode" element={<QRcode />} />
          <Route path="/guide" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;

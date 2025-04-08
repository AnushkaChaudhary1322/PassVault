import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "../src/components/Footer";
import Scoreboard from "./components/Scoreboard";
import AddTeam from "./components/AddTeam";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<AddTeam />} />
        <Route path="/score" element={<Scoreboard />} />
      </Routes>
      <Footer/>
    </Router>
    
  );
};

export default App;


import React from "react";
import logo from "../assets/passVault-logo.png"; 

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 z-50 bg-white/10 backdrop-blur-md ">
      <div className="max-w-6xl mx-auto flex justify-center items-center py-4 px-6">
        <div className="flex items-center gap-1">
          <img src={logo} alt="logo" className="w-20 h-20" />
          <h1 className="text-5xl font-bold tracking-wide bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-x">
            PassVault
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

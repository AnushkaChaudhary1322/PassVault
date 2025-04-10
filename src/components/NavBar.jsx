import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">🏏 CrickBuzz</h1>
            <div className="space-x-6">
            <Link to="/" className="text-white hover:text-yellow-300 transition">
                Home
            </Link>
            <Link to="/about" className="text-white hover:text-yellow-300 transition">
                About Us
            </Link>
            <Link to="/services" className="text-white hover:text-yellow-300 transition">
                Services
            </Link>
            <Link to="/contact" className="text-white hover:text-yellow-300 transition">
                Contact Us
            </Link>
            <Link to="/team" className="text-white hover:text-yellow-300 transition">
                Add Players
            </Link>
            <Link to="/select-team" className="text-white hover:text-yellow-300 transition">
                Select Team
            </Link>
            <Link to="/score" className="text-white hover:text-yellow-300 transition">
                Score Board
            </Link>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;

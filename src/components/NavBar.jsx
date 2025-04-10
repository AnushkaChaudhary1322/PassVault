import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
const location = useLocation();

const linkClasses = (path) =>
`text-white hover:text-yellow-300 transition ${
    location.pathname === path ? "font-bold underline" : ""
}`;

return (
<nav className="bg-indigo-600 p-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
    <h1 className="text-white text-2xl font-bold">🔐 PassVault</h1>
    <div className="space-x-6">
        <Link to="/" className={linkClasses("/")}>
        Home
        </Link>
        <Link to="/generator" className={linkClasses("/generator")}>
        Password Generator
        </Link>
    </div>
    </div>
</nav>
);
};

export default Navbar;

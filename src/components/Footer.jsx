import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-8 w-full">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold">T20 Cricket</h2>
                    <p className="text-sm opacity-80">Your ultimate cricket scoreboard</p>
                </div>

                <div className="flex space-x-6 text-sm font-medium">
                    <a href="#" className="hover:text-yellow-400 transition duration-300">Home</a>
                    <a href="#" className="hover:text-yellow-400 transition duration-300">About</a>
                    <a href="#" className="hover:text-yellow-400 transition duration-300">Contact</a>
                </div>

                <div className="flex space-x-4">
                    <a href="#" className="text-xl hover:text-yellow-400 transition duration-300">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="text-xl hover:text-yellow-400 transition duration-300">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-xl hover:text-yellow-400 transition duration-300">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>

            <div className="text-center mt-6 text-sm opacity-80">
                {new Date().getFullYear()} T20 Cricket. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;

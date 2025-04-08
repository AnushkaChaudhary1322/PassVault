import React from "react";

const Home = () => {
    return (
        <>
        <div
            className="relative w-full h-screen flex flex-col items-center justify-center text-white bg-cover bg-center"
            style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1950&q=80')",
            }}
        >
            <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>

            <div className="relative z-10 p-10 rounded-2xl text-center max-w-xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
                Welcome to <span className="text-yellow-300">CrickBuzz</span>
            </h1>
            <p className="text-lg mb-8 drop-shadow">
                Your go-to platform for live cricket scores, updates, and more!
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
                Explore Now
            </button>
            </div>
        </div>
        </>
    );
};

export default Home;

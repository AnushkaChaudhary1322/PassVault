import React from "react";

const About = () => {
return (
<div className="min-h-screen bg-gradient-to-tr from-sky-950 to-sky-900 text-white p-8 flex items-center justify-center">
    <div className="max-w-5xl w-full bg-sky-800 p-8 rounded-2xl shadow-xl transition-all duration-300 ">
    <h1 className="text-4xl font-extrabold mb-6 text-center text-yellow-300">
        🏏 About QuickScore
    </h1>

    <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
        <img
        src="https://i.pinimg.com/736x/98/26/30/9826308e2eb51c08f10922f37223852a.jpg"
        alt="Cricket App"
        className="w-48 h-48 object-contain rounded-xl shadow-lg border-2 border-yellow-400 animate-fade-in"
        />
        <div>
        <p className="text-lg leading-relaxed text-white mb-2">
            <strong>QuickScore</strong> is your go-to cricket scoring web app designed for enthusiasts, gully teams,
            and local tournaments.
        </p>
        <p className="text-white">
            Track real-time scores, switch innings, monitor overs, and highlight batsmen and bowlers seamlessly.
        </p>
        </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Feature Card 1 */}
        <div className="bg-sky-700 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
        <h3 className="text-xl font-bold mb-2 text-emerald-300">🎯 Custom Teams</h3>
        <p>Create teams by selecting countries and entering 11 players each. Save and edit anytime.</p>
        </div>

        {/* Feature Card 2 */}
        <div className="bg-sky-700 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
        <h3 className="text-xl font-bold mb-2 text-emerald-300">📊 Live Score Updates</h3>
        <p>Track runs, wickets, extras and switch batting turns just like in real matches.</p>
        </div>

        {/* Feature Card 3 */}
        <div className="bg-sky-700 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
        <h3 className="text-xl font-bold mb-2 text-emerald-300">👥 Player Stats</h3>
        <p>Live display of who’s on strike, their individual scores and performance tracking.</p>
        </div>

        {/* Feature Card 4 */}
        <div className="bg-sky-700 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
        <h3 className="text-xl font-bold mb-2 text-emerald-300">💾 Persistent Data</h3>
        <p>All data is stored in localStorage, so you can close the tab and still pick up where you left off.</p>
        </div>
    </div>
    </div>
</div>
);
};

export default About;

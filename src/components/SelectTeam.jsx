import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectTeam = () => {
const [savedTeams, setSavedTeams] = useState({});
const [team1, setTeam1] = useState("");
const [team2, setTeam2] = useState("");
const [openDialog, setOpenDialog] = useState(null);
const navigate = useNavigate();

useEffect(() => {
const teams = {};
for (let key in localStorage) {
    if (key.startsWith("team_")) {
    const country = key.replace("team_", "");
    try {
        const teamData = JSON.parse(localStorage.getItem(key));
        if (!teamData.bestScore) teamData.bestScore = 0;
        if (!teamData.lastScore) teamData.lastScore = 0;
        teams[country] = teamData;
    } catch (e) {
        console.error(`Failed to parse team data for ${country}`);
    }
    }
}
setSavedTeams(teams);
}, []);

const handleStartMatch = () => {
if (!team1 || !team2 || team1 === team2) {
    alert("Select two different valid teams.");
    return;
}

const selected = {
    A: { name: team1, ...savedTeams[team1] },
    B: { name: team2, ...savedTeams[team2] },
};
localStorage.setItem("selected_match", JSON.stringify(selected));
navigate("/score");
};

const handleEdit = (country) => {
navigate(`/team?edit=${country}`);
};

const getFlagUrl = (country) => {
return `https://flagcdn.com/48x36/${country.slice(0, 2).toLowerCase()}.png`;
};

return (
<div className="min-h-screen bg-gradient-to-br from-sky-950 to-sky-900 text-white px-4 py-10">
    <h1 className="text-4xl font-bold text-center mb-10">🏏 Select Teams</h1>

    {/* Dropdown Section */}
    <div className="max-w-4xl mx-auto bg-sky-800/30 border border-sky-700 rounded-2xl p-6 mb-10 shadow-lg">
    <h2 className="text-2xl font-semibold mb-6 text-center">Choose Teams</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
        <label className="block mb-2 font-semibold text-gray-300">Team 1</label>
        <select
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none"
        >
            <option value="">Select Team 1</option>
            {Object.keys(savedTeams).map((team) => (
            <option key={team} value={team} disabled={team === team2}>
                {team}
            </option>
            ))}
        </select>
        </div>
        <div>
        <label className="block mb-2 font-semibold text-gray-300">Team 2</label>
        <select
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none"
        >
            <option value="">Select Team 2</option>
            {Object.keys(savedTeams).map((team) => (
            <option key={team} value={team} disabled={team === team1}>
                {team}
            </option>
            ))}
        </select>
        </div>
    </div>
    <div className="text-center mt-8">
        <button
        onClick={handleStartMatch}
        className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-xl text-lg font-semibold shadow-md"
        >
        🚀 Start Match
        </button>
    </div>
    </div>

    {/* Team Cards */}
    <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
    {Object.entries(savedTeams).map(([country, team]) => (
        <div
        key={country}
        className="bg-sky-800 border border-sky-700 p-5 rounded-xl shadow-lg relative"
        >
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
            <img
                src={getFlagUrl(country)}
                alt={`${country} flag`}
                className="w-10 h-auto rounded border border-gray-400"
            />
            <h3 className="text-xl font-bold">{country}</h3>
            </div>
            <div className="space-x-2">
            <button
                onClick={() => setOpenDialog(country)}
                className="bg-pink-500 hover:bg-pink-600 text-white py-1 px-3 rounded-lg text-sm font-semibold"
            >
                View Team
            </button>
            <button
                onClick={() => handleEdit(country)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-3 rounded-lg text-sm"
            >
                Edit
            </button>
            </div>
        </div>

        {/* Modal Dialog */}
        {openDialog === country && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center px-4">
            <div className="bg-gray-900 text-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl shadow-xl p-6 relative border border-gray-700">
                <button
                className="absolute top-3 right-4 text-white text-2xl font-bold"
                onClick={() => setOpenDialog(null)}
                >
                ×
                </button>
                <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2">
                    <img
                    src={getFlagUrl(country)}
                    alt={`${country} flag`}
                    className="w-6 h-auto rounded border border-gray-400"
                    />
                    <h2 className="text-2xl font-bold">{country}</h2>
                </div>
                </div>
                <div className="text-sm space-y-2">
                <p>
                    <strong>Best Score:</strong> {team.bestScore}
                </p>
                <p>
                    <strong>Last Match Score:</strong> {team.lastScore}
                </p>
                </div>

                {/* Players */}
                <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2 border-b border-gray-600 pb-1">
                    Players:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                    {team.players?.map((player, i) => (
                    <li key={i}>{player}</li>
                    ))}
                </ul>
                </div>

                {/* Bowlers */}
                <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2 border-b border-gray-600 pb-1">
                    Bowlers:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                    {team.bowlers?.map((bowler, i) => (
                    <li key={i}>{bowler}</li>
                    ))}
                </ul>
                </div>
            </div>
            </div>
        )}
        </div>
    ))}
    </div>
</div>
);
};

export default SelectTeam;

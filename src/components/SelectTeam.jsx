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
<div className="min-h-screen bg-gradient-to-tr from-blue-800 to-purple-900 text-white p-10">
    <h1 className="text-4xl font-bold text-center mb-8">🏏 Select Teams</h1>

    {/* Section 1: Team Dropdowns */}
    <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
    <div>
        <label className="block mb-2 font-semibold">Team 1</label>
        <select
        value={team1}
        onChange={(e) => setTeam1(e.target.value)}
        className="w-full p-2 rounded text-black"
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
        <label className="block mb-2 font-semibold">Team 2</label>
        <select
        value={team2}
        onChange={(e) => setTeam2(e.target.value)}
        className="w-full p-2 rounded text-black"
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

    {/* Section 2: Team Dialogs */}
    <div className="grid gap-6 max-w-4xl mx-auto mb-12">
    {Object.entries(savedTeams).map(([country, team]) => (
        <div key={country} className="bg-white bg-opacity-10 p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{country}</h3>
            <button
            onClick={() => setOpenDialog(country)}
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
            >
            View Team
            </button>
        </div>

        {/* Modal Dialog */}
        {openDialog === country && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white text-black w-96 rounded-lg shadow-lg p-6 relative">
                <button
                className="absolute top-2 right-2 text-black text-xl font-bold"
                onClick={() => setOpenDialog(null)}
                >
                ×
                </button>
                <div className="text-center mb-4">
                <img
                    src={getFlagUrl(country)}
                    alt={`${country} flag`}
                    className="mx-auto mb-2 rounded"
                />
                <h2 className="text-2xl font-bold">{country}</h2>
                </div>
                <p className="mb-2"><strong>Best Score:</strong> {team.bestScore}</p>
                <p className="mb-4"><strong>Last Match Score:</strong> {team.lastScore}</p>
                <p className="mb-2"><strong>Players:</strong> {team.players.join(", ")}</p>
                <p className="mb-4"><strong>Bowlers:</strong> {team.bowlers.join(", ")}</p>
                <button
                onClick={() => handleEdit(country)}
                className="bg-yellow-400 w-full text-black font-semibold py-2 px-4 rounded hover:bg-yellow-500"
                >
                Edit Team
                </button>
            </div>
            </div>
        )}
        </div>
    ))}
    </div>

    {/* Start Match Button */}
    <div className="text-center">
    <button
        onClick={handleStartMatch}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
    >
        Start Match
    </button>
    </div>
</div>
);
};

export default SelectTeam;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTeam = ({ setTeams }) => {
const [teamAName, setTeamAName] = useState("India");
const [teamBName, setTeamBName] = useState("Australia");
const [teamAPlayers, setTeamAPlayers] = useState(Array(11).fill(""));
const [teamBPlayers, setTeamBPlayers] = useState(Array(11).fill(""));
const navigate = useNavigate();

const handleChange = (index, team, value) => {
const updated = [...(team === "A" ? teamAPlayers : teamBPlayers)];
updated[index] = value;
team === "A" ? setTeamAPlayers(updated) : setTeamBPlayers(updated);
};

const handleStart = () => {
if (teamAPlayers.includes("") || teamBPlayers.includes("")) {
    alert("All 11 players must be filled for both teams.");
    return;
}
setTeams({
    A: { name: teamAName, players: teamAPlayers },
    B: { name: teamBName, players: teamBPlayers },
});
navigate("/score");
};

return (
<div className="min-h-screen bg-gradient-to-tr from-blue-800 to-purple-900 text-white p-10">
    <h1 className="text-4xl font-bold text-center mb-8">🏏 Select Teams</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
    {/* Team A */}
    <div className="bg-white bg-opacity-10 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Team A ({teamAName})</h2>
        <input
        className="w-full mb-4 px-4 py-2 rounded text-black"
        value={teamAName}
        onChange={(e) => setTeamAName(e.target.value)}
        />
        {teamAPlayers.map((player, index) => (
        <input
            key={index}
            className="w-full mb-2 px-4 py-2 rounded text-black"
            placeholder={`Player ${index + 1}`}
            value={player}
            onChange={(e) => handleChange(index, "A", e.target.value)}
        />
        ))}
    </div>

    {/* Team B */}
    <div className="bg-white bg-opacity-10 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Team B ({teamBName})</h2>
        <input
        className="w-full mb-4 px-4 py-2 rounded text-black"
        value={teamBName}
        onChange={(e) => setTeamBName(e.target.value)}
        />
        {teamBPlayers.map((player, index) => (
        <input
            key={index}
            className="w-full mb-2 px-4 py-2 rounded text-black"
            placeholder={`Player ${index + 1}`}
            value={player}
            onChange={(e) => handleChange(index, "B", e.target.value)}
        />
        ))}
    </div>
    </div>

    <div className="text-center mt-8">
    <button
        onClick={handleStart}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
    >
        Start Match
    </button>
    </div>
</div>
);
};

export default AddTeam;
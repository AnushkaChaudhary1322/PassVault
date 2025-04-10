import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AddTeam = () => {
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const editCountry = queryParams.get("edit");

const countries = [
"India", "Australia", "England", "South Africa", "Pakistan",
"New Zealand", "Bangladesh", "Sri Lanka", "West Indies"
];

const [selectedCountry, setSelectedCountry] = useState(editCountry || "");
const [players, setPlayers] = useState(Array(11).fill(""));
const [bowlers, setBowlers] = useState([]);

// Load data on mount or when selectedCountry changes
useEffect(() => {
if (!selectedCountry) {
    setPlayers(Array(11).fill(""));
    setBowlers([]);
    return;
}

const data = localStorage.getItem(`team_${selectedCountry}`);
if (data) {
    const parsed = JSON.parse(data);
    setPlayers(parsed.players || Array(11).fill(""));
    setBowlers(parsed.bowlers || []);
} else {
    setPlayers(Array(11).fill(""));
    setBowlers([]);
}
}, [selectedCountry]);

const handlePlayerChange = (index, value) => {
const updated = [...players];
updated[index] = value;
setPlayers(updated);
};

const handleBowlerToggle = (player) => {
if (bowlers.includes(player)) {
    setBowlers(bowlers.filter((b) => b !== player));
} else {
    if (bowlers.length < 4) {
    setBowlers([...bowlers, player]);
    } else {
    alert("You can only select 4 bowlers.");
    }
}
};

const handleSave = () => {
if (players.includes("") || bowlers.length !== 4 || !selectedCountry) {
    alert("Select a country, fill all 11 players, and select exactly 4 bowlers.");
    return;
}

localStorage.setItem(
    `team_${selectedCountry}`,
    JSON.stringify({ players, bowlers })
);

alert(`Team saved for ${selectedCountry}`);

// Reset everything only if not editing
if (!editCountry) {
    setSelectedCountry("");
}

setPlayers(Array(11).fill(""));
setBowlers([]);
};

return (
<div className="min-h-screen bg-gradient-to-tr from-blue-800 to-purple-900 text-white p-10">
    <h1 className="text-4xl font-bold text-center mb-8">🏏 Add Team</h1>

    {/* Section 1: Country Dropdown */}
    <div className="max-w-md mx-auto mb-8">
    <label className="block mb-2 text-lg font-semibold">Select Country</label>
    <select
        className="w-full p-2 rounded text-black"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        disabled={!!editCountry} // Disable in edit mode
    >
        <option value="">-- Select a Country --</option>
        {countries.map((country) => (
        <option key={country} value={country}>
            {country}
        </option>
        ))}
    </select>
    </div>

    {/* Section 2: Player Input */}
    <div className="bg-white bg-opacity-10 p-6 rounded-xl max-w-2xl mx-auto mb-8">
    <h2 className="text-2xl font-semibold mb-4">Batting Lineup (11 Players)</h2>
    {players.map((player, index) => (
        <input
        key={index}
        className="w-full mb-2 px-4 py-2 rounded text-black"
        placeholder={`Player ${index + 1}`}
        value={player}
        onChange={(e) => handlePlayerChange(index, e.target.value)}
        />
    ))}
    </div>

    {/* Section 3: Select Bowlers */}
    <div className="bg-white bg-opacity-10 p-6 rounded-xl max-w-2xl mx-auto mb-8">
    <h2 className="text-2xl font-semibold mb-4">Select 4 Bowlers</h2>
    {players.map((player, index) => (
        <div key={index} className="flex items-center mb-2">
        <input
            type="checkbox"
            checked={bowlers.includes(player)}
            onChange={() => handleBowlerToggle(player)}
            disabled={
            player.trim() === "" ||
            (!bowlers.includes(player) && bowlers.length >= 4)
            }
            className="mr-3"
        />
        <span className={player.trim() === "" ? "text-gray-400" : "text-white"}>
            {player || `Player ${index + 1}`}
        </span>
        </div>
    ))}
    <p className="mt-2 text-sm text-yellow-300">{bowlers.length}/4 bowlers selected</p>
    </div>

    {/* Save Button */}
    <div className="text-center mt-6">
    <button
        onClick={handleSave}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
    >
        Save Team
    </button>
    </div>
</div>
);
};

export default AddTeam;

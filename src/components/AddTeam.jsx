import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Countries with flags
const countryDetails = [
{ name: "India", flag: "https://flagcdn.com/in.svg" },
{ name: "Australia", flag: "https://flagcdn.com/au.svg" },
{ name: "England", flag: "https://flagcdn.com/gb-eng.svg" },
{ name: "South Africa", flag: "https://flagcdn.com/za.svg" },
{ name: "Pakistan", flag: "https://flagcdn.com/pk.svg" },
{ name: "New Zealand", flag: "https://flagcdn.com/nz.svg" },
{ name: "Bangladesh", flag: "https://flagcdn.com/bd.svg" },
{ name: "Sri Lanka", flag: "https://flagcdn.com/lk.svg" },
{ name: "West Indies", flag: "https://flagcdn.com/jm.svg" }, // Jamaica flag as placeholder
];

const AddTeam = () => {
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const editCountry = queryParams.get("edit");

const [selectedCountry, setSelectedCountry] = useState(editCountry || "");
const [players, setPlayers] = useState(Array(11).fill(""));
const [bowlers, setBowlers] = useState([]);

// Load saved team data
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

// Remove player from bowlers if blanked
if (value.trim() === "") {
    setBowlers((prev) => prev.filter((b) => b !== players[index]));
}
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

if (!editCountry) {
    setSelectedCountry("");
}

setPlayers(Array(11).fill(""));
setBowlers([]);
};

const selectedCountryObj = countryDetails.find(c => c.name === selectedCountry);

return (
<div className="min-h-screen bg-gradient-to-tr from-sky-950 to-sky-900 text-white p-6">
    <div className="max-w-5xl mx-auto space-y-10">
    <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">🏏 Add Team</h1>
        {selectedCountry && selectedCountryObj && (
        <div className="flex justify-center items-center gap-3 mt-2">
            <img src={selectedCountryObj.flag} alt={selectedCountry} className="h-6 w-10 rounded shadow" />
            <span className="text-2xl font-semibold">{selectedCountry}</span>
        </div>
        )}
    </div>

    {/* Section 1: Country Dropdown */}
    <div className="bg-sky-800 p-6 rounded-2xl shadow-lg">
        <label className="block mb-3 text-lg font-semibold">Select Country</label>
        <select
        className="w-full px-4 py-2 rounded-xl text-black"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        disabled={!!editCountry}
        >
        <option value="">-- Select a Country --</option>
        {countryDetails.map(({ name, flag }) => (
            <option key={name} value={name}>
            {name}
            </option>
        ))}
        </select>
    </div>

    {/* Section 2: Player Inputs */}
    <div className="bg-sky-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Batting Lineup (11 Players)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {players.map((player, index) => (
            <input
            key={index}
            className="w-full px-4 py-2 rounded-xl text-black shadow"
            placeholder={`Player ${index + 1}`}
            value={player}
            onChange={(e) => handlePlayerChange(index, e.target.value)}
            />
        ))}
        </div>
    </div>

    {/* Section 3: Select Bowlers */}
    <div className="bg-sky-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Select 4 Bowlers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {players.map((player, index) => (
            <div key={index} className="flex items-center gap-3">
            <input
                type="checkbox"
                checked={bowlers.includes(player)}
                onChange={() => handleBowlerToggle(player)}
                disabled={player.trim() === ""}
                className="w-5 h-5"
            />
            <span className="text-lg">{player || `Player ${index + 1}`}</span>
            </div>
        ))}
        </div>
    </div>

    {/* Save Button */}
    <div className="text-center">
        <button
        onClick={handleSave}
        className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition"
        >
        Save Team
        </button>
    </div>
    </div>
</div>
);
};

export default AddTeam;

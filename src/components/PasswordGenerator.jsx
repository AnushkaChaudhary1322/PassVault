import React, { useState } from 'react';

const PasswordGenerator = ({ onGenerate }) => {
const [length, setLength] = useState(12);
const [useUppercase, setUseUppercase] = useState(true);
const [useLowercase, setUseLowercase] = useState(true);
const [useNumbers, setUseNumbers] = useState(true);
const [useSymbols, setUseSymbols] = useState(false);
const [generatedPassword, setGeneratedPassword] = useState('');

const generatePassword = () => {
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lower = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';

let chars = '';
if (useUppercase) chars += upper;
if (useLowercase) chars += lower;
if (useNumbers) chars += numbers;
if (useSymbols) chars += symbols;

if (!chars) {
    alert('Please select at least one character type!');
    return;
}

let password = '';
for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
}

setGeneratedPassword(password);
onGenerate && onGenerate(password); // if parent needs it
};

const handleCopy = () => {
navigator.clipboard.writeText(generatedPassword);
alert('Password copied to clipboard!');
};

return (
<div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 w-full max-w-md mx-auto mt-6">
    <h2 className="text-xl font-semibold mb-4 text-blue-700">Password Generator</h2>

    <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">Password Length</label>
    <input
        type="number"
        min={8}
        max={32}
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    </div>

    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
    <label className="flex items-center space-x-2">
        <input type="checkbox" checked={useUppercase} onChange={() => setUseUppercase(!useUppercase)} />
        <span>Uppercase</span>
    </label>
    <label className="flex items-center space-x-2">
        <input type="checkbox" checked={useLowercase} onChange={() => setUseLowercase(!useLowercase)} />
        <span>Lowercase</span>
    </label>
    <label className="flex items-center space-x-2">
        <input type="checkbox" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} />
        <span>Numbers</span>
    </label>
    <label className="flex items-center space-x-2">
        <input type="checkbox" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)} />
        <span>Symbols</span>
    </label>
    </div>

    <button
    onClick={generatePassword}
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
    >
    Generate Password
    </button>

    {generatedPassword && (
    <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Generated Password</label>
        <div className="flex items-center">
        <input
            type="text"
            readOnly
            value={generatedPassword}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-800"
        />
        <button
            onClick={handleCopy}
            className="bg-yellow-400 px-3 py-2 rounded-r-md hover:bg-yellow-500"
        >
            Copy
        </button>
        </div>
    </div>
    )}
</div>
);
};

export default PasswordGenerator;

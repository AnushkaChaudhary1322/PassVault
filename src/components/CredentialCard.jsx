import React, { useState } from 'react';

const CredentialCard = ({ credential, onEdit, onDelete }) => {
const [showPassword, setShowPassword] = useState(false);

const handleCopy = () => {
navigator.clipboard.writeText(credential.password);
alert('Password copied to clipboard!');
};

return (
<div className="bg-white shadow-md rounded-2xl p-4 mb-4 border border-gray-200">
    <h3 className="text-lg font-semibold text-blue-700">{credential.website}</h3>
    <p className="text-gray-700 mt-2">
    <span className="font-medium">Username:</span> {credential.username}
    </p>
    <p className="text-gray-700 mt-1">
    <span className="font-medium">Password:</span>{' '}
    {showPassword ? credential.password : '••••••••'}
    <button
        onClick={() => setShowPassword(prev => !prev)}
        className="ml-2 text-sm text-blue-600 hover:underline"
    >
        {showPassword ? 'Hide' : 'Show'}
    </button>
    <button
        onClick={handleCopy}
        className="ml-2 text-sm bg-yellow-300 px-2 py-1 rounded hover:bg-yellow-400"
    >
        Copy
    </button>
    </p>
    <div className="mt-4 flex gap-3">
    <button
        onClick={() => onEdit(credential)}
        className="text-sm bg-green-200 text-green-800 px-3 py-1 rounded hover:bg-green-300"
    >
        Edit
    </button>
    <button
        onClick={() => onDelete(credential.id)}
        className="text-sm bg-red-200 text-red-800 px-3 py-1 rounded hover:bg-red-300"
    >
        Delete
    </button>
    </div>
</div>
);
};

export default CredentialCard;

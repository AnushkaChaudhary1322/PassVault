import React, { useState, useEffect } from 'react';

const CredentialForm = ({ onSave, editingCredential, onCancel }) => {
const [website, setWebsite] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

useEffect(() => {
if (editingCredential) {
    setWebsite(editingCredential.website);
    setUsername(editingCredential.username);
    setPassword(editingCredential.password);
} else {
    setWebsite('');
    setUsername('');
    setPassword('');
}
}, [editingCredential]);

const handleSubmit = (e) => {
e.preventDefault();
if (!website || !username || !password) {
    alert('Please fill in all fields.');
    return;
}

const newCredential = {
    id: editingCredential ? editingCredential.id : Date.now(),
    website,
    username,
    password,
};

onSave(newCredential);
setWebsite('');
setUsername('');
setPassword('');
};

return (
<form onSubmit={handleSubmit} className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 w-full max-w-xl mx-auto mt-6">
    <h2 className="text-xl font-semibold text-blue-700 mb-4">
    {editingCredential ? 'Edit Credential' : 'Add New Credential'}
    </h2>

    <div className="mb-4">
    <label className="block mb-1 text-sm text-gray-700">Website</label>
    <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="e.g. facebook.com"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    </div>

    <div className="mb-4">
    <label className="block mb-1 text-sm text-gray-700">Username</label>
    <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="e.g. johndoe123"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    </div>

    <div className="mb-4">
    <label className="block mb-1 text-sm text-gray-700">Password</label>
    <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter or generate password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    </div>

    <div className="flex items-center justify-between mt-6">
    <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
    >
        {editingCredential ? 'Update' : 'Add'}
    </button>

    {editingCredential && (
        <button
        type="button"
        onClick={onCancel}
        className="text-gray-500 hover:text-gray-700 underline"
        >
        Cancel
        </button>
    )}
    </div>
</form>
);
};

export default CredentialForm;

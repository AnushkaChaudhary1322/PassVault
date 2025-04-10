import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
    <div className="w-full mb-6">
        <input
        type="text"
        placeholder="Search by website..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    </div>
    );
};

export default SearchBar;

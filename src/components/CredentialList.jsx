import { useState } from 'react';

function CredentialList({ credentials, setCredentials }) {
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const filtered = credentials.filter(c =>
    c.website.toLowerCase().includes(search.toLowerCase())
  );

  const updateCred = (index, field, value) => {
    const updated = [...credentials];
    updated[index][field] = value;
    setCredentials(updated);
  };

  const deleteCred = index => {
    const updated = credentials.filter((_, i) => i !== index);
    setCredentials(updated);
  };

  const copyPassword = pass => {
    navigator.clipboard.writeText(pass);
    alert('Password copied to clipboard!');
  };

  const toggleVisibility = id => {
    const el = document.getElementById(`password-${id}`);
    el.textContent = el.textContent === '********' ? el.dataset.real : '********';
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <input
        placeholder="Search by website..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full p-3 mb-8 rounded-xl bg-white/80 backdrop-blur border border-purple-200 focus:ring-2 focus:ring-purple-400 placeholder-gray-500 shadow-sm"
      />
      {filtered.map((cred, index) => (
        <div
          className="bg-white/80 backdrop-blur-md border border-purple-100/40 rounded-3xl p-6 mb-6 shadow-2xl"
          key={index}
        >
          {editIndex === index ? (
            <div className="space-y-4">
              <input
                className="w-full px-4 py-2 rounded-lg bg-white border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500 shadow-sm"
                value={cred.website}
                onChange={e => updateCred(index, 'website', e.target.value)}
              />
              <input
                className="w-full px-4 py-2 rounded-lg bg-white border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500 shadow-sm"
                value={cred.username}
                onChange={e => updateCred(index, 'username', e.target.value)}
              />
              <input
                className="w-full px-4 py-2 rounded-lg bg-white border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500 shadow-sm"
                value={cred.password}
                onChange={e => updateCred(index, 'password', e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setEditIndex(null)}
                  className="bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-fuchsia-700"
                >
                  ✅ Done
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-center md:text-left flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{cred.website}</h3>
                <p className="text-sm text-gray-600">{cred.username}</p>
                <p className="my-2 font-mono text-gray-600 tracking-widest">
                  <span id={`password-${index}`} data-real={cred.password}>********</span>
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-3">
                <button
                  onClick={() => toggleVisibility(index)}
                  className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 shadow-sm transition"
                >
                  Show/Hide
                </button>
                <button
                  onClick={() => copyPassword(cred.password)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-md hover:from-fuchsia-600 hover:to-purple-700 transition"
                >
                  Copy
                </button>
                <button
                  onClick={() => setEditIndex(index)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md hover:from-sky-600 hover:to-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCred(index)}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white shadow-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CredentialList;

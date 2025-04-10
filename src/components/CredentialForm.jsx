import { useState } from 'react';

function CredentialForm({ addCredential }) {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);

  const generatePassword = () => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}';

    let genPass = '';
    for (let i = 0; i < length; i++) {
      genPass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(genPass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!website || !username || !password) return;
    addCredential({ website, username, password });
    setWebsite('');
    setUsername('');
    setPassword('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-md border border-purple-100/40 p-8 rounded-3xl shadow-2xl w-full max-w-2xl mx-auto mt-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-fuchsia-600 to-blue-600 text-transparent bg-clip-text drop-shadow-md">
        Add New Credential
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500 shadow-sm text-gray-800"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500 shadow-sm text-gray-800"
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500 shadow-sm text-gray-800"
        />
      </div>

      <div className="mt-6 mb-4 p-4 rounded-2xl border border-purple-100 bg-purple-50/30">
        <label className="block mb-3 text-sm font-medium text-gray-700">
          Length:
          <input
            type="number"
            min="8"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="ml-2 w-20 px-2 py-1 bg-white border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700"
          />
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm mt-2 text-gray-700">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} />
            a-z
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />
            A-Z
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
            0-9
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
            Symbols
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 gap-4">
        <button
          type="button"
          onClick={generatePassword}
          className="w-1/2 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-semibold hover:from-purple-600 hover:to-fuchsia-700 transition-all duration-200 shadow-md"
        >
          Generate
        </button>
        <button
          type="submit"
          className="w-1/2 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:from-sky-600 hover:to-blue-700 transition-all duration-200 shadow-md"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default CredentialForm;

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CredentialForm from './components/CredentialForm';
import CredentialList from './components/CredentialList';
import './App.css'; 

function App() {
  const [credentials, setCredentials] = useState(() => {
    return JSON.parse(localStorage.getItem('credentials')) || [];
  });

  useEffect(() => {
    localStorage.setItem('credentials', JSON.stringify(credentials));
  }, [credentials]);

  const addCredential = (cred) => {
    setCredentials(prev => [...prev, cred]);
  };

  return (
    <div className="min-h-screen animated-gradient text-gray-900">
      <Navbar />

      {/* Main Layout */}
      <div className="flex justify-between"> 
        {/* Left Panel - Credential Form (Fixed Width) */}
        <aside className="w-full md:w-[200px] lg:w-1/3 h-screen fixed top-20 left-0 px-4 overflow-y-auto ">
          <CredentialForm addCredential={addCredential} />
        </aside>

        {/* Right Panel - Credential List */}
        <main className="ml-0 md:ml-[35%] lg:ml-[38%] w-[80%] px-10">
          <CredentialList credentials={credentials} setCredentials={setCredentials} />
        </main>
      </div>
    </div>
  );
}

export default App;

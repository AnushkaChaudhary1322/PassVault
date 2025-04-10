import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CredentialForm from "./components/CredentialForm";
import CredentialList from "./components/CredentialList";
import SearchBar from "./components/SearchBar";
import PasswordGenerator from "./components/PasswordGenerator";

const App = () => {
  const [credentials, setCredentials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCredential, setEditingCredential] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("credentials")) || [];
    setCredentials(saved);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("credentials", JSON.stringify(credentials));
  }, [credentials]);

  const handleSave = (newCredential) => {
    if (editingCredential) {
      setCredentials((prev) =>
        prev.map((cred) =>
          cred.id === newCredential.id ? newCredential : cred
        )
      );
      setEditingCredential(null);
    } else {
      setCredentials((prev) => [...prev, newCredential]);
    }
  };

  const handleDelete = (id) => {
    setCredentials((prev) => prev.filter((cred) => cred.id !== id));
  };

  const handleEdit = (credential) => {
    setEditingCredential(credential);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCredentials = credentials.filter((cred) =>
    cred.website.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow px-4 py-6">
          <Routes>
            <Route
              path="/"
              element={
                <>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                  <CredentialForm
                    onSave={handleSave}
                    editingCredential={editingCredential}
                    onCancel={() => setEditingCredential(null)}
                  />
                  
                  <CredentialList
                    credentials={filteredCredentials}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </>
              }
            />
            <Route path="/generator" element={<PasswordGenerator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

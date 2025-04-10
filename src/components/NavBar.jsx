import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-accent via-primary-light to-soft-blue text-text-dark shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-bold tracking-wide flex items-center gap-2 text-primary drop-shadow-sm">
          <span role="img" aria-label="lock">🔐</span>
          PassVault
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;

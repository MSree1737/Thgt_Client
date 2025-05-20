// rafce

import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <nav className="bg-yellow-25 border-b border-black-300">
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-yellow-600 font-sans">Thgt Nest</h1>
        <div className="flex items-center gap-6">
          <Link to= "/signin"><button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md shadow-sm transition-all duration-200">
            Sign In
          </button></Link>
          <a href="" className="text-gray-700 hover:text-yellow-600 font-medium">Home</a>
          <a href="" className="text-gray-700 hover:text-yellow-600 font-medium">Story</a>
          <a href="" className="text-gray-700 hover:text-yellow-600 font-medium">Membership</a>
        </div>
      </header>
    </nav>
  );
};

export default Header;

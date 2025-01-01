import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FaBrain } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center space-x-2">
        <FaBrain className="text-2xl" />
        <h1 className="text-xl font-bold">Quiz Summary</h1>
      </div>
      <Link to="/" className="flex items-center space-x-1 text-blue-600">
        <FaHome className="text-lg" />
        <span>Home</span>
      </Link>
    </header>
  );
};

export default Header;
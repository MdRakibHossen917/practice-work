import React from 'react';
import { Link } from 'react-router-dom'; // react-router-dom থেকে Import করতে হবে

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyWebsite
        </Link>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to="/services" className="text-gray-700 hover:text-blue-600">
            Services
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 border rounded-lg text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { FaSearch, FaFutbol, FaBars, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      // Implement actual search logic here
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo with Sports Theme */}
        <Link to='/home'>
          <div className="flex items-center space-x-4">
            <FaFutbol className="text-red-500 text-4xl" />
            <span className="text-2xl font-bold tracking-wider text-white">
              Sport Club
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div >
          <ul className="hidden md:flex items-center space-x-8">
            <Link to='/matches'>
              <li className="text-lg transition-all duration-300 
                         hover:text-red-500 hover:scale-110 
                         ">Matches</li>
            </Link>
            <Link to='/news'>
              <li className="text-lg transition-all duration-300 
                         hover:text-red-500 hover:scale-110 
                         ">News</li>
            </Link>
            <Link to='/shop'>
              <li className="text-lg transition-all duration-300 
                         hover:text-red-500 hover:scale-110 
                         ">Shop</li>
            </Link>

            <Link>
              <li className="text-lg transition-all duration-300 
                         hover:text-red-500 hover:scale-110 
                         ">History</li>
            </Link>
            <Link to='/contact'>
              <li className="text-lg transition-all duration-300 
                         hover:text-red-500 hover:scale-110 
                         ">Contact</li>
            </Link>

          </ul>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4 relative left-15">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-gray-700 text-white 
                 px-4 py-1.5 rounded-l-full 
                 focus:outline-none focus:ring-2 
                 focus:ring-red-500 
                 w-56 transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-red-600 px-4 py-2 rounded-r-full 
                 hover:bg-red-700 transition-colors 
                 flex items-center justify-center"
              >
                <FaSearch className="text-white w-5 h-5" /> {/* Điều chỉnh kích thước icon */}
              </button>
            </div>
          </form>

          {/* Sign In Button */}
          <button
            className="flex items-center justify-center 
                       bg-transparent border-2 border-red-500 
                       text-red-500 px-6 py-2 rounded-full 
                       hover:bg-red-500 hover:text-white 
                       transition-all duration-300 
                       transform hover:scale-105 
                       group"
          >
            <FaUser className="mr-2 group-hover:animate-bounce" />
            <span className="font-semibold">Sign In</span>
          </button>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <FaBars
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl cursor-pointer 
                         hover:text-red-500 
                         transition-colors duration-300"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="w-3/4 flex">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-gray-700 text-white 
                           px-4 py-2 rounded-l-full 
                           focus:outline-none focus:ring-2 
                           focus:ring-red-500 
                           w-full transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-red-600 px-4 py-2 rounded-r-full 
                           hover:bg-red-700 transition-colors 
                           flex items-center justify-center"
              >
                <FaSearch className="text-white" />
              </button>
            </form>

            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-2xl text-white 
                           hover:text-red-500 
                           transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-xl mt-8 
                         hover:text-red-500 
                         transition-colors duration-300"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFutbol, FaBars, FaUser, FaCog, FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoginModal from '../pages/LoginPage';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState("English (US)");
  const [currency, setCurrency] = useState("Euro (EUR)");
  const [unit, setUnit] = useState("Metric (cm)");

  const menuItems = [
    { name: "Matches", href: "/matches" },
    { name: "News", href: "/news" },
    { name: "Shop", href: "/shop" },
    { name: "History", href: "#" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to='/home'>
          <div className="flex items-center space-x-4">
            <FaFutbol className="text-red-500 text-4xl" />
            <span className="text-2xl font-bold tracking-wider text-white">
              Sport Club
            </span>
          </div>
        </Link>

        <div>
          <ul className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link to={item.href} key={item.name}>
                <li className="text-lg transition-all duration-300 hover:text-red-500 hover:scale-110">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4 relative left-15">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-gray-700 text-white px-4 py-1.5 rounded-l-full focus:outline-none focus:ring-2 focus:ring-red-500 w-56 transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-red-600 px-4 py-2 rounded-r-full hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <FaSearch className="text-white w-5 h-5" />
              </button>
            </div>
          </form>

          <button
            onClick={() => setShowLoginModal(true)}
            className="flex items-center justify-center bg-transparent border-2 border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 group"
          >
            <FaUser className="mr-2 group-hover:animate-bounce" />
            <span className="font-semibold">Sign In</span>
          </button>

          <div className="md:hidden">
            <FaBars
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl cursor-pointer hover:text-red-500 transition-colors duration-300"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:text-red-500 text-2xl"
            >
              <FaCog />
            </button>
            {showSettings && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white rounded-lg shadow-lg z-50 p-4 space-y-4">
                <div className="font-bold text-lg">Sign in</div>

                <div className="flex items-center justify-between">
                  <span>Theme</span>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="text-xl hover:text-yellow-400"
                  >
                    {isDarkMode ? <FaMoon /> : <FaSun />}
                  </button>
                </div>

                <div>
                  <label className="block mb-1">Language</label>
                  <select
                    className="w-full bg-gray-700 text-white p-2 rounded"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option>English (US)</option>
                    <option>Tiếng Việt</option>
                    <option>Français</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Currency</label>
                  <select
                    className="w-full bg-gray-700 text-white p-2 rounded"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option>Euro (EUR)</option>
                    <option>USD (USD)</option>
                    <option>VND (₫)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Unit</label>
                  <select
                    className="w-full bg-gray-700 text-white p-2 rounded"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option>Metric (cm)</option>
                    <option>Imperial (inch)</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <form onSubmit={handleSearch} className="w-3/4 flex">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-gray-700 text-white px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-red-500 w-full transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-red-600 px-4 py-2 rounded-r-full hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <FaSearch className="text-white" />
              </button>
            </form>

            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-2xl text-white hover:text-red-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-xl mt-8 hover:text-red-500 transition-colors duration-300"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </nav>
  );
}

export default Navbar;

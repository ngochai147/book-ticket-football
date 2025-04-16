import React, { useState, useEffect } from 'react';
import { FaSearch, FaFutbol, FaBars, FaUser, FaCog, FaMoon, FaSun, FaShoppingCart, FaTicketAlt, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import LoginModal from '../pages/LoginPage';
import avatarImg from '../image/avatar-fb-mac-dinh-51nSxugr.jpg';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState("English (US)");
  const [currency, setCurrency] = useState("Euro (EUR)");
  const [unit, setUnit] = useState("Metric (cm)");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [userAvatar, setUserAvatar] = useState(avatarImg);
  const [username, setUsername] = useState("");

  const navigate = useNavigate(); // Added useNavigate hook
  const handleOpenCart = (e) => {
    e.preventDefault();
    setShowUserDropdown(false); // Close the dropdown if it's open
    navigate('/shopping-cart'); // Navigate to Cart page
  };
  const menuItems = [
    { name: "Matches", href: "/matches" },
    { name: "News", href: "/news" },
    { name: "Shop", href: "/shop" },
    { name: "Highlights", href: "/highlight" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    if (userLoggedIn === "true" && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest('.user-dropdown-container')) {
        setShowUserDropdown(false);
      }
      if (showSettings && !event.target.closest('.settings-dropdown-container')) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserDropdown, showSettings]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) alert(`Searching for: ${searchQuery}`);
  };
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    setShowLoginModal(false);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", userData.username);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setShowUserDropdown(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  };
  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
    if (showSettings) setShowSettings(false);
  };

  // New handler for navigating to Update Profile
  const handleUpdateProfile = () => {
    navigate('/update-profile'); // Navigate to UpdateProfile page
    setShowUserDropdown(false); // Close the dropdown after navigation
  };

  const handleTicketHistory = () => {
    navigate('/ticket-history'); // Navigate to TicketHistory page
    setShowUserDropdown(false); // Close the dropdown after navigation
  }

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/home" className="flex items-center space-x-4">
            <FaFutbol className="text-red-500 text-4xl" />
            <span className="text-2xl font-bold tracking-wider">Sport Club</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-lg transition-all duration-300 hover:text-red-500 hover:scale-110"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-gray-700 text-white px-4 py-1.5 rounded-l-full focus:outline-none focus:ring-2 focus:ring-red-500 w-56 transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-red-600 px-4 py-2 rounded-r-full hover:bg-red-700 transition-colors"
              >
                <FaSearch className="text-white w-5 h-5" />
              </button>
            </form>

            <div className="flex items-center space-x-3">
              {!isLoggedIn ? (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center bg-transparent border-2 border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 group"
                >
                  <FaUser className="mr-2 group-hover:animate-bounce" />
                  <span className="font-semibold">Sign In</span>
                </button>
              ) : (
                <div className="relative user-dropdown-container">
                  <button
                    onClick={toggleUserDropdown}
                    className="flex items-center bg-transparent border-2 border-red-500 p-1 rounded-full hover:border-red-400 transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={userAvatar}
                        alt={username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    </div>
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-50 p-4 space-y-4">
                      <div className="flex items-center space-x-3 border-b border-gray-700 pb-3">
                        <img
                          src={userAvatar}
                          alt={username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-bold text-lg">{username}</div>
                          <div className="text-xs text-gray-400">Football Fan</div>
                        </div>
                      </div>
                      <button onClick={handleOpenCart} to="/cart" className="flex items-center space-x-3 hover:text-red-500 transition-colors py-2">
                        <FaShoppingCart />
                        <span>Shopping Cart</span>
                      </button>
                      {/* Changed from Link to button with onClick handler */}
                      <button
                        onClick={handleUpdateProfile}
                        className="flex items-center space-x-3 hover:text-red-500 transition-colors py-2 w-full text-left"
                      >
                        <FaUserEdit />
                        <span>Update Profile</span>
                      </button >
                      <button
                        onClick={handleTicketHistory}
                        className="flex items-center space-x-3 hover:text-red-500 transition-colors py-2 w-full text-left"
                      >
                        <FaTicketAlt />
                        <span>Ticket History</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 text-red-500 hover:text-red-400 transition-colors py-2 w-full text-left"
                      >
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* <div className="relative settings-dropdown-container">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-red-500 text-2xl"
                >
                  <FaCog />
                </button>
                {showSettings && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-50 p-4 space-y-4">
                    <div className="font-bold text-lg">Settings</div>
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
              </div> */}

              <div className="md:hidden">
                <FaBars
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-2xl cursor-pointer hover:text-red-500 transition-colors duration-300"
                />
              </div>
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
                  className="bg-red-600 px-4 py-2 rounded-r-full hover:bg-red-700 transition-colors"
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
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
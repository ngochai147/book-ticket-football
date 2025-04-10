import React from 'react';
import { FaSearch, FaFutbol, FaBars, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to='/home'>
          <div className="flex items-center">
            <FaFutbol className="text-red-500 text-4xl" />
            <span className="text-2xl font-extrabold  tracking-wider text-white ml-2">
              Sport Club
            </span>
          </div>
        </Link>
        <div >
          <ul className="flex items-center space-x-8">
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

            <Link to='/highlight'>
              <li className="text-lg transition-all duration-300 
                         hover:text-red-500 hover:scale-110 
                         ">Highlights</li>
            </Link>
            <Link to='/contact'>
              <li className="text-lg transition-all duration-300 
                         hover:text-red-500 hover:scale-110 
                         ">Contact</li>
            </Link>

          </ul>
        </div>
        <div className="flex items-center space-x-4 relative left-15">
          <form>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-700 text-white 
                 px-4 py-1.5 rounded-l-full 
                 focus:outline-none
                 w-56 transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-red-600 px-4 py-2 rounded-r-full 
                 hover:bg-red-700 transition-colors 
                 flex items-center justify-center"
              >
                <FaSearch className="text-white w-5 h-5" />
              </button>
            </div>
          </form>
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
        </div>
      </div>      
    </nav>
  );
}

export default Navbar;
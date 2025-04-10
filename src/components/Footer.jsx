import React from 'react';
import { 
  FaFutbol, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-row justify-between items-start space-x-10">
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-4">
              <FaFutbol className="text-red-600 text-4xl mr-2 animate-bounce" />
              <h2 className="text-3xl font-extrabold">Sport Club</h2>
            </div>
            <p className="text-gray-400 text-sm max-w-xs text-left">
              Stay connected with the latest sports updates and exclusive offers.
            </p>
            <div className="flex space-x-6 mt-6">
                <FaFacebook className='text-blue-500 hover:text-blue-700 text-2xl transition-transform hover:scale-125'></FaFacebook>
                <FaTwitter className='text-cyan-400 hover:text-cyan-600 text-2xl transition-transform hover:scale-125'></FaTwitter>
                <FaInstagram className='text-pink-500 hover:text-pink-700 text-2xl transition-transform hover:scale-125'></FaInstagram>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center">
                <FaEnvelope className="text-red-600 mr-2" />
                <span>support@sportpulse.com</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-red-600 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="text-red-600 mr-2" />
                <span>123 Sports Ave, NY</span>
              </li>
            </ul>
          </div>
          <div className="w-auto flex flex-col items-start">
            <h3 className="text-xl font-semibold mb-4 text-left">Get Updates</h3>
            <div className="flex w-full max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none"
              />
              <button className="bg-red-600 px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors flex items-center">
                <FaEnvelope className="text-white" />
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-2 text-left">
              Subscribe for the latest news!
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 SportPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
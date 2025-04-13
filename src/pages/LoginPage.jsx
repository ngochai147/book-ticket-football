import React from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaTicketAlt, FaFutbol, FaTimes, FaAngleRight } from 'react-icons/fa';

function LoginModal({ onClose, onLoginSuccess }) {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleWhyRegister = (e) => {
        e.preventDefault();
        navigate('/why-register');
        onClose();
    }
    
    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/register');
        onClose();
    }
    
    const handleForgotPassword = (e) => {
        e.preventDefault();
        navigate('/forgot-password');
        onClose();
    }
    
    const handleForgotUsername = (e) => {
        e.preventDefault();
        navigate('/forgot-username');
        onClose();
    }
    
    const handleLogin = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!username) {
            setError("Username is required");
            usernameRef.current.focus();
            return;
        }
        if (!password) {
            setError("Password is required");
            passwordRef.current.focus();
            return;
        }
        
        // Here you would normally validate the credentials against a backend
        // For now, we'll simulate a successful login with any non-empty credentials
        
        // Call the onLoginSuccess prop with user data
        onLoginSuccess({ 
            username: username,
            // You could include other user data here in a real application
            // avatar: userAvatarUrl,
            // userId: userId
        });
        
        setError("");
        // No need to clear fields as the modal will close and unmount
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-[#001840] text-white w-full max-w-4xl rounded-2xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden border border-sky-900">
                {/* Left side - Register section with stadium background */}
                <div className="md:w-1/2 flex flex-col justify-center items-start p-10 bg-[#001840] relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('/api/placeholder/600/400')] bg-cover bg-center"></div>
                    <div className="relative z-10 w-full">
                        <div className="flex items-center mb-8">
                            <FaTicketAlt className="text-3xl text-blue-400 mr-3" />
                            <h2 className="text-3xl font-bold text-blue-400">JOIN THE FANS</h2>
                        </div>
                        <p className="mb-8 text-blue-100 text-lg leading-relaxed">Create an account to book tickets for your favorite matches and never miss a game!</p>
                        <button 
                            onClick={handleRegister} 
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl mb-8 w-full transition duration-300 shadow-lg flex items-center justify-center"
                        >
                            <FaFutbol className="mr-3 text-lg" /> REGISTER NOW
                        </button>
                        <a href="#" className="text-blue-300 hover:text-blue-100 hover:underline flex items-center group" onClick={handleWhyRegister}>
                            <FaAngleRight className="mr-1 transition-transform duration-300 group-hover:translate-x-1" /> 
                            Benefits of registration
                        </a>
                    </div>
                </div>

                {/* Right side - Login section */}
                <div className="md:w-1/2 p-10 bg-[#001840] flex flex-col justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                        {error && (
                            <div className="text-red-300 mb-6 p-4 bg-red-900/20 rounded-lg flex items-center border-l-4 border-red-500 backdrop-blur-sm">
                                <FaTimes className="mr-3 flex-shrink-0" /> 
                                <span>{error}</span>
                            </div>
                        )}
                        
                        <h2 className="text-3xl font-bold mb-8 text-blue-400 flex items-center">
                            <FaUser className="mr-1" /> ACCESS YOUR TICKETS
                        </h2>
                        
                        <form className="space-y-6">
                            <div className="relative group">
                                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-900 group-hover:text-blue-700 transition-colors duration-300" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-blue-100/90 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 border-none shadow-lg transition-all duration-300 focus:shadow-blue-500/30"
                                    ref={usernameRef}
                                />
                            </div>
                            
                            <div className="relative group">
                                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-900 group-hover:text-blue-700 transition-colors duration-300" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-blue-100/90 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 border-none shadow-lg transition-all duration-300 focus:shadow-blue-500/30"
                                    ref={passwordRef}
                                />
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <input 
                                    type="checkbox" 
                                    id="saveLogin" 
                                    className="rounded bg-blue-100 border-none focus:ring-blue-400 text-blue-500 h-5 w-5"
                                />
                                <label htmlFor="saveLogin" className="text-sm text-blue-100">Remember me</label>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg text-lg hover:shadow-blue-500/50"
                                onClick={handleLogin}
                            >
                                LOGIN TO MY ACCOUNT
                            </button>
                        </form>
                        
                        <div className="mt-8 flex flex-col sm:flex-row sm:justify-between text-sm space-y-3 sm:space-y-0">
                            <a href="#" className="text-blue-300 hover:text-blue-100 hover:underline flex items-center group" onClick={handleForgotUsername}>
                                <FaAngleRight className="mr-1 transition-transform duration-300 group-hover:translate-x-1" /> 
                                Forgot username?
                            </a>
                            <a href="#" className="text-blue-300 hover:text-blue-100 hover:underline flex items-center group" onClick={handleForgotPassword}>
                                <FaAngleRight className="mr-1 transition-transform duration-300 group-hover:translate-x-1" /> 
                                Forgot password?
                            </a>
                        </div>
                    </div>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white hover:text-blue-300 text-xl flex items-center justify-center h-10 w-10 rounded-full hover:bg-blue-900/50 transition duration-300 backdrop-blur-sm"
                    aria-label="Close"
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
}

export default LoginModal;
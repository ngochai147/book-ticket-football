import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useRef , useState} from 'react';
import { useNavigate } from 'react-router-dom';

function LoginModal({ onClose }) {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleWhyRegister = (e) => {
        e.preventDefault();
        navigate('/why-register');
        onClose(); // Close the modal after navigating
    }
    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/register');
        onClose(); // Close the modal after navigating
    }
    const handleForgotPassword = (e) => {
        e.preventDefault();
        navigate('/forgot-password');
        onClose(); // Close the modal after navigating
    }
    const hanldeForgotUsername = (e) => {
        e.preventDefault();
        navigate('/forgot-username');
        onClose(); // Close the modal after navigating
    }
    const handleLogin = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!username){
            setError("Username is required");
            usernameRef.current.focus();
            return;
        }
        if (!password){
            setError("Password is required");
            passwordRef.current.focus();
            return;
        }
        onClose(); // Close the modal after login attempt
        setError(""); // Reset error message
        FaLock.current.value = ""; // Clear password field
        usernameRef.current.value = ""; // Clear username field

        // Handle login logic here
        console.log('Logging in with:', { username, password });
    }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="bg-[#001f4d] text-white w-full max-w-3xl p-8 rounded-lg relative flex gap-10">
        {/* Đăng ký bên trái */}
        <div className="flex-1 flex flex-col justify-center items-start border-r border-white pr-6">
          <h2 className="text-xl font-bold mb-4">CREATE YOUR ACCOUNT</h2>
          <button onClick={handleRegister} className="bg-white text-[#001f4d] font-bold px-4 py-2 rounded mb-2 hover:opacity-90 border border-red-500">
            REGISTER FOR FREE TODAY
          </button>
          <a href="#" className="text-sm text-blue-300 hover:underline" onClick={handleWhyRegister}>
            › Why register?
          </a>
        </div>

        {/* Đăng nhập bên phải */}
        <div className="flex-1">
            {error && <div className="text-red-500 mb-4">{error}</div>}
          <h2 className="text-xl font-bold mb-4">LOGIN</h2>
          <form className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-2 rounded bg-white text-black focus:outline-none border border-red-500"
              ref={usernameRef}/>
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 rounded bg-white text-black focus:outline-none border border-red-500"
              ref={passwordRef}/>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="saveLogin" className="border border-red-500" />
              <label htmlFor="saveLogin" className="text-sm">Save login</label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition border border-red-500"
                onClick={handleLogin}
            >
              LOGIN
            </button>
          </form>
          <div className="mt-4 space-y-1 text-sm">
            <a href="/forgot-username" className="text-blue-300 hover:underline" onClick={hanldeForgotUsername}>› Forgot username?</a>
            <br></br>
            <a href="/forgot-password" className="text-blue-300 hover:underline" onClick={handleForgotPassword}>› Forgot password?</a>
          </div>
        </div>

        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl hover:text-red-500"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default LoginModal;

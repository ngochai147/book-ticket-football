import React, { useState } from 'react';
import LoginModal from './LoginPage'; // Đảm bảo đường dẫn này đúng

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Xem xét có cần state này ở đây không

  // --- Di chuyển handleLoginSuccess ra ngoài ---
  const handleLoginSuccess = (userData) => {
    console.log("Login successful in ForgotPassword, user:", userData);
    // setIsLoggedIn(true); // Cập nhật nếu cần
    setShowLoginModal(false); // Đóng modal sau khi login thành công

    // Logic cập nhật localStorage có thể giữ lại nếu phù hợp
    localStorage.setItem("isLoggedIn", "true");
    // localStorage.setItem("username", userData.username); // LoginModal đã lưu user object rồi, có thể không cần lưu riêng username ở đây
    localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin user đầy đủ hơn nếu cần

    // Có thể bạn muốn chuyển hướng người dùng sau khi login
    // ví dụ: window.location.reload(); hoặc dùng navigate nếu có react-router-dom
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // --- Xóa định nghĩa handleLoginSuccess khỏi đây ---

    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true); // Hiện thông báo thành công và nút Login
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error("Forgot Password Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Hàm để mở modal ---
  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative"> {/* Thêm relative để modal có thể định vị */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white p-4 rounded-t-xl -m-6 mb-4">
          <h2 className="text-xl font-bold">Forgot Password</h2>
          <p className="text-sm">Reset your password in a few steps</p>
        </div>

        {!submitted ? (
          <>
            <p className="mb-4 text-gray-700 text-sm">
              Enter your email address below, and we’ll send you a new username.
            </p>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <input
                  type="email"
                  placeholder="Email *"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-950 to-blue-900 text-white font-semibold py-2 px-6 rounded-md hover:from-blue-900 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* ... Loading spinner ... */}
                 {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Request New Username'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-medium">
              ✅ A new username has been sent to your email address.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Please check your inbox (and spam/junk folder) for the email.
            </p>
            <button
              className={`mt-4 px-6 py-2 rounded-md font-medium text-white transition-all duration-300 ${ // Thêm mt-4
                isHovered
                  ? "bg-blue-700 shadow-lg transform scale-105"
                  : "bg-blue-600 shadow-md"
                }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={openLoginModal} // <-- Gắn hàm mở modal vào onClick
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Render LoginModal khi showLoginModal là true */}
      {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)} // Hàm để đóng modal
            onLoginSuccess={handleLoginSuccess}     // Hàm xử lý khi login thành công
          />
        )}
    </div>
  );
}

export default ForgotPassword;

// --- Đảm bảo rằng định nghĩa component LoginModal NẰM TRONG FILE RIÊNG (LoginPage.js) ---
// --- Xóa code LoginModal khỏi file này ---
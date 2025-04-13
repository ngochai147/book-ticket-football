import React, { useState } from 'react';

function ForgotUsername() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Gửi yêu cầu đến backend
      const response = await fetch('http://localhost:6000/api/forgot-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white p-4 rounded-t-xl -m-6 mb-4">
          <h2 className="text-xl font-bold">Forgot Username</h2>
          <p className="text-sm">Retrieve your username in a few steps</p>
        </div>

        {/* Nội dung chính */}
        {!submitted ? (
          <>
            <p className="mb-4 text-gray-700 text-sm">
              If you’ve forgotten your username, enter the email address you used during registration below, and we’ll send your username to that email.
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
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Request Username'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-medium">
              ✅ Your username has been sent to your email address.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Please check your inbox (and spam/junk folder) for the email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotUsername;
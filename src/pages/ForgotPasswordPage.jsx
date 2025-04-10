import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giả lập gửi email, bạn có thể gọi API ở đây
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-xl">
        <h2 className="text-xl font-bold text-white bg-[#001f4d] px-4 py-2 mb-6 rounded">
          FORGOT PASSWORD
        </h2>

        {!submitted ? (
          <>
            <p className="mb-4 text-gray-700">
              If you've forgotten your password, enter your email address below and we'll send you instructions to reset it.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border-2 border-red-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded border-2 border-red-700"
              >
                Request password reset
              </button>
            </form>
          </>
        ) : (
          <p className="text-green-600 font-medium">
            ✅ A password reset link has been sent to your email address.
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;

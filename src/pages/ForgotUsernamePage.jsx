import React from 'react';

function ForgotUsername() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded w-full max-w-xl p-6">
        {/* Header */}
        <div className="bg-[#001f4d] text-white font-bold text-lg px-4 py-2 rounded-t">
          FORGOT USERNAME
        </div>

        {/* Nội dung chính */}
        <div className="p-4 pt-6">
          <p className="mb-4 text-gray-800">
            Wenn du deinen Usernamen vergessen hast, kannst du hier deine bei deiner Registrierung
            hinterlegte E-Mail-Adresse eintragen und erhältst nach Abschicken des Formulars deinen
            Usernamen per E-Mail zugeschickt.
          </p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-blue-500 rounded focus:outline-none focus:ring focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-[#1976d2] text-white font-semibold px-6 py-2 rounded hover:bg-[#145ca1] transition"
            >
              Request username
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotUsername;

import React from 'react';

function WhyRegister() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Why Register?</h1>

        <p className="text-gray-700 mb-6">
          Registering as a member of our football community comes with a range of exciting
          benefits. Whether you're here to join discussions, play prediction games, or simply show
          support for your favorite team, registering unlocks a world of features just for you.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-2">🎯 Personalized Experience</h2>
        <p className="text-gray-700 mb-4">
          Tailor your profile, pick your favorite clubs and players, and receive content curated just
          for your interests.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-2">🗣️ Join the Discussion</h2>
        <p className="text-gray-700 mb-4">
          Engage in debates, discussions, and banter with fans from around the world. Share your
          opinions and read hot takes from others.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-2">🏆 Participate in Contests</h2>
        <p className="text-gray-700 mb-4">
          Compete in prediction games, fantasy leagues, and other contests with exciting prizes and
          bragging rights!
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-2">🔔 Stay Up to Date</h2>
        <p className="text-gray-700 mb-4">
          Receive newsletters and notifications about the latest football news, transfers, match
          results, and exclusive updates.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-2">🛡️ Safe & Secure</h2>
        <p className="text-gray-700 mb-4">
          Your data is protected. We use industry-standard security to ensure your personal
          information stays safe.
        </p>

        <div className="mt-8">
          <a
            href="/register"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default WhyRegister;

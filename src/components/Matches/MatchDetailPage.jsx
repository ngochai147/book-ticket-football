// src/components/MatchDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaLocationArrow, FaTicketAlt, FaArrowLeft, FaFutbol } from 'react-icons/fa';
import { allMatchData } from '../../data/matchData';

function MatchDetailPage() {
  const { matchId } = useParams(); // Get matchId from URL
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      try {
        const foundMatch = allMatchData[0];
        if (foundMatch) {
          setMatch(foundMatch);
        } else {
          setError('Match not found.');
        }
      } catch (err) {
        setError('Failed to load match details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300); // Simulate delay

    return () => clearTimeout(timer);
  }, [matchId]); // Re-run if matchId changes

  // --- Render Logic ---
  if (loading) return <div className="flex justify-center items-center min-h-screen"><p className="text-lg text-gray-500 animate-pulse">Loading Match Details...</p></div>;
  if (error) return (
        <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4">
            <p className="text-red-600 text-xl mb-4 font-semibold">{error}</p>
            <Link to="/matches" className="text-sm bg-gray-700 text-white py-2 px-5 rounded-md hover:bg-gray-900 transition-colors flex items-center gap-2">
                <FaArrowLeft /> Back to Matches
            </Link>
        </div>
    );
  if (!match) return null; // Should be covered by error state

  const isPastMatch = match.status === 'Full-Time';
  const hasScore = match.score?.team1 !== null && match.score?.team2 !== null;

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6 md:mb-8">
           <Link to="/matches" className="inline-flex items-center text-sm text-gray-600 hover:text-red-700 group font-medium">
             <FaArrowLeft className="mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
             Back to Fixtures
           </Link>
        </div>

        {/* Match Header Card */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl shadow-xl p-6 md:p-8 mb-8 md:mb-10 text-center relative overflow-hidden">
            {/* Subtle Background pattern */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/subtle-stripes.png')]"></div>

            <p className="text-sm uppercase tracking-wider text-red-300 mb-2 relative z-10">{match.league}</p>
            <div className="flex items-center justify-around md:justify-center gap-4 md:gap-8 relative z-10 mb-4">
                {/* Team 1 */}
                <div className="flex flex-col items-center w-1/3 md:w-auto">
                    <img src={match.team1.logoUrl} alt={match.team1.name} className="w-16 h-16 md:w-24 md:h-24 object-contain mb-2"/>
                    <h2 className="text-lg md:text-xl font-semibold text-center">{match.team1.name}</h2>
                </div>
                {/* Score / VS */}
                <div className="text-center">
                    {isPastMatch && hasScore ? (
                        <span className="text-4xl md:text-6xl font-bold">{match.score.team1} - {match.score.team2}</span>
                    ) : match.status === 'Live' && hasScore ? (
                        <span className="text-4xl md:text-6xl font-bold">{match.score.team1} - {match.score.team2}</span>
                    ) : (
                        <span className="text-3xl md:text-4xl font-light opacity-80">vs</span>
                    )}
                    <p className={`mt-1 text-xs font-semibold px-2 py-0.5 rounded ${match.status === 'Live' ? 'text-red-200 animate-pulse' : 'text-gray-300'}`}>{match.status}</p>
                </div>
                {/* Team 2 */}
                <div className="flex flex-col items-center w-1/3 md:w-auto">
                    <img src={match.team2.logoUrl} alt={match.team2.name} className="w-16 h-16 md:w-24 md:h-24 object-contain mb-2"/>
                    <h2 className="text-lg md:text-xl font-semibold text-center">{match.team2.name}</h2>
                </div>
            </div>
             {/* Date & Time */}
             <div className="flex justify-center items-center gap-4 text-sm text-gray-300 relative z-10">
                 <span className="flex items-center gap-1.5"><FaCalendarAlt /> {match.date}</span>
                 <span className="flex items-center gap-1.5"><FaClock /> {match.time}</span>
             </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
           {/* Main Details (Col 1 & 2) */}
           <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Match Details</h3>

                {/* Stadium Info */}
                <div className="mb-5">
                    <h4 className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">Venue</h4>
                    <div className="flex items-center gap-2 text-lg text-gray-700">
                       <FaLocationArrow className="text-red-500 flex-shrink-0" />
                       <span>{match.stadium.name}, {match.stadium.city}</span>
                    </div>
                </div>

                {/* Preview Text */}
                {match.details?.previewText && (
                    <div className="mb-5">
                        <h4 className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">Preview</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{match.details.previewText}</p>
                    </div>
                )}

                 {/* Placeholder for Lineups/Stats */}
                 {isPastMatch && (
                     <div className="space-y-4">
                         <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Post-Match</h4>
                         <p className="text-sm text-gray-500 italic">Lineups, statistics, and highlights would appear here.</p>
                         {/* Add links or embedded content if available */}
                     </div>
                 )}

           </div>

            {/* Sidebar (Col 3) */}
           <div className="space-y-6">
               {/* Stadium Image Card */}
                {match.stadium.imageUrl && (
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        <img src={match.stadium.imageUrl} alt={`${match.stadium.name} exterior`} className="w-full h-40 object-cover"/>
                        <div className="p-4">
                            <h4 className="font-semibold text-gray-800">{match.stadium.name}</h4>
                            <p className="text-xs text-gray-500">{match.stadium.city}</p>
                        </div>
                    </div>
                )}

                {/* Ticket Booking Card */}
                {!isPastMatch && match.ticketUrl && (
                    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 text-center">
                         <h4 className="font-semibold text-gray-800 mb-3">Get Your Tickets!</h4>
                         <p className="text-xs text-gray-600 mb-4">Don't miss out on this exciting match.</p>
                         <a
                            href={match.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full bg-red-600 text-white px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-red-700 transition-colors shadow-md"
                        >
                            <FaTicketAlt /> Book Now
                        </a>
                    </div>
                )}
                {/* Add other sidebar cards: e.g., Weather forecast, Head-to-Head stats */}
           </div>
        </div>

      </div>
    </div>
  );
}

export default MatchDetailPage;
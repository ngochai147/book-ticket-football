// src/components/MatchListItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaLocationArrow, FaTicketAlt } from 'react-icons/fa';

function MatchListItem({ match }) {
  if (!match) return null;

  const isPastMatch = match.status === 'Full-Time';
  const hasScore = match.score?.team1 !== null && match.score?.team2 !== null;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden">
      <Link to={`/matches/${match.id}`} className="block group p-4 md:p-5">
        {/* Header: League & Status */}
        <div className="flex justify-between items-center mb-3 text-xs text-gray-500">
          <span>{match.league || 'Football Match'}</span>
          <span className={`font-medium px-2 py-0.5 rounded-full ${
             match.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
             match.status === 'Live' ? 'bg-red-100 text-red-700 animate-pulse' :
             match.status === 'Full-Time' ? 'bg-gray-200 text-gray-700' : ''
          }`}>
            {match.status}
          </span>
        </div>

        {/* Teams & Score */}
        <div className="flex items-center justify-between gap-3 mb-3">
          {/* Team 1 */}
          <div className="flex items-center gap-2 justify-end text-right w-[40%]">
             <span className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-red-700 transition-colors truncate">{match.team1.name}</span>
             <img src={match.team1.logoUrl} alt={`${match.team1.name} logo`} className="w-6 h-6 md:w-8 md:h-8 object-contain flex-shrink-0" />
          </div>

          {/* Score / VS */}
          <div className="text-center flex-shrink-0">
            {isPastMatch && hasScore ? (
              <span className="text-xl md:text-2xl font-bold text-gray-800">{match.score.team1} - {match.score.team2}</span>
            ) : match.status === 'Live' && hasScore ? (
               <span className="text-xl md:text-2xl font-bold text-red-600">{match.score.team1} - {match.score.team2}</span>
            ) : (
              <span className="text-sm font-bold text-gray-400">vs</span>
            )}
          </div>

          {/* Team 2 */}
           <div className="flex items-center gap-2 justify-start text-left w-[40%]">
             <img src={match.team2.logoUrl} alt={`${match.team2.name} logo`} className="w-6 h-6 md:w-8 md:h-8 object-contain flex-shrink-0" />
             <span className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-red-700 transition-colors truncate">{match.team2.name}</span>
          </div>
        </div>

        {/* Details: Date, Time, Stadium */}
        <div className="text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-center sm:items-center gap-1 sm:gap-3 text-center border-t border-gray-100 pt-3">
           <div className="flex items-center justify-center gap-1">
               <FaCalendarAlt /><span>{match.date}</span>
           </div>
           <div className="flex items-center justify-center gap-1">
               <FaClock /><span>{match.time}</span>
           </div>
           <div className="flex items-center justify-center gap-1 truncate">
               <FaLocationArrow /><span>{match.stadium.name}, {match.stadium.city}</span>
           </div>
        </div>
      </Link>

      {/* Ticket Button (Outside Link, only for scheduled matches) */}
      {!isPastMatch && match.ticketUrl && (
         <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 text-center">
            <a
                href={match.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs bg-red-500 text-white py-1.5 px-3 rounded-full hover:bg-red-600 transition-colors font-medium shadow-sm"
                onClick={(e) => e.stopPropagation()} // Prevent Link navigation when clicking button
            >
                <FaTicketAlt /> Book Tickets
            </a>
         </div>
      )}
       {isPastMatch && ( // Placeholder for results link
         <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 text-center">
            <Link
                to={`/matches/${match.id}`}
                className="text-xs text-gray-600 hover:text-red-700 font-medium"
            >
                View Result Details →
            </Link>
         </div>
      )}
    </div>
  );
}

export default MatchListItem;
import React from 'react';
import { Calendar, Clock, MapPin, Info, Trophy, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function MatchListItemWithScore({ match}) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'LIVE':
        return 'bg-red-600';
      case 'FINISHED':
        return 'bg-gray-600';
    }
  };

  return (
    <div className="relative">
      <div className="rounded-3xl border border-gray-100 shadow-sm bg-white">
        <div>
          <div className="pt-6 px-8 flex justify-between items-start">
            <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full">
              <Trophy size={16} />
              <span className="text-sm font-medium">{match.competition}</span>
            </div>

            <div className={`px-4 py-1.5 rounded-full ${getStatusColor(match.status)} text-white`}>
              <span className="font-semibold">
                {match.status === 'LIVE' &&'Live'}
                {match.status === 'FINISHED'&&'Completed'}
              </span>
            </div>
          </div>

          <div className="mt-8 px-8">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-white p-4 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <img
                      src={match.team1Logo}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800">{match.team1}</h3>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm text-gray-500">Home</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center px-6">
                {match.status === 'LIVE' || match.status === 'FINISHED' ? (
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-gray-800">{match.score}</div>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-white">VS</span>
                  </div>
                )}
                {match.status === 'live' && (
                  <div className="mt-2 px-4 py-1 bg-red-100 rounded-full">
                    <span className="text-sm font-medium text-red-600">{match.minute}'</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-white p-4 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <img
                      src={match.team2Logo}
                      alt={match.team2}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800">{match.team2}</h3>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm text-gray-500">Away</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 mx-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Calendar size={20} className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{match.date}</p>
                  <p className="text-xs text-gray-500">Match Date</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Clock size={20} className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{match.time}</p>
                  <p className="text-xs text-gray-500">Kick-off</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <MapPin size={20} className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{match.stadium}</p>
                  <p className="text-xs text-gray-500">Venue</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8">
          <Link to={`/matches/${match.id}`} state={{ matchData: match }}
                className="flex-1 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl 
              py-3 px-6 flex items-center justify-center gap-2 font-medium transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                <Info size={18} className="text-red-500" />
                <span>Match Details</span>
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchListItemWithScore;

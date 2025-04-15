import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Ticket, Info, Trophy, Star } from 'lucide-react';

function MatchListItem({ match }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'live':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'completed':
        return 'bg-gradient-to-r from-gray-600 to-gray-700 text-white';
      default:
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
    }
  };

  return (
    <div className="relative">
      <div className="gray-300 rounded-3xl transform translate-y-2 scale-[0.98]"></div>
      <div className=" rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="pt-6 px-8 flex justify-between items-start">
            <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full">
              <Trophy size={16} />
            </div>


            <div className="px-4 py-1.5 rounded-full bg-green-600 text-white">
              <span className="font-semibold">
                Scheduled
              </span>

            </div>
          </div>
          <div className="mt-8 px-8">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex flex-col items-center gap-4">
                  <div className=" w-24 h-24 rounded-2xl bg-white p-4 shadow-md transform transition-all duration-300 group-hover/team:scale-105 group-hover/team:shadow-lg">
                    <img
                      src={match.team1Logo}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800">
                      {match.team1}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm text-gray-500">Home Team</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center px-6">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                  <span className="text-xl font-bold text-white">VS</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col items-center gap-4">
                  <div className=" w-24 h-24 rounded-2xl bg-white p-4 shadow-md transform transition-all duration-300 group-hover/team:scale-105 group-hover/team:shadow-lg">
                    <img
                      src={match.team2Logo}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800">
                      {match.team2}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm text-gray-500">Home Team</span>
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
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex gap-4">
              <Link to={`/matches/${match.id}`}
                className="flex-1 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl 
              py-3 px-6 flex items-center justify-center gap-2 font-medium transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                <Info size={18} className="text-red-500" />
                <span>Match Details</span>
              </Link>
              <Link className='flex-1' to={`/matches/bookticket/${match.id}`}>
                <button
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl 
              py-3 px-6 flex items-center justify-center gap-2 font-medium transition-all duration-300 hover:shadow-md cursor-pointer"
                >
                  <Ticket size={18} />
                  <span>Book Tickets</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchListItem;
// src/components/MatchesPage.js
import React, { useState, useEffect, useMemo } from 'react';
import { FaFutbol } from 'react-icons/fa';
import { allMatchData } from '../data/matchData';
import MatchListItem from '../components/Matches/MatchListItem';

function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('upcoming'); // 'upcoming' or 'results'

  // Simulate fetching data
  useEffect(() => {
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      try {
        // Sort data: Upcoming first, then past matches by date descending
        const sortedData = [...allMatchData].sort((a, b) => {
            if (a.status === 'Scheduled' && b.status !== 'Scheduled') return -1;
            if (a.status !== 'Scheduled' && b.status === 'Scheduled') return 1;
            // If both same status, sort by date (most recent first for results)
            const dateA = new Date(a.date.split(' ').reverse().join('-')); // Basic date parsing
            const dateB = new Date(b.date.split(' ').reverse().join('-'));
            if(a.status === 'Full-Time') return dateB - dateA; // Desc for results
            return dateA - dateB; // Asc for upcoming/live
        });
        setMatches(sortedData);
      } catch (err) {
        setError('Failed to load match data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300); // Simulate delay

    return () => clearTimeout(timer);
  }, []);

  // Filter matches based on the selected filter
  const filteredMatches = useMemo(() => {
    if (filter === 'upcoming') {
      return matches.filter(m => m.status === 'Scheduled' || m.status === 'Live');
    } else if (filter === 'results') {
      return matches.filter(m => m.status === 'Full-Time');
    }
    return matches; // Should not happen with current filters
  }, [matches, filter]);

  return (
    <div className="bg-gray-100 min-h-screen py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <FaFutbol className="text-5xl md:text-6xl text-red-600 mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            Fixtures & Results
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Check out upcoming matches and past results.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
           <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
             <button
               onClick={() => setFilter('upcoming')}
               className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                 filter === 'upcoming' ? 'bg-white text-gray-800 shadow' : 'text-gray-600 hover:text-gray-800'
               }`}
             >
               Upcoming
             </button>
              <button
               onClick={() => setFilter('results')}
               className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                 filter === 'results' ? 'bg-white text-gray-800 shadow' : 'text-gray-600 hover:text-gray-800'
               }`}
             >
               Results
             </button>
           </div>
        </div>

        {/* Loading / Error */}
        {loading && <p className="text-center text-gray-500 py-10">Loading matches...</p>}
        {error && <p className="text-center text-red-600 py-10">{error}</p>}

        {/* Match List */}
        {!loading && !error && (
           <div className="space-y-4 md:space-y-5">
             {filteredMatches.length > 0 ? (
               filteredMatches.map(match => (
                 <MatchListItem key={match.id} match={match} />
               ))
             ) : (
               <p className="text-center text-gray-500 py-10">
                 No {filter === 'upcoming' ? 'upcoming matches' : 'results'} found.
               </p>
             )}
           </div>
        )}
      </div>
    </div>
  );
}

export default MatchesPage;
import React from "react";
import { FaFutbol, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MatchListItem from "../components/Matches/MatchListItem";
import MatchListItemWithScore from "../components/Matches/MatchListItemScore";
import { useData } from "../components/context/DataContext";

function MatchesPage() {
  const {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    currentMatches,
    currentPage,
    totalPages,
    handleNextPage,
    handlePrevPage,
    renderPaginationButtons,
    filteredMatches,
  } = useData();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-12">
          <div className="bg-red-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-200">
            <FaFutbol className="text-4xl text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Fixtures & Results</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">Check out upcoming matches and past results.</p>
        </div>
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by team name..."
              className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-gray-600"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="flex justify-center mb-10">
          <div className="rounded-full p-1 bg-gray-100">
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                filter === "upcoming" ? "bg-red-600 text-white shadow-md transform -translate-y-0.5" : "text-gray-700 hover:text-red-600"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter("results")}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                filter === "results" ? "bg-red-600 text-white shadow-md transform -translate-y-0.5" : "text-gray-700 hover:text-red-600"
              }`}
            >
              Results
            </button>
          </div>
        </div>

        {currentMatches.length > 0 ? (
          <>
            {filter === "upcoming" ? (
              <>
                {currentMatches.map((match) => (
                  <div
                    key={match.id}
                    className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-2xl mb-6"
                  >
                    <MatchListItem match={match} />
                  </div>
                ))}
              </>
            ) : (
              <>
                {currentMatches.map((match) => (
                  <div
                    key={match.id}
                    className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-2xl mb-6"
                  >
                    <MatchListItemWithScore match={match} />
                  </div>
                ))}
              </>
            )}
            <div className="flex justify-between items-center mt-10 mb-6">
              <div className="text-sm text-gray-500">
                Showing {currentPage * 3 - 2}-{Math.min(currentPage * 3, filteredMatches.length)} of {filteredMatches.length} matches
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-red-100"}`}
                  aria-label="Previous page"
                >
                  <FaChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex space-x-1">{renderPaginationButtons()}</div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-red-100"}`}
                  aria-label="Next page"
                >
                  <FaChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No matches found. Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchesPage;
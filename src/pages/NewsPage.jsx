// src/components/NewsPage.js (or wherever you place your components)
import React, { useState, useEffect, useMemo } from 'react';
import { FaNewspaper, FaCalendarAlt, FaFilter, FaSearch } from 'react-icons/fa';

// --- Mock Data ---
// In a real app, fetch this from an API
const allNewsData = [
  { id: 1, title: 'Transfer Deadline Day: Winners and Losers', date: '10 Sep 2024', summary: 'A frantic end to the window saw several high-profile moves finalized.', category: 'Transfers', imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=870&auto=format&fit=crop', slug: 'transfer-deadline-winners-losers' },
  { id: 2, title: 'Managerial Masterclass: Tactical Shifts Paying Off', date: '12 Sep 2024', summary: 'Analysing the tactical tweaks leading teams up the table.', category: 'Analysis', imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=870&auto=format&fit=crop', slug: 'managerial-masterclass-tactics' },
  { id: 3, title: 'Injury Update: Key Players Sidelined Ahead of Weekend', date: '14 Sep 2024', summary: 'Several clubs face selection headaches due to recent injuries.', category: 'Team News', imageUrl: 'https://images.unsplash.com/photo-1551958214-211c59d6c4c3?q=80&w=871&auto=format&fit=crop', slug: 'injury-update-weekend-preview' },
  { id: 4, title: 'VAR Controversy: Another Weekend of Debated Decisions', date: '16 Sep 2024', summary: 'Reviewing the key VAR incidents and their impact on results.', category: 'Match Reports', imageUrl: 'https://images.unsplash.com/photo-1618193139138-89122c1c3bfa?q=80&w=870&auto=format&fit=crop', slug: 'var-controversy-weekend' },
  { id: 5, title: 'Rising Star: Young Talent Makes Breakthrough', date: '17 Sep 2024', summary: 'Highlighting a promising young player making waves in the league.', category: 'Features', imageUrl: 'https://images.unsplash.com/photo-1553776821-56c18a30a928?q=80&w=870&auto=format&fit=crop', slug: 'rising-star-breakthrough' },
  { id: 6, title: 'European Nights: Midweek Action Preview', date: '18 Sep 2024', summary: 'Looking ahead to the Champions League and Europa League fixtures.', category: 'Previews', imageUrl: 'https://images.unsplash.com/photo-1598057080189-35064db0c793?q=80&w=774&auto=format&fit=crop', slug: 'european-nights-preview' },
  { id: 7, title: 'Club Focus: Inside the Training Ground', date: '19 Sep 2024', summary: 'An exclusive look behind the scenes at a top Premier League club.', category: 'Features', imageUrl: 'https://images.unsplash.com/photo-1519861595287-287931eb6c47?q=80&w=870&auto=format&fit=crop', slug: 'club-focus-training' },
  { id: 8, title: 'Transfer Rumours: January Window Whispers', date: '20 Sep 2024', summary: 'The latest gossip and speculation surrounding potential winter transfers.', category: 'Transfers', imageUrl: 'https://images.unsplash.com/photo-1611892075499-af18c4f54a1a?q=80&w=870&auto=format&fit=crop', slug: 'transfer-rumours-january' },
  // Add more articles as needed
];

const ARTICLES_PER_PAGE = 6;

function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Simulate API call on mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    // Simulate network delay
    const timer = setTimeout(() => {
      try {
        // In a real app, fetch data here
        setArticles(allNewsData);
      } catch (err) {
        setError('Failed to load news articles.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500); // 0.5 second delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Get unique categories for filtering + 'All'
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(articles.map(article => article.category))];
    return ['All', ...uniqueCategories.sort()];
  }, [articles]);

  // Filter and search articles
  const filteredArticles = useMemo(() => {
    return articles
      .filter(article => {
        // Category filter
        return selectedCategory === 'All' || article.category === selectedCategory;
      })
      .filter(article => {
        // Search term filter (case-insensitive)
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
          article.title.toLowerCase().includes(lowerSearchTerm) ||
          article.summary.toLowerCase().includes(lowerSearchTerm) ||
          article.category.toLowerCase().includes(lowerSearchTerm)
        );
      });
  }, [articles, selectedCategory, searchTerm]);

  // Paginate filtered articles
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const currentArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    return filteredArticles.slice(startIndex, endIndex);
  }, [filteredArticles, currentPage]);

  // Pagination handlers
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);


  // --- Rendering ---
  return (
    <div className="bg-gray-100 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <FaNewspaper className="text-5xl md:text-6xl text-red-600 mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight">
            Latest News & Updates
          </h1>
          <p className="mt-2 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest happenings in the world of football.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Category Filter */}
            <div className="w-full md:w-auto flex-shrink-0 flex items-center">
              <FaFilter className="text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 mr-3">Filter by Category:</span>
            </div>
             <div className="w-full md:flex-grow grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-xs rounded-full transition-colors duration-200 font-medium ${
                      selectedCategory === category
                        ? 'bg-red-600 text-white shadow'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

            {/* Search Input */}
            <div className="w-full md:w-auto md:ml-auto flex items-center relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && <p className="text-center text-gray-500 py-10">Loading news...</p>}
        {error && <p className="text-center text-red-600 py-10">{error}</p>}

        {/* Articles Grid */}
        {!loading && !error && (
          <>
            {currentArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {currentArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl border border-gray-200 flex flex-col group"
                  >
                    <div className="relative aspect-video overflow-hidden"> {/* Fixed aspect ratio */}
                      <img
                         src={article.imageUrl || 'https://via.placeholder.com/400x225.png?text=News'}
                         alt={article.title}
                         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded z-10">
                          {article.category}
                      </span>
                    </div>
                    <div className="p-4 md:p-5 flex flex-col flex-grow">
                      <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 leading-tight group-hover:text-red-700 transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <FaCalendarAlt className="mr-1.5" />
                        <span>{article.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 flex-grow">{article.summary}</p>
                      {/* --- Use Link from React Router here in a real app --- */}
                      <a
                        href={`#`} // Replace with `/news/${article.slug}` or similar
                        // onClick={(e) => e.preventDefault()} // Prevent default for demo
                        className="mt-auto text-sm text-red-600 hover:text-red-800 font-medium self-start group/link"
                      >
                        Read More <span className="transition-transform duration-200 inline-block group-hover/link:translate-x-1">→</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-10">No news articles found matching your criteria.</p>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center space-x-3">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  ← Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                   className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default NewsPage;
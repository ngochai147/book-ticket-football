import React, { useEffect, useState } from "react";


const Highlights = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;

  const fetchScorebatHighlights = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://www.scorebat.com/video-api/v1/");
      if (!res.ok) throw new Error("Failed to fetch highlights");
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScorebatHighlights();
  }, []);

  const filteredVideos = videos.filter((video) =>
    filterTerm
      ? video.competition.name.toLowerCase().includes(filterTerm.toLowerCase())
      : true
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  // Get videos for current page
  const indexOfLast = currentPage * videosPerPage;
  const indexOfFirst = indexOfLast - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-2xl font-bold text-red-500">
            Football Highlights (Scorebat)
          </h1>
          <select
            className="mt-2 sm:mt-0 px-4 py-2 rounded-md border"
            value={filterTerm}
            onChange={(e) => {
              setFilterTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 when filter changes
            }}
          >
            <option value="">All Competitions</option>
            <option value="premier league">Premier League</option>
            <option value="la liga">La Liga</option>
            <option value="champions league">Champions League</option>
            <option value="serie a">Serie A</option>
            <option value="bundesliga">Bundesliga</option>
          </select>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">

        

        {/* Main Hight light */}
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && (
          <div className="text-red-500 text-center py-4">
            <p>{error}</p>
            <button
              onClick={fetchScorebatHighlights}
              className="mt-2 bg-red-100 px-4 py-2 rounded hover:bg-red-200"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && currentVideos.length === 0 && (
          <p className="text-center text-gray-500">No highlights found</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentVideos.map((video, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden"
            >
              <div
                className="aspect-video"
                dangerouslySetInnerHTML={{ __html: video.videos[0]?.embed }}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{video.title}</h2>
                <p className="text-sm text-gray-600">{video.competition.name}</p>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                >
                  Watch on Scorebat ➜
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? "bg-red-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>  
        )}
      </main>

      
    </div>
  );
};

export default Highlights;

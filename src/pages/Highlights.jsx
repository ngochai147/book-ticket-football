import React, { useEffect, useState, useCallback } from "react";

const Highlights = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("premier league highlights");
  const [filterTerm, setFilterTerm] = useState("");
  const [error, setError] = useState(null);

  const apiKey = "AIzaSyDkjuP-FcEucJ6S8l09mxjPc8zez2xptoI"; // Thay bằng API Key của bạn

  // Memoized fetch function
  const fetchVideos = useCallback(async (query) => {
    setLoading(true);
    setError(null);

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(query)} HD&type=video&videoDefinition=high&key=${apiKey}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch videos');
      const data = await res.json();

      if (data.items?.length > 0) {
        const videoIds = data.items.map(item => item.id.videoId).join(',');
        const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,status&id=${videoIds}&key=${apiKey}`;

        const detailsRes = await fetch(detailsUrl);
        if (!detailsRes.ok) throw new Error('Failed to fetch video details');
        const detailsData = await detailsRes.json();

        // Kết hợp dữ liệu và lọc video không thể nhúng
        const enhancedVideos = data.items
          .map(item => ({
            ...item,
            details: detailsData.items.find(detail => detail.id === item.id.videoId)
          }))
          .filter(video => video.details?.status?.embeddable === true); 

        setVideos(enhancedVideos);
      } else {
        setVideos([]);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVideos(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, fetchVideos]);

  const filteredVideos = videos.filter(video =>
    filterTerm ? video.snippet.title.toLowerCase().includes(filterTerm.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            Football Highlights Sport Club
          </h1>

          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search highlights..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>

            <select
              className="w-full sm:w-48 px-4 py-2 rounded-full border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 bg-white"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
            >
              <option value="">All Competitions</option>
              <option value="Premier League">Premier League</option>
              <option value="La Liga">La Liga</option>
              <option value="Champions League">Champions League</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-red-500">
            Error: {error} - Please try again
          </div>
        )}

        {!loading && !error && filteredVideos.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No videos found. Try a different search term!
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id.videoId}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id.videoId}?vq=hd1080&autoplay=0&modestbranding=1&rel=0`}
                  title={video.snippet.title}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-2 mb-2">
                  {video.snippet.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  {video.snippet.channelTitle}
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Watch on YouTube
                  <span className="ml-1">➜</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Highlights;
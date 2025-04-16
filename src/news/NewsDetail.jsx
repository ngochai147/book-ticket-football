// src/components/NewsDetail.jsx
import React from 'react';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import allNewsData from '../data/newsData';
import "./NewsDetail.css";

function NewsDetail() {
  const { slug } = useParams();
  const article = allNewsData.find(item => item.slug === slug);

  if (!article) {
    return (
      <div className="text-center py-10 text-red-600">
        <p className="text-lg font-semibold">Bài viết không tồn tại.</p>
        <Link to="/news" className="text-blue-600 underline mt-4 inline-block text-sm">
          ← Quay lại trang tin tức
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/news"
          className="inline-flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Quay lại tin tức
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-auto rounded-lg mb-6"
        />

        <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>

        <div className="flex items-center text-sm text-gray-500 mb-6">
          <FaCalendarAlt className="mr-2" />
          <span>{article.date}</span>
        </div>

        <p className="text-base leading-relaxed text-gray-700 mb-6">{article.summary}</p>

        <div className="prose max-w-none prose-red prose-lg">
          {article.description
            .split('\n')
            .map((paragraph, idx) => (
              <p key={idx}>{paragraph.trim()}</p>
            ))}
        </div>
      </div>
            {/* Latest News Section */}
            <div className="latest-news-section">
        <h2 className="section-title ">Latest News</h2>

        <div className="news-grid">
          {allNewsData.slice(0, 6).map((news, index) => (
            <Link to={`/news/${news.slug}`} key={index} className="news-card">
              <img src={news.imageUrl} alt={news.title} className="news-image" />
              <div className="news-content">
                <span className="news-label">Feature</span>
                <h3 className="news-title">{news.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="more-news-link">
          <Link to="/news">More News →</Link>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;

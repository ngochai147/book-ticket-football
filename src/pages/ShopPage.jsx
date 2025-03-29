// src/components/ShopPage.js
import React, { useState, useEffect, useMemo } from 'react';
// REMOVE Link import if no longer needed directly here
import { FaShoppingCart, FaFilter } from 'react-icons/fa';
import { allShopData } from '../data/shopData';
// Import the new component
import ProductCard from '../components/Shop/ProductCard';

const ITEMS_PER_PAGE = 8;

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  // --- Fetching, Filtering, Sorting, Pagination Logic (Remains the same) ---
   // Simulate API call
  useEffect(() => {
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      try {
        setProducts(allShopData);
      } catch (err) {
        setError('Failed to load products.'); console.error(err);
      } finally { setLoading(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return ['All', ...uniqueCategories.sort()];
  }, [products]);

  // Filter and Sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return result;
  }, [products, selectedCategory, sortBy]);

  // Paginate
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  // Reset page on filter/sort change
  useEffect(() => { setCurrentPage(1); }, [selectedCategory, sortBy]);

  // Pagination handlers
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  // --- End of Logic ---


  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header (Remains the same) */}
        <div className="text-center mb-8 md:mb-12">
          <FaShoppingCart className="text-5xl md:text-6xl text-red-600 mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight">
            Official Merchandise Shop
          </h1>
          <p className="mt-2 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Gear up and show your support with authentic fan apparel and accessories.
          </p>
        </div>

        {/* Filters and Sorting (Remains the same) */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 md:items-center">
           <div className="flex items-center flex-wrap gap-2">
             <FaFilter className="text-gray-500 mr-2 text-sm hidden md:inline" />
             <span className="text-sm font-medium text-gray-700 mr-2 hidden md:inline">Category:</span>
             {categories.map(category => (
                  <button key={category} onClick={() => setSelectedCategory(category)} className={`px-3 py-1.5 text-xs rounded-full transition-colors duration-200 font-medium ${selectedCategory === category ? 'bg-red-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                    {category}
                  </button>
                ))}
           </div>
           <div className="md:ml-auto flex items-center">
             <label htmlFor="sort-by" className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
             <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-white">
               <option value="default">Default</option>
               <option value="price-asc">Price: Low to High</option>
               <option value="price-desc">Price: High to Low</option>
               <option value="name-asc">Name: A to Z</option>
             </select>
           </div>
        </div>

         {/* Loading / Error (Remains the same) */}
         {loading && <p className="text-center text-gray-500 py-10">Loading products...</p>}
         {error && <p className="text-center text-red-600 py-10">{error}</p>}

         {/* Product Grid - ** USE ProductCard HERE ** */}
         {!loading && !error && (
            <>
             {currentProducts.length > 0 ? (
                // The grid layout structure
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Map over currentProducts and render ProductCard */}
                    {currentProducts.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
             ) : (
                // No products message (Remains the same)
                <p className="text-center text-gray-500 py-10">No products found matching your criteria.</p>
             )}

             {/* Pagination (Remains the same) */}
             {totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center space-x-3">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className={`px-4 py-2 text-sm font-medium rounded-md transition ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}>← Previous</button>
                <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className={`px-4 py-2 text-sm font-medium rounded-md transition ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}>Next →</button>
              </div>
             )}
            </>
         )}

      </div>
    </div>
  );
}

export default ShopPage;
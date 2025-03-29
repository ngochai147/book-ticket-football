// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

// Helper function for formatting price (can be moved to a utils file if used elsewhere)
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price);
};

function ProductCard({ product }) {
  if (!product) {
    return null; // Don't render if no product data
  }

  return (
    <Link
      to={`/shop/${product.id}`} // Navigate to detail page using product id
      className="bg-white rounded-lg shadow-md overflow-hidden group border border-gray-200 flex flex-col text-center transition duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      aria-label={`View details for ${product.name}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy" // Add lazy loading for images
        />
        {/* Category Badge */}
        {product.category && (
            <span className="absolute top-2 right-2 bg-gray-800 text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded z-10">
                {product.category}
            </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <h3 className="text-sm md:text-base font-medium text-gray-800 mb-1 flex-grow leading-tight group-hover:text-red-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-base md:text-lg font-semibold text-red-600">
          {formatPrice(product.price)}
        </p>
         {/* Optional: Add rating stars here if needed for card view */}
         {/* Example: product.rating && <div>{renderStars(product.rating)}</div> */}
      </div>
    </Link>
  );
}

export default ProductCard;
import React from 'react';
import { Link } from 'react-router-dom';

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price);
};

function ProductCard({ product }) {

  return (
    <Link
      to={`/shop/${product.id}`}
      className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col text-center transition duration-300 hover:shadow-xl focus:outline-none"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.imageUrl}
          className="w-full h-full object-cover"
        />
        {product.category && (
            <span className="absolute top-2 right-2 bg-gray-800 text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded">
                {product.category}
            </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-medium text-gray-800 mb-1 flex-grow leading-tight">
          {product.name}
        </h3>
        <p className="text-lg font-semibold text-red-600">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
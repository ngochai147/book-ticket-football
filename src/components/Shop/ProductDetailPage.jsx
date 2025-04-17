// src/components/ProductDetailPage.js
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaArrowLeft, FaCheckCircle, FaShippingFast, FaBoxOpen, FaMinus, FaPlus } from 'react-icons/fa';
// *** Import useCart hook ***
import { useCart } from '../../context/CartContext'; // <--- Adjust path if needed
// *** Import Toastify ***
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { allShopData } from '../../data/shopData'; // Ensure data is imported
import ProductCard from './ProductCard'; // Import for Related/Suggested Products
import ImageZoomModal from './ImageZoomModal';

// Helper functions (formatPrice, renderStars - Keep these or move to utils)
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price);
};
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    else if (i === fullStars && halfStar) stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />); // Assuming half star is full star for display
    else stars.push(<FaStar key={`star-${i}`} className="text-gray-300" />);
  }
  return <div className="flex">{stars}</div>;
};
// --- End Helper Functions ---

function ProductDetailPage() {
  const { id } = useParams();
  // *** Get addToCart from context ***
  const { addToCart } = useCart(); // <--- Use the hook

  // State (same as before)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);


  // Fetch Product Data (same as before)
  useEffect(() => {
    setLoading(true); setError(null); setQuantity(1);
    const timer = setTimeout(() => {
      try {
        // console.log(id);
        // ** Important: Ensure 'id' from params matches the type in your data (string vs number) **
        // If product IDs in data are numbers, convert: const numId = parseInt(id, 10);
        const foundProduct = allShopData.find(item => item.id === id); // Assuming IDs are strings
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.images ? foundProduct.images[0] : foundProduct.imageUrl);
          // Set default selections if available
          if (foundProduct.sizes?.length) setSelectedSize(foundProduct.sizes[0]); else setSelectedSize(null);
          if (foundProduct.colors?.length) setSelectedColor(foundProduct.colors[0]); else setSelectedColor(null);
        } else { setError('Product not found.'); }
      } catch (err) { setError('Failed to load product details.'); console.error(err); }
      finally { setLoading(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, [id]);

  // Event Handlers (same as before, except handleAddToCart)
  const handleThumbnailClick = (imageUrl) => { setSelectedImage(imageUrl); };
  const handleSizeSelect = (size) => { setSelectedSize(size); };
  const handleColorSelect = (color) => { setSelectedColor(color); };
  const handleQuantityChange = (amount) => { setQuantity(prev => Math.max(1, prev + amount)); };

  // *** Updated handleAddToCart ***
  const handleAddToCart = () => {
    if (!product) return; // Should not happen if button is enabled, but good practice

    // --- IMPORTANT: Variant Handling ---
    // The current CartContext merges items based *only* on product.id.
    // If you need Size S and Size M of the *same* shirt to be separate cart items,
    // you need to create a unique ID for each variant *or* modify the CartContext logic.
    //
    // Option 1 (Unique Variant ID - Simpler change here):
    // const variantId = `${product.id}${selectedSize ? '-' + selectedSize : ''}${selectedColor ? '-' + selectedColor : ''}`;
    //
    // Option 2 (Modify Context - More robust but needs context changes):
    // Keep product.id and pass size/color, then update context's `addToCart` and `removeFromCart`
    // to check id+size+color combination.
    //
    // For now, we'll use the simple product.id approach matching the current context.
    // This means adding the same product with different sizes/colors will just increase the quantity.

    const itemToAdd = {
      id: product.id, // Use base product ID as per current CartContext logic
      // id: variantId, // Use this if implementing Option 1 above
      name: product.name + `${selectedSize ? ' - ' + selectedSize : ''}${selectedColor ? ' / ' + selectedColor : ''}`, // More descriptive name
      price: product.price, // Assuming price doesn't change with variants for now
      image: selectedImage || product.imageUrl, // Use the currently selected image for cart display
      quantity: quantity,
      // You might want to pass these even if not used for ID, for display in cart:
      size: selectedSize,
      color: selectedColor,
    };

    console.log('Adding to cart:', itemToAdd);
    addToCart(itemToAdd); // Call the context function

    // Show feedback to the user
    toast.success(`${quantity} x ${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

    // Optional: Reset quantity after adding?
    // setQuantity(1);
  };


  // --- Calculate Related and Suggested Products --- (same as before)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allShopData
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4); // Limit to 4 related products
  }, [product]);

  const suggestedProducts = useMemo(() => {
    if (!product) return [];
    return allShopData
      .filter(p => p.category !== product.category && p.id !== product.id)
      .slice(0, 4); // Limit to 4 suggestions
  }, [product]);
  // --- End Product Calculations ---


  // --- Render Logic (Main structure same, adding new section) ---
  if (loading) return <div className="flex justify-center items-center min-h-screen"><p className="text-lg text-gray-500 animate-pulse">Loading Product...</p></div>;
  if (error) return ( <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4"><p className="text-red-600 text-xl mb-4 font-semibold">{error}</p><Link to="/shop" className="text-sm bg-gray-700 text-white py-2 px-5 rounded-md hover:bg-gray-900 transition-colors flex items-center gap-2"><FaArrowLeft /> Back to Shop</Link></div>);
  if (!product) return null; // Should be handled by error state now

  const stockStatus = product.stockStatus ?? 'In Stock'; // Provide default if missing
  const isOutOfStock = stockStatus === 'Out of Stock';
  const stockClass = stockStatus === 'In Stock' ? 'text-green-600' : stockStatus === 'Low Stock' ? 'text-orange-500' : 'text-red-600';

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-10 md:py-16">
       {/* *** Add Toast Container *** */}
       <ToastContainer
         position="bottom-right"
         autoClose={2500}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="colored"
       />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6 md:mb-8">
          <Link to="/shop" className="inline-flex items-center text-sm text-gray-600 hover:text-red-700 group font-medium"><FaArrowLeft className="mr-2 transition-transform duration-200 group-hover:-translate-x-1" />Back to All Products</Link>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Image Gallery Column */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto md:h-[500px] md:pr-2 order-first md:order-none pb-2 md:pb-0">
                {product.images.map((imageUrl, index) => (
                  <button key={index} onClick={() => handleThumbnailClick(imageUrl)} className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${selectedImage === imageUrl ? 'border-red-500 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}>
                    <img src={imageUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
            {/* Main Image */}
            <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg border border-gray-200 flex-grow">
              <img
                src={selectedImage || product.imageUrl} // Fallback to main imageUrl
                alt={product.name}
                onClick={() => selectedImage && setIsZoomOpen(true)} // Only allow zoom if image selected
                className={`w-full h-full object-contain transition-opacity duration-300 ${selectedImage ? 'cursor-zoom-in' : ''}`} // Add zoom cursor only if image exists
              />
            </div>
          </div>

          {/* Product Details Column */}
          <div className="flex flex-col">
            {/* Category, Name, Rating, Price, Stock */}
            <span className="inline-block self-start bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">{product.name}</h1>
            {product.rating && product.reviews && (<div className="flex items-center mb-4 gap-2">{renderStars(product.rating)}<a href="#reviews" className="text-sm text-gray-500 hover:text-red-600 transition-colors">({product.reviews} reviews)</a></div>)}
            <div className="flex items-baseline gap-3 mb-5"><p className="text-3xl font-bold text-red-600">{formatPrice(product.price)}</p>{product.oldPrice && (<p className="text-lg text-gray-400 line-through">{formatPrice(product.oldPrice)}</p>)}</div>
            {/* Use the derived stockStatus and class */}
            <div className="mb-5 flex items-center gap-2 text-sm font-medium">
              <FaCheckCircle className={stockClass} />
              <span className={stockClass}>{stockStatus}</span>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
             <div className="mb-5">
                 <h3 className="text-sm font-medium text-gray-800 mb-2">Size: <span className="font-semibold">{selectedSize || 'Select size'}</span></h3>
                 <div className="flex flex-wrap gap-2">
                     {product.sizes.map((size) => (
                         <button
                            key={size}
                            onClick={() => handleSizeSelect(size)}
                            className={`px-4 py-2 text-sm border rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 ${selectedSize === size ? 'bg-gray-800 text-white border-gray-800 font-semibold shadow-sm' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500 hover:bg-gray-50'}`}
                          >
                            {size}
                         </button>
                     ))}
                 </div>
             </div>
            )}

            {/* Color Selection */}
             {product.colors && product.colors.length > 0 && ( // Show even if 1 color for consistency
                 <div className="mb-6">
                     <h3 className="text-sm font-medium text-gray-800 mb-2">Color: <span className="font-semibold">{selectedColor || 'Select color'}</span></h3>
                     <div className="flex flex-wrap gap-2">
                         {product.colors.map((color) => (
                             <button
                                 key={color}
                                 onClick={() => handleColorSelect(color)}
                                 // Basic styling example - could use actual color swatches
                                 className={`px-4 py-2 text-sm border rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 ${selectedColor === color ? 'bg-gray-800 text-white border-gray-800 font-semibold shadow-sm' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500 hover:bg-gray-50'}`}
                                 // style={{ backgroundColor: selectedColor === color ? color : '#fff', color: selectedColor === color ? 'white' : 'black' }} // Example for color swatches
                             >
                                 {color}
                             </button>
                         ))}
                     </div>
                 </div>
             )}


            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch mb-6">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500" aria-label="Decrease quantity"><FaMinus size="0.8em" /></button>
                <span className="px-5 py-2 text-center font-medium text-gray-800 border-l border-r border-gray-300 w-16">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md focus:outline-none focus:ring-1 focus:ring-red-500" aria-label="Increase quantity"><FaPlus size="0.8em" /></button>
              </div>
              {/* Disable button if out of stock */}
              <button
                 onClick={handleAddToCart}
                 className="flex-grow bg-red-600 text-white px-8 py-3 rounded-md text-base font-semibold flex items-center justify-center hover:bg-red-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                 disabled={isOutOfStock} // <--- Disable logic here
               >
                <FaShoppingCart className="mr-2" />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-gray-200 pt-5 mb-6 space-y-2 text-sm text-gray-600"><div className="flex items-center gap-2"><FaShippingFast className="text-gray-500" /><span>Usually ships within 24 hours.</span></div><div className="flex items-center gap-2"><FaBoxOpen className="text-gray-500" /><span>Free UK delivery on orders over £50.</span></div></div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-5 mb-6"><h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2><p className="text-sm leading-relaxed text-gray-700">{product.description}</p></div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (<div className="border-t border-gray-200 pt-5"><h2 className="text-lg font-semibold text-gray-800 mb-3">Specifications</h2><ul className="space-y-1 text-sm">{product.specifications.map((spec, index) => (<li key={index} className="flex justify-between"><span className="text-gray-600">{spec.name}:</span><span className="text-gray-800 font-medium text-right">{spec.value}</span></li>))}</ul></div>)}

          </div> {/* End Details Column */}
        </div> {/* End Main Grid */}


        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-20 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((related) => (
                <ProductCard product={related} key={related.id} />
              ))}
            </div>
          </div>
        )}

        {/* Suggested Products Section */}
        {suggestedProducts.length > 0 && (
          <div className="mt-16 md:mt-20 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Top Picks For You</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {suggestedProducts.map((suggested) => (
                <ProductCard product={suggested} key={suggested.id} />
              ))}
            </div>
          </div>
        )}

      </div> {/* End Max Width Container */}

      {/* Image Zoom Modal */}
      {isZoomOpen && selectedImage && ( // Ensure selectedImage exists before rendering modal
        <ImageZoomModal
          imageUrl={selectedImage}
          onClose={() => setIsZoomOpen(false)}
        />
      )}

    </div> /* End Outer Background Div */
  );
}

export default ProductDetailPage;

// Make sure allShopData is defined or properly imported if it's in another file
// export const allShopData = [ ... your data ... ];
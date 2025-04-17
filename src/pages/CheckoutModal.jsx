import React, { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaMapMarkerAlt, FaCreditCard, FaTruck, FaMoneyBill, FaInfoCircle, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Assuming formatCurrency is passed correctly and handles GBP/en-GB
function CheckoutModal({ isOpen, onClose, onConfirm, cartItems = [], formatCurrency }) {
  const [step, setStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',      // Store ID for city
    district: '',  // Store ID for district
    ward: '',      // Store ID for ward
    note: '',
    paymentMethod: 'cod', // Default payment method
  });
  const [formErrors, setFormErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Form reset function
  const resetForm = () => {
    setCustomerInfo({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      district: '',
      ward: '',
      note: '',
      paymentMethod: 'cod',
    });
    setStep(1);
    setFormErrors({});
    // Optionally reset location dropdowns if needed, though they reload based on dependencies
    setDistricts([]);
    setWards([]);
  };

  // Fetch Cities/Provinces
  useEffect(() => {
    fetch('https://esgoo.net/api-tinhthanh/1/0.htm') // Using the Vietnamese API endpoint
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 0) {
          setCities(data.data); // Assuming the API provides name/id
        }
      })
      .catch((err) => console.error('Error fetching provinces/cities:', err)); // English error
  }, []);

  // Fetch Districts when city changes
  useEffect(() => {
    if (customerInfo.city) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${customerInfo.city}.htm`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error === 0) {
            setDistricts(data.data);
            setWards([]); // Reset wards when district changes
            // Reset district and ward selection in state if city changes
            // setCustomerInfo((prev) => ({ ...prev, district: '', ward: '' })); // Handled below
          } else {
            setDistricts([]); // Clear if API returns error
            setWards([]);
          }
        })
        .catch((err) => {
           console.error('Error fetching districts:', err); // English error
           setDistricts([]);
           setWards([]);
        });
    } else {
      setDistricts([]); // Clear if no city selected
      setWards([]);
    }
    // Reset district and ward when city changes *after* fetch logic
    setCustomerInfo((prev) => ({ ...prev, district: '', ward: '' }));
  }, [customerInfo.city]); // Only depend on city

  // Fetch Wards when district changes
  useEffect(() => {
    if (customerInfo.district) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${customerInfo.district}.htm`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error === 0) {
            setWards(data.data);
            // Reset ward selection in state if district changes
            // setCustomerInfo((prev) => ({ ...prev, ward: '' })); // Handled below
          } else {
            setWards([]); // Clear if API returns error
          }
        })
        .catch((err) => {
          console.error('Error fetching wards:', err); // English error
           setWards([]);
        });
    } else {
      setWards([]); // Clear if no district selected
    }
     // Reset ward when district changes *after* fetch logic
    setCustomerInfo((prev) => ({ ...prev, ward: '' }));
  }, [customerInfo.district]); // Only depend on district


  // Step validation logic (English error messages)
  const validateStep = () => {
    const errors = {};
    const phoneRegex = /^\+?[0-9\s-()]{7,}$/; // More flexible phone regex
    const emailRegex = /\S+@\S+\.\S+/;

    if (step === 1) {
      if (!customerInfo.name.trim()) errors.name = 'Please enter your full name';
      if (!customerInfo.phone.trim()) errors.phone = 'Please enter your phone number';
      else if (!phoneRegex.test(customerInfo.phone)) errors.phone = 'Invalid phone number format';
      if (!customerInfo.email.trim()) errors.email = 'Please enter your email address';
      else if (!emailRegex.test(customerInfo.email)) errors.email = 'Invalid email address format';
    } else if (step === 2) {
      if (!customerInfo.address.trim()) errors.address = 'Please enter your street address';
      if (!customerInfo.city) errors.city = 'Please select a province/city';
      if (!customerInfo.district) errors.district = 'Please select a district';
      if (!customerInfo.ward) errors.ward = 'Please select a ward/commune';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    // Clear the specific error when user starts typing in the field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Calculate total (ensure cartItems is an array)
  const calculateTotal = () => {
    return Array.isArray(cartItems)
      ? cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)
      : 0;
  };

  // Final submit handler
  const handleSubmit = () => {
    // No validation needed at step 3 if previous steps were validated
    // Or re-validate all steps if needed: if (validateStep1() && validateStep2()) { ... }
    onConfirm(customerInfo); // Pass the collected info
    resetForm(); // Reset form after successful confirmation
  };

  // Effect to reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Delay reset slightly to allow exit animation
      const timer = setTimeout(() => {
        resetForm();
      }, 300); // Match exit transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && step !== 1) return null; // Prevent rendering during exit animation if not on step 1

  // Helper to get full name from ID - adjust property names ('id', 'full_name') if needed
  const getNameById = (id, list) => list.find(item => String(item.id) === String(id))?.full_name || '';


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" // Added padding
        >
          <motion.div
            initial={{ y: '50px', opacity: 0 }} // Slide up animation
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '50px', opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }} // Spring animation
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" // Max height
          >
            {/* Header */}
            <div
              style={{
                // Keeping brand colors, replace hex if needed
                background: 'linear-gradient(to right, #EE4D2D, #FF6633)',
                color: 'white',
                padding: '1rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0, // Prevent header shrinking
              }}
            >
              <h2 className="text-xl font-semibold">
                {/* English Titles */}
                {step === 1 && 'Personal Information'}
                {step === 2 && 'Delivery Address'}
                {step === 3 && 'Confirm Order'}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close checkout" // Accessibility
                style={{ color: 'white' }}
                className="opacity-80 hover:opacity-100 transition-opacity" // Use opacity for hover
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Stepper */}
            <div className="px-6 pt-4 flex-shrink-0"> {/* Prevent shrinking */}
              <div className="flex items-center justify-between mb-2">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div
                    style={{ /* Styles kept, using hex */ }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      step >= 1 ? 'bg-[#EE4D2D] text-white' : 'bg-[#D1D5DB] text-black' // bg-gray-300
                    }`}
                  >
                    1
                  </div>
                   {/* English Label */}
                  <span className="text-xs mt-1">Info</span>
                </div>
                {/* Connector */}
                <div
                  style={{ /* Styles kept, using hex */ }}
                  className={`flex-1 h-1 mx-2 transition-colors duration-300 ${
                    step >= 2 ? 'bg-[#EE4D2D]' : 'bg-[#D1D5DB]' // bg-gray-300
                  }`}
                ></div>
                 {/* Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div
                     style={{ /* Styles kept, using hex */ }}
                     className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      step >= 2 ? 'bg-[#EE4D2D] text-white' : 'bg-[#D1D5DB] text-black' // bg-gray-300
                    }`}
                  >
                    2
                  </div>
                   {/* English Label */}
                  <span className="text-xs mt-1">Address</span>
                </div>
                {/* Connector */}
                <div
                   style={{ /* Styles kept, using hex */ }}
                   className={`flex-1 h-1 mx-2 transition-colors duration-300 ${
                    step >= 3 ? 'bg-[#EE4D2D]' : 'bg-[#D1D5DB]' // bg-gray-300
                  }`}
                ></div>
                 {/* Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div
                    style={{ /* Styles kept, using hex */ }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      step >= 3 ? 'bg-[#EE4D2D] text-white' : 'bg-[#D1D5DB] text-black' // bg-gray-300
                    }`}
                  >
                    3
                  </div>
                  {/* English Label */}
                  <span className="text-xs mt-1">Confirm</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto p-6 flex-grow">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4 text-gray-700">
                    <FaUser />
                     {/* English Section Title */}
                    <h3 className="font-medium">Personal Information</h3>
                  </div>
                  <div>
                     {/* English Label */}
                    <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      style={{ /* Styles kept, using hex */ }}
                      className={`w-full p-3 border rounded-lg outline-none transition-all duration-300 ${
                        formErrors.name ? 'border-[#EF4444]' : 'border-[#D1D5DB]' // border-red-500, border-gray-300
                      } focus:border-[#EE4D2D] focus:ring-2 focus:ring-[#EE4D2D]/20`} // focus styles
                      placeholder="Enter your full name" // English Placeholder
                    />
                     {/* English Error */}
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                     {/* English Label */}
                    <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaPhone className="text-gray-400" /> {/* Adjusted color */}
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        style={{ /* Styles kept, using hex */ }}
                         className={`w-full p-3 pl-10 border rounded-lg outline-none transition-all duration-300 ${ // Added pl-10 for icon
                            formErrors.phone ? 'border-[#EF4444]' : 'border-[#D1D5DB]' // border-red-500, border-gray-300
                         } focus:border-[#EE4D2D] focus:ring-2 focus:ring-[#EE4D2D]/20`} // focus styles
                        placeholder="Enter your phone number" // English Placeholder
                      />
                    </div>
                     {/* English Error */}
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                     {/* English Label */}
                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      style={{ /* Styles kept, using hex */ }}
                      className={`w-full p-3 border rounded-lg outline-none transition-all duration-300 ${
                        formErrors.email ? 'border-[#EF4444]' : 'border-[#D1D5DB]' // border-red-500, border-gray-300
                      } focus:border-[#EE4D2D] focus:ring-2 focus:ring-[#EE4D2D]/20`} // focus styles
                      placeholder="example@email.com" // English Placeholder
                    />
                    {/* English Error */}
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Delivery Address */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4 text-gray-700">
                    <FaMapMarkerAlt />
                     {/* English Section Title */}
                    <h3 className="font-medium">Delivery Address</h3>
                  </div>
                  <div>
                     {/* English Label */}
                    <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-1">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      style={{ /* Styles kept, using hex */ }}
                      className={`w-full p-3 border rounded-lg outline-none transition-all duration-300 ${
                        formErrors.address ? 'border-[#EF4444]' : 'border-[#D1D5DB]' // border-red-500, border-gray-300
                      } focus:border-[#EE4D2D] focus:ring-2 focus:ring-[#EE4D2D]/20`} // focus styles
                      placeholder="House number, street name" // English Placeholder
                      rows="2"
                    />
                    {/* English Error */}
                    {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                       {/* English Label */}
                      <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-1">
                        Province/City <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="city"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        style={{ /* Styles kept, using hex */ }}
                        className={`w-full p-3 border rounded-lg outline-none transition-all duration-300 appearance-none bg-white ${ // Added appearance-none
                          formErrors.city ? 'border-[#EF4444]' : 'border-[#D1D5DB]' // border-red-500, border-gray-300
                        } focus:border-[#EE4D2D] focus:ring-2 focus:ring-[#EE4D2D]/20`} // focus styles
                      >
                         {/* English Placeholder */}
                        <option value="">Select Province/City</option>
                        {/* Assuming API provides 'id' and 'full_name' */}
                        {cities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.full_name}
                          </option>
                        ))}
                      </select>
                       {/* English Error */}
                      {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                    </div>
                    <div>
                       {/* English Label */}
                      <label htmlFor="district" className="block text-gray-700 text-sm font-medium mb-1">
                        District <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="district"
                        name="district"
                        value={customerInfo.district}
                        onChange={handleInputChange}
                        style={{ /* Styles kept, using hex */ }}
                         className={`w-full p-3 border rounded-lg outline-none transition-all duration-300 appearance-none bg-white ${ // Added appearance-none
                            formErrors.district ? 'border-[#EF4444]' : 'border-[#D1D5DB]' // border-red-500, border-gray-300
                         } focus:border-[#EE4D2D] focus:ring-2 focus:ring-[#EE4D2D]/20`} // focus styles
                        disabled={!customerInfo.city || districts.length === 0} // Disable if no city or districts loaded
                      >
                         {/* English Placeholder */}
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.full_name}
                          </option>
                        ))}
                      </select>
                      {/* English Error */}
                      {formErrors.district && <p className="text-red-500 text-xs mt-1">{formErrors.district}</p>}
                    </div>
                    <div>
                       {/* English Label */}
                      <label htmlFor="ward" className="block text-gray-700 text-sm font-medium mb-1">
                        Ward/Commune <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="ward"
                        name="ward"
                        value={customerInfo.ward}
                        onChange={handleInputChange}
                        style={{ /* Styles kept, using hex */ }}
                        className={`w-full p-3 border rounded-lg outline-none transition-all duration-300 appearance-none bg-white ${ // Added appearance-none
                            formErrors.ward ? 'border-[#EF4444]' : 'border-[#D1D5DB]' // border-red-500, border-gray-300
                         } focus:border-[#EE4D2D] focus:ring-2 focus:ring-[#EE4D2D]/20`} // focus styles
                        disabled={!customerInfo.district || wards.length === 0} // Disable if no district or wards loaded
                      >
                        {/* English Placeholder */}
                        <option value="">Select Ward/Commune</option>
                        {wards.map((ward) => (
                          <option key={ward.id} value={ward.id}>
                            {ward.full_name}
                          </option>
                        ))}
                      </select>
                       {/* English Error */}
                      {formErrors.ward && <p className="text-red-500 text-xs mt-1">{formErrors.ward}</p>}
                    </div>
                  </div>
                  <div>
                     {/* English Label */}
                    <label htmlFor="note" className="block text-gray-700 text-sm font-medium mb-1">Order Notes (Optional)</label>
                    <textarea
                      id="note"
                      name="note"
                      value={customerInfo.note}
                      onChange={handleInputChange}
                      style={{ /* Styles kept, using hex */ }}
                       className={`w-full p-3 border rounded-lg outline-none transition-all duration-300 border-[#D1D5DB] focus:border-[#EE4D2D] focus:ring-2 focus:ring-[#EE4D2D]/20`} // focus styles
                      placeholder="Notes about your order, e.g., specific delivery instructions." // English Placeholder
                      rows="3"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="space-y-6">
                  {/* Customer Info Review */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-2 text-gray-700">
                      <FaUser />
                       {/* English Section Title */}
                      <h3 className="font-medium">Customer Information</h3>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <p><span className="font-medium">Name:</span> {customerInfo.name}</p>
                      <p><span className="font-medium">Phone:</span> {customerInfo.phone}</p>
                      <p><span className="font-medium">Email:</span> {customerInfo.email}</p>
                      <p className="mt-2">
                         {/* English Label */}
                        <span className="font-medium">Address:</span>{' '}
                        {customerInfo.address},{' '}
                        {/* Use helper function to get names */}
                        {getNameById(customerInfo.ward, wards)},{' '}
                        {getNameById(customerInfo.district, districts)},{' '}
                        {getNameById(customerInfo.city, cities)}
                      </p>
                      {customerInfo.note && (
                         /* English Label */
                        <p className="mt-2"><span className="font-medium">Note:</span> {customerInfo.note}</p>
                      )}
                    </div>
                  </div>

                  {/* Payment Method Review */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-2 text-gray-700">
                      <FaTruck />
                       {/* English Section Title */}
                      <h3 className="font-medium">Payment Method</h3>
                    </div>
                    <div className="space-y-2">
                       {/* English Label */}
                      <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition has-[:checked]:border-[#EE4D2D] has-[:checked]:bg-[#FFF8F5]"> {/* Highlight selected */}
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={customerInfo.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                          style={{ accentColor: '#EE4D2D' }} // Style kept
                          className="h-5 w-5 focus:ring-0 focus:ring-offset-0" // Reduced focus ring
                        />
                        <div className="flex items-center space-x-3">
                          <FaMoneyBill className="text-green-600" />
                          {/* English Text */}
                          <span>Cash on Delivery (COD)</span>
                        </div>
                      </label>
                       {/* English Label */}
                      <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition has-[:checked]:border-[#EE4D2D] has-[:checked]:bg-[#FFF8F5]"> {/* Highlight selected */}
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={customerInfo.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          style={{ accentColor: '#EE4D2D' }} // Style kept
                           className="h-5 w-5 focus:ring-0 focus:ring-offset-0" // Reduced focus ring
                        />
                        <div className="flex items-center space-x-3">
                          <FaCreditCard className="text-blue-600" />
                          {/* English Text */}
                          <span>Credit/Debit Card (Online Payment - if available)</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-2 text-gray-700">
                      <FaShoppingCart />
                       {/* English Section Title */}
                      <h3 className="font-medium">Order Summary</h3>
                    </div>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2"> {/* Scrollable item list */}
                      {Array.isArray(cartItems) && cartItems.map((item) => (
                        <div key={item.id || item.name} className="flex justify-between items-start p-3 border-b border-gray-100">
                          <div className="flex">
                            <div className="w-16 h-16 rounded overflow-hidden mr-3 flex-shrink-0">
                              <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                            </div>
                            <div className="text-sm">
                              <p className="font-medium">{item.name}</p>
                              {/* English Text */}
                              <p className="text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <p className="font-medium">{formatCurrency((item.price || 0) * (item.quantity || 0))}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Totals Section */}
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="flex justify-between mb-2">
                         {/* English Text */}
                        <span className="text-gray-600">Subtotal:</span>
                        <span>{formatCurrency(calculateTotal())}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                         {/* English Text (Assuming fixed shipping) */}
                        <span className="text-gray-600">Shipping Fee:</span>
                        <span>{formatCurrency(5)}</span> {/* Hardcoded shipping */}
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
                         {/* English Text */}
                        <span>Total Payment:</span>
                        <span style={{ color: '#EE4D2D' }}>{formatCurrency(calculateTotal() + 5)}</span> {/* Brand color */}
                      </div>
                    </div>
                     {/* Terms Confirmation */}
                    <div className="flex items-start text-xs bg-orange-50 p-3 rounded-lg"> {/* Use items-start */}
                      <FaInfoCircle style={{ color: '#EE4D2D' }} className="mr-2 mt-0.5 flex-shrink-0" /> {/* Brand color */}
                      {/* English Text */}
                      <p>By placing this order, you agree to our Terms of Service and Privacy Policy.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between flex-shrink-0"> {/* Prevent shrinking */}
              {step > 1 ? (
                <button
                  type="button" // Explicit type
                  onClick={prevStep}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                >
                  {/* English Text */}
                  Back
                </button>
              ) : (
                <button
                  type="button" // Explicit type
                  onClick={onClose}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                >
                  {/* English Text */}
                  Cancel
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button" // Explicit type
                  onClick={nextStep}
                  style={{ /* Styles kept, using hex */ }}
                  className="px-6 py-2 bg-[#EE4D2D] text-white rounded-lg hover:bg-[#D94429] transition duration-150 ease-in-out"
                >
                  {/* English Text */}
                  Continue
                </button>
              ) : (
                <button
                  type="button" // Explicit type
                  onClick={handleSubmit}
                  style={{ /* Styles kept, using hex */ }}
                  className="px-6 py-2 bg-[#EE4D2D] text-white rounded-lg hover:bg-[#D94429] transition duration-150 ease-in-out"
                >
                  {/* English Text */}
                  Place Order
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CheckoutModal;
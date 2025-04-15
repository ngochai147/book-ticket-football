import React, { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaMapMarkerAlt, FaCreditCard, FaTruck, FaMoneyBill, FaInfoCircle, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function CheckoutModal({ isOpen, onClose, onConfirm, cartItems, formatCurrency }) {
  const [step, setStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
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
  const [formErrors, setFormErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Hàm reset form
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
  };

  useEffect(() => {
    fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 0) setCities(data.data);
      })
      .catch((err) => console.error('Lỗi lấy tỉnh/thành:', err));
  }, []);

  useEffect(() => {
    if (customerInfo.city) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${customerInfo.city}.htm`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error === 0) {
            setDistricts(data.data);
            setWards([]);
            setCustomerInfo((prev) => ({ ...prev, district: '', ward: '' }));
          }
        })
        .catch((err) => console.error('Lỗi lấy quận/huyện:', err));
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [customerInfo.city]);

  useEffect(() => {
    if (customerInfo.district) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${customerInfo.district}.htm`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error === 0) {
            setWards(data.data);
            setCustomerInfo((prev) => ({ ...prev, ward: '' }));
          }
        })
        .catch((err) => console.error('Lỗi lấy phường/xã:', err));
    } else {
      setWards([]);
    }
  }, [customerInfo.district]);

  const validateStep = () => {
    const errors = {};
    if (step === 1) {
      if (!customerInfo.name.trim()) errors.name = 'Vui lòng nhập họ tên';
      if (!customerInfo.phone.trim()) errors.phone = 'Vui lòng nhập số điện thoại';
      else if (!/^[0-9]{10}$/.test(customerInfo.phone)) errors.phone = 'Số điện thoại không hợp lệ';
      if (!customerInfo.email.trim()) errors.email = 'Vui lòng nhập email';
      else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) errors.email = 'Email không hợp lệ';
    } else if (step === 2) {
      if (!customerInfo.address.trim()) errors.address = 'Vui lòng nhập địa chỉ';
      if (!customerInfo.city) errors.city = 'Vui lòng chọn tỉnh/thành phố';
      if (!customerInfo.district) errors.district = 'Vui lòng chọn quận/huyện';
      if (!customerInfo.ward) errors.ward = 'Vui lòng chọn phường/xã';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      onConfirm(customerInfo);
      resetForm();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-hidden flex flex-col"
          >
            <div
              style={{
                background: 'linear-gradient(to right, #EE4D2D, #FF6633)', // Replace bg-gradient-to-r from-shopee-orange to-shopee-orange-light
                color: 'white',
                padding: '1rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2 className="text-xl font-semibold">
                {step === 1 && 'Thông tin cá nhân'}
                {step === 2 && 'Địa chỉ giao hàng'}
                {step === 3 && 'Xác nhận đơn hàng'}
              </h2>
              <button
                onClick={onClose}
                style={{ color: 'white' }}
                onMouseEnter={(e) => (e.target.style.color = '#E5E7EB')} // Replace hover:text-gray-200
                onMouseLeave={(e) => (e.target.style.color = 'white')}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="px-6 pt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col items-center">
                  <div
                    style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: step >= 1 ? '#EE4D2D' : '#D1D5DB', // Replace bg-shopee-orange and bg-gray-300
                      color: step >= 1 ? 'white' : 'black',
                    }}
                  >
                    1
                  </div>
                  <span className="text-xs mt-1">Thông tin</span>
                </div>
                <div
                  style={{
                    flex: 1,
                    height: '0.25rem',
                    margin: '0 0.5rem',
                    backgroundColor: step >= 2 ? '#EE4D2D' : '#D1D5DB', // Replace bg-shopee-orange and bg-gray-300
                  }}
                ></div>
                <div className="flex flex-col items-center">
                  <div
                    style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: step >= 2 ? '#EE4D2D' : '#D1D5DB', // Replace bg-shopee-orange and bg-gray-300
                      color: step >= 2 ? 'white' : 'black',
                    }}
                  >
                    2
                  </div>
                  <span className="text-xs mt-1">Địa chỉ</span>
                </div>
                <div
                  style={{
                    flex: 1,
                    height: '0.25rem',
                    margin: '0 0.5rem',
                    backgroundColor: step >= 3 ? '#EE4D2D' : '#D1D5DB', // Replace bg-shopee-orange and bg-gray-300
                  }}
                ></div>
                <div className="flex flex-col items-center">
                  <div
                    style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: step >= 3 ? '#EE4D2D' : '#D1D5DB', // Replace bg-shopee-orange and bg-gray-300
                      color: step >= 3 ? 'white' : 'black',
                    }}
                  >
                    3
                  </div>
                  <span className="text-xs mt-1">Xác nhận</span>
                </div>
              </div>
            </div>
            <div className="overflow-y-auto p-6 flex-grow">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4 text-gray-700">
                    <FaUser />
                    <h3 className="font-medium">Thông tin cá nhân</h3>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderWidth: '1px',
                        borderColor: formErrors.name ? '#EF4444' : '#D1D5DB', // Replace border-red-500 and border-gray-300
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'all 0.3s',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#EE4D2D'; // Replace focus:ring-shopee-orange and focus:border-shopee-orange
                        e.target.style.boxShadow = '0 0 0 2px rgba(238, 77, 45, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = formErrors.name ? '#EF4444' : '#D1D5DB';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Nhập họ và tên"
                    />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaPhone className="text-gray-500" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                          borderWidth: '1px',
                          borderColor: formErrors.phone ? '#EF4444' : '#D1D5DB', // Replace border-red-500 and border-gray-300
                          borderRadius: '0.5rem',
                          outline: 'none',
                          transition: 'all 0.3s',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#EE4D2D'; // Replace focus:ring-shopee-orange and focus:border-shopee-orange
                          e.target.style.boxShadow = '0 0 0 2px rgba(238, 77, 45, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = formErrors.phone ? '#EF4444' : '#D1D5DB';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderWidth: '1px',
                        borderColor: formErrors.email ? '#EF4444' : '#D1D5DB', // Replace border-red-500 and border-gray-300
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'all 0.3s',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#EE4D2D'; // Replace focus:ring-shopee-orange and focus:border-shopee-orange
                        e.target.style.boxShadow = '0 0 0 2px rgba(238, 77, 45, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = formErrors.email ? '#EF4444' : '#D1D5DB';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="example@email.com"
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4 text-gray-700">
                    <FaMapMarkerAlt />
                    <h3 className="font-medium">Địa chỉ giao hàng</h3>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Địa chỉ <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderWidth: '1px',
                        borderColor: formErrors.address ? '#EF4444' : '#D1D5DB', // Replace border-red-500 and border-gray-300
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'all 0.3s',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#EE4D2D'; // Replace focus:ring-shopee-orange and focus:border-shopee-orange
                        e.target.style.boxShadow = '0 0 0 2px rgba(238, 77, 45, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = formErrors.address ? '#EF4444' : '#D1D5DB';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Số nhà, tên đường"
                      rows="2"
                    />
                    {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Tỉnh/Thành phố <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderWidth: '1px',
                          borderColor: formErrors.city ? '#EF4444' : '#D1D5DB', // Replace border-red-500 and border-gray-300
                          borderRadius: '0.5rem',
                          outline: 'none',
                          transition: 'all 0.3s',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#EE4D2D'; // Replace focus:ring-shopee-orange and focus:border-shopee-orange
                          e.target.style.boxShadow = '0 0 0 2px rgba(238, 77, 45, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = formErrors.city ? '#EF4444' : '#D1D5DB';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="">Chọn tỉnh/thành phố</option>
                        {cities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.full_name}
                          </option>
                        ))}
                      </select>
                      {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Quận/Huyện <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="district"
                        value={customerInfo.district}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderWidth: '1px',
                          borderColor: formErrors.district ? '#EF4444' : '#D1D5DB', // Replace border-red-500 and border-gray-300
                          borderRadius: '0.5rem',
                          outline: 'none',
                          transition: 'all 0.3s',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#EE4D2D'; // Replace focus:ring-shopee-orange and focus:border-shopee-orange
                          e.target.style.boxShadow = '0 0 0 2px rgba(238, 77, 45, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = formErrors.district ? '#EF4444' : '#D1D5DB';
                          e.target.style.boxShadow = 'none';
                        }}
                        disabled={!customerInfo.city}
                      >
                        <option value="">Chọn quận/huyện</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.full_name}
                          </option>
                        ))}
                      </select>
                      {formErrors.district && <p className="text-red-500 text-xs mt-1">{formErrors.district}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Phường/Xã <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="ward"
                        value={customerInfo.ward}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderWidth: '1px',
                          borderColor: formErrors.ward ? '#EF4444' : '#D1D5DB', // Replace border-red-500 and border-gray-300
                          borderRadius: '0.5rem',
                          outline: 'none',
                          transition: 'all 0.3s',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#EE4D2D'; // Replace focus:ring-shopee-orange and focus:border-shopee-orange
                          e.target.style.boxShadow = '0 0 0 2px rgba(238, 77, 45, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = formErrors.ward ? '#EF4444' : '#D1D5DB';
                          e.target.style.boxShadow = 'none';
                        }}
                        disabled={!customerInfo.district}
                      >
                        <option value="">Chọn phường/xã</option>
                        {wards.map((ward) => (
                          <option key={ward.id} value={ward.id}>
                            {ward.full_name}
                          </option>
                        ))}
                      </select>
                      {formErrors.ward && <p className="text-red-500 text-xs mt-1">{formErrors.ward}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Ghi chú</label>
                    <textarea
                      name="note"
                      value={customerInfo.note}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderWidth: '1px',
                        borderColor: '#D1D5DB', // Replace border-gray-300
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'all 0.3s',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#EE4D2D'; // Replace focus:ring-shopee-orange and focus:border-shopee-orange
                        e.target.style.boxShadow = '0 0 0 2px rgba(238, 77, 45, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#D1D5DB';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Ghi chú về đơn hàng, ví dụ: thời gian nhận hàng hoặc địa điểm giao hàng chi tiết hơn."
                      rows="3"
                    />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-2 text-gray-700">
                      <FaUser />
                      <h3 className="font-medium">Thông tin khách hàng</h3>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><span className="font-medium">Họ tên:</span> {customerInfo.name}</p>
                      <p><span className="font-medium">SĐT:</span> {customerInfo.phone}</p>
                      <p><span className="font-medium">Email:</span> {customerInfo.email}</p>
                      <p className="mt-2">
                        <span className="font-medium">Địa chỉ:</span>{' '}
                        {customerInfo.address},{' '}
                        {wards.find((w) => w.id === customerInfo.ward)?.full_name || ''},{' '}
                        {districts.find((d) => d.id === customerInfo.district)?.full_name || ''},{' '}
                        {cities.find((c) => c.id === customerInfo.city)?.full_name || ''}
                      </p>
                      {customerInfo.note && (
                        <p className="mt-2"><span className="font-medium">Ghi chú:</span> {customerInfo.note}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-2 text-gray-700">
                      <FaTruck />
                      <h3 className="font-medium">Phương thức thanh toán</h3>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={customerInfo.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                          style={{
                            accentColor: '#EE4D2D', // Replace text-shopee-orange and focus:ring-shopee-orange
                            height: '1.25rem',
                            width: '1.25rem',
                          }}
                        />
                        <div className="flex items-center space-x-3">
                          <FaMoneyBill className="text-green-600" />
                          <span>Thanh toán khi nhận hàng (COD)</span>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={customerInfo.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          style={{
                            accentColor: '#EE4D2D', // Replace text-shopee-orange and focus:ring-shopee-orange
                            height: '1.25rem',
                            width: '1.25rem',
                          }}
                        />
                        <div className="flex items-center space-x-3">
                          <FaCreditCard className="text-blue-600" />
                          <span>Thanh toán thẻ tín dụng/ghi nợ</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-2 text-gray-700">
                      <FaShoppingCart />
                      <h3 className="font-medium">Thông tin đơn hàng</h3>
                    </div>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between p-3 border-b border-gray-100">
                          <div className="flex">
                            <div className="w-16 h-16 rounded overflow-hidden mr-3">
                              <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-gray-500">Số lượng: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Tạm tính:</span>
                        <span>{formatCurrency(calculateTotal())}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Phí vận chuyển:</span>
                        <span>{formatCurrency(30000)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
                        <span>Tổng thanh toán:</span>
                        <span style={{ color: '#EE4D2D' }}>{formatCurrency(calculateTotal() + 30000)}</span> {/* Replace text-shopee-orange */}
                      </div>
                    </div>
                    <div className="flex items-center text-sm bg-orange-50 p-3 rounded-lg">
                      <FaInfoCircle style={{ color: '#EE4D2D', marginRight: '0.5rem' }} className="flex-shrink-0" /> {/* Replace text-shopee-orange */}
                      <p>Bằng việc tiến hành đặt hàng, bạn đồng ý với điều khoản dịch vụ và chính sách bảo mật của chúng tôi.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Quay lại
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Hủy
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  style={{
                    padding: '0.5rem 1.5rem',
                    backgroundColor: '#EE4D2D', // Replace bg-shopee-orange
                    color: 'white',
                    borderRadius: '0.5rem',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#D94429')} // Replace hover:bg-shopee-orange-hover
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#EE4D2D')}
                  className="transition"
                >
                  Tiếp tục
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '0.5rem 1.5rem',
                    backgroundColor: '#EE4D2D', // Replace bg-shopee-orange
                    color: 'white',
                    borderRadius: '0.5rem',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#D94429')} // Replace hover:bg-shopee-orange-hover
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#EE4D2D')}
                  className="transition"
                >
                  Đặt hàng
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
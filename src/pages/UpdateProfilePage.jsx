import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaGlobe, FaCamera, FaSave, FaTimes } from 'react-icons/fa';
import avatarImg from '../image/avatar-fb-mac-dinh-51nSxugr.jpg';
import { useNavigate } from 'react-router-dom';
function UpdateProfile() {

  // initial useNavigate 
  const navigate = useNavigate(); 
  // Initial state with user data
  const [formData, setFormData] = useState({
    nickname: '',
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'English',
    acceptNewsletter: false,
    avatarUrl: avatarImg, // Set the initial avatarUrl to the imported image
  });

  const [originalData, setOriginalData] = useState({});
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [changePassword, setChangePassword] = useState(false);

  // Simulate fetching user data
  useEffect(() => {
    setTimeout(() => {
      const userData = {
        nickname: 'football_fan',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        language: 'English',
        acceptNewsletter: true,
        avatarUrl: avatarImg, // Use the imported image directly
      };
      
      setFormData(userData);
      setOriginalData(userData);
      setIsLoading(false);
    }, 500);
  }, []);

  const validate = () => {
    const newErrors = {};

    const nicknameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:"<>?])[A-Za-z\d!@#$%^&*()_+{}:"<>?]{8,}$/;

    if (!nicknameRegex.test(formData.nickname)) {
      newErrors.nickname = 'Nickname must be 3–20 characters and only contain letters, numbers, _ or -.';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (changePassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required.';
      }
      
      if (formData.newPassword && !passwordRegex.test(formData.newPassword)) {
        newErrors.newPassword = 'Password must be at least 8 characters, include uppercase, lowercase, number and symbol.';
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsLoading(true);
      
      setTimeout(() => {
        console.log('Profile updated:', formData);
        setSuccessMessage('Profile updated successfully!');
        setOriginalData({...formData});
        
        if (changePassword) {
          setFormData(prev => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }));
          setChangePassword(false);
        }
        
        setIsLoading(false);
        
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }, 1000);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData({...originalData});
    setErrors({});
    setChangePassword(false);
   // navigate("/home");
  };

  const handleAvatarChange = () => {
    alert('Avatar change functionality would be implemented here');
  };

  const inputClass = (field) =>
    `w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
      errors[field] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-[#1C2526]'
    }`;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1C2526]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div style={{ background: 'linear-gradient(to right, #1C2526, #1C2526)' }} className="text-white p-6">
          <h1 className="text-2xl font-bold flex items-center">
            <FaUser className="mr-2" /> Update Your Profile
          </h1>
          <p className="text-gray-200 mt-2">
            Keep your information up to date to enhance your Sport Club experience
          </p>
        </div>

        {successMessage && (
          <div style={{ backgroundColor: '#1C2526', borderLeft: '4px solid #1C2526' }} className="text-white p-4 mb-4">
            <div className="flex items-center">
              <FaSave className="mr-2" />
              <p>{successMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-6">
          {/* Avatar section */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 pb-6 border-b border-gray-200">
            <div className="relative">
              <img 
                src={formData.avatarUrl} 
                alt="Profile Avatar" 
                className="rounded-full w-32 h-32 object-cover border-4 border-[#1C2526]"
              />
              <button 
                type="button"
                onClick={handleAvatarChange}
                style={{ backgroundColor: '#1C2526' }}
                className="absolute bottom-0 right-0 text-white p-2 rounded-full shadow-lg hover:bg-[#1C2526] transition"
              >
                <FaCamera />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{formData.nickname}</h2>
              <p className="text-gray-600">Update your photo and personal details</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaUser style={{ color: '#1C2526' }} className="mr-2" /> Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nickname*</label>
                <input
                  className={inputClass('nickname')}
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                />
                {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C2526]"
                >
                  <option>English</option>
                  <option>Deutsch</option>
                  <option>Español</option>
                  <option>Français</option>
                  <option>Tiếng Việt</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                <input
                  className={inputClass('firstName')}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                <input
                  className={inputClass('lastName')}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaEnvelope style={{ color: '#1C2526' }} className="mr-2" /> Contact Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
              <input
                type="email"
                className={inputClass('email')}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="acceptNewsletter"
                checked={formData.acceptNewsletter}
                onChange={handleChange}
                className="mt-1"
              />
              <label className="text-gray-700">
                I would like to receive newsletters about features, events, and special offers.
              </label>
            </div>
          </div>

          {/* Password Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaLock style={{ color: '#1C2526' }} className="mr-2" /> Password
              </h3>
              <button 
                type="button" 
                onClick={() => setChangePassword(!changePassword)}
                style={{ color: '#1C2526' }}
                className="hover:text-[#1C2526] text-sm font-medium underline"
              >
                {changePassword ? 'Cancel password change' : 'Change password'}
              </button>
            </div>
            
            {changePassword && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password*</label>
                  <input
                    type="password"
                    className={inputClass('currentPassword')}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter your current password"
                  />
                  {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password*</label>
                  <input
                    type="password"
                    className={inputClass('newPassword')}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Create a new password"
                  />
                  {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters and include uppercase, lowercase, number and symbol.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password*</label>
                  <input
                    type="password"
                    className={inputClass('confirmPassword')}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your new password"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center"
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
            <button
              type="submit"
              style={{ backgroundColor: '#1C2526' }}
              className="px-6 py-2 text-white font-medium rounded-lg hover:bg-[#1C2526] transition flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
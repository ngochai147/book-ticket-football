import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    nickname: '',
    firstName: '',
    lastName: '',
    email: '',
    repeatEmail: '',
    password: '',
    repeatPassword: '',
    language: 'English',
    securityAnswer: '',
    acceptTerms: false,
    acceptNewsletter: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const nicknameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:\"<>?])[A-Za-z\d!@#$%^&*()_+{}:\"<>?]{8,}$/;

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

    if (formData.email !== formData.repeatEmail) {
      newErrors.repeatEmail = 'Emails do not match.';
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters, include uppercase, lowercase, number and symbol.';
    }

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match.';
    }

    if (!formData.securityAnswer.trim()) {
      newErrors.securityAnswer = 'Security answer is required.';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms.';
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
      console.log('Form submitted:', formData);
      alert('Registration submitted!');
    }
  };

  const inputClass = (field) =>
    `w-full border-2 rounded px-3 py-2 focus:outline-none focus:ring-2 ${
      errors[field] ? 'border-red-500 focus:ring-red-400' : 'border-slate-100 focus:ring-blue-400'
    }`;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <form onSubmit={handleSubmit} noValidate className="bg-white rounded shadow-lg w-full max-w-2xl p-6 space-y-4">
        <h2 className="text-white text-lg font-bold bg-[#001f4d] px-4 py-2 rounded">
          REGISTER FOR FREE NOW
        </h2>

        <p className="text-gray-700">
          Become a member of the world’s largest football community! Fill in the form to register:
        </p>

        {/* Nickname */}
        <div>
          <input
            className={inputClass('nickname')}
            placeholder="Nickname*"
            name="nickname"
            onChange={handleChange}
          />
          {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>}
        </div>

        {/* First name */}
        <div>
          <input
            className={inputClass('firstName')}
            placeholder="First name*"
            name="firstName"
            onChange={handleChange}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        {/* Last name */}
        <div>
          <input
            className={inputClass('lastName')}
            placeholder="Last name*"
            name="lastName"
            onChange={handleChange}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            className={inputClass('email')}
            placeholder="Email*"
            name="email"
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Repeat Email */}
        <div>
          <input
            type="email"
            className={inputClass('repeatEmail')}
            placeholder="Repeat email*"
            name="repeatEmail"
            onChange={handleChange}
          />
          {errors.repeatEmail && <p className="text-red-500 text-sm mt-1">{errors.repeatEmail}</p>}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            className={inputClass('password')}
            placeholder="Password*"
            name="password"
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Repeat Password */}
        <div>
          <input
            type="password"
            className={inputClass('repeatPassword')}
            placeholder="Repeat password*"
            name="repeatPassword"
            onChange={handleChange}
          />
          {errors.repeatPassword && <p className="text-red-500 text-sm mt-1">{errors.repeatPassword}</p>}
        </div>

        {/* Language */}
        <div>
          <label className="block mb-1">Preferred language*</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full border-2 border-slate-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>English</option>
            <option>Deutsch</option>
            <option>Español</option>
            <option>Français</option>
          </select>
        </div>

        {/* Security Answer */}
        <div>
          <input
            className={inputClass('securityAnswer')}
            placeholder="Security question: How old is the player Esteban Andrada in years?"
            name="securityAnswer"
            onChange={handleChange}
          />
          {errors.securityAnswer && <p className="text-red-500 text-sm mt-1">{errors.securityAnswer}</p>}
        </div>

        {/* Accept Terms */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className={errors.acceptTerms ? 'border-red-500' : ''}
          />
          <label>
            I accept the{' '}
            <a href="#" className="text-blue-500 underline">
              terms of use
            </a>{' '}
            *
          </label>
        </div>
        {errors.acceptTerms && <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>}

        {/* Accept Newsletter */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="acceptNewsletter"
            checked={formData.acceptNewsletter}
            onChange={handleChange}
          />
          <label>I agree to receive newsletters about features and offers.</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold px-6 py-2 rounded hover:bg-blue-700"
        >
          Register now
        </button>
      </form>
    </div>
  );
}

export default Register;

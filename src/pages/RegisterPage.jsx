import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import InputField from "./InputField";
import CheckboxField from "./CheckboxField";

function Register() {
  const [formData, setFormData] = useState({
    nickname: "",
    firstName: "",
    lastName: "",
    email: "",
    repeatEmail: "",
    password: "",
    repeatPassword: "",
    language: "English",
    securityAnswer: "",
    acceptTerms: false,
    acceptNewsletter: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Thêm state cho modal
  const navigate = useNavigate();

  // Validation rules
  const validationRules = {
    nickname: {
      regex: /^[a-zA-Z0-9_-]{3,20}$/,
      message: "Nickname must be 3–20 characters and only contain letters, numbers, _ or -",
    },
    email: {
      regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: "Invalid email format",
    },
    password: {
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:"<>?])[A-Za-z\d!@#$%^&*()_+{}:"<>?]{8,}$/,
      message: "Password must be at least 8 characters, include uppercase, lowercase, number and symbol",
    },
  };

  const validate = () => {
    const newErrors = {};

    // Required fields
    ["nickname", "firstName", "lastName", "email", "password", "securityAnswer"].forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Regex validation
    Object.entries(validationRules).forEach(([field, { regex, message }]) => {
      if (formData[field] && !regex.test(formData[field])) {
        newErrors[field] = message;
      }
    });

    // Matching fields
    if (formData.email && formData.repeatEmail && formData.email !== formData.repeatEmail) {
      newErrors.repeatEmail = "Emails do not match";
    }
    if (formData.password && formData.repeatPassword && formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await registerUser({
        nickname: formData.nickname,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        repeatEmail: formData.repeatEmail,
        password: formData.password,
        repeatPassword: formData.repeatPassword,
        language: formData.language,
        securityAnswer: formData.securityAnswer,
        acceptTerms: formData.acceptTerms,
        acceptNewsletter: formData.acceptNewsletter,
      });

      setShowSuccessModal(true); // Hiển thị modal thành công
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || "An error occurred during registration" });
    } finally {
      setIsLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/login"); // Chuyển hướng sau khi đóng modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} noValidate className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-6">
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white p-4 rounded-t-xl -m-6 mb-4">
          <h2 className="text-xl font-bold">Register for Free</h2>
          <p className="text-sm">Join the world’s largest football community!</p>
        </div>

        {errors.submit && (
          <div className="text-red-500 text-sm p-2 bg-red-100 rounded">{errors.submit}</div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <InputField
            name="nickname"
            placeholder="Nickname *"
            value={formData.nickname}
            onChange={handleChange}
            error={errors.nickname}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              name="firstName"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <InputField
              name="lastName"
              placeholder="Last Name *"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>
          <InputField
            name="email"
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            name="repeatEmail"
            type="email"
            placeholder="Repeat Email *"
            value={formData.repeatEmail}
            onChange={handleChange}
            error={errors.repeatEmail}
          />
          <InputField
            name="password"
            type="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <InputField
            name="repeatPassword"
            type="password"
            placeholder="Repeat Password *"
            value={formData.repeatPassword}
            onChange={handleChange}
            error={errors.repeatPassword}
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>English</option>
              <option>Deutsch</option>
              <option>Español</option>
              <option>Français</option>
            </select>
          </div>

          <InputField
            name="securityAnswer"
            placeholder="How old is Esteban Andrada? (in years) *"
            value={formData.securityAnswer}
            onChange={handleChange}
            error={errors.securityAnswer}
          />
        </div>

        <div className="space-y-3">
          <CheckboxField
            name="acceptTerms"
            label={
              <>
                I accept the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  terms of use
                </a>
              </>
            }
            checked={formData.acceptTerms}
            onChange={handleChange}
            error={errors.acceptTerms}
            required
          />
          <CheckboxField
            name="acceptNewsletter"
            label="I agree to receive newsletters about features and offers"
            checked={formData.acceptNewsletter}
            onChange={handleChange}
            error={errors.acceptNewsletter}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-950 to-blue-900 text-white font-semibold py-2 px-6 rounded-md hover:from-blue-900 hover:to-blue-800 transition-all duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register Now"}
        </button>
      </form>

      {/* Modal thông báo thành công */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-bold text-green-600 mb-4">Registration Successful!</h2>
            <p className="text-gray-700 mb-6">Your account has been created successfully. You will be redirected to the login page.</p>
            <button
              onClick={closeSuccessModal}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
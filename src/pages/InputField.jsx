// components/InputField.jsx
import React from "react";

const InputField = ({ label, name, type = "text", placeholder, value, onChange, error, className = "" }) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 transition-colors ${
        error ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-blue-500"
      } ${className}`}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default InputField;
// components/CheckboxField.jsx
import React from "react";

const CheckboxField = ({ name, label, checked, onChange, error, required = false }) => (
  <div className="flex items-start space-x-2">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className={`mt-1 ${error ? "border-red-500" : ""}`}
    />
    <label className="text-sm text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default CheckboxField;
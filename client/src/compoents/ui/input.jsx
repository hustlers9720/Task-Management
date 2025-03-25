import React from "react";

const Input = ({ type = "text", value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Input;

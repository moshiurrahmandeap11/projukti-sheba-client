import React from "react";

const FancyButton = ({ children, onClick = () => {}, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-red-700 hover:bg-red-800 cursor-pointer text-white font-bold py-3 px-5 rounded-md transition-all duration-300 transform shadow-md ${className}`}
    >
      {children}
    </button>
  );
};

export default FancyButton;

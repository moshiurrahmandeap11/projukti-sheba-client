import React from "react";

const FancyButton = ({ children, onClick = () => {}, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` hover:border-red-800 cursor-pointer text-black hover:text-red-600 border  font-bold py-3 px-5 rounded-md transition-all duration-300 transform shadow-md ${className}`}
    >
      {children}
    </button>
  );
};

export default FancyButton;

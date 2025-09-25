import React from "react";

const FancyButton = ({ children, onClick, loading, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`
        relative w-full md:w-auto 
        bg-gradient-to-r from-teal-600 to-green-600 
        hover:from-teal-700 hover:to-green-700 
        text-white font-semibold 
        px-6 py-3 rounded-full text-base 
        overflow-hidden transition-all duration-500 shadow-lg transform 
        hover:scale-105 hover:shadow-lg group cursor-pointer 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${className || ""}
      `}
    >
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

export default FancyButton;

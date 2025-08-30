import React from "react";

const FancyButton = ({ children, onClick, loading, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`
        relative overflow-hidden w-full text-white font-semibold py-4 rounded-full text-lg 
        transition-all duration-500 shadow-2xl transform hover:scale-105
        border border-purple-500/30 backdrop-blur-sm
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100
        group
        ${className || ""}
      `}
    >
      {/* Water fill animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>

      {/* Button glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>

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

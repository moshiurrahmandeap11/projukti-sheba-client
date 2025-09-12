import React from "react";

const FancyButton = ({ children, onClick, loading, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`
        relative w-full md:w-auto px-6 py-3 font-semibold text-lg rounded-full 
        overflow-hidden transition-all duration-500 shadow-lg transform 
        hover:scale-105 group cursor-pointer 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${className || ""}
      `}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#008081] via-[#00b3b3] to-[#00e6e6] 
        transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>

      {/* Glow / overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#008080]/40 via-[#00b3b3]/30 to-[#00e6e6]/20 
        opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"></div>

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

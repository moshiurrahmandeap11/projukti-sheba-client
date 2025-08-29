import React from "react";

const FancyButton = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden 
        text-white font-semibold px-6 py-3 rounded-lg 
        transition-all duration-500 ease-in-out 
        group
        ${className}
      `}
      style={{
        background: "linear-gradient(135deg, #3464DE 85%, #2A50B3 15%)",
      }}
    >
      {/* Hover overlay black wipe */}
      <span
        className="
          absolute inset-0 bg-black 
          scale-x-0 origin-center 
          transition-transform duration-500 ease-in-out 
          group-hover:scale-x-100
        "
      ></span>
      {/* Button text */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default FancyButton;
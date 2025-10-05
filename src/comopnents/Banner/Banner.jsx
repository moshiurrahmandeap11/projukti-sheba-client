import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import FancyButton from "../sharedItems/FancyButtons/FancyButton";

const Banner = () => {
  const navigate = useNavigate();

  // Rotating headlines
  const headlines = [
    "Digital Solution for Business",
    "Transform Your Digital Future",
    "Innovative Technology Solutions",
    "Empowering Your Business Growth",
    "Next-Gen Digital Services",
    "Revolutionary Business Solutions",
  ];

  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentHeadlineIndex(
          (prevIndex) => (prevIndex + 1) % headlines.length
        );
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [headlines.length]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://i.postimg.cc/qv4d0GQ0/banner-ps.jpg')`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-start min-h-screen px-6 md:px-16">
        <div className="max-w-3xl  p-6 md:p-10 rounded-2xl  shadow-lg">
          {/* Animated Title */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-400 mb-6 transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            {headlines[currentHeadlineIndex]}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Experience cutting-edge technology with our innovative solutions
            designed to transform your digital journey and accelerate your
            business growth.
          </p>

          {/* CTA Button */}
          <FancyButton
            onClick={() => navigate("/contact")}
            
          >
            Get in touch
          </FancyButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Banner;

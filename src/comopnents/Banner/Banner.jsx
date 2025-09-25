import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import FancyButton from "../sharedItems/FancyButtons/FancyButton";

const Banner = () => {
  const navigate = useNavigate();
  
  // Multiple headlines that will rotate
  const headlines = [
    "Digital Solution of Business",
    "Transform Your Digital Future",
    "Innovative Technology Solutions",
    "Empowering Your Business Growth",
    "Next-Gen Digital Services",
    "Revolutionary Business Solutions"
  ];
  
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentHeadlineIndex((prevIndex) => 
          (prevIndex + 1) % headlines.length
        );
        setIsVisible(true);
      }, 300); // Short fade out duration
      
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval);
  }, [headlines.length]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://i.postimg.cc/sXn3BqCd/bg.jpg')`
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
    
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-start min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-center gap-6 lg:gap-12 max-w-4xl mx-auto text-left">
          
          {/* Main Content Container with Glass Effect */}
          <div className="w-full">
            {/* Glassy Container with better backdrop */}
            <div >
              
              {/* Animated Title */}
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight transition-all duration-500 ${
                isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
              }`}>
                <span className="bg-gradient-to-r from-red-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                  {headlines[currentHeadlineIndex]}
                </span>
              </h1>

              {/* Subtitle with enhanced styling */}
              <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 lg:mb-12 leading-relaxed text-white/90 max-w-3xl mx-0">
                Experience cutting-edge technology with our innovative solutions
                designed to transform your digital journey and accelerate your business growth
              </p>

              {/* Enhanced CTA Button */}
              <div className="flex justify-start">
                <button className="bg-red-700 px-6 py-3 rounded-md text-white font-medium cursor-pointer" onClick={() => navigate("/contact")}>Get in touch</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Banner;
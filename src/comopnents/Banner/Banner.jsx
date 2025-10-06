import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  // Client Logos Data
  const clientLogos = [
    {
      src: "https://via.placeholder.com/150x50/4F46E5/FFFFFF?text=Vibrant",
      alt: "Vibrant Logo",
    },
    {
      src: "https://via.placeholder.com/150x50/10B981/FFFFFF?text=Udancla",
      alt: "Udancla Logo",
    },
    {
      src: "https://via.placeholder.com/150x50/EF4444/FFFFFF?text=Foodli",
      alt: "Foodli Logo",
    },
    {
      src: "https://via.placeholder.com/150x50/F59E0B/FFFFFF?text=Taketrip",
      alt: "Taketrip Logo",
    },
    {
      src: "https://via.placeholder.com/150x50/8B5CF6/FFFFFF?text=Makefly",
      alt: "Makefly Logo",
    },
    {
      src: "https://via.placeholder.com/150x50/8B5CF6/FFFFFF?text=Makefly",
      alt: "Makefly Logo",
    },
    {
      src: "https://via.placeholder.com/150x50/8B5CF6/FFFFFF?text=Makefly",
      alt: "Makefly Logo",
    },
  ];

  const [currentLogo, setCurrentLogo] = useState(0);
  const [visibleLogos, setVisibleLogos] = useState(3);
  const TOTAL_LOGOS = clientLogos.length;
  const MAX_INDEX = Math.max(0, TOTAL_LOGOS - visibleLogos);

  const nextLogo = () => setCurrentLogo((prev) => (prev === MAX_INDEX ? 0 : prev + 1));
  const prevLogo = () => setCurrentLogo((prev) => (prev === 0 ? MAX_INDEX : prev - 1));

  useEffect(() => {
    const updateVisibleLogos = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleLogos(2);
      } else if (width < 1024) {
        setVisibleLogos(3);
      } else {
        setVisibleLogos(5);
      }
    };

    updateVisibleLogos();
    window.addEventListener("resize", updateVisibleLogos);
    return () => window.removeEventListener("resize", updateVisibleLogos);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextLogo, 4000);
    return () => clearInterval(interval);
  }, [visibleLogos]);

  return (
    <>
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
          <div className="max-w-3xl p-6 md:p-10 rounded-2xl shadow-lg">
            {/* Animated Title */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-500 ${
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
            <FancyButton onClick={() => navigate("/contact")}>
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

      {/* Client Logos Slider Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header and Slider in one line */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-6 lg:mb-0">
            <div className="text-center lg:text-left flex-shrink-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Our
              </h2>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Clients
              </h2>
            </div>
            <div className="flex-1 w-full">
              {/* Slider Container */}
              <div className="relative overflow-hidden rounded-xl bg-gray-50 py-4">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${(currentLogo * 100) / visibleLogos}%)`,
                  }}
                >
                  {clientLogos.map((logo, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 px-2 sm:px-4"
                      style={{ width: `${100 / visibleLogos}%` }}
                    >
                      <div className="flex items-center justify-center h-16 sm:h-20 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="h-10 sm:h-12 max-w-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevLogo}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 border border-gray-200"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={nextLogo}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 border border-gray-200"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
              <button
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentLogo
                    ? "bg-red-600 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setCurrentLogo(i)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
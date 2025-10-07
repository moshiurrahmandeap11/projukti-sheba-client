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

  // Client Logos Data - Professional looking logos
  const clientLogos = [
    {
      src: "https://i.ibb.co.com/0yQd7QCj/banner1.png",
      alt: "Vibrant Logo",
    },
    {
      src: "https://cdn.logo.com/hotlink-ok/logo-social.png",
      alt: "Udancla Logo",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      alt: "Google Logo",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      alt: "Apple Logo",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      alt: "Amazon Logo",
    },
    {
      src: "https://i.ibb.co.com/WWHpGHfm/8867-Microsoft-5-F00-Logo-2-D00-for-2-D00-screen.jpg",
      alt: "Microsoft Logo",
    },
    {
      src: "https://i.ibb.co.com/67Hz3PCH/Meta-Logo.png",
      alt: "Facebook Logo",
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
      if (width < 480) {
        setVisibleLogos(1);
      } else if (width < 640) {
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
        <div className="relative z-10 flex items-center justify-start min-h-screen px-4 sm:px-6 md:px-16">
          <div className="max-w-3xl p-4 sm:p-6 md:p-10 rounded-2xl shadow-lg">
            {/* Animated Title */}
            <h1
              className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              {headlines[currentHeadlineIndex]}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
              Experience cutting-edge technology with our innovative solutions
              designed to transform your digital journey and accelerate your
              business growth.
            </p>

            {/* CTA Button */}
            <FancyButton className="text-white w-full sm:w-auto" onClick={() => navigate("/contact")}>
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
      <section className=" bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-9/12 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header and Slider in one line */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="text-center lg:text-left flex-shrink-0 w-full lg:w-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Our
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Clients
              </h2>
              
              {/* Divider - Visible on mobile only */}
              <div className="w-20 h-1 bg-gray-300 mx-auto lg:hidden my-4 rounded-full"></div>
            </div>

            {/* Divider - Visible on desktop only */}
            <div className="hidden lg:block h-20 w-1 bg-black mx-8"></div>

            <div className="flex-1 w-full">
              {/* Slider Container */}
              <div className="relative overflow-hidden rounded-2xl mt-8 py-2 ">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${(currentLogo * 100) / visibleLogos}%)`,
                  }}
                >
                  {clientLogos.map((logo, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 px-3 sm:px-6"
                      style={{ width: `${100 / visibleLogos}%` }}
                    >
                      <div className="flex items-center justify-center h-16 sm:h-20 md:h-24  hover:scale-105 transition-all duration-500 p-4 group">
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="h-10 sm:h-12 md:h-14 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/150x50/4F46E5/FFFFFF?text=${logo.alt.split(' ')[0]}`;
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevLogo}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 hover:bg-white transition-all duration-300 z-10 border border-gray-200/80"
                  aria-label="Previous clients"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextLogo}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 hover:bg-white transition-all duration-300 z-10 border border-gray-200/80"
                  aria-label="Next clients"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>

                {/* Gradient Overlays for better visibility */}
                {/* <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white/80 to-transparent pointer-events-none"></div> */}
                {/* <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/80 to-transparent pointer-events-none"></div> */}
              </div>

              {/* Enhanced Dots */}
              <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
                {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
                  <button
                    key={i}
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-500 ${
                      i === currentLogo
                        ? "bg-gradient-to-r from-red-600 to-red-500 scale-125 shadow-lg"
                        : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                    }`}
                    onClick={() => setCurrentLogo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
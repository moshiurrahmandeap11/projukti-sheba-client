import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load Lottie Web Component script
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js";
    script.type = "module";
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="relative bg-[#CCEFFF] overflow-hidden backdrop-blur-lg">
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center lg:py-20 py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 max-w-7xl mx-auto bg-[#CCEFFF] rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Left Side - Text Content */}
          <div className="flex-1 w-full">
            {/* Glassy Container */}
            <div className="rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 bg-[#008080]/70 shadow-2xl">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight text-left">
                <span className="text-black">Digital Solution of Business</span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 lg:mb-10 leading-relaxed text-left text-white rounded-lg px-4 py-3 shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.5))",
                }}
              >
                Experience cutting-edge technology with our innovative solutions
                designed to transform your digital journey
              </p>

              {/* Get In Touch Button */}
              <div
                onClick={() => navigate("/contact")}
                className="flex justify-start"
              >
                <button className="relative group bg-purple-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full cursor-pointer text-white text-sm sm:text-base font-medium overflow-hidden">
                  <span className="relative z-10">Get In Touch</span>
                  <div
                    className="absolute inset-0 bg-[#954cc9] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"
                  ></div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Lottie Animation */}
          <div className="flex-shrink-0 hidden lg:block w-full lg:w-auto">
            <div className="backdrop-blur-sm rounded-2xl p-4 shadow-2xl bg-[#6b8497]">
              <dotlottie-wc
                src="https://lottie.host/ac66299c-d725-499e-ac6f-1f967cdd6e94/vA7TYn8bot.lottie"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "auto",
                  aspectRatio: "1/1",
                  filter: "drop-shadow(0 0 20px rgba(0,120,160,0.3))",
                }}
                speed="1"
                autoplay
                loop
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const dummyTextTestimonials = [
  {
    name: "Olivia M.",
    position: "Designer",
    company: "PixelFlow",
    testimonial:
      "Amazing design team! Their attention to detail is unmatched and they delivered exactly what we envisioned.",
    date: "2025-09-10",
  },
  {
    name: "Ethan H.",
    position: "Developer",
    company: "CodeForge",
    testimonial:
      "The collaboration was smooth and efficient. Our project was completed ahead of schedule with high quality.",
    date: "2025-08-25",
  },
  {
    name: "Ava S.",
    position: "Manager",
    company: "BizBoost",
    testimonial:
      "Professional, reliable, and creative. Truly transformed our brand identity and boosted engagement.",
    date: "2025-07-30",
  },
  {
    name: "Liam P.",
    position: "CEO",
    company: "NextGen",
    testimonial:
      "They understood our vision perfectly and delivered beyond expectations.",
    date: "2025-06-20",
  },
  {
    name: "Sophia L.",
    position: "Marketing Head",
    company: "TechNova",
    testimonial:
      "Excellent communication and professionalism throughout the project.",
    date: "2025-05-15",
  },
  {
    name: "Noah R.",
    position: "CTO",
    company: "CloudHub",
    testimonial:
      "Reliable, fast, and high-quality work. Would definitely collaborate again.",
    date: "2025-04-10",
  },
];

const TextTestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const TOTAL_CARDS = dummyTextTestimonials.length;
  const MAX_INDEX = Math.max(0, TOTAL_CARDS - visibleCards);

  const next = () => setCurrent((prev) => (prev === MAX_INDEX ? 0 : prev + 1));
  const prev = () => setCurrent((prev) => (prev === 0 ? MAX_INDEX : prev - 1));

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 768) {
        setVisibleCards(2);
      } else if (width < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(5);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [visibleCards]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-2 sm:px-4 lg:px-8 bg-gray-50">
      <div className="relative max-w-7xl mx-auto">
        {/* Slider */}
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(current * 100) / visibleCards}%)`,
            }}
          >
            {dummyTextTestimonials.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-1 sm:px-2 lg:px-4"
                style={{ width: `${100 / visibleCards}%` }}
              >
                <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[20rem] sm:h-[22rem] lg:h-full min-h-[18rem]">
                  <blockquote className="text-gray-700 italic text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-4 lg:line-clamp-none">
                    "{t.testimonial}"
                  </blockquote>
                  <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100">
                    <h3 className="text-gray-900 font-semibold text-sm sm:text-base leading-tight">
                      {t.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-tight">
                      {t.position}, {t.company}
                    </p>
                    <p className="text-gray-400 text-xs leading-tight mt-1">
                      {formatDate(t.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-1 sm:left-2 lg:left-0 top-1/2 -translate-y-1/2 bg-white p-1.5 sm:p-2 lg:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 border border-gray-200"
        >
          <ChevronLeft className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
        </button>
        <button
          onClick={next}
          className="absolute right-1 sm:right-2 lg:right-0 top-1/2 -translate-y-1/2 bg-white p-1.5 sm:p-2 lg:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 border border-gray-200"
        >
          <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
        </button>

        {/* Dots */}
        <div className="flex justify-center space-x-1.5 sm:space-x-2 mt-6 sm:mt-8">
          {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-red-600 scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TextTestimonialsSlider;
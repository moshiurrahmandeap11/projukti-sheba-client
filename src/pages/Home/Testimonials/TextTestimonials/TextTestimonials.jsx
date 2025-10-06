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
  const VISIBLE_CARDS = 5;
  const TOTAL_CARDS = dummyTextTestimonials.length;
  const MAX_INDEX = Math.max(0, TOTAL_CARDS - VISIBLE_CARDS);

  const next = () => setCurrent((prev) => (prev === MAX_INDEX ? 0 : prev + 1));
  const prev = () => setCurrent((prev) => (prev === 0 ? MAX_INDEX : prev - 1));

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  return (
    <section className="px-4 py-4 bg-gray-50 sm:px-6 lg:px-8">

      <div className="relative max-w-7xl mx-auto">
        {/* Slider */}
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(current * 100) / VISIBLE_CARDS}%)`,
            }}
          >
            {dummyTextTestimonials.map((t, i) => (
              <div key={i} className="w-1/5 flex-shrink-0 px-4">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                  <blockquote className="text-gray-700 italic text-sm mb-4">
                    "{t.testimonial}"
                  </blockquote>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <h3 className="text-gray-900 font-semibold">{t.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {t.position}, {t.company}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{formatDate(t.date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 border border-gray-200"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 border border-gray-200"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>

        {/* Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
            <button
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-red-600 scale-110" : "bg-gray-300 hover:bg-gray-400"
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

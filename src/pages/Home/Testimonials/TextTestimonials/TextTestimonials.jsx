import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axiosInstance from "../../../../hooks/AxiosInstance/AxiosInstance";


const TextTestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/testimonials/type/text');
      console.log(response.data);
      
      if (response.data.success) {
        setTestimonials(response.data.data);
      } else {
        setError('Failed to load testimonials');
        setTestimonials([]);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError('Error loading testimonials. Please try again.');
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const TOTAL_CARDS = testimonials.length;
  const MAX_INDEX = Math.max(0, TOTAL_CARDS - visibleCards);

  const next = () => {
    if (TOTAL_CARDS === 0) return;
    setCurrent((prev) => (prev === MAX_INDEX ? 0 : prev + 1));
  };

  const prev = () => {
    if (TOTAL_CARDS === 0) return;
    setCurrent((prev) => (prev === 0 ? MAX_INDEX : prev - 1));
  };

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
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [visibleCards, testimonials.length]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 px-2 sm:px-4 lg:px-8 bg-gray-50">
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl shadow-md animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 px-2 sm:px-4 lg:px-8 bg-gray-50">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={fetchTestimonials}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (testimonials.length === 0) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 px-2 sm:px-4 lg:px-8 bg-gray-50">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <p className="text-gray-500 text-lg">No text testimonials available yet.</p>
            <p className="text-gray-400 text-sm mt-2">Check back later for client testimonials.</p>
          </div>
        </div>
      </section>
    );
  }

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
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial._id || index}
                className="flex-shrink-0 px-1 sm:px-2 lg:px-4"
                style={{ width: `${100 / visibleCards}%` }}
              >
                <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[20rem] sm:h-[22rem] lg:h-full min-h-[18rem]">
                  <blockquote className="text-gray-700 italic text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-4 lg:line-clamp-none">
                    "{testimonial.testimonial}"
                  </blockquote>
                  <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100">
                    <h3 className="text-gray-900 font-semibold text-sm sm:text-base leading-tight">
                      {testimonial.name || 'Client Name'}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-tight">
                      {testimonial.position || 'Position'}, {testimonial.company || 'Company'}
                    </p>
                    <p className="text-gray-400 text-xs leading-tight mt-1">
                      {formatDate(testimonial.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - Only show if there are enough testimonials */}
        {testimonials.length > visibleCards && (
          <>
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
          </>
        )}

        {/* Dots - Only show if there are multiple pages */}
        {MAX_INDEX > 0 && (
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
        )}
      </div>
    </section>
  );
};

export default TextTestimonialsSlider;
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import axiosInstance from "../../../hooks/AxiosInstance/AxiosInstance";


const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/testimonials/type/video');
      
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
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
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

  const truncateText = (text, maxWords = 20) => {
    if (!text) return '';
    const words = text.split(" ");
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const openModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTestimonial(null);
  };

  // Default fallback image
  const getFallbackImage = () => {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzlDQThBRiIvPjxwYXRoIGQ9Ik0xMzAgMTQwQzcwIDE0MCA3MCAxNDAgNzAgMTQwVjE2MEgxMzBWMTQwWiIgZmlsbD0iIzlDQThBRiIvPgo8L3N2Zz4K';
  };

  const TestimonialCard = ({ testimonial }) => {
    const truncatedText = truncateText(testimonial.testimonial);
    const isTruncated = testimonial.testimonial?.split(" ").length > 20;
    const videoId = testimonial.videoUrl
      ? getYouTubeId(testimonial.videoUrl)
      : null;
    const thumbnailUrl = videoId
      ? `https://img.youtube.com/vi/${videoId}/0.jpg`
      : null;

    return (
      <div
        className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-[24rem] sm:h-[26rem] lg:h-[28rem] group cursor-pointer"
        onClick={() => openModal(testimonial)}
      >
        {/* Top: Video Thumbnail or Photo with Play Overlay */}
        <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:from-gray-100 group-hover:to-white transition-colors duration-300">
          {videoId ? (
            <img
              src={thumbnailUrl}
              alt={testimonial.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.src = testimonial.photoURL || getFallbackImage();
              }}
            />
          ) : (
            <img
              src={testimonial.photoURL || getFallbackImage()}
              alt={testimonial.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.src = getFallbackImage();
              }}
            />
          )}
          {videoId && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all duration-300">
              <div className="bg-white bg-opacity-90 rounded-full p-2 sm:p-3 flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 shadow-lg">
                <Play className="w-4 sm:w-5 h-4 sm:h-5 text-black ml-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Testimonial Text - Fixed height */}
        <div className="p-4 sm:p-6 h-24 sm:h-32 overflow-hidden flex flex-col justify-between">
          <blockquote className="text-gray-700 text-xs sm:text-sm leading-relaxed italic break-words">
            "{truncatedText}"
          </blockquote>
          {isTruncated && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                openModal(testimonial);
              }}
              className="self-start text-xs text-red-600 cursor-pointer hover:underline font-medium mt-2 transition-colors duration-200"
            >
              Read more
            </button>
          )}
        </div>

        {/* Bottom: Details */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-gray-100 flex-1 flex flex-col sm:flex-row sm:justify-between bg-gradient-to-t from-white to-transparent">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
            {testimonial.name || 'Client Name'}
          </h3>
          <div className="mt-2 sm:mt-0">
            <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-tight">
              {testimonial.position || 'Position'}, {testimonial.company || 'Company'}
            </p>
            <p className="text-xs text-gray-400 mt-1 leading-tight">
              {formatDate(testimonial.date)} • {testimonial.location || 'Location'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const Modal = ({ testimonial, onClose }) => {
    const videoId = testimonial.videoUrl
      ? getYouTubeId(testimonial.videoUrl)
      : null;

    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-2xl max-w-full sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>

          {/* Modal Content */}
          <div className="p-4 sm:p-8">
            {/* Media */}
            <div className="relative mb-4 sm:mb-6">
              {videoId ? (
                <iframe
                  width="100%"
                  height="250"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-xl w-full h-48 sm:h-64"
                ></iframe>
              ) : (
                <img
                  src={testimonial.photoURL || getFallbackImage()}
                  alt={testimonial.name}
                  className="w-full h-48 sm:h-64 object-cover rounded-xl"
                  onError={(e) => {
                    e.target.src = getFallbackImage();
                  }}
                />
              )}
            </div>

            {/* Full Testimonial */}
            <blockquote className="text-gray-700 text-base sm:text-lg leading-relaxed italic mb-4 sm:mb-6 border-l-4 border-red-600 pl-3 sm:pl-4">
              "{testimonial.testimonial}"
            </blockquote>

            {/* Details */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
              <div>
                <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                  {testimonial.name || 'Client Name'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {testimonial.position || 'Position'}, {testimonial.company || 'Company'}
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-2 sm:mt-0">
                {formatDate(testimonial.date)} • {testimonial.location || 'Location'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-8 sm:py-16 bg-gray-50 px-2 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-5xl font-bold text-black mb-6 tracking-wide">
              What Our Clients Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from leaders who've transformed their businesses with us.
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-8 sm:py-16 bg-gray-50 px-2 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-5xl font-bold text-black mb-6 tracking-wide">
              What Our Clients Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from leaders who've transformed their businesses with us.
            </p>
          </div>
          <div className="text-center py-12">
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
      <section className="py-8 sm:py-16 bg-gray-50 px-2 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-5xl font-bold text-black mb-6 tracking-wide">
              What Our Clients Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from leaders who've transformed their businesses with us.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No video testimonials available yet.</p>
            <p className="text-gray-400 text-sm mt-2">Check back later for client testimonials.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-16 bg-gray-50 px-2 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-5xl font-bold text-black mb-6 tracking-wide">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from leaders who've transformed their businesses with us.
          </p>
        </div>

        {/* Slider Container */}
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
                className="flex-shrink-0 px-2 sm:px-4"
                style={{ width: `${100 / visibleCards}%` }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - Only show if there are testimonials */}
        {testimonials.length > visibleCards && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 border border-gray-200"
            >
              <ChevronLeft className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 border border-gray-200"
            >
              <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
            </button>
          </>
        )}

        {/* Dots - Only show if there are multiple pages */}
        {MAX_INDEX > 0 && (
          <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
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

      {/* Modal */}
      {isModalOpen && selectedTestimonial && (
        <Modal testimonial={selectedTestimonial} onClose={closeModal} />
      )}
    </section>
  );
};

export default TestimonialsSlider;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Quote, ChevronLeft, ChevronRight, Building2, MapPin, Calendar, Video, Loader2, Play } from 'lucide-react';
import FancyButton from '../../../comopnents/sharedItems/FancyButtons/FancyButton';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stats = [
    { number: "98%", label: "Client Satisfaction" },
    { number: "250+", label: "Projects Delivered" },
    { number: "100+", label: "Happy Clients" },
    { number: "5★", label: "Average Rating" },
  ];

  // Utility function to normalize YouTube URLs
  const normalizeYouTubeUrl = (url) => {
    if (!url) return null;
    // Match YouTube watch URLs (e.g., https://www.youtube.com/watch?v=video-id)
    const watchRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/;
    const embedRegex = /youtube\.com\/embed\/([^&?]+)/;
    if (watchRegex.test(url)) {
      const videoId = url.match(watchRegex)[1];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (embedRegex.test(url)) {
      return url; // Already in embed format
    } else {
      return null; // Invalid or non-embeddable URL
    }
  };

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://projukti-sheba-server.onrender.com/testimonials');
        if (response.data.success) {
          // Sort testimonials: those with videoUrl come first
          const sortedTestimonials = response.data.data.sort((a, b) => {
            if (a.videoUrl && !b.videoUrl) return -1;
            if (!a.videoUrl && b.videoUrl) return 1;
            return 0;
          });
          // Normalize YouTube URLs
          const normalizedTestimonials = sortedTestimonials.map((testimonial) => ({
            ...testimonial,
            videoUrl: testimonial.videoUrl ? normalizeYouTubeUrl(testimonial.videoUrl) : null,
          }));
          setTestimonials(normalizedTestimonials || []);
          setError(null);
        } else {
          setError('Failed to load testimonials. Please try again.');
          setTestimonials([]);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials. Please try again.');
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Auto-play testimonials
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) =>
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
        setIsPlaying(false);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    setIsAutoPlaying(false);
    setIsPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
    setIsPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    setIsPlaying(false);
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < rating ? 'text-[rgba(234,179,8,0.8)] fill-[rgba(234,179,8,0.8)]' : 'text-gray-600'}`}
      />
    ));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const renderTestimonialContent = (testimonial) => {
    if (testimonial.videoUrl) {
      const isYouTube = testimonial.videoUrl && testimonial.videoUrl.includes('youtube.com/embed');
      if (isYouTube) {
        return (
          <div className="relative">
            <iframe
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg"
              src={`${testimonial.videoUrl}${isPlaying ? '?autoplay=1' : ''}`}
              title={`${testimonial.name} Testimonial`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {!isPlaying && (
              <button
                onClick={handlePlayVideo}
                className="absolute inset-0 flex items-center justify-center bg-[rgba(10,25,47,0.5)] hover:bg-[rgba(10,25,47,0.7)] rounded-lg transition-all duration-300 group"
                aria-label="Play YouTube video"
                role="button"
              >
                <Play className="w-12 h-12 sm:w-16 sm:h-16 text-[rgba(0,120,160,0.8)] group-hover:text-[rgba(0,120,160,1)] group-hover:scale-110 transition-all duration-300" />
              </button>
            )}
            {testimonial.testimonial && (
              <blockquote className="text-sm sm:text-lg md:text-xl text-gray-200 leading-relaxed mt-4 sm:mt-6 relative z-10">
                "{testimonial.testimonial}"
              </blockquote>
            )}
          </div>
        );
      } else {
        return (
          <div className="relative">
            <video
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg"
              controls
              poster={testimonial.photoURL || '/api/placeholder/80/80'}
            >
              <source src={testimonial.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {testimonial.testimonial && (
              <blockquote className="text-sm sm:text-lg md:text-xl text-gray-200 leading-relaxed mt-4 sm:mt-6 relative z-10">
                "{testimonial.testimonial}"
              </blockquote>
            )}
          </div>
        );
      }
    }
    return (
      <div className="relative">
        <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-[rgba(0,120,160,0.2)] absolute -top-2 sm:-top-4 -left-2" />
        <blockquote className="text-sm sm:text-lg md:text-xl text-gray-200 leading-relaxed mb-4 sm:mb-6 relative z-10">
          "{testimonial.testimonial}"
        </blockquote>
      </div>
    );
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[rgba(10,25,47,0.3)] backdrop-blur-lg text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0,120,160,0.3) 0%, transparent 50%), 
                              radial-gradient(circle at 75% 75%, rgba(50,40,130,0.3) 0%, transparent 50%)`,
          }}
        ></div>
      </div>
      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(10,25,47,0.5), rgba(50,40,130,0.4), rgba(0,120,160,0.3))',
          zIndex: 0,
          backdropFilter: 'blur(10px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(0,120,160,0.7))',
              }}
            >
              Client Testimonials
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-6 sm:mb-8">
            Hear from our clients through their words and videos about their experience with Projukti Sheba
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-[rgba(10,25,47,0.5)] rounded-xl p-3 sm:p-4 border border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,120,160,0.5)] transition-all duration-300"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[rgba(0,120,160,0.8)] mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading or Error State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-[rgba(0,120,160,0.8)] animate-spin" />
            <span className="ml-2 sm:ml-3 text-gray-300 text-sm sm:text-base">Loading testimonials...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 text-sm sm:text-base">{error}</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm sm:text-base">No testimonials available.</p>
          </div>
        ) : (
          <>
            {/* Main Testimonial */}
            <div className="relative mb-12">
              <div className="backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-3xl p-6 sm:p-8 md:p-12 border border-[rgba(255,255,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.2)] max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-center">
                  {/* Client Info */}
                  <div className="md:col-span-1 text-center md:text-left">
                    <div className="relative inline-block mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[rgba(0,120,160,0.5)] p-1 mx-auto md:mx-0">
                        {testimonials[currentTestimonial].photoURL ? (
                          <img
                            src={testimonials[currentTestimonial].photoURL}
                            alt={testimonials[currentTestimonial].name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-[rgba(10,25,47,0.7)] flex items-center justify-center text-xl sm:text-2xl font-bold text-white">
                            {testimonials[currentTestimonial].name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <Quote className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 text-[rgba(0,120,160,0.7)] bg-[rgba(10,25,47,0.5)] rounded-full p-1" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                      {testimonials[currentTestimonial].name}
                    </h3>

                    <p className="text-[rgba(0,120,160,0.8)] font-medium text-sm sm:text-base mb-1">
                      {testimonials[currentTestimonial].position}
                    </p>

                    <div className="flex items-center justify-center md:justify-start text-gray-400 text-xs sm:text-sm mb-2">
                      <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {testimonials[currentTestimonial].company}
                    </div>

                    <div className="flex items-center justify-center md:justify-start text-gray-400 text-xs sm:text-sm mb-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {testimonials[currentTestimonial].location}
                    </div>

                    <div className="flex items-center justify-center md:justify-start text-gray-400 text-xs sm:text-sm mb-4">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {formatDate(testimonials[currentTestimonial].date)}
                    </div>

                    <div className="flex justify-center md:justify-start mb-4">
                      {renderStars(testimonials[currentTestimonial].rating)}
                    </div>

                    <div className="backdrop-blur-sm bg-[rgba(255,255,255,0.05)] rounded-lg px-2 sm:px-3 py-1 sm:py-2 border border-[rgba(255,255,255,0.1)] inline-block">
                      <span className="text-xs text-gray-300">
                        {testimonials[currentTestimonial].category}
                      </span>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="md:col-span-2">
                    {renderTestimonialContent(testimonials[currentTestimonial])}

                    <div className="backdrop-blur-sm bg-[rgba(255,255,255,0.05)] rounded-lg p-3 sm:p-4 border border-[rgba(255,255,255,0.1)] mt-4 sm:mt-6">
                      <div className="text-xs sm:text-sm text-gray-400 mb-1">Project:</div>
                      <div className="text-white font-medium text-sm sm:text-base">
                        {testimonials[currentTestimonial].project}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 backdrop-blur-sm bg-[rgba(10,25,47,0.5)] hover:bg-[rgba(10,25,47,0.7)] border border-[rgba(255,255,255,0.1)] rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 backdrop-blur-sm bg-[rgba(10,25,47,0.5)] hover:bg-[rgba(10,25,47,0.7)] border border-[rgba(255,255,255,0.1)] rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 sm:space-x-3 mb-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-[rgba(0,120,160,0.8)] w-6 sm:w-8'
                      : 'bg-gray-600 hover:bg-[rgba(0,120,160,0.5)]'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* All Testimonials Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial._id || index}
                  className={`backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-2xl p-4 sm:p-6 border border-[rgba(255,255,255,0.1)] transition-all duration-300 hover:bg-[rgba(10,25,47,0.6)] hover:scale-105 cursor-pointer ${
                    index === currentTestimonial ? 'ring-2 ring-[rgba(0,120,160,0.8)]' : ''
                  }`}
                  onClick={() => goToTestimonial(index)}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[rgba(0,120,160,0.5)] flex items-center justify-center text-xs sm:text-sm font-bold text-white mr-3 sm:mr-4">
                      {testimonial.photoURL ? (
                        <img
                          src={testimonial.photoURL}
                          alt={testimonial.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        testimonial.name.charAt(0)
                      )}
                      {testimonial.videoUrl && (
                        <Video className="absolute w-3 h-3 sm:w-4 sm:h-4 text-[rgba(0,120,160,0.7)] -bottom-1 -right-1" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm sm:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {testimonial.position}
                      </p>
                    </div>
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm mb-4 line-clamp-3">
                    "{testimonial.testimonial || 'Watch the video review'}"
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[rgba(0,120,160,0.8)] font-medium">
                      {testimonial.company}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(testimonial.date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12 sm:mt-16">
              <div className="backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-2xl p-6 sm:p-8 border border-[rgba(255,255,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.2)] max-w-3xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                  Ready to Join Our Success Stories?
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">
                  Let's discuss how we can help transform your business with our digital solutions
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <FancyButton className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full transition-all transform hover:scale-105 shadow-lg">
                    Start Your Project
                  </FancyButton>
                  <FancyButton className="px-6 sm:px-8 py-2 sm:py-3 backdrop-blur-md bg-black/30 border border-gray-700 hover:bg-black/50 rounded-full transition-all">
                    View Portfolio
                  </FancyButton>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
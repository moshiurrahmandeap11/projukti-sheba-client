import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

const dummyTestimonials = [
  {
    name: "Jamie R.",
    position: "CEO of Geneva",
    company: "Geneva",
    location: "Switzerland",
    date: "2025-09-01",
    rating: 5,
    category: "Branding",
    project: "Website Redesign",
    photoURL: "/mnt/data/2b6a258d-99a2-4185-9127-1465742e4cdd.png",
    testimonial:
      "Their creative approach truly impressed me. I've collaborated with other branding teams before, but none matched their clarity and precision. From the first meeting to final delivery, everything was smooth, thoughtful, and impactful. Still unsure? Trust this team—Jamie does every time.",
    videoUrl: "https://youtu.be/K4DyBUG242c?si=KyqmIBCMv3vS7bSS", // Placeholder for demo
  },
  {
    name: "Sophia L.",
    position: "Marketing Head",
    company: "TechNova",
    location: "Germany",
    date: "2025-08-15",
    rating: 5,
    category: "Marketing",
    project: "Campaign Launch",
    photoURL: "/mnt/data/2b6a258d-99a2-4185-9127-1465742e4cdd.png",
    testimonial:
      "The team delivered a fantastic marketing strategy. Our campaign performance exceeded expectations.",
    videoUrl: "https://youtu.be/5IPHB8rMmn0?si=SQEQA3jEqS7ALRqt",
  },
  {
    name: "Liam K.",
    position: "Product Manager",
    company: "InnoTech",
    location: "USA",
    date: "2025-07-20",
    rating: 4,
    category: "Product Development",
    project: "Mobile App",
    photoURL: "/mnt/data/2b6a258d-99a2-4185-9127-1465742e4cdd.png",
    testimonial:
      "App development was smooth and timely. The product launched successfully and users loved it.",
    videoUrl: "https://youtu.be/DzYp5uqixz0?si=XnGFEFLZ8DDh-mtw",
  },
  {
    name: "Emma W.",
    position: "Founder",
    company: "GreenLeaf",
    location: "UK",
    date: "2025-06-10",
    rating: 5,
    category: "Consulting",
    project: "Business Strategy",
    photoURL: "/mnt/data/2b6a258d-99a2-4185-9127-1465742e4cdd.png",
    testimonial:
      "Insightful consultation that really helped shape our growth strategy.",
    videoUrl: "https://youtu.be/ETbsXdqgcTM?si=OONMcqIYnyaqInJD",
  },
  {
    name: "Noah P.",
    position: "CTO",
    company: "CloudHub",
    location: "Canada",
    date: "2025-05-05",
    rating: 4,
    category: "Tech Solutions",
    project: "Cloud Migration",
    photoURL: "/mnt/data/2b6a258d-99a2-4185-9127-1465742e4cdd.png",
    testimonial:
      "Migration to the cloud was efficient and problem-free. Excellent technical support.",
    videoUrl: "https://youtu.be/p5cWMxzzMdA?si=mGGx9SBty7Ds5Dga",
  },
];

const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const VISIBLE_CARDS = 3;
  const TOTAL_CARDS = dummyTestimonials.length;
  const MAX_INDEX = Math.max(0, TOTAL_CARDS - VISIBLE_CARDS);

  const next = () => setCurrent((prev) => (prev === MAX_INDEX ? 0 : prev + 1));
  const prev = () => setCurrent((prev) => (prev === 0 ? MAX_INDEX : prev - 1));

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  const truncateText = (text, maxWords = 20) => {
    const words = text.split(" ");
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const getYouTubeId = (url) => {
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

  const TestimonialCard = ({ testimonial }) => {
    const truncatedText = truncateText(testimonial.testimonial);
    const isTruncated = testimonial.testimonial.split(" ").length > 20;
    const videoId = testimonial.videoUrl
      ? getYouTubeId(testimonial.videoUrl)
      : null;
    const thumbnailUrl = videoId
      ? `https://img.youtube.com/vi/${videoId}/0.jpg`
      : null;

    return (
      <div
        className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-[28rem] group cursor-pointer"
        onClick={() => openModal(testimonial)}
      >
        {/* Top: Video Thumbnail or Photo with Play Overlay */}
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:from-gray-100 group-hover:to-white transition-colors duration-300">
          {videoId ? (
            <img
              src={thumbnailUrl}
              alt={testimonial.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.src = testimonial.photoURL; // Fallback to photo if thumbnail fails
              }}
            />
          ) : (
            <img
              src={testimonial.photoURL}
              alt={testimonial.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {videoId && (
            <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
              <div className="bg-white bg-opacity-90 rounded-full p-3 flex items-center justify-center w-12 h-12 shadow-lg">
                <Play className="w-5 h-5 text-black ml-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Testimonial Text - Fixed height */}
        <div className="p-6 h-32 overflow-hidden flex flex-col justify-between">
          <blockquote className="text-gray-700 text-sm leading-relaxed italic break-words">
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
        <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex-1 flex  justify-between bg-gradient-to-t from-white to-transparent">
          <h3 className="font-semibold text-gray-900 text-base leading-tight">
            {testimonial.name}
          </h3>
          <div>
            <p className="text-sm text-gray-500 mt-1 leading-tight">
              {testimonial.position}, {testimonial.company}
            </p>
            <p className="text-xs text-gray-400 mt-1 leading-tight">
              {formatDate(testimonial.date)} • {testimonial.location}
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
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="p-8">
            {/* Media */}
            <div className="relative mb-6">
              {videoId ? (
                <iframe
                  width="100%"
                  height="360"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-xl"
                ></iframe>
              ) : (
                <img
                  src={testimonial.photoURL}
                  alt={testimonial.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
              )}
            </div>

            {/* Full Testimonial */}
            <blockquote className="text-gray-700 text-lg leading-relaxed italic mb-6 border-l-4 border-red-600 pl-4">
              "{testimonial.testimonial}"
            </blockquote>

            {/* Details */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <h3 className="font-bold text-xl text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600">
                  {testimonial.position}, {testimonial.company}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {formatDate(testimonial.date)} • {testimonial.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from leaders who've transformed their businesses with us.
          </p>
        </div>

        {/* Slider Container */}
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(current * 100) / VISIBLE_CARDS}%)`,
            }}
          >
            {dummyTestimonials.map((testimonial, index) => (
              <div key={index} className="w-1/3 flex-shrink-0 px-4">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 border border-gray-200"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 border border-gray-200"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center space-x-2 mt-8">
        {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-red-600 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedTestimonial && (
        <Modal testimonial={selectedTestimonial} onClose={closeModal} />
      )}
    </section>
  );
};

export default TestimonialsSlider;

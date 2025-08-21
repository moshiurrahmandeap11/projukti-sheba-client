import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Building2, MapPin, Calendar, Video } from 'lucide-react';

const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const testimonials = [
        {
            id: 1,
            name: "Rashid Ahmed",
            position: "CEO & Founder",
            company: "TechMart Bangladesh",
            location: "Dhaka, Bangladesh",
            date: "January 2024",
            rating: 5,
            image: "/api/placeholder/80/80",
            testimonial: "Projukti Sheba delivered an exceptional e-commerce platform that transformed our business. Their attention to detail and technical expertise is unmatched.",
            videoUrl: "https://www.youtube.com/embed/sample-video-id1", // Example YouTube embed URL
            project: "E-commerce Management System",
            category: "Software Development"
        },
        {
            id: 2,
            name: "Sarah Khan",
            position: "Marketing Director",
            company: "Fresh Foods Ltd",
            location: "Chittagong, Bangladesh",
            date: "March 2024",
            rating: 5,
            image: "/api/placeholder/80/80",
            testimonial: "The video production quality exceeded our expectations. Our product launch campaign was a huge success, generating 300% more engagement.",
            videoUrl: null, // No video for this testimonial
            project: "Product Launch Campaign",
            category: "Video Production"
        },
        // Add more testimonials as needed, with or without videoUrl
        {
            id: 3,
            name: "Mohammad Rahman",
            position: "General Manager",
            company: "Dhaka Industries",
            location: "Dhaka, Bangladesh",
            date: "February 2024",
            rating: 5,
            image: "/api/placeholder/80/80",
            testimonial: "Our new corporate website is modern, fast, and perfectly represents our brand.",
            videoUrl: "/videos/testimonial3.mp4", // Example direct video link
            project: "Corporate Website Redesign",
            category: "Web Development"
        },
        // ... other testimonials
    ];

    const stats = [
        { number: "98%", label: "Client Satisfaction" },
        { number: "250+", label: "Projects Delivered" },
        { number: "100+", label: "Happy Clients" },
        { number: "5★", label: "Average Rating" }
    ];

    useEffect(() => {
        if (isAutoPlaying) {
            const interval = setInterval(() => {
                setCurrentTestimonial((prev) =>
                    prev === testimonials.length - 1 ? 0 : prev + 1
                );
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isAutoPlaying, testimonials.length]);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
        setIsAutoPlaying(false);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
        setIsAutoPlaying(false);
    };

    const goToTestimonial = (index) => {
        setCurrentTestimonial(index);
        setIsAutoPlaying(false);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
            />
        ));
    };

    const renderTestimonialContent = (testimonial) => {
        if (testimonial.videoUrl) {
            // Check if the video is a YouTube embed or a direct video file
            const isYouTube = testimonial.videoUrl.includes('youtube.com') || testimonial.videoUrl.includes('youtu.be');
            return (
                <div className="relative">
                    {isYouTube ? (
                        <iframe
                            className="w-full h-64 md:h-96 rounded-lg"
                            src={testimonial.videoUrl}
                            title={`${testimonial.name} Testimonial`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <video
                            className="w-full h-64 md:h-96 rounded-lg"
                            controls
                            poster={testimonial.image}
                        >
                            <source src={testimonial.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    {/* Display text testimonial below video if available */}
                    {testimonial.testimonial && (
                        <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed mt-6 relative z-10">
                            "{testimonial.testimonial}"
                        </blockquote>
                    )}
                </div>
            );
        }
        // Fallback to text-only testimonial
        return (
            <div className="relative">
                <Quote className="w-12 h-12 text-blue-400/20 absolute -top-4 -left-2" />
                <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6 relative z-10">
                    "{testimonial.testimonial}"
                </blockquote>
            </div>
        );
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-gray-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #4f46e5 0%, transparent 50%), 
                                      radial-gradient(circle at 75% 75%, #7c3aed 0%, transparent 50%)`
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Client Testimonials
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Hear from our clients through their words and videos about their experience with Projukti Sheba
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} className="backdrop-blur-md bg-black/20 rounded-xl p-4 border border-gray-700">
                                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">
                                    {stat.number}
                                </div>
                                <div className="text-gray-400 text-sm">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Testimonial */}
                <div className="relative mb-12">
                    <div className="backdrop-blur-lg bg-black/40 rounded-3xl p-8 md:p-12 border border-gray-700 shadow-2xl max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            {/* Client Info */}
                            <div className="md:col-span-1 text-center md:text-left">
                                <div className="relative inline-block mb-6">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 mx-auto md:mx-0">
                                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-2xl font-bold">
                                            {testimonials[currentTestimonial].name.charAt(0)}
                                        </div>
                                    </div>
                                    <Quote className="absolute -top-2 -right-2 w-6 h-6 text-blue-400 bg-black rounded-full p-1" />
                                </div>
                                
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {testimonials[currentTestimonial].name}
                                </h3>
                                
                                <p className="text-blue-400 font-medium mb-1">
                                    {testimonials[currentTestimonial].position}
                                </p>
                                
                                <div className="flex items-center justify-center md:justify-start text-gray-400 text-sm mb-2">
                                    <Building2 className="w-4 h-4 mr-1" />
                                    {testimonials[currentTestimonial].company}
                                </div>
                                
                                <div className="flex items-center justify-center md:justify-start text-gray-400 text-sm mb-2">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {testimonials[currentTestimonial].location}
                                </div>
                                
                                <div className="flex items-center justify-center md:justify-start text-gray-400 text-sm mb-4">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {testimonials[currentTestimonial].date}
                                </div>
                                
                                <div className="flex justify-center md:justify-start mb-4">
                                    {renderStars(testimonials[currentTestimonial].rating)}
                                </div>
                                
                                <div className="backdrop-blur-md bg-black/20 rounded-lg px-3 py-2 border border-gray-700 inline-block">
                                    <span className="text-xs text-gray-300">
                                        {testimonials[currentTestimonial].category}
                                    </span>
                                </div>
                            </div>

                            {/* Testimonial Content */}
                            <div className="md:col-span-2">
                                {renderTestimonialContent(testimonials[currentTestimonial])}
                                
                                <div className="backdrop-blur-md bg-black/20 rounded-lg p-4 border border-gray-700 mt-6">
                                    <div className="text-sm text-gray-400 mb-1">Project:</div>
                                    <div className="text-white font-medium">
                                        {testimonials[currentTestimonial].project}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-black/40 hover:bg-black/60 border border-gray-700 rounded-full p-3 transition-all duration-300 hover:scale-110"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <button
                        onClick={nextTestimonial}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-black/40 hover:bg-black/60 border border-gray-700 rounded-full p-3 transition-all duration-300 hover:scale-110"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Testimonial Indicators */}
                <div className="flex justify-center space-x-3 mb-12">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentTestimonial
                                    ? 'bg-blue-400 w-8'
                                    : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                        />
                    ))}
                </div>

                {/* All Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`backdrop-blur-lg bg-black/30 rounded-2xl p-6 border border-gray-700 transition-all duration-300 hover:bg-black/40 hover:scale-105 cursor-pointer ${
                                index === currentTestimonial ? 'ring-2 ring-blue-400' : ''
                            }`}
                            onClick={() => goToTestimonial(index)}
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold mr-4">
                                    {testimonial.name.charAt(0)}
                                    {testimonial.videoUrl && (
                                        <Video className="absolute w-4 h-4 text-blue-400 -bottom-1 -right-1" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-white text-sm">
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
                            
                            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                                "{testimonial.testimonial || 'Watch the video review'}"
                            </p>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-blue-400 font-medium">
                                    {testimonial.company}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {testimonial.date}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="backdrop-blur-lg bg-black/40 rounded-2xl p-8 border border-gray-700 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4 text-white">
                            Ready to Join Our Success Stories?
                        </h3>
                        <p className="text-gray-300 mb-6">
                            Let's discuss how we can help transform your business with our digital solutions
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full transition-all transform hover:scale-105 shadow-lg">
                                Start Your Project
                            </button>
                            <button className="px-8 py-3 backdrop-blur-md bg-black/30 border border-gray-700 hover:bg-black/50 rounded-full transition-all">
                                View Portfolio
                            </button>
                        </div>
                    </div>
                </div>
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
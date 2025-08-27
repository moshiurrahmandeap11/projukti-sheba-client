import React from 'react';
import { useNavigate } from 'react-router';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-purple-900/30" style={{ zIndex: 2 }} />
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Glassy Container */}
                    <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-white via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                                Digital Solution of Business
                            </span>
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Experience cutting-edge technology with our innovative solutions 
                            designed to transform your digital journey
                        </p>
                        
                        {/* Get In Touch Button */}
                        <div onClick={() => navigate("/contact")} className="flex justify-center">
                            <button className="group relative cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold px-10 py-4 rounded-full text-lg transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 border border-purple-500/30 backdrop-blur-sm overflow-hidden">
                                {/* Water fill animation */}
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                                
                                {/* Button glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
                                
                                {/* Button text */}
                                <span className="relative z-10 flex items-center space-x-2">
                                    <span>Get In Touch</span>
                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" style={{ zIndex: 2 }}></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s', zIndex: 2 }}></div>
            <div className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s', zIndex: 2 }}></div>
        </div>
    );
};

export default Banner;
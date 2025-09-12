import React, { useState } from 'react';
import { Share2, Tag, Calendar, User, Send, Heart } from 'lucide-react';
import FancyButton from '../../../comopnents/sharedItems/FancyButtons/FancyButton';

const TipForToday = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  // Dummy data for daily tips
  const tips = [
    {
      id: 1,
      title: 'Boost Your SEO with Long-Tail Keywords',
      tip: 'Focus on long-tail keywords to target niche audiences and improve your search rankings. Tools like Google Keyword Planner can help identify high-opportunity phrases.',
      author: 'Rashid Ahmed, CEO',
      date: 'August 21, 2025',
      category: 'SEO',
      image: '/api/placeholder/80/80',
    },
    {
      id: 2,
      title: 'Lead with Empathy in 2025',
      tip: 'Build stronger teams by practicing empathetic leadership. Listen actively and prioritize your team’s well-being to drive productivity.',
      author: 'Rashid Ahmed, CEO',
      date: 'August 20, 2025',
      category: 'Leadership',
      image: '/api/placeholder/80/80',
    },
  ];

  // Select the tip for today (first item for simplicity)
  const todayTip = tips[0];

  return (
    <section className="py-4 sm:py-6 bg-[#ECEEFC] md:py-8 px-4 sm:px-6 lg:px-8 backdrop-blur-lg relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0">
        {/* Wave Animation Background */}
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 md:h-48">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-[#ECEEFC] rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            <span className="text-black">Tip for Today</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Daily insights from our CEO to help you stay ahead in business and technology.
          </p>
        </div>

        {/* Tip Card */}
        <div className="backdrop-blur-lg rounded-3xl p-4 sm:p-6 md:p-8 border border-[rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_4px_30px_rgba(0,120,160,0.2)] hover:scale-[1.02]">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center">
            {/* Author Avatar */}
            <div className="flex-shrink-0">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[rgba(0,120,160,0.5)] p-1">
                <div className="w-full h-full rounded-full bg-[rgba(10,25,47,0.7)] flex items-center justify-center text-base sm:text-lg md:text-xl font-bold text-black">
                  {todayTip.author.charAt(0)}
                </div>
              </div>
            </div>

            {/* Tip Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 gap-x-2 sm:gap-x-3">
                <div className="flex items-center">
                  <Tag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-black" />
                  {todayTip.category}
                </div>
                <span className="mx-1 sm:mx-2">•</span>
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-black" />
                  {todayTip.date}
                </div>
                <span className="mx-1 sm:mx-2">•</span>
                <div className="flex items-center">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-black" />
                  {todayTip.author}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 sm:mb-3 hover:text-[rgba(0,120,160,0.8)] transition-colors duration-300">
                {todayTip.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                "{todayTip.tip}"
              </p>
              <FancyButton>
                <button className="inline-flex items-center space-x-2 text-xs sm:text-sm">
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Share Tip</span>
                </button>
              </FancyButton>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <div className="backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-[rgba(255,255,255,0.1)]">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4">
              Never Miss a Tip!
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 md:mb-6">
              Subscribe to receive our CEO’s daily tips directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 sm:px-4 py-2 backdrop-blur-md bg-transparent border-2 border-[rgba(0,120,160,0.5)] rounded-full text-gray-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(0,120,160,0.5)] w-full sm:w-auto"
              />
              <button
                className="group relative bg-[#ff0000]/60 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border border-[rgba(0,120,160,0.5)] backdrop-blur-sm overflow-hidden hover:bg-[#ff0000]/30 cursor-pointer transition-all duration-300"
                onClick={() => setIsSubscribed(!isSubscribed)}
              >
                <span className="relative z-10 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                  {isSubscribed ? (
                    <>
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Subscribe</span>
                    </>
                  )}
                </span>
                <div
                  className="absolute inset-0 bg-[#954cc9] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default TipForToday;
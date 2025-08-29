import React from 'react';
import { Share2, Tag, Calendar, User } from 'lucide-react';
import FancyButton from '../../../comopnents/sharedItems/FancyButtons/FancyButton';

const TipForToday = () => {
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[rgba(10,25,47,0.3)] backdrop-blur-lg relative overflow-hidden">
      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(135deg, rgba(10,25,47,0.5), rgba(50,40,130,0.4), rgba(0,120,160,0.3))', 
          zIndex: 0, 
          backdropFilter: 'blur(10px)' 
        }}
      >
        {/* Wave Animation Background */}
        <div className="absolute inset-x-0 bottom-0 h-48">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(0,120,160,0.7))'
              }}
            >
              Tip for Today
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Daily insights from our CEO to help you stay ahead in business and technology.
          </p>
        </div>

        {/* Tip Card */}
        <div className="backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-3xl p-8 border border-[rgba(255,255,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_4px_30px_rgba(0,120,160,0.2)] hover:scale-[1.02]">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Author Avatar */}
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[rgba(0,120,160,0.5)] p-1">
                <div className="w-full h-full rounded-full bg-[rgba(10,25,47,0.7)] flex items-center justify-center text-xl font-bold text-white">
                  {todayTip.author.charAt(0)}
                </div>
              </div>
            </div>

            {/* Tip Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start text-sm text-gray-400 mb-4">
                <Tag className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                {todayTip.category}
                <span className="mx-2">•</span>
                <Calendar className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                {todayTip.date}
                <span className="mx-2">•</span>
                <User className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                {todayTip.author}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-[rgba(0,120,160,0.8)] transition-colors duration-300">
                {todayTip.title}
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                "{todayTip.tip}"
              </p>
              <FancyButton>
                <button className="inline-flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share Tip</span>
                </button>
              </FancyButton>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-2xl p-6 border border-[rgba(255,255,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
            <h3 className="text-xl font-bold text-white mb-4">
              Never Miss a Tip!
            </h3>
            <p className="text-gray-300 mb-6">
              Subscribe to receive our CEO’s daily tips directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 backdrop-blur-md bg-[rgba(10,25,47,0.5)] border border-[rgba(255,255,255,0.1)] rounded-full text-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgba(0,120,160,0.5)]"
              />
              <FancyButton>
                <span>Subscribe</span>
              </FancyButton>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Wave Animation */
        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230078a0' fill-opacity='0.3' d='M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,181.3C672,160,768,128,864,133.3C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
          background-size: cover;
          animation: wave 10s linear infinite;
        }

        .wave1 {
          animation-delay: 0s;
          opacity: 0.3;
        }

        .wave2 {
          animation-delay: -2s;
          opacity: 0.2;
          background-position: 100px 0;
        }

        .wave3 {
          animation-delay: -4s;
          opacity: 0.1;
          background-position: 200px 0;
        }

        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1440px);
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 640px) {
          .wave {
            height: 80px;
          }
        }
      `}</style>
    </section>
  );
};

export default TipForToday;
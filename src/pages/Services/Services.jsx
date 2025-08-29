import React, { useState, useEffect, useRef } from 'react';
import { Code, Globe, Video, Megaphone, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import FancyButton from '../../comopnents/sharedItems/FancyButtons/FancyButton';

const Services = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Icon mapping for categories
  const iconMap = {
    'Software': Code,
    'Websites': Globe,
    'Video Editing': Video,
    'Social Ads Campaign': Megaphone,
  };

  // Fetch categories and services
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const categoriesRes = await axios.get('https://projukti-sheba-server.onrender.com/categories');
        const categoriesData = Array.isArray(categoriesRes.data.data) ? categoriesRes.data.data : [];
        if (!categoriesData.length) {
          toast.warn('No categories found');
        }
        setCategories(categoriesData);

        const servicesRes = await axios.get('https://projukti-sheba-server.onrender.com/services');
        const servicesData = Array.isArray(servicesRes.data.data) ? servicesRes.data.data : [];
        if (!servicesData.length) {
          toast.warn('No services found');
        }
        setServices(servicesData);

        if (categoriesData.length > 0) {
          setActiveTab(categoriesData[0].name);
        }
      } catch {
        setError('Failed to load services or categories');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 60;
    const maxDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15;
            ctx.strokeStyle = `rgba(0,120,160, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        ctx.fillStyle = 'rgba(0,120,160,0.4)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = 'rgba(0,120,160,0.6)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Filter services by active category
  const activeServices = services.filter((service) => service.category === activeTab);

  // Get icon for active category
  const getCategoryIcon = (categoryName) => iconMap[categoryName] || Code;

  return (
    <div className="relative min-h-screen bg-[rgba(10,25,47,0.3)] backdrop-blur-lg py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50"
        style={{ zIndex: 1 }}
      />

      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(135deg, rgba(10,25,47,0.5), rgba(50,40,130,0.4), rgba(0,120,160,0.3))', 
          zIndex: 2, 
          backdropFilter: 'blur(10px)' 
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(0,120,160,0.7))'
              }}
            >
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive technology solutions to help your business thrive in the digital world
          </p>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center text-white text-xl">
            <Loader2 className="animate-spin inline-block mr-2" size={24} />
            Loading services...
          </div>
        )}
        {error && (
          <div className="text-center text-red-400 text-xl">
            {error}
          </div>
        )}
        {!loading && !error && categories.length === 0 && (
          <div className="text-center text-gray-400 text-xl">
            No categories available
          </div>
        )}

        {/* Service Tabs */}
        {!loading && !error && categories.length > 0 && (
          <div className="backdrop-blur-xl bg-[rgba(10,25,47,0.5)] rounded-3xl border border-[rgba(255,255,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.2)] overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-[rgba(255,255,255,0.1)] p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category, index) => {
                  const TabIcon = getCategoryIcon(category.name);
                  return (
                    <button
                      key={category._id}
                      onClick={() => setActiveTab(category.name)}
                      className={`group relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-500 transform hover:scale-105 backdrop-blur-sm ${
                        activeTab === category.name
                          ? 'bg-[rgba(0,120,160,0.3)] border border-[rgba(0,120,160,0.5)] shadow-lg scale-105'
                          : 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,120,160,0.5)]'
                      }`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: activeTab === category.name ? 'pulse 2s infinite' : 'none',
                      }}
                      aria-label={`Select ${category.name} services`}
                    >
                      <TabIcon
                        className={`w-6 h-6 mb-2 transition-all duration-500 transform ${
                          activeTab === category.name
                            ? 'text-white scale-110 rotate-12'
                            : 'text-gray-400 group-hover:text-[rgba(0,120,160,1)] group-hover:scale-110'
                        }`}
                      />
                      <span
                        className={`text-sm font-semibold transition-all duration-500 ${
                          activeTab === category.name ? 'text-white' : 'text-gray-400 group-hover:text-[rgba(0,120,160,1)]'
                        }`}
                      >
                        {category.name}
                      </span>
                      {activeTab === category.name && (
                        <div
                          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full animate-pulse"
                          style={{ background: 'linear-gradient(90deg, rgba(0,120,160,0.7), rgba(50,40,130,0.7))' }}
                        />
                      )}
                      <div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: 'linear-gradient(90deg, rgba(0,120,160,0.2), rgba(50,40,130,0.2))',
                          opacity: 0,
                          transition: 'opacity 300ms',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.1)}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8 md:p-12">
              {activeServices.length === 0 ? (
                <div className="text-center text-gray-400 text-xl">
                  No services available for {activeTab}
                </div>
              ) : (
                activeServices.map((service) => (
                  <div key={service._id} className="grid lg:grid-cols-2 gap-12 items-center mb-12 animate-fadeInLeft">
                    {/* Left Content */}
                    <div className="space-y-8">
                      <div className="flex items-center space-x-4">
                        <div
                          className="rounded-xl p-3 shadow-[0_2px_10px_rgba(0,0,0,0.2)] backdrop-blur-sm animate-bounce"
                          style={{ background: 'linear-gradient(90deg, rgba(0,120,160,0.5), rgba(50,40,130,0.5))' }}
                        >
                          {React.createElement(getCategoryIcon(activeTab), { className: 'w-8 h-8 text-white' })}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white">{service.title}</h3>
                      </div>
                      <p className="text-lg text-gray-300 leading-relaxed">{service.paragraph}</p>
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-white mb-4">Key Features:</h4>
                        <div className="grid gap-3">
                          {service.keyFeatures &&
                            service.keyFeatures.map((feature, fIndex) => (
                              <div
                                key={fIndex}
                                className="flex font-medium items-center space-x-3 opacity-0 animate-fadeInUp"
                                style={{
                                  animationDelay: `${fIndex * 0.1}s`,
                                  animationFillMode: 'forwards',
                                }}
                              >
                                <CheckCircle className="w-5 h-5 text-[rgba(0,120,160,1)] flex-shrink-0 animate-pulse" />
                                <span className="text-gray-300">{feature}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="pt-6">
                        <FancyButton
                          onClick={() => navigate('/contact')}
                        >
                          Get Started
                        </FancyButton>
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="space-y-8 animate-fadeInRight">
                      <div className="backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-2xl border border-[rgba(255,255,255,0.1)] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
                        <h4 className="text-2xl font-semibold text-white mb-6">Technologies We Use</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {service.technologies &&
                            service.technologies.map((tech, tIndex) => (
                              <div
                                key={tIndex}
                                className="rounded-lg px-4 py-3 border border-[rgba(255,255,255,0.1)] backdrop-blur-sm hover:border-[rgba(0,120,160,0.5)] transition-all duration-300 text-white hover:scale-105"
                              >
                                <span className="font-medium text-sm">{tech}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-xl border border-[rgba(255,255,255,0.1)] p-4 hover:scale-105 transition-transform duration-300 hover:border-[rgba(0,120,160,0.5)]">
                          <div className="text-2xl md:text-3xl font-bold text-white mb-1 animate-pulse">
                            {service.totalProjects || '0'} +
                          </div>
                          <div className="text-sm text-gray-400">Projects</div>
                        </div>
                        <div className="text-center backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-xl border border-[rgba(255,255,255,0.1)] p-4 hover:scale-105 transition-transform duration-300 hover:border-[rgba(0,120,160,0.5)]">
                          <div className="text-2xl md:text-3xl font-bold text-white mb-1 animate-pulse">
                            24/7
                          </div>
                          <div className="text-sm text-gray-400">Support</div>
                        </div>
                        <div className="text-center backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-xl border border-[rgba(255,255,255,0.1)] p-4 hover:scale-105 transition-transform duration-300 hover:border-[rgba(0,120,160,0.5)]">
                          <div className="text-2xl md:text-3xl font-bold text-white mb-1 animate-pulse">
                            99%
                          </div>
                          <div className="text-sm text-gray-400">Satisfaction</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Custom CSS Animations */}
        <style jsx>{`
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeInLeft {
            animation: fadeInLeft 0.8s ease-out;
          }

          .animate-fadeInRight {
            animation: fadeInRight 0.8s ease-out;
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Services;
import React, { useState, useEffect } from 'react';
import { Code, Globe, Video, Megaphone, CheckCircle, Loader2 } from 'lucide-react';
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

  const handleGetStartedClick = () => {
    navigate('/contact');
  }

  // Filter services by active category
  const activeServices = services.filter((service) => service.category === activeTab);

  // Get icon for active category
  const getCategoryIcon = (categoryName) => iconMap[categoryName] || Code;

  return (
    <div className="relative min-h-screen py-4 bg-[#F9F9F9] pt-20 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-7xl mx-auto bg-[#F9F9F9] p-4 sm:p-6 md:p-8 rounded-2xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            <span className="text-black">Our Services</span>
          </h2>
          <p className="text-base sm:text-base md:text-base text-black/90 max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive technology solutions to help your business thrive in the digital world
          </p>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center text-white text-base sm:text-lg mt-6">
            <Loader2 className="animate-spin inline-block mr-2" size={20} />
            Loading services...
          </div>
        )}
        {error && (
          <div className="text-center text-red-400 text-base sm:text-lg mt-6">{error}</div>
        )}
        {!loading && !error && categories.length === 0 && (
          <div className="text-center text-red-400 text-base sm:text-lg mt-6">
            No categories available
          </div>
        )}

        {/* Service Tabs */}
        {!loading && !error && categories.length > 0 && (
          <div className="backdrop-blur-xl rounded-3xl border border-[rgba(255,255,255,0.1)] overflow-hidden">
            {/* Tab Navigation */}
            <div className=" p-4 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {categories.map((category) => {
                  return (
                    <button
                      key={category._id}
                      onClick={() => setActiveTab(category.name)}
                      className={`group relative overflow-hidden flex flex-col items-center justify-center p-3 sm:p-4 transition-all duration-500 transform cursor-pointer  ${
                        activeTab === category.name
                          ? 'bg-red-500 '
                          : 'bg-red-300 '
                      }`}
                      aria-label={`Select ${category.name} services`}
                    >
        

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center">
                        <span
                          className={`text-xs sm:text-sm font-medium transition-all duration-500 ${
                            activeTab === category.name ? 'text-white' : 'text-white group-hover:text-white'
                          }`}
                        >
                          {category.name}
                        </span>
                      </div>

                      {activeTab === category.name && (
                        <div
                          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full animate-pulse"
                          style={{ background: 'linear-gradient(90deg, rgba(0,120,160,0.8), rgba(50,40,130,0.8))' }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
              {activeServices.length === 0 ? (
                <div className="text-center text-red-500 text-base sm:text-lg">
                  No services available for {activeTab}
                </div>
              ) : (
                activeServices.map((service) => (
                  <div key={service._id} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start mb-8 sm:mb-10 lg:mb-12 animate-fadeInLeft">
                    {/* Left Content */}
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div
                          className="rounded-xl bg-red-400/70 p-2 sm:p-3 shadow-[0_2px_10px_rgba(0,0,0,0.2)] backdrop-blur-sm animate-bounce"
                        >
                          {React.createElement(getCategoryIcon(activeTab), { className: 'w-6 h-6 sm:w-8 sm:h-8 text-white' })}
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black">{service.title}</h3>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-black leading-relaxed">{service.paragraph}</p>
                      <div className="space-y-3 sm:space-y-4">
                        <h4 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-3">Key Features:</h4>
                        <div className="grid gap-2 sm:gap-3">
                          {service.keyFeatures &&
                            service.keyFeatures.map((feature, fIndex) => (
                              <div
                                key={fIndex}
                                className="flex font-medium items-center space-x-2 sm:space-x-3 opacity-0 animate-fadeInUp"
                                style={{
                                  animationDelay: `${fIndex * 0.1}s`,
                                  animationFillMode: 'forwards',
                                }}
                              >
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[rgba(0,120,160,1)] flex-shrink-0 animate-pulse" />
                                <span className="text-sm sm:text-base text-black">{feature}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="pt-4 sm:pt-6">
                        <button
                          onClick={handleGetStartedClick}
                          className="relative group bg-red-700 rounded-md px-4 sm:px-6 py-2 sm:py-3  cursor-pointer text-white text-sm sm:text-base font-medium overflow-hidden"
                        >
                          <span className="relative z-10">Get Started</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="space-y-4 sm:space-y-6 animate-fadeInRight">
                      <div className="backdrop-blur-lg rounded-2xl  p-4 sm:p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-black mb-4 sm:mb-6">Technologies We Use</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                          {service.technologies &&
                            service.technologies.map((tech, tIndex) => (
                              <button
                                key={tIndex}
                                className="group bg-red-400/70 relative overflow-hidden rounded-lg px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm transition-all duration-500 transform "
                              >
          
                                {/* Content */}
                                <span className="relative z-10 font-medium text-xs sm:text-sm text-white group-hover:text-white">
                                  {tech}
                                </span>
                              </button>
                            ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 sm:gap-4">
                        <div className="text-center backdrop-blur-lg rounded-xl  p-3 sm:p-4 hover:scale-105 transition-transform duration-300">
                          <div className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-1 animate-pulse">
                            {service.totalProjects || '0'} +
                          </div>
                          <div className="text-xs sm:text-sm text-gray-800">Projects</div>
                        </div>
                        <div className="text-center backdrop-blur-lg rounded-xl  p-3 sm:p-4 hover:scale-105 transition-transform duration-300">
                          <div className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-1 animate-pulse">
                            24/7
                          </div>
                          <div className="text-xs sm:text-sm text-gray-800">Support</div>
                        </div>
                        <div className="text-center backdrop-blur-lg rounded-xl  p-3 sm:p-4 hover:scale-105 transition-transform duration-300">
                          <div className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-1 animate-pulse">
                            99%
                          </div>
                          <div className="text-xs sm:text-sm text-gray-800">Satisfaction</div>
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
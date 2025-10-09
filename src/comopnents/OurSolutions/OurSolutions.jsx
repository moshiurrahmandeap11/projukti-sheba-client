import React, { useState, useEffect } from 'react';
import FancyButton from '../sharedItems/FancyButtons/FancyButton';
import { BarChart3, BookOpen, Boxes, Building2, Bus, Car, DollarSign, GraduationCap, Home, Hotel, LayoutGrid, MessageCircle, MessageSquareText, MonitorSmartphone, Newspaper, PenLine, Plane, Repeat, School, ShoppingCart, Smartphone, UserCircle2, Users, Utensils, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';
import axiosInstance from '../../hooks/AxiosInstance/AxiosInstance';


const OurSolutions = () => {
    const [activeTab, setActiveTab] = useState('ERP Solutions');
    const [solutions, setSolutions] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const tabs = ['ERP Solutions', 'E-commerce', 'Restaurant', 'School', 'Blog', 'Travel Agency', 'Real Estate', 'Others'];

    const iconComponents = {
        BarChart3, BookOpen, Boxes, Building2, Bus, Car, DollarSign,
        GraduationCap, Home, Hotel, LayoutGrid, MessageCircle,
        MessageSquareText, MonitorSmartphone, Newspaper, PenLine,
        Plane, Repeat, School, ShoppingCart, Smartphone,
        UserCircle2, Users, Utensils
    };

    // Fetch solutions from API
    const fetchSolutions = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/our-solutions');
            if (response.data.success) {
                const solutionsData = {};
                response.data.data.forEach(item => {
                    solutionsData[item.category] = item.solutions;
                });
                setSolutions(solutionsData);
            } else {
                setSolutions({});
            }
        } catch (error) {
            console.error('Error fetching solutions:', error);
            setSolutions({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSolutions();
    }, []);

    console.log(solutions);

const handleSolutionClick = (solution) => {
  if (!solution.link) return;

  // External link checker → now detects fb.com, www.fb.com, etc.
  const isExternal = /^(https?:\/\/|www\.|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i.test(solution.link);

  if (isExternal) {
    // যদি http/https না থাকে, তাহলে prefix যোগ কর
    const url = solution.link.startsWith('http')
      ? solution.link
      : `https://${solution.link}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    navigate(solution.link);
  }
};



    if (loading) {
        return (
            <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-12"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="bg-gray-200 rounded-xl p-4 sm:p-5 h-32"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-black mb-6 tracking-wide">
                        Our Solutions
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We provide a time-worthy business solution to every type of business. 
                        Find out your one and level up your success stairs.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 sm:px-6 cursor-pointer py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                                activeTab === tab
                                    ? 'bg-white text-red-600 font-medium shadow-lg transform scale-105'
                                    : 'bg-white text-black'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Solutions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {solutions[activeTab] && solutions[activeTab].length > 0 ? (
                        solutions[activeTab].map((solution, index) => {
                            const IconComponent = iconComponents[solution.icon] || BarChart3;
                            
                            return (
                                <div
                                    key={solution.id}
                                    onClick={() => handleSolutionClick(solution)}
                                    className={`${solution.bgColor} rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-102 group cursor-pointer border border-white/50`}
                                    style={{
                                        animationDelay: `${index * 100}ms`
                                    }}
                                >
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        {/* Icon */}
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:shadow-md transition-all duration-300 border border-gray-100">
                                                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                                            </div>
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors duration-300 line-clamp-1">
                                                {solution.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-600 leading-snug group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                                                {solution.subtitle}
                                            </p>
                                            {solution.link && (
                                                <div className="flex items-center gap-1 mt-2 text-xs text-blue-600">
                                                    <ExternalLink className="w-3 h-3" />
                                                    <span>Learn more</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Arrow Icon */}
                                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-3 text-center py-12">
                            <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-500 text-lg">No solutions available for {activeTab}</p>
                            <p className="text-gray-400 text-sm mt-2">Please check back later or contact us for more information</p>
                        </div>
                    )}
                </div>

                {/* Bottom CTA */}
                <div onClick={() => navigate("/explore-all-solutions")} className="text-center mt-12">
                    <FancyButton>
                        Explore All Solutions
                        <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </FancyButton>
                </div>
            </div>
        </div>
    );
};

export default OurSolutions;
import React, { useState } from 'react';
import FancyButton from '../sharedItems/FancyButtons/FancyButton';

const OurSolutions = () => {
    const [activeTab, setActiveTab] = useState('ERP Software');
    
    const tabs = ['ERP Software', 'E-commerce', 'Restaurant', 'School', 'Blog', 'Healthcare', 'Travel Agency', 'Real Estate', 'Others'];
    
    const solutions = {
        'ERP Software': [
            {
                id: 1,
                icon: '📊',
                title: 'Business ERP',
                subtitle: 'Complete Enterprise Resource Planning solution for business management',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '👥',
                title: 'HR Management',
                subtitle: 'Human Resource Management System with payroll and attendance',
                bgColor: 'bg-gray-50'
            },
            {
                id: 3,
                icon: '📦',
                title: 'Inventory System',
                subtitle: 'Advanced inventory control and stock management system',
                bgColor: 'bg-gray-100'
            }
        ],
        'E-commerce': [
            {
                id: 1,
                icon: '🛒',
                title: 'Online Store',
                subtitle: 'Complete E-commerce platform with payment gateway integration',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '📱',
                title: 'Mobile Commerce',
                subtitle: 'Mobile-first shopping experience with app-like features',
                bgColor: 'bg-gray-50'
            },
            {
                id: 3,
                icon: '🔄',
                title: 'Multi-vendor',
                subtitle: 'Marketplace platform for multiple sellers and vendors',
                bgColor: 'bg-gray-100'
            }
        ],
        'Restaurant': [
            {
                id: 1,
                icon: '🍽️',
                title: 'Restaurant POS',
                subtitle: 'Point of Sale system with table management and billing',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '📱',
                title: 'Online Ordering',
                subtitle: 'Food delivery and online ordering system for restaurants',
                bgColor: 'bg-gray-50'
            },
            {
                id: 3,
                icon: '🍴',
                title: 'Kitchen Display',
                subtitle: 'Kitchen management system for order processing',
                bgColor: 'bg-gray-100'
            }
        ],
        'School': [
            {
                id: 1,
                icon: '🏫',
                title: 'School Management',
                subtitle: 'Complete school administration and student management system',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '📚',
                title: 'Learning Management',
                subtitle: 'Online learning platform with course management',
                bgColor: 'bg-gray-50'
            },
            {
                id: 3,
                icon: '🎓',
                title: 'Student Portal',
                subtitle: 'Student information system and academic portal',
                bgColor: 'bg-gray-100'
            }
        ],
        'Blog': [
            {
                id: 1,
                icon: '✍️',
                title: 'Blog Platform',
                subtitle: 'Content management system for bloggers and writers',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '📰',
                title: 'News Portal',
                subtitle: 'News website with article management and publishing',
                bgColor: 'bg-gray-50'
            },
            {
                id: 3,
                icon: '💬',
                title: 'Content Management',
                subtitle: 'Advanced CMS for media and content publishing',
                bgColor: 'bg-gray-100'
            }
        ],
        'Healthcare': [
            {
                id: 1,
                icon: '🏥',
                title: 'Hospital Management',
                subtitle: 'Complete hospital information management system',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '📋',
                title: 'Patient Management',
                subtitle: 'Patient records and appointment management system',
                bgColor: 'bg-gray-50'
            },
            {
                id: 3,
                icon: '💊',
                title: 'Pharmacy System',
                subtitle: 'Pharmacy management and medicine inventory system',
                bgColor: 'bg-gray-100'
            }
        ],
        'Travel Agency': [
            {
                id: 1,
                icon: '✈️',
                title: 'Flight Booking',
                subtitle: 'Flight reservation and booking management system',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '🏨',
                title: 'Hotel Booking',
                subtitle: 'Hotel reservation and accommodation booking platform',
                bgColor: 'bg-gray-50'
            },
            {
                id: 3,
                icon: '🚌',
                title: 'Tour Package',
                subtitle: 'Tour package management and booking system',
                bgColor: 'bg-gray-100'
            }
        ],
        'Real Estate': [
            {
                id: 1,
                icon: '🏠',
                title: 'Property Listing',
                subtitle: 'Real estate property listing and management system',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '📱',
                title: 'Agent Portal',
                subtitle: 'Real estate agent management and client portal',
                bgColor: 'bg-gray-50'
            },
            {
                id: 3,
                icon: '💰',
                title: 'Property Management',
                subtitle: 'Rental and property management system for landlords',
                bgColor: 'bg-gray-100'
            }
        ],
        'Others': [
            {
                id: 1,
                icon: '🚗',
                title: 'Vehicle Management',
                subtitle: 'Fleet and vehicle management system for transportation',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '🏢',
                title: 'Garage System',
                subtitle: 'Garage and workshop management software',
                bgColor: 'bg-gray-50'
            },
            {
                id: 3,
                icon: '💬',
                title: 'Live Chat',
                subtitle: 'Business live chat and customer support software',
                bgColor: 'bg-gray-100'
            }
        ]
    };

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
                    {solutions[activeTab].map((solution, index) => (
                        <div
                            key={solution.id}
                            className={`${solution.bgColor} rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-102 group cursor-pointer border border-white/50`}
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:shadow-md transition-all duration-300 border border-gray-100">
                                        {solution.icon}
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
                                </div>
                                
                                {/* Arrow Icon */}
                                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
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
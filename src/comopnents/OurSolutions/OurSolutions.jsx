import React, { useState } from 'react';
import FancyButton from '../sharedItems/FancyButtons/FancyButton';

const OurSolutions = () => {
    const [activeTab, setActiveTab] = useState('Business');
    
    const tabs = ['Business', 'Blockchain', 'Hospitality', 'E-Commerce', 'Healthcare'];
    
    const solutions = {
        Business: [
            {
                id: 1,
                icon: '📊',
                title: 'ERP',
                subtitle: 'Business ERP Solution / Product / Shop / Company Management',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '👥',
                title: 'HR Manager',
                subtitle: 'Human Resource Management System HR Software (HRMS)',
                bgColor: 'bg-gray-50'
            },
            {
                id: 3,
                icon: '📦',
                title: 'Wholesale',
                subtitle: 'Inventory Control and Inventory Management System',
                bgColor: 'bg-gray-100'
            },
            {
                id: 4,
                icon: '✈️',
                title: 'Flight Booking',
                subtitle: 'Flight Booking Software',
                bgColor: 'bg-gray-50'
            },
            {
                id: 5,
                icon: '🚗',
                title: 'VMS',
                subtitle: 'Vehicle Management System',
                bgColor: 'bg-gray-100'
            },
            {
                id: 6,
                icon: '🏢',
                title: 'GMS',
                subtitle: 'Garage Management Software',
                bgColor: 'bg-gray-100'
            },
            {
                id: 7,
                icon: '💬',
                title: 'Innue',
                subtitle: 'Business Live Chat Software',
                bgColor: 'bg-gray-100'
            },
            {
                id: 8,
                icon: '🚌',
                title: 'Bus365',
                subtitle: 'Bus Reservation System',
                bgColor: 'bg-gray-50'
            },
            {
                id: 9,
                icon: '📚',
                title: 'Edutask',
                subtitle: 'Online Course Selling Marketplace',
                bgColor: 'bg-gray-100'
            }
        ],
        Blockchain: [
            {
                id: 1,
                icon: '🔗',
                title: 'Smart Contracts',
                subtitle: 'Automated blockchain-based contract solutions',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '💰',
                title: 'DeFi Platform',
                subtitle: 'Decentralized Finance Management System',
                bgColor: 'bg-gray-100'
            },
            {
                id: 3,
                icon: '🎨',
                title: 'NFT Marketplace',
                subtitle: 'Non-Fungible Token Trading Platform',
                bgColor: 'bg-gray-100'
            }
        ],
        Hospitality: [
            {
                id: 1,
                icon: '🏨',
                title: 'Hotel Management',
                subtitle: 'Complete Hotel Booking and Management System',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '🍽️',
                title: 'Restaurant POS',
                subtitle: 'Point of Sale System for Restaurants',
                bgColor: 'bg-gray-100'
            },
            {
                id: 3,
                icon: '🎉',
                title: 'Event Management',
                subtitle: 'Event Planning and Management Platform',
                bgColor: 'bg-gray-100'
            }
        ],
        'E-Commerce': [
            {
                id: 1,
                icon: '🛒',
                title: 'Online Store',
                subtitle: 'Complete E-commerce Solution with Payment Gateway',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '📱',
                title: 'Mobile Commerce',
                subtitle: 'Mobile App for E-commerce Business',
                bgColor: 'bg-gray-100'
            },
            {
                id: 3,
                icon: '🔄',
                title: 'Marketplace',
                subtitle: 'Multi-vendor E-commerce Marketplace',
                bgColor: 'bg-gray-100'
            }
        ],
        Healthcare: [
            {
                id: 1,
                icon: '🏥',
                title: 'Hospital Management',
                subtitle: 'Complete Hospital Information Management System',
                bgColor: 'bg-gray-100'
            },
            {
                id: 2,
                icon: '📋',
                title: 'Patient Portal',
                subtitle: 'Online Patient Registration and Appointment System',
                bgColor: 'bg-100-100'
            },
            {
                id: 3,
                icon: '💊',
                title: 'Pharmacy System',
                subtitle: 'Pharmacy Management and Inventory System',
                bgColor: 'bg-gray-100'
            }
        ]
    };

    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        <span className="text-black">Our Solutions</span>
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
                            className={`px-6 sm:px-6 cursor-pointer py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
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
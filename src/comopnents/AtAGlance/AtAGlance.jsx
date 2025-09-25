import React, { useState, useEffect } from 'react';

const AtAGlance = () => {
    const [counters, setCounters] = useState({
        projects: 0,
        experts: 0,
        countries: 0,
        clients: 0,
        experience: 0
    });

    const stats = [
        {
            id: 'projects',
            icon: '📊',
            target: 10,
            label: 'Projects',
            suffix: '+'
        },
        {
            id: 'experts',
            icon: '👥',
            target: 15,
            label: 'Experts',
            suffix: '+'
        },
        {
            id: 'countries',
            icon: '🌍',
            target: 7,
            label: 'Countries',
            suffix: '+'
        },
        {
            id: 'clients',
            icon: '😊',
            target: 2,
            label: 'Happy Clients',
            suffix: 'K+'
        },
        {
            id: 'experience',
            icon: '⭐',
            target: 5,
            label: 'Years Experienced',
            suffix: '+'
        }
    ];

    useEffect(() => {
        const animateCounters = () => {
            stats.forEach((stat) => {
                let start = 0;
                const increment = stat.target / 50;
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= stat.target) {
                        setCounters(prev => ({ ...prev, [stat.id]: stat.target }));
                        clearInterval(timer);
                    } else {
                        setCounters(prev => ({ ...prev, [stat.id]: Math.floor(start) }));
                    }
                }, 40);
            });
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    animateCounters();
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        const section = document.getElementById('at-a-glance');
        if (section) {
            observer.observe(section);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div 
            id="at-a-glance" 
            className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16">
                    <p className="text-sm sm:text-base text-gray-600 font-medium mb-2 uppercase tracking-wider">
                        Projuktisheba, Inc.
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                        <span className="bg-black bg-clip-text text-transparent">
                            At a Glance
                        </span>
                    </h2>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.id}
                            className="group bg-white rounded-lg p-6 sm:p-8 text-center shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100 aspect-square flex flex-col justify-center items-center"
                            style={{
                                animationDelay: `${index * 150}ms`
                            }}
                        >
                            {/* Icon */}
                            <div className="mb-3 sm:mb-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-lg flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <div className="text-white">
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>

                            {/* Counter */}
                            <div className="mb-1 sm:mb-2">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                                    {counters[stat.id]}{stat.suffix}
                                </span>
                            </div>

                            {/* Label */}
                            <p className="text-xs sm:text-sm text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">
                                {stat.label}
                            </p>

                            {/* Decorative Line */}
                            <div className="mt-2 w-8 h-0.5 bg-red-400 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* Bottom Text */}
                <div className="text-center mt-12 sm:mt-16">
                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        With our proven track record and dedicated expertise, we continue to deliver 
                        exceptional results that drive business growth and customer satisfaction worldwide.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AtAGlance;
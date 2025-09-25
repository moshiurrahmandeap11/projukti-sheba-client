import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const Industry = ({ className = '' }) => {
    const industries = useMemo(
        () => [
            { name: 'FinTech', icon: '💰' },
            { name: 'Healthcare', icon: '🏥' },
            { name: 'E-Commerce', icon: '🛍️' },
            { name: 'Automotive', icon: '🚘' },
            { name: 'Education', icon: '🏫' },
            { name: 'Real-Estate', icon: '🏡' },
            { name: 'Hospitality', icon: '🏨' },
            { name: 'RMG', icon: '👗' },
            { name: 'Pharmacy', icon: '💊' },
            { name: 'Aviation', icon: '✈️' },
            { name: 'UI/Ux', icon: '🎨' },
            { name: 'Many More', icon: '➕' },
        ],
        []
    );

    if (!industries || industries.length === 0) {
        return <div className="text-center py-12 text-gray-600">No industries available.</div>;
    }

    return (
        <div className={`bg-gray-50 ${className}`}>
            <div className="py-12 px-4 text-center max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-black">
                    Industry We Serve
                </h2>
                <p className="mt-2 text-gray-600">Bridge Your Business with the Virtual World</p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {industries.map((industry, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-shadow duration-300 relative group"
                        >
                            <span className="text-3xl mb-2 group-hover:text-teal-600 transition-colors duration-300">
                                {industry.icon}
                            </span>
                            <p className="text-gray-800 font-medium z-10 relative">{industry.name}</p>
                            <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full bg-red-200 opacity-75 transition-all duration-300 ease-in-out rounded-lg z-0"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

Industry.propTypes = {
    className: PropTypes.string,
};

Industry.defaultProps = {
    className: '',
};

export default Industry;
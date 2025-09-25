import React from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

const Demand = ({ className = '' }) => {
    const navigate = useNavigate();

    const services = [
        { name: 'Software Development', icon: '💻', description: 'We can develop any kind of software solution to automate your business operations according to your requirements. Our strength is to develop customized software.' },
        { name: 'Website Development', icon: '🌐', description: 'A website can represent your business identity we can develop it according to the motive of your business.' },
        { name: 'Mobile App Development', icon: '📱', description: 'Bdtask develops both Android and iOS application to make your business operation more Convenient and flexible.' },
        { name: 'E-Commerce', icon: '🛒', description: 'We have readymade eCommerce software solutions as well as develop the eCommerce solution based on your demand.' },
        { name: 'Blogging Platform', icon: '✍️', description: 'We can develop an SEO-friendly content management system to publish blogs, articles, online news, and so on.' },
        { name: 'Custom Software Development', icon: '🔧', description: '' },
    ];

    const handleSubmitClick = () => {
        navigate('/submit-request');
    };

    return (
        <div className={`bg-gray-50 py-12 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-black">Share Your Demand to Design Any Customized Software</h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Projukti Sheba focuses on the exact requirements of the clients. We design and develop the best and most advanced software for all types of businesses.
                </p>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center aspect-[4/3] hover:shadow-lg transition-shadow duration-300 relative group"
                        >
                            <span className="text-4xl mb-4 group-hover:text-teal-600 transition-colors duration-300">
                                {service.icon}
                            </span>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                            <p className="text-gray-600 text-center z-10 relative">{service.description}</p>
                            {service.name === 'Custom Software Development' && (
                                <button
                                    onClick={handleSubmitClick}
                                    className="mt-4 bg-red-700 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
                                >
                                    Submit Request
                                </button>
                            )}
                            <div className="absolute bottom-0 cursor-pointer left-0 w-full h-0 group-hover:h-full bg-red-200 opacity-75 transition-all duration-300 ease-in-out rounded-lg z-0"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

Demand.propTypes = {
    className: PropTypes.string,
};

Demand.defaultProps = {
    className: '',
};

export default Demand;
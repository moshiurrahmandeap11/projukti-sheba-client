import React from 'react';

const About2 = () => {
    return (
        <div className=" bg-white py-2 lg:py-2">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 lg:mb-32 place-items-center">

                    {/* Stat 1 */}
                    <div>
                        <div className="text-sm text-gray-500 mb-1">01</div>
                        <div className="text-lg text-gray-700 mb-2">Our Products</div>
                        <div className="text-3xl lg:text-4xl font-bold text-gray-900">50+</div>
                    </div>
                    
                    {/* Stat 3 */}
                    <div>
                        <div className="text-sm text-gray-500 mb-1">03</div>
                        <div className="text-lg text-gray-700 mb-2">Years of Service</div>
                        <div className="text-3xl lg:text-4xl font-bold text-gray-900">4+</div>
                    </div>
                    
                    {/* Stat 2 */}
                    <div>
                        <div className="text-sm text-gray-500 mb-1">02</div>
                        <div className="text-lg text-gray-700 mb-2">Team Members</div>
                        <div className="text-3xl lg:text-4xl font-bold text-gray-900">15+</div>
                    </div>
                    
                    {/* Stat 4 */}
                    <div>
                        <div className="text-sm text-gray-500 mb-1">04</div>
                        <div className="text-lg text-gray-700 mb-2">Service Satisfaction</div>
                        <div className="text-3xl lg:text-4xl font-bold text-gray-900">99%</div>
                    </div>
                </div>

                {/* Specialty Section */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div className="text-sm text-gray-500 tracking-widest uppercase">our Specialty</div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Building Tech<br />
                            That Accelerates<br />
                            Your Business
                        </h2>
                    </div>

                    {/* Right Content */}
                    <div className="space-y-6">
                        <div className="h-1 w-12 bg-gray-300"></div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We deliver scalable, secure software using modern frameworks and agile practices to help you innovate faster and optimize operations.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About2;
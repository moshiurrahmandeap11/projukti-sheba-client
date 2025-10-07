import React from 'react';

const About4 = () => {
    return (
        <div className="min-h-screen bg-white py-2 lg:py-2">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16 lg:mb-24">
                    <h1 className="text-sm tracking-widest text-gray-500 mb-4">
                        H O W  W E  D E L I V E R  E X E L L E N C E
                    </h1>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                        Commitment to Quality and Success
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We ensure excellence at every stage, from discovery to delivery, through precision, transparency, and a deep commitment to lasting client success.
                    </p>
                </div>

                {/* Points Section */}
                <div className="space-y-16 lg:space-y-20">
                    {/* Point 1 */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                        <div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">1.User-Focused Solutions</h3>
                        </div>
                        <div className="space-y-4">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We create intuitive digital solutions by deeply understanding user needs through research and testing. Our human-centered design approach ensures seamless experiences that align with real-world expectations.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                By continuously integrating feedback throughout development, we minimize risk and maximize adoption, delivering solutions that are both impactful and user-driven.
                            </p>
                        </div>
                    </div>

                    {/* Point 2 */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                        <div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">2.Agile, Timely Delivery</h3>
                        </div>
                        <div className="space-y-4">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our agile approach adapts quickly to changing requirements while maintaining quality and clear communication.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We emphasize disciplined planning and risk management to consistently meet deadlines. Timely delivery helps you accelerate time-to-market and maintain a competitive edge while achieving optimal results.
                            </p>
                        </div>
                    </div>

                    {/* Point 3 */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                        <div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">3.Skilled and Collaborative Team</h3>
                        </div>
                        <div className="space-y-4">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our diverse experts solve challenges from multiple perspectives, delivering practical and innovative solutions.



We stay ahead by anticipating emerging trends and continuously updating our skills, ensuring solutions that are scalable, future-ready, and built to provide lasting value, impact, and sustained competitive advantage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About4;
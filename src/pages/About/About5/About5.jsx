import React from 'react';
import FancyButton from '../../../comopnents/sharedItems/FancyButtons/FancyButton';
import { useNavigate } from 'react-router';

const About5 = () => {
    const navigate = useNavigate();

    const handleContactClick = () => {
        navigate('/contact');
    }
    return (
        <div className=" bg-white py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 lg:space-y-8">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Unlock Your Software Development Potential with Us
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                            Projukti Sheba delivers expert teams in software engineering, integration, QA, maintenance, DevSecOps, and cybersecurity.
                        </p>
                        
                        {/* Divider */}
                        <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gray-300"></div>
                        
                        {/* Contact Button */}
                        <div onClick={handleContactClick} className="pt-4">
                            <FancyButton className="w-full sm:w-auto">
                                Contact Us
                            </FancyButton>
                        </div>
                    </div>

                    {/* Right Content - Image Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                        {/* Top Left Image */}
                        <div className="rounded-lg overflow-hidden h-40 sm:h-48 lg:h-56 xl:h-64">
                            <img 
                                src="https://i.ibb.co.com/FLWjKXCM/premium-photo-1661497675847-2075003562fd.jpg" 
                                alt="Software Development" 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        
                        {/* Top Right Image */}
                        <div className="rounded-lg overflow-hidden h-40 sm:h-48 lg:h-56 xl:h-64 mt-6 sm:mt-8 lg:mt-12">
                            <img 
                                src="https://i.ibb.co.com/hRz21d7F/premium-photo-1661284828052-ea25d6ea94cd.jpg" 
                                alt="Team Collaboration" 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        
                        {/* Bottom Left Image */}
                        <div className="rounded-lg overflow-hidden h-40 sm:h-48 lg:h-56 xl:h-64 -mt-6 sm:-mt-8 lg:-mt-12">
                            <img 
                                src="https://i.ibb.co.com/sJC6dZh8/pexels-olly-3756681.jpg" 
                                alt="Technology Solutions" 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        
                        {/* Bottom Right Image */}
                        <div className="rounded-lg overflow-hidden h-40 sm:h-48 lg:h-56 xl:h-64">
                            <img 
                                src="https://i.ibb.co.com/VWJktQCF/aerial-view-business-team-53876-124515.jpg" 
                                alt="Business Team" 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About5;
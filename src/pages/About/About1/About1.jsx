import React from 'react';
import { ArrowRight } from 'lucide-react';
import FancyButton from '../../../comopnents/sharedItems/FancyButtons/FancyButton';
import { useNavigate } from 'react-router';

const About1 = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen pt-12 bg-white">
            {/* Hero Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                        {/* Left Content */}
                        <div className="space-y-8">

                            {/* Sub Heading */}
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                                One-Stop Partner for Digital Solutions
                            </h2>

                            {/* Description */}
                            <div className="space-y-6">
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    In today's fast-paced digital world, we build scalable software platforms that power transformation across industries.
                                </p>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Our 550+ experts develop and deliver secure, high-performance software solutions from architecture to testing built to scale and future-proof your business.
                                </p>
                            </div>

                            {/* Trust Section */}
                            <div className="pt-4">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                    Your Trusted Partner in Scalable Digital Solutions
                                </h3>
                                
                                {/* CTA Button */}
                                <FancyButton onClick={() => navigate('/contact')} className="flex  items-center gap-2">
                                    <span>Start a Project</span>
                                    <ArrowRight className="w-5 h-5" />
                                </FancyButton>
                            </div>
                        </div>

                        {/* Right Content - Image */}
                        <div className="relative">
                            <img
                                src="https://i.postimg.cc/3x8979gv/Whats-App-Image-2025-10-08-at-12-03-48-AM-1.jpg"
                                alt="Digital Solutions"
                                className="w-full h-auto  rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About1;
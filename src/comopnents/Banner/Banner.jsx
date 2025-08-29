import React from 'react';
import { useNavigate } from 'react-router';
import FancyButton from '../sharedItems/FancyButtons/FancyButton';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen overflow-hidden" style={{ 
            background: 'linear-gradient(135deg, #0a0614, #1a0b2e, #2d1b3d)' 
        }}>
            {/* Custom Gradient Overlay */}
            <div 
                className="absolute inset-0" 
                style={{ 
                    background: 'linear-gradient(135deg, rgba(48, 35, 195, 0.1), rgba(141, 111, 255, 0.05), rgba(6, 196, 247, 0.1))',
                    zIndex: 2 
                }} 
            />
            
            {/* Content */}
            <div className="relative bg-custom-gradient z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Glassy Container */}
                    <div 
                        className="backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            borderColor: 'rgba(48, 35, 195, 0.3)',
                            boxShadow: '0 25px 50px -12px rgba(48, 35, 195, 0.25)'
                        }}
                    >
                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            <span 
                                className="bg-clip-text "
                                
                            >
                                Digital Solution of Business
                            </span>
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl mb-10 leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                            Experience cutting-edge technology with our innovative solutions 
                            designed to transform your digital journey
                        </p>
                        
                        {/* Get In Touch Button */}
                        <div onClick={() => navigate("/contact")} className="flex justify-center">
                            <FancyButton>Get In Touch</FancyButton>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            {/* Decorative Elements with Custom Colors */}
            <div 
                className="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl animate-pulse" 
                style={{ 
                    background: 'radial-gradient(circle, rgba(48, 35, 195, 0.3), rgba(141, 111, 255, 0.2))',
                    zIndex: 2 
                }}
            ></div>
            <div 
                className="absolute bottom-20 right-10 w-32 h-32 rounded-full blur-2xl animate-pulse" 
                style={{ 
                    background: 'radial-gradient(circle, rgba(6, 196, 247, 0.3), rgba(48, 35, 195, 0.2))',
                    animationDelay: '1s',
                    zIndex: 2 
                }}
            ></div>
            <div 
                className="absolute top-1/2 left-20 w-16 h-16 rounded-full blur-xl animate-pulse" 
                style={{ 
                    background: 'radial-gradient(circle, rgba(141, 111, 255, 0.3), rgba(6, 196, 247, 0.2))',
                    animationDelay: '2s',
                    zIndex: 2 
                }}
            ></div>
            
            {/* Additional floating elements for more visual interest */}
            <div 
                className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full blur-lg animate-pulse" 
                style={{ 
                    background: 'radial-gradient(circle, rgba(6, 196, 247, 0.4), transparent)',
                    animationDelay: '3s',
                    zIndex: 2 
                }}
            ></div>
            <div 
                className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full blur-xl animate-pulse" 
                style={{ 
                    background: 'radial-gradient(circle, rgba(48, 35, 195, 0.2), rgba(141, 111, 255, 0.1))',
                    animationDelay: '4s',
                    zIndex: 2 
                }}
            ></div>
        </div>
    );
};

export default Banner;
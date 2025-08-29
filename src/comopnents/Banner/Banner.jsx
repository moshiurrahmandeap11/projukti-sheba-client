import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import FancyButton from '../sharedItems/FancyButtons/FancyButton';

const Banner = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Load Lottie Web Component script
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js';
        script.type = 'module';
        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden bg-custom-gradient" >
            {/* Custom Gradient Overlay */}
            <div 
                className="absolute inset-0" 
                style={{ 
                    background: 'linear-gradient(135deg, rgba(48, 35, 195, 0.1), rgba(141, 111, 255, 0.05), rgba(6, 196, 247, 0.1))',
                    zIndex: 2 
                }} 
            />
            
            {/* Animated P in background - Left Side */}
            <div 
                className="absolute left-10 top-1/2 transform -translate-y-1/2"
                style={{
                    fontSize: '200px',
                    fontWeight: 'bold',
                    color: '#1D2D63',
                    zIndex: 1,
                    animation: 'float 6s ease-in-out infinite',
                    textShadow: '0 0 50px rgba(48, 35, 195, 0.3)'
                }}
            >
                P
            </div>
            
            {/* Animated Lines - Right Side */}
            <svg 
                className="absolute right-10 top-1/4 w-32 h-96" 
                style={{ zIndex: 1 }}
                viewBox="0 0 128 384"
            >
                {/* Line 1 */}
                <line 
                    x1="0" y1="0" x2="0" y2="100" 
                    stroke="rgba(6, 196, 247, 0.6)" 
                    strokeWidth="2"
                    style={{
                        animation: 'drawLine 3s ease-in-out infinite',
                        strokeDasharray: '100',
                        strokeDashoffset: '100'
                    }}
                />
                {/* Line 2 */}
                <line 
                    x1="20" y1="50" x2="20" y2="150" 
                    stroke="rgba(141, 111, 255, 0.6)" 
                    strokeWidth="2"
                    style={{
                        animation: 'drawLine 3s ease-in-out infinite 0.5s',
                        strokeDasharray: '100',
                        strokeDashoffset: '100'
                    }}
                />
                {/* Line 3 */}
                <line 
                    x1="40" y1="25" x2="40" y2="175" 
                    stroke="rgba(48, 35, 195, 0.6)" 
                    strokeWidth="2"
                    style={{
                        animation: 'drawLine 3s ease-in-out infinite 1s',
                        strokeDasharray: '150',
                        strokeDashoffset: '150'
                    }}
                />
                {/* Connecting lines to bottom */}
                <path 
                    d="M0 100 Q60 200 100 350" 
                    fill="none" 
                    stroke="rgba(6, 196, 247, 0.4)" 
                    strokeWidth="1.5"
                    style={{
                        animation: 'drawPath 4s ease-in-out infinite 1.5s',
                        strokeDasharray: '300',
                        strokeDashoffset: '300'
                    }}
                />
                <path 
                    d="M20 150 Q70 250 110 350" 
                    fill="none" 
                    stroke="rgba(141, 111, 255, 0.4)" 
                    strokeWidth="1.5"
                    style={{
                        animation: 'drawPath 4s ease-in-out infinite 2s',
                        strokeDasharray: '250',
                        strokeDashoffset: '250'
                    }}
                />
            </svg>
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-6xl mx-auto flex items-center justify-center gap-12">
                    {/* Left Side - Text Content */}
                    <div className="flex-1">
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
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-left">
                                <span 
                                    className="bg-clip-text"
                                >
                                    Digital Solution of Business
                                </span>
                            </h1>
                            
                            {/* Subtitle */}
                            <p className="text-lg md:text-xl mb-10 leading-relaxed text-left" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                Experience cutting-edge technology with our innovative solutions 
                                designed to transform your digital journey
                            </p>
                            
                            {/* Get In Touch Button */}
                            <div onClick={() => navigate("/contact")} className="flex justify-start">
                                <FancyButton>Get In Touch</FancyButton>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side - Lottie Animation */}
                    <div className="flex-shrink-0 hidden lg:block">
                        <div 
                            className="backdrop-blur-sm rounded-2xl p-4"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(48, 35, 195, 0.2)'
                            }}
                        >
                            <dotlottie-wc 
                                src="https://lottie.host/ac66299c-d725-499e-ac6f-1f967cdd6e94/vA7TYn8bot.lottie" 
                                style={{
                                    width: '300px',
                                    height: '300px',
                                    filter: 'drop-shadow(0 0 20px rgba(6, 196, 247, 0.3))'
                                }}
                                speed="1" 
                                autoplay 
                                loop
                            />
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
            
            {/* CSS Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(-50%) translateX(0px); }
                    33% { transform: translateY(-50%) translateX(10px); }
                    66% { transform: translateY(-50%) translateX(-5px); }
                }
                
                @keyframes drawLine {
                    0% { stroke-dashoffset: 100; opacity: 0.3; }
                    50% { stroke-dashoffset: 0; opacity: 1; }
                    100% { stroke-dashoffset: -100; opacity: 0.3; }
                }
                
                @keyframes drawPath {
                    0% { stroke-dashoffset: 300; opacity: 0.3; }
                    50% { stroke-dashoffset: 0; opacity: 0.8; }
                    100% { stroke-dashoffset: -300; opacity: 0.3; }
                }
            `}</style>
        </div>
    );
};

export default Banner;
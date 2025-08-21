import React, { useState, useEffect, useRef } from 'react';
import { Code, Globe, Video, Megaphone, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

const Services = () => {
    const [activeTab, setActiveTab] = useState('software');
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Web animation particles
        const particles = [];
        const connections = [];
        const particleCount = 60;
        const maxDistance = 150;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 1.5 + 0.5
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update particles
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Keep particles within bounds
                particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                particle.y = Math.max(0, Math.min(canvas.height, particle.y));
            });

            // Draw connections
            connections.length = 0;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.15;
                        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach(particle => {
                ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Add glow effect
                ctx.shadowColor = 'rgba(99, 102, 241, 0.6)';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const services = {
        software: {
            id: 'software',
            title: 'Software Development',
            icon: Code,
            description: 'Custom software solutions tailored to your business needs with cutting-edge technology and scalable architecture.',
            features: [
                'Custom Application Development',
                'Enterprise Software Solutions',
                'Mobile App Development',
                'API Integration & Development',
                'Database Design & Optimization',
                'Cloud-based Solutions'
            ],
            technologies: ['Go', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker']
        },
        websites: {
            id: 'websites',
            title: 'Website Development',
            icon: Globe,
            description: 'Modern, responsive websites that deliver exceptional user experiences and drive business growth.',
            features: [
                'Responsive Web Design',
                'E-commerce Development',
                'CMS Integration',
                'SEO Optimization',
                'Performance Optimization',
                'Maintenance & Support'
            ],
            technologies: ['React.Js', 'PHP', 'JavaScript', 'WordPress', 'Laravel', 'Next.js']
        },
        video: {
            id: 'video',
            title: 'Video Editing',
            icon: Video,
            description: 'Professional video editing services that bring your vision to life with stunning visuals and compelling storytelling.',
            features: [
                'Professional Video Editing',
                'Motion Graphics & Animation',
                'Color Grading & Correction',
                'Audio Enhancement',
                'Social Media Video Content',
                'Corporate Video Production'
            ],
            technologies: ['Adobe Premiere', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro', 'Photoshop', 'Illustrator']
        },
        ads: {
            id: 'ads',
            title: 'Social Ads Campaign',
            icon: Megaphone,
            description: 'Strategic social media advertising campaigns that maximize ROI and drive targeted traffic to your business.',
            features: [
                'Campaign Strategy & Planning',
                'Ad Creative Design',
                'Audience Targeting',
                'A/B Testing & Optimization',
                'Performance Analytics',
                'Multi-Platform Management'
            ],
            technologies: ['Facebook Ads', 'Google Ads', 'Instagram', 'LinkedIn', 'TikTok', 'Analytics']
        }
    };

    const tabButtons = [
        { id: 'software', label: 'Software', icon: Code },
        { id: 'websites', label: 'Websites', icon: Globe },
        { id: 'video', label: 'Video Editing', icon: Video },
        { id: 'ads', label: 'Social Ads', icon: Megaphone }
    ];

    const activeService = services[activeTab];
    const ActiveIcon = activeService.icon;

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Animated Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-60"
                style={{ zIndex: 1 }}
            />
            
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-purple-900/20" style={{ zIndex: 2 }} />
            
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-white via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                            Our Services
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        We provide comprehensive technology solutions to help your business thrive in the digital world
                    </p>
                </div>

                {/* Service Tabs */}
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                    {/* Tab Navigation */}
                    <div className="border-b border-white/10 p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {tabButtons.map((tab, index) => {
                                const TabIcon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`group relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-500 transform hover:scale-105 ${
                                            activeTab === tab.id
                                                ? 'bg-gradient-to-r from-indigo-600/50 via-purple-600/50 to-pink-600/50 border border-purple-500/30 shadow-lg scale-105'
                                                : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30'
                                        }`}
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                            animation: activeTab === tab.id ? 'pulse 2s infinite' : 'none'
                                        }}
                                    >
                                        {/* Tab Icon Animation */}
                                        <TabIcon className={`w-6 h-6 mb-2 transition-all duration-500 transform ${
                                            activeTab === tab.id 
                                                ? 'text-white scale-110 rotate-12' 
                                                : 'text-gray-400 group-hover:text-white group-hover:scale-110'
                                        }`} />
                                        
                                        <span className={`text-sm font-medium transition-all duration-500 ${
                                            activeTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-white'
                                        }`}>
                                            {tab.label}
                                        </span>
                                        
                                        {/* Active Tab Indicator with Animation */}
                                        {activeTab === tab.id && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                                        )}
                                        
                                        {/* Hover Ripple Effect */}
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tab Content with Slide Animation */}
                    <div className="p-8 md:p-12">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content with Slide-in Animation */}
                            <div className="space-y-8 animate-fadeInLeft">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-xl p-3 shadow-xl animate-bounce">
                                        <ActiveIcon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                                        {activeService.title}
                                    </h3>
                                </div>

                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {activeService.description}
                                </p>

                                {/* Features List with Stagger Animation */}
                                <div className="space-y-4">
                                    <h4 className="text-xl font-semibold text-white mb-4">Key Features:</h4>
                                    <div className="grid gap-3">
                                        {activeService.features.map((feature, index) => (
                                            <div 
                                                key={index} 
                                                className="flex items-center space-x-3 opacity-0 animate-fadeInUp"
                                                style={{
                                                    animationDelay: `${index * 0.1}s`,
                                                    animationFillMode: 'forwards'
                                                }}
                                            >
                                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 animate-pulse" />
                                                <span className="text-gray-300">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="pt-6">
                                    <button onClick={() => navigate("/contact")} className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-500 shadow-xl hover:shadow-purple-500/50 transform hover:scale-105 border border-purple-500/30 backdrop-blur-sm overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                                        <span className="relative z-10 flex items-center space-x-2">
                                            <span>Get Started</span>
                                            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Right Content with Slide-in Animation */}
                            <div className="space-y-8 animate-fadeInRight">
                                <div className="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 p-8 shadow-xl">
                                    <h4 className="text-2xl font-semibold text-white mb-6">Technologies We Use</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {activeService.technologies.map((tech, index) => (
                                            <div 
                                                key={index} 
                                                className="bg-gradient-to-br from-white/10 to-white/5 rounded-lg px-4 py-3 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 hover:scale-105 opacity-0 animate-fadeInUp"
                                                style={{
                                                    animationDelay: `${index * 0.1}s`,
                                                    animationFillMode: 'forwards'
                                                }}
                                            >
                                                <span className="text-gray-200 font-medium text-sm">{tech}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Stats with Counter Animation */}
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="text-center backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 p-4 hover:scale-105 transition-transform duration-300">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1 animate-pulse">100+</div>
                                        <div className="text-sm text-gray-400">Projects</div>
                                    </div>
                                    <div className="text-center backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 p-4 hover:scale-105 transition-transform duration-300">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1 animate-pulse">24/7</div>
                                        <div className="text-sm text-gray-400">Support</div>
                                    </div>
                                    <div className="text-center backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 p-4 hover:scale-105 transition-transform duration-300">
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1 animate-pulse">99%</div>
                                        <div className="text-sm text-gray-400">Satisfaction</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS Animations */}
            <style jsx>{`
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeInLeft {
                    animation: fadeInLeft 0.8s ease-out;
                }

                .animate-fadeInRight {
                    animation: fadeInRight 0.8s ease-out;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Services;
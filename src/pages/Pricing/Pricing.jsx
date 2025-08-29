import React, { useState, useEffect } from 'react';
import { Check, Star, ArrowRight, Code, Globe, Video, TrendingUp, Server, ShoppingCart, GraduationCap, Heart, Users, Zap, Play, Camera, Target, Facebook, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router';
import FancyButton from '../../comopnents/sharedItems/FancyButtons/FancyButton';

const Pricing = () => {
    const [activeCategory, setActiveCategory] = useState('software');
    const [particles, setParticles] = useState([]);
    const navigate = useNavigate();

    // Generate floating particles
    useEffect(() => {
        const generateParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 40; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 2 + 1,
                    speed: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.3 + 0.1
                });
            }
            setParticles(newParticles);
        };
        generateParticles();

        const interval = setInterval(() => {
            setParticles(prev => prev.map(particle => ({
                ...particle,
                y: particle.y > 100 ? -5 : particle.y + particle.speed * 0.1,
                x: particle.x + Math.sin(particle.y * 0.01) * 0.05
            })));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const categories = [
        { id: 'software', name: 'Software Solutions', icon: Code, color: 'from-blue-500 to-cyan-500' },
        { id: 'websites', name: 'Website Development', icon: Globe, color: 'from-purple-500 to-pink-500' },
        { id: 'video', name: 'Video Editing', icon: Video, color: 'from-green-500 to-emerald-500' },
        { id: 'ads', name: 'Social Ads Campaign', icon: TrendingUp, color: 'from-orange-500 to-red-500' }
    ];

    const pricingData = {
        software: [
            {
                name: 'Inventory Software Online',
                description: 'Cloud-based inventory management with real-time tracking and analytics',
                price: 50,
                period: 'Starting Price',
                monthlyCharge: '$5/month',
                popular: false,
                icon: Server,
                features: [
                    'Real-time inventory tracking',
                    'Multi-location support',
                    'Automated alerts',
                    'Sales & purchase management',
                    'Cloud backup',
                    'Mobile app access',
                    'Custom reports',
                    '24/7 support'
                ]
            },
            {
                name: 'Inventory Software Offline',
                description: 'Desktop-based inventory solution with local database storage',
                price: 90,
                period: 'Starting Price',
                monthlyCharge: '$10/year maintenance',
                popular: false,
                icon: Server,
                features: [
                    'Local database storage',
                    'No internet required',
                    'Barcode scanning',
                    'Stock management',
                    'Supplier management',
                    'Purchase orders',
                    'Data export options',
                    'Free updates'
                ]
            },
            {
                name: 'POS System',
                description: 'Complete point-of-sale solution for retail businesses',
                price: 50,
                period: 'Starting Price',
                monthlyCharge: 'One-time payment',
                popular: true,
                icon: ShoppingCart,
                features: [
                    'Touch screen interface',
                    'Inventory integration',
                    'Customer management',
                    'Sales reporting',
                    'Receipt printing',
                    'Barcode support',
                    'Multi-payment methods',
                    'Staff management'
                ]
            },
            {
                name: 'School Management System',
                description: 'Comprehensive school administration and student management platform',
                price: 55,
                period: 'Starting Price',
                monthlyCharge: '$8/month',
                popular: false,
                icon: GraduationCap,
                features: [
                    'Student enrollment',
                    'Attendance tracking',
                    'Grade management',
                    'Parent portal',
                    'Fee management',
                    'Exam scheduling',
                    'SMS notifications',
                    'Report generation'
                ]
            },
            {
                name: 'Hospital Management System',
                description: 'Complete healthcare management solution for hospitals and clinics',
                price: 80,
                period: 'Starting Price',
                monthlyCharge: '$12/month',
                popular: false,
                icon: Heart,
                features: [
                    'Patient records',
                    'Appointment scheduling',
                    'Billing system',
                    'Pharmacy management',
                    'Doctor portal',
                    'Insurance handling',
                    'Lab reports',
                    'Emergency management'
                ]
            },
            {
                name: 'CRM Software',
                description: 'Customer relationship management system for business growth',
                price: 45,
                period: 'Starting Price',
                monthlyCharge: '$6/month',
                popular: false,
                icon: Users,
                features: [
                    'Lead management',
                    'Contact database',
                    'Sales pipeline',
                    'Email integration',
                    'Task automation',
                    'Analytics dashboard',
                    'Mobile access',
                    'API integration'
                ]
            }
        ],
        websites: [
            {
                name: 'E-commerce Website',
                description: 'Complete online store with payment gateway and inventory management',
                price: 50,
                period: 'Starting From',
                monthlyCharge: 'Up to $500',
                popular: true,
                icon: ShoppingCart,
                features: [
                    'Responsive design',
                    'Payment gateway',
                    'Product catalog',
                    'Shopping cart',
                    'Order management',
                    'SEO optimization',
                    'Admin panel',
                    '1 year support'
                ]
            },
            {
                name: 'School Website',
                description: 'Educational institution website with student and parent portals',
                price: 50,
                period: 'Starting From',
                monthlyCharge: 'Up to $100',
                popular: false,
                icon: GraduationCap,
                features: [
                    'Responsive design',
                    'Student portal',
                    'News & events',
                    'Gallery section',
                    'Contact forms',
                    'SEO friendly',
                    'Social media integration',
                    '6 months support'
                ]
            },
            {
                name: 'Business Website',
                description: 'Professional corporate website for business presence',
                price: 40,
                period: 'Starting From',
                monthlyCharge: 'Up to $200',
                popular: false,
                icon: Globe,
                features: [
                    'Custom design',
                    'About & services pages',
                    'Contact forms',
                    'Blog section',
                    'Google Maps',
                    'Mobile friendly',
                    'Fast loading',
                    '3 months support'
                ]
            },
            {
                name: 'Portfolio Website',
                description: 'Creative portfolio website for professionals and artists',
                price: 30,
                period: 'Starting From',
                monthlyCharge: 'Up to $80',
                popular: false,
                icon: Star,
                features: [
                    'Modern design',
                    'Gallery showcase',
                    'Contact section',
                    'Responsive layout',
                    'Social links',
                    'Fast performance',
                    'SEO basics',
                    '2 months support'
                ]
            },
            {
                name: 'Restaurant Website',
                description: 'Food business website with online ordering system',
                price: 60,
                period: 'Starting From',
                monthlyCharge: 'Up to $300',
                popular: false,
                icon: Heart,
                features: [
                    'Menu display',
                    'Online ordering',
                    'Table booking',
                    'Location maps',
                    'Customer reviews',
                    'Mobile optimized',
                    'Payment integration',
                    '4 months support'
                ]
            },
            {
                name: 'News Portal',
                description: 'Dynamic news website with content management system',
                price: 70,
                period: 'Starting From',
                monthlyCharge: 'Up to $400',
                popular: false,
                icon: Globe,
                features: [
                    'CMS integration',
                    'Multi-category news',
                    'Comment system',
                    'Social sharing',
                    'Ad management',
                    'Author profiles',
                    'Search functionality',
                    '6 months support'
                ]
            }
        ],
        video: [
            {
                name: 'Basic Video Editing',
                description: 'Simple video editing with cuts, transitions, and basic effects',
                price: 20,
                period: 'Starting From',
                monthlyCharge: 'Per video',
                popular: true,
                icon: Play,
                features: [
                    'Video trimming',
                    'Basic transitions',
                    'Text overlays',
                    'Audio sync',
                    'Color correction',
                    '1080p export',
                    '2 revisions',
                    '3-day delivery'
                ]
            },
            {
                name: 'Professional Video Editing',
                description: 'Advanced video editing with motion graphics and effects',
                price: 50,
                period: 'Starting From',
                monthlyCharge: 'Per video',
                popular: false,
                icon: Video,
                features: [
                    'Advanced effects',
                    'Motion graphics',
                    'Color grading',
                    'Audio mixing',
                    'Multi-camera sync',
                    '4K export',
                    '3 revisions',
                    '5-day delivery'
                ]
            },
            {
                name: 'Social Media Videos',
                description: 'Short-form content optimized for social media platforms',
                price: 25,
                period: 'Starting From',
                monthlyCharge: 'Per video',
                popular: false,
                icon: TrendingUp,
                features: [
                    'Platform optimization',
                    'Quick cuts',
                    'Trending music',
                    'Text animations',
                    'Hashtag research',
                    'Multiple formats',
                    '2 revisions',
                    '2-day delivery'
                ]
            },
            {
                name: 'Corporate Videos',
                description: 'Professional corporate video production and editing',
                price: 100,
                period: 'Starting From',
                monthlyCharge: 'Per project',
                popular: false,
                icon: Users,
                features: [
                    'Script consultation',
                    'Professional editing',
                    'Brand integration',
                    'Voice-over sync',
                    'Multiple versions',
                    '4K quality',
                    'Unlimited revisions',
                    '7-day delivery'
                ]
            },
            {
                name: 'YouTube Content',
                description: 'YouTube-optimized video editing with thumbnails',
                price: 35,
                period: 'Starting From',
                monthlyCharge: 'Per video',
                popular: false,
                icon: Play,
                features: [
                    'YouTube optimization',
                    'Thumbnail design',
                    'Intro/outro',
                    'Subscribe animations',
                    'SEO optimization',
                    '1440p export',
                    '2 revisions',
                    '4-day delivery'
                ]
            },
            {
                name: 'Wedding Videos',
                description: 'Cinematic wedding video editing with music and effects',
                price: 80,
                period: 'Starting From',
                monthlyCharge: 'Per project',
                popular: false,
                icon: Heart,
                features: [
                    'Cinematic editing',
                    'Music synchronization',
                    'Slow motion effects',
                    'Highlight reel',
                    'Full ceremony cut',
                    '4K quality',
                    '2 revisions',
                    '10-day delivery'
                ]
            }
        ],
        ads: [
            {
                name: 'Facebook Ads Campaign',
                description: 'Targeted Facebook advertising with audience research and optimization',
                price: 10,
                period: 'Starting From',
                monthlyCharge: 'Unlimited budget',
                popular: true,
                icon: Facebook,
                features: [
                    'Audience research',
                    'Ad creative design',
                    'Campaign setup',
                    'A/B testing',
                    'Performance tracking',
                    'Monthly reports',
                    'Optimization',
                    '24/7 monitoring'
                ]
            },
            {
                name: 'Google Ads Campaign',
                description: 'Search engine marketing with keyword research and optimization',
                price: 15,
                period: 'Starting From',
                monthlyCharge: 'Unlimited budget',
                popular: false,
                icon: Target,
                features: [
                    'Keyword research',
                    'Ad copywriting',
                    'Landing page optimization',
                    'Bid management',
                    'Conversion tracking',
                    'Quality score improvement',
                    'Weekly reports',
                    'ROI optimization'
                ]
            },
            {
                name: 'Instagram Ads Campaign',
                description: 'Visual-focused Instagram advertising for brand awareness',
                price: 12,
                period: 'Starting From',
                monthlyCharge: 'Unlimited budget',
                popular: false,
                icon: Instagram,
                features: [
                    'Visual content creation',
                    'Story ads',
                    'Influencer outreach',
                    'Hashtag strategy',
                    'Engagement tracking',
                    'Brand awareness',
                    'Bi-weekly reports',
                    'Creative optimization'
                ]
            },
            {
                name: 'TikTok Ads Campaign',
                description: 'Trending TikTok advertising for younger demographics',
                price: 18,
                period: 'Starting From',
                monthlyCharge: 'Unlimited budget',
                popular: false,
                icon: Play,
                features: [
                    'Trend research',
                    'Video ad creation',
                    'Hashtag challenges',
                    'Influencer partnerships',
                    'Viral optimization',
                    'Engagement metrics',
                    'Weekly reports',
                    'Creative testing'
                ]
            },
            {
                name: 'LinkedIn Ads Campaign',
                description: 'Professional B2B advertising on LinkedIn platform',
                price: 20,
                period: 'Starting From',
                monthlyCharge: 'Unlimited budget',
                popular: false,
                icon: Users,
                features: [
                    'B2B targeting',
                    'Professional content',
                    'Lead generation',
                    'Company targeting',
                    'Industry insights',
                    'Lead nurturing',
                    'Monthly reports',
                    'ROI tracking'
                ]
            },
            {
                name: 'Multi-Platform Campaign',
                description: 'Comprehensive social media advertising across all platforms',
                price: 50,
                period: 'Starting From',
                monthlyCharge: 'Unlimited budget',
                popular: false,
                icon: Zap,
                features: [
                    'All platforms included',
                    'Cross-platform strategy',
                    'Unified reporting',
                    'Brand consistency',
                    'Advanced analytics',
                    'Retargeting campaigns',
                    'Weekly optimization',
                    'Dedicated manager'
                ]
            }
        ]
    };

    const currentPackages = pricingData[activeCategory] || [];

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-custom-gradient">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-custom-gradient animate-pulse"></div>
                
                {/* Floating particles */}
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            opacity: particle.opacity,
                            transform: `scale(${particle.size})`
                        }}
                    ></div>
                ))}
                
                {/* Geometric shapes */}
                <div className="absolute top-20 right-20 w-40 h-40 border border-white/5 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
                <div className="absolute bottom-32 left-20 w-32 h-32 border border-purple-400/10 rounded-lg rotate-45 animate-pulse"></div>
                <div className="absolute top-1/2 right-10 w-20 h-20 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full animate-bounce" style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Header Section */}
                <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="inline-block p-4 rounded-full bg-custom-gradient backdrop-blur-sm border border-white/5 mb-6">
                            <Star className="w-16 h-16 text-white" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Pricing</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Choose from our comprehensive range of digital solutions. From custom software to creative services, we have the perfect package for your business needs.
                        </p>
                    </div>
                </div>

                {/* Category Navigation */}
                <div className="px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`group relative p-6 rounded-2xl border transition-all duration-500 ${
                                        activeCategory === category.id
                                            ? 'bg-custom-gradient border-white/30 shadow-2xl scale-105'
                                            : 'bg-custom-gradient border-white/10 hover:bg-white/10 hover:scale-105'
                                    }`}
                                >
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <category.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
                                    <div className={`h-1 w-full rounded-full transition-all duration-300 ${
                                        activeCategory === category.id
                                            ? `bg-gradient-to-r ${category.color}`
                                            : 'bg-white/20'
                                    }`}></div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentPackages.map((pkg, index) => (
                                <div
                                    key={index}
                                    className={`relative group bg-custom-gradient backdrop-blur-md border rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                                        pkg.popular
                                            ? 'border-purple-500/50 shadow-purple-500/20 shadow-2xl scale-105'
                                            : 'border-white/10'
                                    }`}
                                >
                                    {/* Popular Badge */}
                                    {pkg.popular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            <div className="bg-custom-gradient text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                                Most Popular
                                            </div>
                                        </div>
                                    )}

                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 bg-custom-gradient rounded-2xl blur-xl"></div>
                                    
                                    <div className="relative z-10">
                                        {/* Package Header */}
                                        <div className="text-center mb-8">
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-custom-gradient mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <pkg.icon className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">{pkg.description}</p>
                                        </div>

                                        {/* Pricing */}
                                        <div className="text-center mb-8">
                                            <div className="flex items-baseline justify-center">
                                                <span className="text-4xl font-bold text-white">${pkg.price}</span>
                                            </div>
                                            <div className="text-gray-400 mt-2">
                                                <div>{pkg.period}</div>
                                                <div className="text-sm">{pkg.monthlyCharge}</div>
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-4 mb-8">
                                            {pkg.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center space-x-3">
                                                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                    <span className="text-gray-300 text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <FancyButton>
                                        <button >
                                            {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div> */}
                                            
                                            <span className="relative z-10 flex items-center justify-center space-x-2">
                                                <span>Get Started</span>
                                                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                                            </span>
                                        </button>
                                        </FancyButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 relative">
                            <div className="absolute inset-0 bg-custom-gradient rounded-2xl"></div>

                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Solution?</h2>
                                <p className="text-gray-300 mb-8 text-lg">
                                    Can't find what you're looking for? Let's discuss your unique requirements and create a tailored solution that fits your business perfectly.
                                </p>
                                <FancyButton onClick={() => navigate("/contact")} className="group relative cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold px-10 py-4 rounded-full text-lg transition-all duration-500 shadow-2xl  transform hover:scale-105 border border-purple-500/30 backdrop-blur-sm overflow-hidden">
                                    
                                    
                                    <span className="relative z-10 flex items-center space-x-2">
                                        <span>Contact Us</span>
                                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                </FancyButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
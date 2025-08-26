import React, { useState } from 'react';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin, 
    Youtube,
    ArrowRight,
    Send,
    Code,
    Globe,
    Video,
    Megaphone,
    Heart,
    ExternalLink,
    PhoneCall
} from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };


    const socialLinks = [
        { name: 'Facebook', href: 'https://www.facebook.com/projuktishebaofficial', icon: Facebook, color: 'hover:text-blue-500' },
        { name: 'Whatsapp', href: 'https://wa.me/+8801712377406', icon: PhoneCall, color: 'hover:text-sky-500' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/projuktishebaofficial/', icon: Linkedin, color: 'hover:text-blue-600' },
        { name: 'YouTube', href: 'https://www.youtube.com/@projuktishebaofficial', icon: Youtube, color: 'hover:text-red-500' }
    ];

    const services = [
        { name: 'Software Development', href: '#software', icon: Code },
        { name: 'Website Development', href: '#websites', icon: Globe },
        { name: 'Video Editing', href: '#video', icon: Video },
        { name: 'Social Ads Campaign', href: '#ads', icon: Megaphone }
    ];


    const contactInfo = [
        {
            icon: Phone,
            title: 'Phone',
            details: ['+8801712377406']
        },
        {
            icon: Mail,
            title: 'Email',
            details: ['support@projuktisheba.com']
        },
        {
            icon: MapPin,
            title: 'Address',
            details: ['Teribazar, UCB Bank Building (3rd Floor), Netrakona, Bangladesh-2400.']
        }
    ];

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-purple-900/40"></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
                {/* Main Footer Content */}
                <div className="backdrop-blur-xl bg-white/5 border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                            {/* Company Info */}
                            <div className="lg:col-span-1 space-y-8">
                                <div className="space-y-6">
                                    {/* Logo */}
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-xl p-3 shadow-xl">
                                            <Code className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">Projukti Sheba</h3>
                                            <p className="text-sm text-gray-400">Technology Solutions</p>
                                        </div>
                                    </div>
                                    
                                    {/* Company Description */}
                                    <p className="text-gray-300 leading-relaxed">
                                        Leading technology solutions provider specializing in software development, 
                                        web design, video editing, and digital marketing campaigns.
                                    </p>
                                    
                                    {/* Social Links */}
                                    <div className="flex space-x-4">
                                        {socialLinks.map((social, index) => {
                                            const SocialIcon = social.icon;
                                            return (
                                                <a
                                                    key={index}
                                                    href={social.href}
                                                    target='_blank'
                                                    className={`bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:border-purple-500/50 group`}
                                                >
                                                    <SocialIcon className="w-5 h-5" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                               {/* Contact Info */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-white">Contact Info</h4>
                                    <div className="space-y-3">
                                        {contactInfo.map((contact, index) => {
                                            const ContactIcon = contact.icon;
                                            return (
                                                <div key={index} className="flex items-start space-x-3">
                                                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-2">
                                                        <ContactIcon className="w-4 h-4 text-purple-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-300">{contact.title}</p>
                                                        {contact.details.map((detail, idx) => (
                                                            <p key={idx} className="text-sm text-gray-400">{detail}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                            {/* Services */}
                            <div className="space-y-6">
                                <h4 className="text-xl font-bold text-white relative">
                                    Our Services
                                    <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                </h4>
                                <ul className="space-y-4">
                                    {services.map((service, index) => {
                                        const ServiceIcon = service.icon;
                                        return (
                                            <li key={index}>
                                                <a
                                                    href={service.href}
                                                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center space-x-3 group hover:bg-white/5 rounded-lg p-2 -m-2"
                                                >
                                                    <ServiceIcon className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                                                    <span>{service.name}</span>
                                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Newsletter & Contact */}
                            <div className="space-y-8">
                                {/* Newsletter */}
                                <div className="space-y-6">
                                    <h4 className="text-xl font-bold text-white relative">
                                        Stay Updated
                                        <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        Subscribe to our newsletter for latest updates and tech insights.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/15 transition-all duration-300"
                                            />
                                        </div>
                                        <button
                                            onClick={handleNewsletterSubmit}
                                            className="group relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-500 shadow-xl hover:shadow-purple-500/50 transform hover:scale-105 border border-purple-500/30 backdrop-blur-sm overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                                            <span className="relative z-10 flex items-center justify-center space-x-2">
                                                {isSubscribed ? (
                                                    <>
                                                        <Heart className="w-4 h-4" />
                                                        <span>Subscribed!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4" />
                                                        <span>Subscribe</span>
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </div>

 
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="backdrop-blur-xl bg-white/5 border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="flex items-center space-x-2 text-gray-400 text-sm">
                                <span>&copy; 2025 Projukti Sheba. All rights reserved.</span>
                            </div>
                            
                            <div className="flex items-center space-x-6">
                                <a href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                                    Privacy Policy
                                </a>
                                <a href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                                    Terms of Service
                                </a>
                                <a href="#cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                                    Cookie Policy
                                </a>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-gray-400 text-sm">
                                <span>Made with</span>
                                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                                <span>in Bangladesh</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
import React, { useState, useEffect } from 'react';
import { Users, Linkedin, Twitter, Mail, Github, ChevronLeft, ChevronRight, X, Award, Code, Palette, TrendingUp, Database, Shield } from 'lucide-react';

const OurTeam = () => {
    const [particles, setParticles] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Generate floating particles
    useEffect(() => {
        const generateParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 35; i++) {
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

    const teamMembers = [
        {
            id: 1,
            name: "MOHAMMAD ELIAS MIA",
            position: "Chairman & Co-Founder",
            department: "Leadership",
            experience: "8+ Years",
            expertise: ["Business Strategy", "Team Leadership", "Product Vision", "Client Relations"],
            bio: "Visionary leader with extensive experience in IT solutions and business development. Passionate about transforming ideas into successful digital products.",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "#",
                github: "#"
            },
            skills: ["Leadership", "Strategy", "Innovation", "Management"],
            icon: Award,
            gradient: "from-yellow-500 to-orange-500",
            bgImage: "https://i.postimg.cc/nV12mR48/Designer.jpg"
        },
        {
            id: 2,
            name: "MD AJIJUL ISLAM",
            position: "CEO & Founder",
            department: "Technology",
            experience: "7+ Years",
            expertise: ["Full Stack Development", "System Architecture", "Cloud Solutions", "Team Management"],
            bio: "Expert software architect and developer specializing in scalable web applications and cloud infrastructure solutions.",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "support@projuktisheba.com",
                github: "https://github.com/projuktisheba"
            },
            skills: ["React", "Node.js", "AWS", "Docker"],
            icon: Code,
            gradient: "from-blue-500 to-purple-500",
            bgImage: "https://i.postimg.cc/DzCp1Cky/Ajijul-Islam-Without-background.png"
        },
        {
            id: 3,
            name: "MEHEDI HASAN MANNA",
            position: "SMO & SMM & Professional Video Editor",
            department: "Design",
            experience: "4+ Years",
            expertise: ["User Interface Design", "User Experience", "Prototyping", "Brand Identity"],
            bio: "Creative designer focused on creating intuitive and visually appealing digital experiences that users love.",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "#",
                github: "#"
            },
            skills: ["Figma", "Adobe XD", "Sketch", "Photoshop"],
            icon: Palette,
            gradient: "from-pink-500 to-purple-500",
            bgImage: "https://projuktisheba.com/wp-content/uploads/2024/08/IMG_20240417_101135-1024x768.jpg"
        },
        {
            id: 4,
            name: "AHSAN IBNE HABIB PARVEZ",
            position: "Professional Web Designer",
            department: "Development",
            experience: "4+ Years",
            expertise: ["Server Architecture", "Database Design", "API Development", "Security Implementation"],
            bio: "Backend specialist with expertise in building robust, scalable server-side applications and database solutions.",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "#",
                github: "#"
            },
            skills: ["Figma", "AI", "PS"],
            icon: Database,
            gradient: "from-indigo-500 to-blue-500",
            bgImage: "https://projuktisheba.com/wp-content/uploads/2024/08/438906924_10225449829089529_3096104127403699948_n-1024x1024.jpg"
        },
        {
            id: 5,
            name: "MD SAMIUL BASHIR",
            position: "Software Developer",
            department: "Development",
            experience: "3+ Years",
            expertise: ["Go", "Angular.JS", "Docker", "PostgreSQL"],
            bio: "Marketing expert specializing in digital growth strategies and brand building through innovative campaigns.",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "#",
                github: "#"
            },
            skills: ["Node.js", "MongoDB", "PostgreSQL", "Express"],
            icon: TrendingUp,
            gradient: "from-orange-500 to-red-500",
            bgImage: "https://projuktisheba.com/wp-content/uploads/2024/08/Samiul.jpg"
        },
        {
            id: 6,
            name: "AFSANA MITU",
            position: "Professional Digital Marketer",
            department: "Marketing",
            experience: "5+ Years",
            expertise: ["SEO", "Content Marketing", "Social Media"],
            bio: "Professional Digital Marketer with a passion for creating stunning visuals and engaging user experiences.",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "#",
                github: "#"
            },
            skills: ["PS", "AI", "Canva"],
            icon: Shield,
            gradient: "from-cyan-500 to-blue-500",
            bgImage: "https://projuktisheba.com/wp-content/uploads/2024/07/314d932056d06821c0bffa139dc6ef88.jpg"
        },
        {
            id: 7,
            name: "MOSHIUR RAHMAN DEAP",
            position: "JR. WEB DEVELOPER",
            department: "Development",
            experience: "5+ Years",
            expertise: ["NEXT.JS", "EXPRESS.JS", "JavaScript", "React"],
            bio: "Junior Web Developer with a passion for creating interactive and user-friendly web applications.",
            social: {
                linkedin: "https://www.linkedin.com/in/moshiurrahmandeap/",
                twitter: "https://x.com/__moshiur",
                email: "moshiurrahmandeap@gmail.com",
                github: "https://github.com/moshiurrahmandeap11"
            },
            skills: ["JAVASCRIPT", "DOCKER", "PYTHON"],
            icon: Shield,
            gradient: "from-cyan-500 to-blue-500",
            bgImage: "https://i.postimg.cc/wMg2Bqf6/pp.jpg"
        },
        {
            id: 8,
            name: "MEHEDI HASAN SAGOR",
            position: "ADS ANALYTICS",
            department: "Marketing",
            experience: "5+ Years",
            expertise: ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads / X Ads"],
            bio: "Junior Web Developer with a passion for creating interactive and user-friendly web applications.",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "#",
                github: "#"
            },
            skills: ["Google Analytics", "Google Tag Manager", "Attribution Models", "A/B Testing & Experimentation"],
            icon: Shield,
            gradient: "from-cyan-500 to-blue-500",
            bgImage: "https://i.postimg.cc/JzxpWThc/ce31ca5b-c37c-40e9-befb-a816c8520b70.jpg"
        },
        {
            id: 9,
            name: "MD AZHARUL ISLAM",
            position: "Head of Sales",
            department: "Software & Websites",
            experience: "5+ Years",
            expertise: ["Google Ads", "Meta Ads", "LinkedIn Ads"],
            bio: "Experienced in running high-converting campaigns on Google, Meta, and LinkedIn Ads platforms.",
            social: {
                email: "azharul533@gmail.com",
            },
            skills: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Campaign Management", "Audience Targeting", "Performance Optimization"],
            icon: Shield,
            gradient: "from-cyan-500 to-blue-500",
            bgImage: "https://i.postimg.cc/rp1K7WmW/a9f1339c-ade1-4183-bca5-fad0d851a5d5.jpg"
        },
        {
            id: 10,
            name: "MUTTAKIN AHMED APON",
            position: "Marketing Officer",
            department: "Shebok",
            experience: "3+ Years",
            expertise: ["Digital Marketing", "Content Strategy", "SEO", "Email Marketing", "Social Media Campaigns"],
            bio: "Results-driven Marketing Officer with a strong background in digital strategy, content creation, and campaign execution to boost brand visibility and customer engagement.",
            social: {
                email: "#",
            },
            skills: ["Market Research", "Campaign Management", "SEO & SEM", "Email Automation", "Copywriting", "Google Analytics", "Social Media Management", "Brand Positioning"],
            icon: Shield,
            gradient: "from-cyan-500 to-blue-500",
            bgImage: ""
        },
        {
            id: 11,
            name: "SANJANA AKTER HOLY",
            position: "Marketing Officer",
            department: "Shebok",
            experience: "3+ Years",
            expertise: ["Digital Marketing", "Content Strategy", "SEO", "Email Marketing", "Social Media Campaigns"],
            bio: "Results-driven Marketing Officer with a strong background in digital strategy, content creation, and campaign execution to boost brand visibility and customer engagement.",
            social: {
                email: "#",
            },
            skills: ["Market Research", "Campaign Management", "SEO & SEM", "Email Automation", "Copywriting", "Google Analytics", "Social Media Management", "Brand Positioning"],
            icon: Shield,
            gradient: "from-cyan-500 to-blue-500",
            bgImage: "https://projuktisheba.com/wp-content/uploads/2024/07/314d932056d06821c0bffa139dc6ef88.jpg"
        },
        {
            id: 12,
            name: "Ikha Akter",
            position: "Executive Officer",
            department: "Health Take Care",
            experience: "3+ Years",
            expertise: ["Healthcare Administration", "Policy Implementation", "Team Leadership", "Patient Services Management", "Compliance & Regulations"],
            bio: "Dedicated Executive Officer in the Health Take Care department with expertise in healthcare operations, team coordination, and service delivery. Committed to improving patient care through strategic planning and efficient administrative leadership.",
            social: {
                email: "#",
            },
            skills: ["Healthcare Management", "Operational Oversight", "Staff Coordination", "Regulatory Compliance", "Strategic Planning", "Communication", "Crisis Management", "Patient Experience Optimization"],
            icon: Shield,
            gradient: "from-cyan-500 to-blue-500",
            bgImage: "https://projuktisheba.com/wp-content/uploads/2024/07/314d932056d06821c0bffa139dc6ef88.jpg"
        },
    ];

    const itemsPerSlide = 3;
    const totalSlides = Math.ceil(teamMembers.length / itemsPerSlide);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const openModal = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset';
        setTimeout(() => setSelectedMember(null), 300);
    };



    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-slate-900">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-pulse"></div>
                
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
                
                <div className="absolute top-20 right-20 w-40 h-40 border border-white/5 rounded-full animate-spin" style={{ animationDuration: '35s' }}></div>
                <div className="absolute bottom-32 left-20 w-32 h-32 border border-purple-400/10 rounded-lg rotate-45 animate-pulse"></div>
                <div className="absolute top-1/2 right-10 w-24 h-24 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full animate-bounce" style={{ animationDuration: '5s' }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Header Section */}
                <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/5 mb-6">
                            <Users className="w-16 h-16 text-white" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Team</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Meet the passionate professionals behind Projukti Sheba. Click on any member to learn more about their expertise.
                        </p>
                    </div>
                </div>

                {/* Carousel Section */}
                <div className="px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative">
                            {/* Navigation Buttons */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Carousel Container */}
                            <div className="overflow-hidden rounded-2xl">
                                <div 
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {Array.from({ length: totalSlides }, (_, slideIndex) => (
                                        <div key={slideIndex} className="w-full flex-shrink-0">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                                                {teamMembers
                                                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                                    .map((member) => (
                                                    <div
                                                        key={member.id}
                                                        className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                                                        onClick={() => openModal(member)}
                                                    >
                                                        {/* Background Image */}
                                                        <div 
                                                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                                            style={{ backgroundImage: `url(${member.bgImage})` }}
                                                        ></div>
                                                        
                                                        {/* Gradient Overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
                                                        
                                                        {/* Hover Glow Effect */}
                                                        <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay`}></div>
                                                        
                                                        {/* Content */}
                                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                                            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text">
                                                                    {member.name}
                                                                </h3>
                                                                <p className={`text-transparent bg-gradient-to-r ${member.gradient} bg-clip-text font-semibold text-lg`}>
                                                                    {member.position}
                                                                </p>
                                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3">
                                                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                                                                        Click to learn more
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Slide Indicators */}
                            <div className="flex justify-center space-x-2 mt-8">
                                {Array.from({ length: totalSlides }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            currentSlide === index 
                                                ? 'bg-gradient-to-r from-blue-400 to-purple-400 scale-110' 
                                                : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                    ></button>
                                ))}
                            </div>
                        </div>

                        {/* Team Stats */}
                        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                                <div className="text-3xl font-bold text-white mb-2">7+</div>
                                <div className="text-gray-400">Team Members</div>
                            </div>
                            <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                                <div className="text-3xl font-bold text-white mb-2">10+</div>
                                <div className="text-gray-400">Years Combined Experience</div>
                            </div>
                            <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                                <div className="text-3xl font-bold text-white mb-2">1000+</div>
                                <div className="text-gray-400">Projects Completed</div>
                            </div>
                            <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                                <div className="text-3xl font-bold text-white mb-2">500+</div>
                                <div className="text-gray-400">Happy Clients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
                            isModalOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                        onClick={closeModal}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className={`relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
                        isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}>
                        {selectedMember && (
                            <div>
                                {/* Modal Header with Background Image */}
                                <div className="relative h-48 rounded-t-2xl overflow-hidden">
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${selectedMember.bgImage})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedMember.gradient} opacity-20 mix-blend-overlay`}></div>
                                    
                                    {/* Close Button */}
                                    <button
                                        onClick={closeModal}
                                        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors duration-200"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    
                                    {/* Member Basic Info */}
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h2 className="text-3xl font-bold text-white mb-2">{selectedMember.name}</h2>
                                        <p className={`text-xl text-transparent bg-gradient-to-r ${selectedMember.gradient} bg-clip-text font-semibold`}>
                                            {selectedMember.position}
                                        </p>
                                    </div>
                                </div>

                                {/* Modal Body */}
                                <div className="p-6">
                                    {/* Experience and Department */}
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20">
                                            <span className="text-white text-sm">{selectedMember.experience}</span>
                                        </div>
                                        <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20">
                                            <span className="text-white text-sm">{selectedMember.department}</span>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold text-white mb-3">About</h3>
                                        <p className="text-gray-300 leading-relaxed">{selectedMember.bio}</p>
                                    </div>

                                    {/* Skills */}
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold text-white mb-3">Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedMember.skills.map((skill, index) => (
                                                <span 
                                                    key={index}
                                                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Expertise */}
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold text-white mb-3">Expertise</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {selectedMember.expertise.map((item, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedMember.gradient}`}></div>
                                                    <span className="text-gray-300 text-sm">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div className="border-t border-white/10 pt-6">
                                        <h3 className="text-xl font-semibold text-white mb-4">Connect</h3>
                                        <div className="flex space-x-4">
                                            <a 
                                                href={selectedMember.social.linkedin}
                                                className="p-3 rounded-full bg-white/10 border border-white/20 text-gray-400 hover:text-blue-400 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                            <a 
                                                href={selectedMember.social.twitter}
                                                className="p-3 rounded-full bg-white/10 border border-white/20 text-gray-400 hover:text-sky-400 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                                            >
                                                <Twitter className="w-5 h-5" />
                                            </a>
                                            <a 
                                                href={`mailto:${selectedMember.social.email}`}
                                                className="p-3 rounded-full bg-white/10 border border-white/20 text-gray-400 hover:text-green-400 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                                            >
                                                <Mail className="w-5 h-5" />
                                            </a>
                                            <a 
                                                href={selectedMember.social.github}
                                                className="p-3 rounded-full bg-white/10 border border-white/20 text-gray-400 hover:text-gray-200 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OurTeam;
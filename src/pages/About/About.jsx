import React, { useEffect, useRef, useState } from 'react';
import { Users, Award, Clock, Globe, Target, Lightbulb, Heart, Zap } from 'lucide-react';

const About = () => {
    const canvasRef = useRef(null);
    const [isVisible, setIsVisible] = useState({
        hero: false,
        stats: false,
        mission: false,
        values: false,
        team: false
    });

    // Intersection Observer for animations
    useEffect(() => {
        const observers = [];
        const sections = ['hero', 'stats', 'mission', 'values', 'team'];

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setIsVisible(prev => ({ ...prev, [section]: true }));
                        }
                    },
                    { threshold: 0.3 }
                );
                observer.observe(element);
                observers.push(observer);
            }
        });

        return () => observers.forEach(observer => observer.disconnect());
    }, []);

    // Background Web Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles = [];
        const particleCount = 70;
        const maxDistance = 120;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                size: Math.random() * 2 + 0.5
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                particle.y = Math.max(0, Math.min(canvas.height, particle.y));
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.2;
                        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach(particle => {
                ctx.fillStyle = 'rgba(168, 85, 247, 0.5)';
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
                ctx.shadowBlur = 10;
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

    const stats = [
        { icon: Users, number: '500+', label: 'Happy Clients', color: 'from-blue-500 to-cyan-500' },
        { icon: Award, number: '10+', label: 'Years Experience', color: 'from-purple-500 to-pink-500' },
        { icon: Clock, number: '1000+', label: 'Projects Completed', color: 'from-green-500 to-emerald-500' },
        { icon: Globe, number: '10+', label: 'Countries Served', color: 'from-orange-500 to-red-500' }
    ];

    const values = [
        {
            icon: Target,
            title: 'Excellence',
            description: 'We strive for perfection in every project, delivering solutions that exceed expectations and drive real results.',
            color: 'from-indigo-500 to-purple-600'
        },
        {
            icon: Lightbulb,
            title: 'Innovation',
            description: 'Embracing cutting-edge technologies and creative approaches to solve complex challenges and stay ahead.',
            color: 'from-purple-500 to-pink-600'
        },
        {
            icon: Heart,
            title: 'Integrity',
            description: 'Building trust through transparency, honest communication, and ethical business practices in everything we do.',
            color: 'from-pink-500 to-rose-600'
        },
        {
            icon: Zap,
            title: 'Agility',
            description: 'Adapting quickly to changing needs and market trends while maintaining quality and delivering on time.',
            color: 'from-cyan-500 to-blue-600'
        }
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
            {/* Animated Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-40"
                style={{ zIndex: 1 }}
            />
            
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-purple-900/30" style={{ zIndex: 2 }} />
            
            <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div id="hero" className={`text-center mb-20 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                            <span className="bg-gradient-to-r from-white via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                                About Projukti Sheba
                            </span>
                        </h2>
                        <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6">
                                We are a leading technology solutions provider, dedicated to transforming businesses 
                                through innovative software development, cutting-edge web solutions, professional video editing, 
                                and strategic social media campaigns.
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Since our inception, we've been at the forefront of digital innovation, 
                                helping companies worldwide achieve their technological goals and drive sustainable growth.
                            </p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div id="stats" className={`mb-20 transition-all duration-1000 delay-200 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => {
                                const StatIcon = stat.icon;
                                return (
                                    <div 
                                        key={index} 
                                        className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl hover:scale-105 transition-all duration-500 group"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className={`bg-gradient-to-r ${stat.color} rounded-xl p-4 mb-6 w-fit mx-auto group-hover:scale-110 transition-transform duration-300`}>
                                            <StatIcon className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                                                {stat.number}
                                            </h3>
                                            <p className="text-gray-400 font-medium">{stat.label}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mission Section */}
                    <div id="mission" className={`mb-20 transition-all duration-1000 delay-400 ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Our Mission
                                    </span>
                                </h3>
                                <div className="space-y-6">
                                    <p className="text-lg text-gray-300 leading-relaxed">
                                        To empower businesses with cutting-edge technology solutions that drive growth, 
                                        enhance efficiency, and create meaningful digital experiences that connect 
                                        companies with their audiences.
                                    </p>
                                    <p className="text-lg text-gray-300 leading-relaxed">
                                        We believe in the transformative power of technology and strive to make 
                                        advanced digital solutions accessible to businesses of all sizes, 
                                        helping them thrive in an increasingly connected world.
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <button className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-500 shadow-xl hover:shadow-purple-500/50 transform hover:scale-105 border border-purple-500/30 backdrop-blur-sm overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                                        <span className="relative z-10">Learn More About Us</span>
                                    </button>
                                </div>
                            </div>
                            <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl">
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-3">
                                            <Target className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="text-xl font-semibold text-white">Our Vision</h4>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        To become the global leader in innovative technology solutions, 
                                        setting industry standards for quality, creativity, and client satisfaction 
                                        while fostering a culture of continuous learning and technological advancement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Values Section */}
                    <div id="values" className={`mb-20 transition-all duration-1000 delay-600 ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="text-center mb-16">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    Our Core Values
                                </span>
                            </h3>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                The principles that guide everything we do and shape our company culture
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => {
                                const ValueIcon = value.icon;
                                return (
                                    <div 
                                        key={index}
                                        className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl hover:scale-105 transition-all duration-500 group"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className={`bg-gradient-to-r ${value.color} rounded-xl p-4 mb-6 w-fit mx-auto group-hover:scale-110 transition-transform duration-300`}>
                                            <ValueIcon className="w-8 h-8 text-white" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-4 text-center group-hover:text-purple-300 transition-colors duration-300">
                                            {value.title}
                                        </h4>
                                        <p className="text-gray-300 text-center leading-relaxed text-sm">
                                            {value.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Team Section */}
                    <div id="team" className={`transition-all duration-1000 delay-800 ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
                            <div className="text-center mb-12">
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                                        Why Choose Us?
                                    </span>
                                </h3>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-3 w-fit">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white">Expert Team</h4>
                                    <p className="text-gray-300 leading-relaxed">
                                        Our team consists of highly skilled professionals with years of experience 
                                        in their respective fields, committed to delivering excellence.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-3 w-fit">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white">Proven Track Record</h4>
                                    <p className="text-gray-300 leading-relaxed">
                                        With over 15 years in the industry and 1000+ successful projects, 
                                        we have the experience to handle any challenge.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl p-3 w-fit">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white">Cutting-Edge Technology</h4>
                                    <p className="text-gray-300 leading-relaxed">
                                        We stay up-to-date with the latest technologies and industry trends 
                                        to provide you with the most advanced solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" style={{ zIndex: 2 }}></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', zIndex: 2 }}></div>
            <div className="absolute top-1/2 left-20 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s', zIndex: 2 }}></div>
        </div>
    );
};

export default About;
import React from 'react';
import { Users, Award, Clock, Globe, Target, Lightbulb, Heart, Zap } from 'lucide-react';
import OurTeam from '../../comopnents/OurTeam/OurTeam';

const About = () => {
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
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-purple-900/30" />
            
            <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
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
                    <div className="mb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => {
                                const StatIcon = stat.icon;
                                return (
                                    <div 
                                        key={index} 
                                        className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl hover:scale-105 group"
                                    >
                                        <div className={`bg-gradient-to-r ${stat.color} rounded-xl p-4 mb-6 w-fit mx-auto group-hover:scale-110`}>
                                            <StatIcon className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-purple-300">
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
                    <div className="mb-20">
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
                                    <button className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-xl hover:shadow-purple-500/50 hover:scale-105 border border-purple-500/30 backdrop-blur-sm overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 transform -translate-x-full group-hover:translate-x-0"></div>
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
                    <div className="mb-20">
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
                                        className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl hover:scale-105 group"
                                    >
                                        <div className={`bg-gradient-to-r ${value.color} rounded-xl p-4 mb-6 w-fit mx-auto group-hover:scale-110`}>
                                            <ValueIcon className="w-8 h-8 text-white" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-4 text-center group-hover:text-purple-300">
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
                    <div>
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
                <OurTeam></OurTeam>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-20 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"></div>
        </div>
    );
};

export default About;
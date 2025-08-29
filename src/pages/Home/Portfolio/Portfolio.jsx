import React, { useState } from 'react';
import { Code, Globe, Video, Megaphone, ExternalLink, Calendar, User, Tag } from 'lucide-react';
import FancyButton from '../../../comopnents/sharedItems/FancyButtons/FancyButton';

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 1,
            title: "E-commerce Management System",
            category: "software",
            client: "TechMart BD",
            date: "2024",
            image: "/api/placeholder/400/250",
            description: "Complete e-commerce solution with inventory management, payment gateway integration, and analytics dashboard.",
            technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
            features: ["Real-time inventory", "Multi-payment gateway", "Admin dashboard", "Customer portal"],
            status: "Completed"
        },
        {
            id: 2,
            title: "Corporate Website Redesign",
            category: "website",
            client: "Dhaka Industries",
            date: "2024",
            image: "/api/placeholder/400/250",
            description: "Modern, responsive corporate website with CMS integration and SEO optimization.",
            technologies: ["Next.js", "Tailwind CSS", "Strapi CMS", "Vercel"],
            features: ["Responsive design", "SEO optimized", "Content management", "Fast loading"],
            status: "Completed"
        },
        {
            id: 3,
            title: "Product Launch Campaign",
            category: "video",
            client: "Fresh Foods Ltd",
            date: "2024",
            image: "/api/placeholder/400/250",
            description: "Complete video campaign including promotional videos, social media content, and brand storytelling.",
            technologies: ["Premiere Pro", "After Effects", "Cinema 4D", "DaVinci Resolve"],
            features: ["4K production", "Motion graphics", "Color grading", "Multi-format delivery"],
            status: "Completed"
        },
        {
            id: 4,
            title: "Social Media Marketing Campaign",
            category: "ads",
            client: "Style Fashion",
            date: "2024",
            image: "/api/placeholder/400/250",
            description: "Comprehensive social media advertising campaign across Facebook, Instagram, and Google Ads.",
            technologies: ["Facebook Ads Manager", "Google Ads", "Analytics", "Canva Pro"],
            features: ["Audience targeting", "A/B testing", "Performance tracking", "ROI optimization"],
            status: "Ongoing"
        },
        {
            id: 5,
            title: "Restaurant POS System",
            category: "software",
            client: "Spice Garden",
            date: "2023",
            image: "/api/placeholder/400/250",
            description: "Custom point-of-sale system with kitchen display, inventory tracking, and sales reporting.",
            technologies: ["Vue.js", "Laravel", "MySQL", "Socket.io"],
            features: ["Kitchen integration", "Inventory sync", "Sales analytics", "Multi-device support"],
            status: "Completed"
        },
        {
            id: 6,
            title: "Real Estate Portal",
            category: "website",
            client: "Property Plus",
            date: "2023",
            image: "/api/placeholder/400/250",
            description: "Property listing website with advanced search, virtual tours, and lead management.",
            technologies: ["React", "Express.js", "PostgreSQL", "AWS S3"],
            features: ["Advanced search", "Virtual tours", "Lead management", "Mobile app"],
            status: "Completed"
        }
    ];

    const categories = [
        { key: 'all', label: 'All Projects', icon: <Tag className="w-4 h-4" /> },
        { key: 'software', label: 'Software', icon: <Code className="w-4 h-4" /> },
        { key: 'website', label: 'Website', icon: <Globe className="w-4 h-4" /> },
        { key: 'video', label: 'Video Editing', icon: <Video className="w-4 h-4" /> },
        { key: 'ads', label: 'Social Ads', icon: <Megaphone className="w-4 h-4" /> }
    ];

    const filteredProjects = activeTab === 'all' 
        ? projects 
        : projects.filter(project => project.category === activeTab);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-custom-gradient text-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 ">
                        Our Portfolio
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Explore our successful projects and see how we've helped businesses achieve their digital goals
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.key}
                            onClick={() => setActiveTab(category.key)}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                                activeTab === category.key
                                    ? 'bg-custom-gradient shadow-lg'
                                    : 'backdrop-blur-md bg-black/20 border border-gray-700 hover:bg-black/30'
                            }`}
                        >
                            {category.icon}
                            <span className="hidden sm:inline">{category.label}</span>
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="backdrop-blur-lg bg-custom-gradient rounded-2xl border border-white/10 shadow-2xl overflow-hidden hover:bg-black/50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-2"
                            style={{
                                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                            }}
                        >
                            {/* Project Image */}
                            <div className="relative h-48 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                                <div className="text-6xl opacity-20">
                                    {project.category === 'software' && <Code />}
                                    {project.category === 'website' && <Globe />}
                                    {project.category === 'video' && <Video />}
                                    {project.category === 'ads' && <Megaphone />}
                                </div>
                                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                                    project.status === 'Completed' 
                                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                        : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                }`}>
                                    {project.status}
                                </div>
                            </div>

                            {/* Project Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-blue-400 font-medium capitalize">
                                        {project.category}
                                    </span>
                                    <span className="text-sm text-gray-400 flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {project.date}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold mb-2 text-white">
                                    {project.title}
                                </h3>
                                
                                <div className="flex items-center text-gray-400 text-sm mb-3">
                                    <User className="w-3 h-3 mr-1" />
                                    {project.client}
                                </div>
                                
                                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-2 py-1 bg-black/30 rounded-lg text-xs text-gray-300 border border-gray-700"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="px-2 py-1 bg-black/30 rounded-lg text-xs text-gray-300 border border-gray-700">
                                            +{project.technologies.length - 3} more
                                        </span>
                                    )}
                                </div>

                                {/* Action Button */}
                                <FancyButton
                                    onClick={() => setSelectedProject(project)}
                                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
                                >
                                    <div className='flex items-center justify-center gap-4'>
                                        <span className="text-sm font-medium">View Details</span>
                                    <ExternalLink className="w-4 h-4" />
                                    </div>
                                </FancyButton>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Project Modal */}
                {selectedProject && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="backdrop-blur-lg bg-black/60 rounded-2xl border border-white/10 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-2">
                                            {selectedProject.title}
                                        </h3>
                                        <div className="flex items-center space-x-4 text-gray-400">
                                            <span className="flex items-center">
                                                <User className="w-4 h-4 mr-1" />
                                                {selectedProject.client}
                                            </span>
                                            <span className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {selectedProject.date}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs ${
                                                selectedProject.status === 'Completed' 
                                                    ? 'bg-green-500/20 text-green-300' 
                                                    : 'bg-yellow-500/20 text-yellow-300'
                                            }`}>
                                                {selectedProject.status}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="text-gray-400 hover:text-white transition-colors text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-xl font-semibold mb-4 text-white">Project Overview</h4>
                                        <p className="text-gray-300 mb-6 leading-relaxed">
                                            {selectedProject.description}
                                        </p>

                                        <h4 className="text-xl font-semibold mb-4 text-white">Key Features</h4>
                                        <ul className="space-y-2">
                                            {selectedProject.features.map((feature, index) => (
                                                <li key={index} className="flex items-center text-gray-300">
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-semibold mb-4 text-white">Technologies Used</h4>
                                        <div className="flex flex-wrap gap-3 mb-6">
                                            {selectedProject.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-2 bg-black/30 rounded-lg text-sm text-gray-300 border border-gray-700"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                                                <span>View Live Project</span>
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                            <button className="w-full px-6 py-3 backdrop-blur-md bg-black/30 border border-gray-700 hover:bg-black/50 rounded-lg transition-all">
                                                Contact for Similar Project
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
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
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
};

export default Portfolio;
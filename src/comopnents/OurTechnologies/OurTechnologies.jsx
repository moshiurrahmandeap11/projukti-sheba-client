import React, { useState } from 'react';
import { FaAws, FaMicrosoft } from 'react-icons/fa';
import {
    SiGo, SiNodedotjs, SiLaravel, SiPython, SiDjango, SiPhp, SiDotnet,
    SiJavascript, SiReact, SiAngular, SiNextdotjs, SiVuedotjs, SiMui, SiTailwindcss, SiBootstrap,
    SiFlutter, SiKotlin,
    SiFirebase, SiPostgresql, SiMysql, SiMongodb,
      SiGooglecloud, SiDocker,
    SiFigma, SiAdobeindesign, SiSketch,
    SiWordpress, SiJoomla, SiShopify
} from 'react-icons/si';

const technologies = {
    backend: [
        { name: 'Golang', icon: <SiGo className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-cyan-400" /> },
        { name: 'Node.js', icon: <SiNodedotjs className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-500" /> },
        { name: 'Laravel', icon: <SiLaravel className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-red-500" /> },
        { name: 'Python', icon: <SiPython className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-yellow-400" /> },
        { name: 'Django', icon: <SiDjango className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-800" /> },
        { name: 'Php', icon: <SiPhp className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-indigo-500" /> },
        { name: '.Net', icon: <SiDotnet className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-purple-600" /> },
    ],
    frontend: [
        { name: 'JavaScript', icon: <SiJavascript className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-yellow-400" /> },
        { name: 'React', icon: <SiReact className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-cyan-400" /> },
        { name: 'Angular', icon: <SiAngular className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-red-600" /> },
        { name: 'Next.js', icon: <SiNextdotjs className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-black" /> },
        { name: 'Vue.js', icon: <SiVuedotjs className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-500" /> },
        { name: 'Material UI', icon: <SiMui className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-blue-500" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-cyan-500" /> },
        { name: 'Bootstrap', icon: <SiBootstrap className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-purple-600" /> },
    ],
    mobile: [
        { name: 'Flutter', icon: <SiFlutter className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-cyan-500" /> },
        { name: 'React Native', icon: <SiReact className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-cyan-400" /> },
        { name: 'Kotlin', icon: <SiKotlin className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-purple-500" /> },
    ],
    database: [
        { name: 'Firebase', icon: <SiFirebase className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-yellow-500" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-blue-600" /> },
        { name: 'MySQL', icon: <SiMysql className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-blue-500" /> },
        { name: 'MongoDB', icon: <SiMongodb className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-600" /> },
    ],
    devops: [
        { name: 'AWS', icon: <FaAws className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-orange-500" /> },
        { name: 'Azure', icon: <FaMicrosoft className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-blue-500" /> },
        { name: 'Google Cloud', icon: <SiGooglecloud className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-blue-500" /> },
        { name: 'Docker', icon: <SiDocker className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-blue-400" /> },
    ],
    uiux: [
        { name: 'Figma', icon: <SiFigma className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16" /> },
        { name: 'Adobe InDesign', icon: <SiAdobeindesign className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-pink-600" /> },
        { name: 'Sketch', icon: <SiSketch className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-yellow-500" /> },
    ],
    cms: [
        { name: 'Wordpress', icon: <SiWordpress className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-blue-700" /> },
        { name: 'Joomla', icon: <SiJoomla className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-blue-900" /> },
        { name: 'Shopify', icon: <SiShopify className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-500" /> },
    ],
};

const OurTechnologies = () => {
    const [activeTab, setActiveTab] = useState('backend');

    const tabs = [
        { key: 'backend', label: 'Back-End' },
        { key: 'frontend', label: 'Front-End' },
        { key: 'mobile', label: 'Mobile' },
        { key: 'database', label: 'Database' },
        { key: 'devops', label: 'DevOps' },
        { key: 'uiux', label: 'UI/UX' },
        { key: 'cms', label: 'CMS' },
    ];

    return (
        <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-black">
                    OUR TECHNOLOGIES
                </h3>
                <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
                    Powering Digital Excellence
                </h2>
                <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-gray-500 px-4">
                    Driven by innovation, we build digital solutions using cutting-edge technologies to fuel business growth.
                </p>

                {/* --- Tabs Navigation - Responsive Grid --- */}
                <div className="mt-8 sm:mt-10 px-2">
                    <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`
                                    px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-full font-medium 
                                    text-xs sm:text-sm transition-all duration-300 
                                    flex items-center justify-center
                                    whitespace-nowrap overflow-hidden min-h-[44px]
                                    
                                    ${activeTab === tab.key
                                        ? 'bg-white text-red-600 font-medium shadow-lg transform '
                                        : 'bg-white text-black hover:shadow-md'
                                    }
                                `}
                                title={tab.label}
                            >
                                <span className="truncate text-xs sm:text-sm">
                                    {tab.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Technologies Grid --- */}
                <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6 lg:gap-8">
                    {technologies[activeTab].map((tech) => (
                        <div 
                            key={tech.name} 
                            className="flex flex-col items-center justify-center gap-2 sm:gap-3 transition-transform duration-300 hover:scale-105"
                        >
                            {tech.icon}
                            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurTechnologies;
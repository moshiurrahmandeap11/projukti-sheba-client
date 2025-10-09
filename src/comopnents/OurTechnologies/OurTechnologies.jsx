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
        { name: 'Golang', icon: <SiGo className="h-16 w-16 text-cyan-400" /> },
        { name: 'Node.js', icon: <SiNodedotjs className="h-16 w-16 text-green-500" /> },
        { name: 'Laravel', icon: <SiLaravel className="h-16 w-16 text-red-500" /> },
        { name: 'Python', icon: <SiPython className="h-16 w-16 text-yellow-400" /> },
        { name: 'Django', icon: <SiDjango className="h-16 w-16 text-green-800" /> },
        { name: 'Php', icon: <SiPhp className="h-16 w-16 text-indigo-500" /> },
        { name: '.Net', icon: <SiDotnet className="h-16 w-16 text-purple-600" /> },
    ],
    frontend: [
        { name: 'JavaScript', icon: <SiJavascript className="h-16 w-16 text-yellow-400" /> },
        { name: 'React', icon: <SiReact className="h-16 w-16 text-cyan-400" /> },
        { name: 'Angular', icon: <SiAngular className="h-16 w-16 text-red-600" /> },
        { name: 'Next.js', icon: <SiNextdotjs className="h-16 w-16 text-black" /> },
        { name: 'Vue.js', icon: <SiVuedotjs className="h-16 w-16 text-green-500" /> },
        { name: 'Material UI', icon: <SiMui className="h-16 w-16 text-blue-500" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="h-16 w-16 text-cyan-500" /> },
        { name: 'Bootstrap', icon: <SiBootstrap className="h-16 w-16 text-purple-600" /> },
    ],
    mobile: [
        { name: 'Flutter', icon: <SiFlutter className="h-16 w-16 text-cyan-500" /> },
        { name: 'React Native', icon: <SiReact className="h-16 w-16 text-cyan-400" /> },
        { name: 'Kotlin', icon: <SiKotlin className="h-16 w-16 text-purple-500" /> },
    ],
    database: [
        { name: 'Firebase', icon: <SiFirebase className="h-16 w-16 text-yellow-500" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql className="h-16 w-16 text-blue-600" /> },
        { name: 'MySQL', icon: <SiMysql className="h-16 w-16 text-blue-500" /> },
        { name: 'MongoDB', icon: <SiMongodb className="h-16 w-16 text-green-600" /> },
    ],
    devops: [
        { name: 'AWS', icon: <FaAws className="h-16 w-16 text-orange-500" /> },
        { name: 'Azure', icon: <FaMicrosoft className="h-16 w-16 text-blue-500" /> },
        { name: 'Google Cloud', icon: <SiGooglecloud className="h-16 w-16 text-blue-500" /> },
        { name: 'Docker', icon: <SiDocker className="h-16 w-16 text-blue-400" /> },
    ],
    uiux: [
        { name: 'Figma', icon: <SiFigma className="h-16 w-16" /> },
        { name: 'Adobe InDesign', icon: <SiAdobeindesign className="h-16 w-16 text-pink-600" /> },
        { name: 'Sketch', icon: <SiSketch className="h-16 w-16 text-yellow-500" /> },
    ],
    cms: [
        { name: 'Wordpress', icon: <SiWordpress className="h-16 w-16 text-blue-700" /> },
        { name: 'Joomla', icon: <SiJoomla className="h-16 w-16 text-blue-900" /> },
        { name: 'Shopify', icon: <SiShopify className="h-16 w-16 text-green-500" /> },
    ],
};

const OurTechnologies = () => {
    const [activeTab, setActiveTab] = useState('backend');

    const tabs = [
        { key: 'backend', label: 'Back-End' },
        { key: 'frontend', label: 'Front-End' },
        { key: 'mobile', label: 'Mobile' },
        { key: 'database', label: 'Databases' },
        { key: 'devops', label: 'DevOps' },
        { key: 'uiux', label: 'UI/UX' },
        { key: 'cms', label: 'CMS' },
    ];

    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-black">
                    OUR TECHNOLOGIES
                </h3>
                <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                    Powering Digital Excellence
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                    Driven by innovation, we build digital solutions using cutting-edge technologies to fuel business growth.
                </p>

                {/* --- Tabs Navigation --- */}
                <div className="mt-10 flex flex-wrap justify-center gap-2 md:gap-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-6 sm:px-6 cursor-pointer py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300  ${
                                activeTab === tab.key
                                    ? 'bg-white text-red-600 font-medium shadow-lg transform scale-105'
                                    : 'bg-white text-black'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* --- Technologies Grid --- */}
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-6 gap-y-10">
                    {technologies[activeTab].map((tech) => (
                        <div key={tech.name} className="flex flex-col items-center justify-center gap-3 transition-transform duration-300 hover:scale-110">
                            {tech.icon}
                            <span className="text-md font-medium text-gray-700">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurTechnologies;
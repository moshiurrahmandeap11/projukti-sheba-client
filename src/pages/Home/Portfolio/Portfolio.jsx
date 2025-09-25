import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import {
  Code,
  Globe,
  Video,
  Megaphone,
  ExternalLink,
  Calendar,
  User,
  Tag,
} from "lucide-react";
import FancyButton from "../../../comopnents/sharedItems/FancyButtons/FancyButton";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define categories with icons
  const categories = [
    { key: "all", label: "All Projects", icon: <Tag className="w-4 h-4" /> },
    { key: "software", label: "Software", icon: <Code className="w-4 h-4" /> },
    { key: "website", label: "Website", icon: <Globe className="w-4 h-4" /> },
    {
      key: "video",
      label: "Video Editing",
      icon: <Video className="w-4 h-4" />,
    },
    {
      key: "ads",
      label: "Social Ads",
      icon: <Megaphone className="w-4 h-4" />,
    },
  ];

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://projukti-sheba-server.onrender.com/portfolio");
        if (response.data.success) {
          setProjects(response.data.data || response.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch projects");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again.");
        toast.error("Failed to load projects. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter projects based on active tab
  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  return (
    <section className="py-4 px-4  sm:px-6 lg:px-8 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative z-10 max-w-7xl mx-auto  p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-black">Our Portfolio</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black/90 max-w-3xl mx-auto leading-relaxed">
            Explore our successful projects and see how we've helped businesses
            achieve their digital goals
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveTab(category.key)}
              className={`flex items-center text-white cursor-pointer space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm text-xs sm:text-sm font-medium ${
                activeTab === category.key
                  ? "bg-red-600 scale-105 shadow-xl"
                  : "bg-red-400/70 "
              }`}
            >
              {category.icon}
              <span className="sm:inline">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-8 sm:py-12">
            <svg
              className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-[#008080]"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-8 sm:py-12 text-red-400 text-base sm:text-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-8 sm:py-12 text-gray-400 text-base sm:text-lg">
            <p>No projects found for this category.</p>
          </div>
        )}
        {!isLoading && !error && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project._id || project.id}
                className="backdrop-blur-lg bg-transparent rounded-2xl border border-[rgba(255,255,255,0.1)] overflow-hidden hover:bg-[#ccefff]/80 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Project Image */}
                <div className="relative h-40 sm:h-48 bg-[rgba(10,25,47,0.7)] backdrop-blur-sm flex items-center justify-center">
                  <img
                    src={project.image || "/api/placeholder/400/250"}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="text-4xl sm:text-6xl opacity-20 text-[rgba(0,120,160,0.7)]">
                    {project.category === "software" && <Code />}
                    {project.category === "website" && <Globe />}
                    {project.category === "video" && <Video />}
                    {project.category === "ads" && <Megaphone />}
                  </div>
                  <div
                    className={`absolute top-2 sm:top-3 right-2 sm:right-3 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === "Completed"
                        ? "bg-[rgba(34,197,94,0.2)] text-[rgba(34,197,94,0.8)] border border-[rgba(34,197,94,0.3)]"
                        : "bg-[rgba(234,179,8,0.2)] text-[rgba(234,179,8,0.8)] border border-[rgba(234,179,8,0.3)]"
                    }`}
                  >
                    {project.status}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-xs sm:text-sm text-[rgba(0,120,160,1)] font-medium capitalize">
                      {project.category}
                    </span>
                    <span className="text-xs sm:text-sm text-black font-medium flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {project.date}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-black">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-black text-xs sm:text-sm mb-2 sm:mb-3">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {project.client}
                  </div>
                  <p className="text-black text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-[rgba(255,255,255,0.05)] rounded-lg text-xs text-black border border-[rgba(255,255,255,0.1)] backdrop-blur-sm hover:border-[rgba(0,120,160,0.5)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-[rgba(255,255,255,0.05)] rounded-lg text-xs text-black border border-[rgba(255,255,255,0.1)] backdrop-blur-sm hover:border-[rgba(0,120,160,0.5)]">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="relative group bg-purple-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full cursor-pointer text-white text-xs sm:text-sm font-medium overflow-hidden"
                  >
                    <span className="relative z-10">View Details</span>
                    <div
                      className="absolute inset-0 bg-[#954cc9] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"
                    ></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-2xl border border-[rgba(255,255,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.2)] max-w-full sm:max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 text-gray-400 text-xs sm:text-sm">
                      <span className="flex items-center mb-2 sm:mb-0">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {selectedProject.client}
                      </span>
                      <span className="flex items-center mb-2 sm:mb-0">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {selectedProject.date}
                      </span>
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs ${
                          selectedProject.status === "Completed"
                            ? "bg-[rgba(34,197,94,0.2)] text-[rgba(34,197,94,0.8)]"
                            : "bg-[rgba(234,179,8,0.2)] text-[rgba(234,179,8,0.8)]"
                        }`}
                      >
                        {selectedProject.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white transition-colors text-xl sm:text-2xl mt-2 sm:mt-0"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  <div className="space-y-4 sm:space-y-6">
                    <h4 className="text-lg sm:text-xl font-semibold text-white">
                      Project Overview
                    </h4>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {selectedProject.description}
                    </p>

                    <h4 className="text-lg sm:text-xl font-semibold text-white">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-300 text-sm sm:text-base"
                        >
                          <div className="w-2 h-2 bg-[rgba(0,120,160,0.7)] rounded-full mr-2 sm:mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <h4 className="text-lg sm:text-xl font-semibold text-white">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 sm:px-3 py-1 sm:py-2 bg-[rgba(255,255,255,0.05)] rounded-lg text-xs sm:text-sm text-gray-300 border border-[rgba(255,255,255,0.1)] backdrop-blur-sm hover:border-[rgba(0,120,160,0.5)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <button className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-xs sm:text-sm">
                        <span>View Live Project</span>
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(0,120,160,0.5)] rounded-lg transition-all text-xs sm:text-sm">
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
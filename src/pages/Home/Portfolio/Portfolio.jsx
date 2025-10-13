import React, { useState, useEffect } from "react";
import {
  Code,
  Globe,
  Video,
  Megaphone,
  ExternalLink,
  Calendar,
  User,
  Tag,
  Github,
  Maximize2
} from "lucide-react";
import FancyButton from "../../../comopnents/sharedItems/FancyButtons/FancyButton";
import axiosInstance from "../../../hooks/AxiosInstance/AxiosInstance";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedImage, setExpandedImage] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/portfolio");
        if (response.data.success) {
          setProjects(response.data.data);
        } else {
          throw new Error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Tabs including "all"
  const categories = [
    { key: "all", label: "All Projects", icon: <Megaphone className="w-4 h-4" /> },
    { key: "erp", label: "ERP Solutions", icon: <Tag className="w-4 h-4" /> },
    { key: "software", label: "Business Software", icon: <Code className="w-4 h-4" /> },
    { key: "e-commerce", label: "E-Commerce", icon: <Globe className="w-4 h-4" /> },
    { key: "website", label: "Websites", icon: <Globe className="w-4 h-4" /> },
    { key: "mobile", label: "Mobile Apps", icon: <Video className="w-4 h-4" /> },
  ];

  // Filter projects
  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // High quality placeholder images for different categories
  const getPlaceholderImage = (category) => {
    const placeholders = {
      'erp': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'software': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'e-commerce': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'website': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'mobile': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    };
    return placeholders[category] || 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
  };

  const baseImageUrl = axiosInstance.defaults.baseURL;

  return (
    <section className="py-8 bg-gray-50 px-3 sm:px-4 lg:px-6 xl:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 tracking-wide">
            Our Portfolio
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg px-4">
            Explore some of our best works that helped businesses grow and
            transform digitally.
          </p>
        </div>

        {/* Filter Tabs - Responsive Grid */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveTab(category.key)}
                className={`
                  px-3 sm:px-4 py-2.5 sm:py-3 rounded-full font-medium 
                  text-sm sm:text-base transition-all duration-300 
                  flex items-center justify-center gap-2
                  whitespace-nowrap w-full
                  ${activeTab === category.key
                    ? "bg-white text-red-600 shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:shadow-md hover:text-gray-900"
                  }
                `}
              >
                <span className="flex-shrink-0">{category.icon}</span>
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-500 group"
              >
                {/* Image Container with Overlay */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image ? `${baseImageUrl}${project.image}` : getPlaceholderImage(project.category)}
                    alt={project.title}
                    className="w-full h-48 sm:h-56 lg:h-64 object-contain bg-gray-100 group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = getPlaceholderImage(project.category);
                    }}
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white/90 hover:bg-white text-gray-900 px-3 sm:px-4 py-2 sm:py-3 rounded-full font-semibold flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      View Project
                    </button>
                  </div>

                  {/* Status Badges */}
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1 sm:gap-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 sm:px-3 sm:py-2 rounded-full backdrop-blur-sm ${
                        project.status === "Completed"
                          ? "bg-green-500/90 text-white"
                          : project.status === "In Progress"
                          ? "bg-yellow-500/90 text-white"
                          : "bg-blue-500/90 text-white"
                      }`}
                    >
                      {project.status}
                    </span>
                    {project.featured && (
                      <span className="bg-red-500/90 text-white text-xs font-semibold px-2 py-1 sm:px-3 sm:py-2 rounded-full backdrop-blur-sm">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-2 sm:mb-3">
                    <span className="capitalize text-gray-600 bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs">
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {formatDate(project.projectDate)}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 text-gray-900 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Client */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium truncate">{project.client}</span>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-700 font-medium truncate max-w-[120px]"
                        title={tech}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs bg-gray-100 border border-gray-300 rounded-full px-2 py-1 text-gray-600">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Button */}
                  <FancyButton 
                    onClick={() => setSelectedProject(project)}
                    className="w-full text-sm py-2 px-4"
                  >
                    View Details
                  </FancyButton>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Projects State */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="text-4xl sm:text-6xl mb-4">📁</div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              No Projects Found
            </h3>
            <p className="text-gray-600 text-sm sm:text-lg px-4">
              {activeTab === 'all' 
                ? 'No portfolio projects available yet. Check back soon!' 
                : `No projects found in ${categories.find(cat => cat.key === activeTab)?.label} category.`
              }
            </p>
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex justify-center items-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl max-w-4xl lg:max-w-6xl w-full max-h-[95vh] overflow-y-auto">
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-10 bg-white/90 hover:bg-white text-gray-900 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  ×
                </button>

                {/* Project Image with Expand Option */}
                <div className="relative">
                  <img
                    src={selectedProject.image ? `${baseImageUrl}${selectedProject.image}` : getPlaceholderImage(selectedProject.category)}
                    alt={selectedProject.title}
                    className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-t-xl sm:rounded-t-2xl lg:rounded-t-3xl"
                    onError={(e) => {
                      e.target.src = getPlaceholderImage(selectedProject.category);
                    }}
                  />
                  <button
                    onClick={() => setExpandedImage(selectedProject.image ? `${baseImageUrl}${selectedProject.image}` : getPlaceholderImage(selectedProject.category))}
                    className="absolute top-3 left-3 sm:top-4 sm:left-4 lg:top-6 lg:left-6 bg-black/50 hover:bg-black/70 text-white w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  
                  {/* Badges */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6 flex flex-col sm:flex-row gap-2">
                    {selectedProject.featured && (
                      <span className="bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 sm:py-2 rounded-full shadow-lg">
                        ⭐ Featured
                      </span>
                    )}
                    <span className={`text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 sm:py-2 rounded-full shadow-lg ${
                      selectedProject.status === "Completed"
                        ? "bg-green-500 text-white"
                        : selectedProject.status === "In Progress"
                        ? "bg-yellow-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
                    {selectedProject.title}
                  </h3>
                  
                  {/* Project Meta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg sm:rounded-xl lg:rounded-2xl">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-600" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Client</p>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{selectedProject.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Tag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-600" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Category</p>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base capitalize">{selectedProject.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-600" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Project Date</p>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{formatDate(selectedProject.projectDate)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6 sm:mb-8">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Project Overview</h4>
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Features & Technologies Side by Side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
                    {/* Key Features */}
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                        Key Features
                      </h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {selectedProject.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {selectedProject.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 rounded-lg sm:rounded-xl text-gray-800 font-medium text-xs sm:text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
                    {selectedProject.liveUrl && (
                      <FancyButton 
                        onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                        className="flex items-center justify-center gap-2 text-sm sm:text-base py-2 sm:py-3"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        View Live Project
                      </FancyButton>
                    )}
                    {selectedProject.githubUrl && (
                      <FancyButton 
                        onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                        className="flex items-center justify-center gap-2 text-sm sm:text-base py-2 sm:py-3"
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                        View Code
                      </FancyButton>
                    )}
                    <FancyButton 
                      onClick={() => window.open('/contact', '_self')}
                      className="flex items-center justify-center gap-2 text-sm sm:text-base py-2 sm:py-3"
                    >
                      Get Similar Project
                    </FancyButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expanded Image Modal */}
        {expandedImage && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex justify-center items-center z-[60] p-2 sm:p-4">
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-10 bg-white/10 hover:bg-white/20 text-white w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-bold transition-all duration-300"
            >
              ×
            </button>
            <img
              src={expandedImage}
              alt="Expanded view"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
import React, { useState } from "react";
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

  // Dummy Projects
  const projects = [
    {
      id: 1,
      title: "Inventory Management System",
      category: "software",
      client: "TechCore Ltd.",
      date: "2025-08-15",
      status: "Completed",
      description:
        "A complete inventory and billing system designed to automate stock tracking, order management, and real-time sales analytics.",
      features: [
        "Real-time product tracking",
        "Automated invoice generation",
        "Role-based access control",
        "Detailed analytics dashboard",
      ],
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      image: "https://i.postimg.cc/QMMvzhZy/Unlocking-the-Benefits-of-Inventory-Management-Software-blog-banner-image.jpg",
    },
    {
      id: 2,
      title: "School Management Software",
      category: "software",
      client: "Bright Future Academy",
      date: "2025-05-20",
      status: "Completed",
      description:
        "A digital solution for managing students, teachers, attendance, grading, and communication all in one place.",
      features: [
        "Student & teacher database",
        "Attendance & grading system",
        "Parent portal integration",
        "Report card automation",
      ],
      technologies: ["React", "Express.js", "MongoDB", "Firebase"],
      image: "https://i.postimg.cc/m2wXWJwy/Which-is-the-best-all-in-one-school-management-system-in-India.png",
    },
    {
      id: 3,
      title: "E-Commerce Website",
      category: "website",
      client: "ShopEasy BD",
      date: "2025-07-10",
      status: "Completed",
      description:
        "A full-featured eCommerce platform with secure payment gateway, product filters, and a seamless shopping experience.",
      features: [
        "Advanced product filtering",
        "Stripe payment integration",
        "Wishlist & cart system",
        "Admin dashboard",
      ],
      technologies: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
      image: "https://i.postimg.cc/tCS35jkm/business-hand-drawn-e-commerce-landing-page-23-2149600513.avif",
    },
    {
      id: 4,
      title: "Portfolio Website for Designers",
      category: "website",
      client: "CreativePixel Studio",
      date: "2025-03-25",
      status: "Completed",
      description:
        "A beautifully designed portfolio website for designers to showcase their work, skills, and experience interactively.",
      features: [
        "Responsive design",
        "Animated gallery section",
        "Dynamic CMS integration",
        "Contact form with EmailJS",
      ],
      technologies: ["React", "Framer Motion", "EmailJS", "Vite"],
      image: "https://i.postimg.cc/QCN7Q4TK/still-0881fd5ba2033c2cbc13b366c678861e.webp",
    },
  ];

  // Tabs
  const categories = [
    { key: "all", label: "All Projects", icon: <Tag className="w-4 h-4" /> },
    { key: "software", label: "Software", icon: <Code className="w-4 h-4" /> },
    { key: "website", label: "Website", icon: <Globe className="w-4 h-4" /> },
  ];

  // Filter projects
  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <section className="py-8 bg-gray-50 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-black mb-6 tracking-wide">
            Our Portfolio
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Explore some of our best works that helped businesses grow and
            transform digitally.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveTab(category.key)}
              className={`px-6 sm:px-6 cursor-pointer py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 flex justify-center items-center gap-3 ${
                activeTab === category.key
                  ? "bg-white text-red-600 font-medium shadow-lg transform scale-105"
                  : "bg-white text-black"
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <span
                  className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
                    project.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-sm mb-2 text-gray-600">
                  <span className="capitalize">{project.category}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  {project.title}
                </h3>
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 border border-gray-200 rounded-md px-2 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <FancyButton onClick={() => setSelectedProject(project)}>
                  View Details
                </FancyButton>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6 relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl"
              >
                ×
              </button>

              <h3 className="text-2xl font-bold mb-3">
                {selectedProject.title}
              </h3>
              <p className="text-gray-700 mb-4">{selectedProject.description}</p>

              <h4 className="font-semibold text-gray-900 mb-2">
                Key Features:
              </h4>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                {selectedProject.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <h4 className="font-semibold text-gray-900 mb-2">
                Technologies Used:
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 border border-gray-200 rounded-md px-2 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <FancyButton>
                  View Live <ExternalLink className="inline w-4 h-4 ml-1" />
                </FancyButton>
                <FancyButton>Contact for Similar</FancyButton>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
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

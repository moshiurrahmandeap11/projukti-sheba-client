import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { PlusCircle, Edit, Eye, Trash2, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredService, setHoveredService] = useState(null);
  const [showActions, setShowActions] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  // Fetch services from the API
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://projukti-sheba-server.onrender.com/services');
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation to Add Service page
  const handleAddService = () => {
    navigate('/dashboard/add-service');
  };

  // Handle View Service
  const handleViewService = (service) => {
    navigate(`/dashboard/services/${service._id}/view`);
    toast.success(`Viewing service: ${service.title}`);
  };

  // Handle Edit Service
  const handleEditService = (service) => {
    navigate(`/dashboard/services/${service._id}/edit`, { state: { service } });
    toast.info(`Editing service: ${service.title}`);
  };

  // Handle Delete Service
  const handleDeleteService = async (service) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${service.title}"? This action cannot be undone.`);
    
    if (!isConfirmed) return;

    try {
      setDeleting(service._id);
      await axios.delete(`https://projukti-sheba-server.onrender.com/services/${service._id}`);
      
      setServices(prevServices => prevServices.filter(s => s._id !== service._id));
      
      toast.success(`Service "${service.title}" deleted successfully!`);
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service. Please try again.');
    } finally {
      setDeleting(null);
      setShowActions(null);
    }
  };

  // Handle mouse enter
  const handleMouseEnter = (serviceId) => {
    setHoveredService(serviceId);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredService(null);
    setShowActions(null);
  };

  // Toggle actions menu
  const toggleActions = (serviceId, event) => {
    event.stopPropagation();
    setShowActions(showActions === serviceId ? null : serviceId);
  };

  // Animation variants for service cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  // Animation variants for action buttons
  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] bg-white rounded-xl border border-gray-200">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-xl border border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Header with Add Services Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-4 sm:mb-0">
            Our Services
          </h2>
          <motion.button
            onClick={handleAddService}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-purple-500/40 hover:scale-105 border border-purple-400/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle size={16} className="sm:w-5 sm:h-5" />
            <span>Add Service</span>
          </motion.button>
        </div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <p className="text-gray-500 text-center text-base sm:text-lg">
            No services available. Add a service to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                className="group relative bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:border-purple-400/50 transition-all duration-300 hover:shadow-md hover:shadow-purple-200/50"
                onMouseEnter={() => handleMouseEnter(service._id)}
                onMouseLeave={handleMouseLeave}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {/* Service Content */}
                <div className="relative">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                    {service.paragraph || 'No description available.'}
                  </p>
                  
                  {/* Service Details */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.category && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs sm:text-sm rounded-full border border-purple-300">
                        {service.category}
                      </span>
                    )}
                    {service.totalProjects && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs sm:text-sm rounded-full border border-green-300">
                        {service.totalProjects} Projects
                      </span>
                    )}
                  </div>

                  {/* Technologies */}
                  {service.technologies && service.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                      {service.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs sm:text-sm rounded border border-blue-300">
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded border border-gray-300">
                          +{service.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons - Show on hover */}
                <AnimatePresence>
                  {hoveredService === service._id && (
                    <motion.div
                      className="absolute top-4 right-4 flex space-x-2"
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <motion.button
                        onClick={() => handleViewService(service)}
                        className="p-2 bg-purple-500/80 hover:bg-purple-600 text-white rounded-full transition-all duration-200 shadow-md hover:shadow-purple-400/50"
                        title="View Service"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye size={14} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleEditService(service)}
                        className="p-2 bg-blue-500/80 hover:bg-blue-600 text-white rounded-full transition-all duration-200 shadow-md hover:shadow-blue-400/50"
                        title="Edit Service"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit size={14} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteService(service)}
                        disabled={deleting === service._id}
                        className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-all duration-200 shadow-md hover:shadow-red-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Service"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {deleting === service._id ? (
                          <div className="animate-spin rounded-full h-3.5 w-3.5 border border-white border-t-transparent"></div>
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions Dropdown - Optional, retained but hidden */}
                {hoveredService === service._id && showActions === service._id && (
                  <div className="absolute right-4 top-12 bg-white border border-gray-200 rounded-lg shadow-xl py-2 min-w-[120px] z-50">
                    <button
                      onClick={() => handleViewService(service)}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-100 transition-all duration-200"
                    >
                      <Eye size={14} />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleEditService(service)}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-all duration-200"
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteService(service)}
                      disabled={deleting === service._id}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleting === service._id ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border border-red-400 border-t-transparent"></div>
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Custom CSS for line-clamp */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
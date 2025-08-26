import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { PlusCircle, Edit, Eye, Trash2, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';

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
    // Navigate to service detail page or open modal
    navigate(`/dashboard/services/${service._id}/view`);
    toast.success(`Viewing service: ${service.title}`);
  };

  // Handle Edit Service
  const handleEditService = (service) => {
    // Navigate to edit service page
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
      
      // Remove service from local state
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

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] bg-gradient-to-br from-gray-900/80 via-slate-900/70 to-gray-900/80 backdrop-blur-lg rounded-xl border border-white/10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900/80 via-slate-900/70 to-gray-900/80 backdrop-blur-lg rounded-xl border border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto">
        {/* Header with Add Services Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Our Services
          </h2>
          <button
            onClick={handleAddService}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-purple-500/40 hover:scale-105 border border-purple-500/30 backdrop-blur-sm"
          >
            <PlusCircle size={18} />
            <span>Add Service</span>
          </button>
        </div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">
            No services available. Add a service to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="group relative bg-gradient-to-br from-gray-800/50 via-slate-800/40 to-gray-800/50 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                onMouseEnter={() => handleMouseEnter(service._id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Service Content */}
                <div className="relative">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {service.paragraph || 'No description available.'}
                  </p>
                  
                  {/* Service Details */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.category && (
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                        {service.category}
                      </span>
                    )}
                    {service.totalProjects && (
                      <span className="px-2 py-1 bg-green-600/20 text-green-300 text-xs rounded-full border border-green-500/30">
                        {service.totalProjects} Projects
                      </span>
                    )}
                  </div>

                  {/* Technologies */}
                  {service.technologies && service.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded border border-blue-500/30">
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600/20 text-gray-300 text-xs rounded border border-gray-500/30">
                          +{service.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons - Show on hover */}
                {hoveredService === service._id && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="relative">
                      <button
                        onClick={(e) => toggleActions(service._id, e)}
                        className="p-2 bg-gray-700/80 hover:bg-gray-600/80 rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-200"
                      >
                        <MoreVertical size={16} className="text-white" />
                      </button>

                      {/* Actions Dropdown */}
                      {showActions === service._id && (
                        <div className="absolute right-0 top-12 bg-gray-800/95 backdrop-blur-md border border-white/20 rounded-lg shadow-xl py-2 min-w-[120px] z-50">
                          {/* View Button */}
                          <button
                            onClick={() => handleViewService(service)}
                            className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-200"
                          >
                            <Eye size={14} />
                            <span>View</span>
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => handleEditService(service)}
                            className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-blue-600/20 transition-all duration-200"
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteService(service)}
                            disabled={deleting === service._id}
                            className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-red-600/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    </div>
                  </div>
                )}

                {/* Quick Action Buttons - Alternative approach */}
                <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={() => handleViewService(service)}
                    className="p-2 bg-purple-600/80 hover:bg-purple-500 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
                    title="View Service"
                  >
                    <Eye size={14} />
                  </button>
                  
                  <button
                    onClick={() => handleEditService(service)}
                    className="p-2 bg-blue-600/80 hover:bg-blue-500 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-blue-500/50"
                    title="Edit Service"
                  >
                    <Edit size={14} />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteService(service)}
                    disabled={deleting === service._id}
                    className="p-2 bg-red-600/80 hover:bg-red-500 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete Service"
                  >
                    {deleting === service._id ? (
                      <div className="animate-spin rounded-full h-3.5 w-3.5 border border-white border-t-transparent"></div>
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </div>
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
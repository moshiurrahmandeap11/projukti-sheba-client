import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Star,
  User,
  MapPin,
  Calendar,
  Video,
  Briefcase,
  Trash2,
  Eye,
  Loader2,
  RefreshCw,
  MessageSquare,
  Edit,
  Camera,
  Folder,
  Tag,
  Save,
  X,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [testimonialsPerPage] = useState(10);
  const [deletingTestimonial, setDeletingTestimonial] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch testimonials
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://projukti-sheba-server.onrender.com/testimonials"
      );
      if (response.data.success) {
        setTestimonials(response.data.data || []);
        setError(null);
      } else {
        setError("⚠️ Failed to load testimonials. Please try again.");
        setTestimonials([]);
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("⚠️ Failed to load testimonials. Please try again.");
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Testimonial button
  const handleCopyUrl = () => {
    const url = "https://projuktisheba.moshiurrahman.online/add-testimonial";
    navigator.clipboard.writeText(url).then(() => {
      toast.success("URL copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy URL!");
    });
  };

  const handleAddTestimonial = () => {
    navigate("/add-testimonial")
    setOpen(false)
  }

  // Delete testimonial
  const deleteTestimonial = async (id) => {
    setDeletingTestimonial(id);
    try {
      const response = await axios.delete(
        `https://projukti-sheba-server.onrender.com/testimonials/${id}`
      );
      if (response.status === 200) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
        setSelectedTestimonial(null);
        setEditingTestimonial(null);
        toast.success("Testimonial deleted successfully!");
      } else {
        toast.error("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Error deleting testimonial");
    } finally {
      setDeletingTestimonial(null);
    }
  };

  // Handle Edit Testimonial
  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial({
      _id: testimonial._id,
      name: testimonial.name || "",
      position: testimonial.position || "",
      company: testimonial.company || "",
      location: testimonial.location || "",
      date: testimonial.date ? new Date(testimonial.date).toISOString().split('T')[0] : "",
      rating: testimonial.rating || "",
      photoURL: testimonial.photoURL || "",
      testimonial: testimonial.testimonial || "",
      videoUrl: testimonial.videoUrl || "",
      project: testimonial.project || "",
      category: testimonial.category || "",
    });
    setImagePreview(testimonial.photoURL || null);
  };

  // Handle input changes for edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTestimonial((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload with ImgBB
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploadingImage(true);

    try {
      const formDataImg = new FormData();
      formDataImg.append("image", file);

      const apiKey = "874c66b5291cad68f221845819150477"; // Replace with your ImgBB API key
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formDataImg,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data && data.data && data.data.url) {
        const hostedUrl = data.data.url;
        setImagePreview(hostedUrl);
        setEditingTestimonial((prev) => ({ ...prev, photoURL: hostedUrl }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Invalid response from ImgBB");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await axios.put(
        `https://projukti-sheba-server.onrender.com/testimonials/${editingTestimonial._id}`,
        editingTestimonial,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t._id === editingTestimonial._id ? { ...t, ...editingTestimonial } : t
          )
        );
        setEditingTestimonial(null);
        setImagePreview(null);
        toast.success("Testimonial updated successfully!");
      } else {
        toast.error("Failed to update testimonial");
      }
    } catch (error) {
      console.error("Error updating testimonial:", error);
      toast.error("Error updating testimonial");
    } finally {
      setIsSaving(false);
    }
  };

  // Pagination
  useEffect(() => {
    const indexOfLastTestimonial = currentPage * testimonialsPerPage;
    const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
    setFilteredTestimonials(
      testimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial)
    );
  }, [testimonials, currentPage, testimonialsPerPage]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-4 sm:py-8 lg:py-12 px-2 sm:px-4 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Testimonials Management
              </h1>
              <p className="text-gray-300 text-sm sm:text-base">Manage and track user testimonials</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={fetchTestimonials}
                disabled={loading}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 disabled:opacity-50 text-white rounded-lg transition-colors duration-200"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>
<button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#B5000D]/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5000D]/40"
                aria-label="Toggle actions menu"
                aria-expanded={open}
              >
                <span>Actions</span>
                <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>

{open && (
                <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-slate-900/95 backdrop-blur-md shadow-lg rounded-md border border-white/10 z-50">
                  <button
                    onClick={handleAddTestimonial}
                    className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-gray-300 hover:bg-white/10 hover:text-white text-xs sm:text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B5000D]/40"
                  >
                    Add Testimonial
                  </button>
                  <button
                    onClick={handleCopyUrl}
                    className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-gray-300 hover:bg-white/10 hover:text-white text-xs sm:text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B5000D]/40"
                  >
                    Copy URL
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Testimonials Table */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-8 sm:p-12">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              <span className="ml-3 text-gray-300">Loading testimonials...</span>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center p-8 sm:p-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No testimonials found</p>
              <p className="text-gray-500 text-sm">
                Add testimonials to display them here
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left p-2 sm:p-4 text-gray-300 font-medium text-xs sm:text-sm">
                      ID
                    </th>
                    <th className="text-left p-2 sm:p-4 text-gray-300 font-medium text-xs sm:text-sm">
                      Name
                    </th>
                    <th className="text-left p-2 sm:p-4 text-gray-300 font-medium hidden md:table-cell text-xs sm:text-sm">
                      Position
                    </th>
                    <th className="text-left p-2 sm:p-4 text-gray-300 font-medium hidden md:table-cell text-xs sm:text-sm">
                      Rating
                    </th>
                    <th className="text-left p-2 sm:p-4 text-gray-300 font-medium text-xs sm:text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTestimonials.map((testimonial) => (
                    <tr
                      key={testimonial._id}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-2 sm:p-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="bg-blue-500/10 p-1 sm:p-2 rounded-lg">
                            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                          </div>
                          <p className="text-white font-medium text-xs sm:text-sm">
                            #{testimonial._id.slice(-5)}
                          </p>
                        </div>
                      </td>
                      <td className="p-2 sm:p-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="text-gray-300 text-xs sm:text-sm truncate max-w-24 sm:max-w-none">
                            {testimonial.name || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 sm:p-4 hidden md:table-cell">
                        <span className="text-gray-300 text-xs sm:text-sm">
                          {testimonial.position || "N/A"}
                        </span>
                      </td>
                      <td className="p-2 sm:p-4 hidden md:table-cell">
                        <div className="flex items-center space-x-1">
                          {renderStars(testimonial.rating || 0)}
                        </div>
                      </td>
                      <td className="p-2 sm:p-4">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button
                            onClick={() => setSelectedTestimonial(testimonial)}
                            className="p-1 sm:p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => handleEditTestimonial(testimonial)}
                            className="p-1 sm:p-2 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors duration-200"
                          >
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => deleteTestimonial(testimonial._id)}
                            disabled={deletingTestimonial === testimonial._id}
                            className="p-1 sm:p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200 disabled:opacity-50"
                          >
                            {deletingTestimonial === testimonial._id ? (
                              <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2 p-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 sm:px-3 py-1 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 disabled:opacity-50 text-xs sm:text-sm"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm ${
                          currentPage === page
                            ? "bg-[#B5000D] text-white"
                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 sm:px-3 py-1 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 disabled:opacity-50 text-xs sm:text-sm"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Modal for Testimonial Details */}
        {selectedTestimonial && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-slate-900/95 via-blue-900/80 to-indigo-900/85 backdrop-blur-xl rounded-lg sm:rounded-2xl border border-white/10 shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-3 sm:p-5 border-b border-white/10 flex justify-between items-center shrink-0">
                <h3 className="text-base sm:text-lg font-semibold text-white truncate mr-4">
                  Testimonial #{selectedTestimonial._id?.slice(-5) || "N/A"}
                </h3>
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-3 sm:p-5 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                      <User className="w-3 h-3 mr-1" /> Name
                    </p>
                    <p className="text-white font-medium text-sm sm:text-base break-words">
                      {selectedTestimonial.name || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                      <Briefcase className="w-3 h-3 mr-1" /> Position
                    </p>
                    <p className="text-white font-medium text-sm sm:text-base break-words">
                      {selectedTestimonial.position || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                      <Briefcase className="w-3 h-3 mr-1" /> Company
                    </p>
                    <p className="text-white font-medium text-sm sm:text-base break-words">
                      {selectedTestimonial.company || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> Location
                    </p>
                    <p className="text-white font-medium text-sm sm:text-base break-words">
                      {selectedTestimonial.location || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> Date
                    </p>
                    <p className="text-white text-sm sm:text-base">
                      {formatDate(selectedTestimonial.date)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                      <Star className="w-3 h-3 mr-1" /> Rating
                    </p>
                    <div className="flex items-center space-x-1">
                      {renderStars(selectedTestimonial.rating || 0)}
                    </div>
                  </div>
                </div>
                
                {selectedTestimonial.photoURL && (
                  <div className="space-y-2">
                    <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                      <Camera className="w-3 h-3 mr-1" /> Image
                    </p>
                    <img
                      src={selectedTestimonial.photoURL}
                      alt="Testimonial"
                      className="w-full h-32 sm:h-40 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                    <MessageSquare className="w-3 h-3 mr-1" /> Testimonial
                  </p>
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed break-words">
                    {selectedTestimonial.testimonial || "No testimonial provided"}
                  </p>
                </div>
                
                {selectedTestimonial.videoUrl && (
                  <div className="space-y-2">
                    <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                      <Video className="w-3 h-3 mr-1" /> Video
                    </p>
                    <a
                      href={selectedTestimonial.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm sm:text-base break-all"
                    >
                      Watch Video
                    </a>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                      <Folder className="w-3 h-3 mr-1" /> Project
                    </p>
                    <p className="text-white font-medium text-sm sm:text-base break-words">
                      {selectedTestimonial.project || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs sm:text-sm flex items-center">
                      <Tag className="w-3 h-3 mr-1" /> Category
                    </p>
                    <p className="text-white font-medium text-sm sm:text-base break-words">
                      {selectedTestimonial.category || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 sm:p-4 border-t border-white/10 text-right shrink-0">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Enhanced Modal for Editing Testimonial */}
        {editingTestimonial && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-slate-900/95 via-blue-900/80 to-indigo-900/85 backdrop-blur-xl rounded-lg sm:rounded-2xl border border-white/10 shadow-2xl w-full max-w-xs sm:max-w-2xl lg:max-w-4xl max-h-[95vh] overflow-hidden flex flex-col"
            >
              <div className="p-3 sm:p-5 border-b border-white/10 flex justify-between items-center shrink-0">
                <h3 className="text-base sm:text-lg font-semibold text-white truncate mr-4">
                  Edit Testimonial #{editingTestimonial._id.slice(-5)}
                </h3>
                <button
                  onClick={() => {
                    setEditingTestimonial(null);
                    setImagePreview(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="flex flex-col h-full">
                <div className="p-3 sm:p-5 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
                  {/* Image Section */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 sm:p-4">
                    <h4 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4 flex items-center">
                      <Camera className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-400" />
                      Testimonial Image
                    </h4>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                      <div className="relative">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Testimonial Preview"
                            className="w-20 h-20 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-purple-500/30"
                          />
                        ) : (
                          <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white text-xl sm:text-4xl font-bold border-4 border-purple-500/30">
                            T
                          </div>
                        )}
                        <label className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-1 sm:p-2 rounded-full cursor-pointer transition-all duration-300 border-2 border-gray-900">
                          <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div className="text-center sm:text-left">
                        <h5 className="text-xs sm:text-sm font-medium text-white mb-2">Upload Image</h5>
                        <p className="text-xs text-gray-400 mb-3 sm:mb-4">JPG, PNG, or GIF. Max size 5MB</p>
                        <label className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium rounded-lg cursor-pointer transition-all duration-300">
                          <Camera className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          Choose File
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        {uploadingImage && (
                          <p className="text-xs text-blue-300 mt-1">Uploading image...</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Basic Information */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 sm:p-4">
                    <h4 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4 flex items-center">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-400" />
                      Basic Information
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={editingTestimonial.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300 text-xs sm:text-sm"
                          placeholder="Enter name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                          Position
                        </label>
                        <input
                          type="text"
                          name="position"
                          value={editingTestimonial.position}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300 text-xs sm:text-sm"
                          placeholder="Enter position"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={editingTestimonial.company}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300 text-xs sm:text-sm"
                          placeholder="Enter company"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={editingTestimonial.location}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300 text-xs sm:text-sm"
                          placeholder="Enter location"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={editingTestimonial.date}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300 text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                          Rating
                        </label>
                        <input
                          type="number"
                          name="rating"
                          min="1"
                          max="5"
                          value={editingTestimonial.rating}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300 text-xs sm:text-sm"
                          placeholder="Enter rating (1-5)"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Testimonial Details */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 sm:p-4">
                    <h4 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4 flex items-center">
                      <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-400" />
                      Testimonial Details
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                          Testimonial
                        </label>
                        <textarea
                          name="testimonial"
                          value={editingTestimonial.testimonial}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300 resize-none text-xs sm:text-sm"
                          placeholder="Enter testimonial"
                        />
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                            Video URL
                          </label>
                          <input
                            type="url"
                            name="videoUrl"
                            value={editingTestimonial.videoUrl}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300 text-xs sm:text-sm"
                            placeholder="Enter video URL"
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                            Project
                          </label>
                          <input
                            type="text"
                            name="project"
                            value={editingTestimonial.project}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300 text-xs sm:text-sm"
                            placeholder="Enter project name"
                          />
                        </div>
                        <div className="lg:col-span-2">
                          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                            Category
                          </label>
                          <input
                            type="text"
                            name="category"
                            value={editingTestimonial.category}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300 text-xs sm:text-sm"
                            placeholder="Enter category"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="p-3 sm:p-5 border-t border-white/10 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTestimonial(null);
                      setImagePreview(null);
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300 text-xs sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving || uploadingImage}
                    className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xs sm:text-sm"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="animate-spin h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TestimonialSection;

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
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [testimonialsPerPage] = useState(10);
  const [deletingTestimonial, setDeletingTestimonial] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

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

const handleAddTestimonial = () => {
  const url = "https://projuktisheba.moshiurrahman.online/add-testimonial";

  // Copy to clipboard
  navigator.clipboard.writeText(url).then(() => {
    // Show toast
    toast.success("URL copied to clipboard!");
  }).catch(() => {
    toast.error("Failed to copy URL!");
  });
};

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
      } else {
        alert("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Error deleting testimonial");
    } finally {
      setDeletingTestimonial(null);
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
      className="min-h-screen bg-transparent backdrop-blur-3xl p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Testimonials Management
              </h1>
              <p className="text-gray-300">Manage and track user testimonials</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchTestimonials}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 disabled:opacity-50 text-white rounded-lg transition-colors duration-200"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                onClick={handleAddTestimonial}
              >
                Add Testimonial
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Table */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              <span className="ml-3 text-gray-300">Loading testimonials...</span>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center p-12">
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
                    <th className="text-left p-4 text-gray-300 font-medium">
                      ID
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Name
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium hidden md:table-cell">
                      Position
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium hidden md:table-cell">
                      Rating
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
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
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-500/10 p-2 rounded-lg">
                            <MessageSquare className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-white font-medium">
                            #{testimonial._id.slice(-5)}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">
                            {testimonial.name || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span className="text-gray-300">
                          {testimonial.position || "N/A"}
                        </span>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex items-center space-x-1">
                          {renderStars(testimonial.rating || 0)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedTestimonial(testimonial)}
                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTestimonial(testimonial._id)}
                            disabled={deletingTestimonial === testimonial._id}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200 disabled:opacity-50"
                          >
                            {deletingTestimonial === testimonial._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
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
                <div className="flex justify-center items-center space-x-2 p-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-lg ${
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
                    className="px-3 py-1 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal for Testimonial Details */}
        {selectedTestimonial && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl w-full max-w-md">
              <div className="p-5 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                  Testimonial #{selectedTestimonial._id?.slice(-5) || "N/A"}
                </h3>
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">👤 Name</p>
                  <p className="text-white font-medium">
                    {selectedTestimonial.name || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">💼 Position</p>
                  <p className="text-white font-medium">
                    {selectedTestimonial.position || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">🏢 Company</p>
                  <p className="text-white font-medium">
                    {selectedTestimonial.company || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📍 Location</p>
                  <p className="text-white font-medium">
                    {selectedTestimonial.location || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📅 Date</p>
                  <p className="text-white">
                    {formatDate(selectedTestimonial.date)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">⭐ Rating</p>
                  <div className="flex items-center space-x-1">
                    {renderStars(selectedTestimonial.rating || 0)}
                  </div>
                </div>
                {selectedTestimonial.image && (
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">🖼️ Image</p>
                    <img
                      src={selectedTestimonial.image}
                      alt="Testimonial"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📝 Testimonial</p>
                  <p className="text-gray-200">
                    {selectedTestimonial.testimonial || "No testimonial provided"}
                  </p>
                </div>
                {selectedTestimonial.videoUrl && (
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">🎥 Video</p>
                    <a
                      href={selectedTestimonial.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Watch Video
                    </a>
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">🔧 Project</p>
                  <p className="text-white font-medium">
                    {selectedTestimonial.project || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">🏷️ Category</p>
                  <p className="text-white font-medium">
                    {selectedTestimonial.category || "N/A"}
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-white/10 text-right">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TestimonialSection;
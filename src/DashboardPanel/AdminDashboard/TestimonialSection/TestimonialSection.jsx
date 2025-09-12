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
  FileText,
  Table,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
    navigate("/add-testimonial");
    setOpen(false);
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

  // Export to Excel
  const exportToExcel = () => {
    const exportData = filteredTestimonials.map((testimonial) => ({
      ID: testimonial._id?.slice(-5) || "N/A",
      Name: testimonial.name || "N/A",
      Position: testimonial.position || "N/A",
      Company: testimonial.company || "N/A",
      Location: testimonial.location || "N/A",
      Date: formatDate(testimonial.date),
      Rating: testimonial.rating || "N/A",
      Testimonial: testimonial.testimonial || "N/A",
      "Video URL": testimonial.videoUrl || "N/A",
      Project: testimonial.project || "N/A",
      Category: testimonial.category || "N/A",
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Testimonials");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileName = `testimonials_${new Date().toISOString().slice(0, 10)}.xlsx`;
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), fileName);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Testimonials", 14, 20);

    const tableColumn = [
      "ID",
      "Name",
      "Position",
      "Company",
      "Location",
      "Date",
      "Rating",
      "Testimonial",
      "Video URL",
      "Project",
      "Category",
    ];

    const tableRows = filteredTestimonials.map((testimonial) => [
      testimonial._id?.slice(-5) || "N/A",
      testimonial.name || "N/A",
      testimonial.position || "N/A",
      testimonial.company || "N/A",
      testimonial.location || "N/A",
      formatDate(testimonial.date),
      testimonial.rating || "N/A",
      testimonial.testimonial || "N/A",
      testimonial.videoUrl || "N/A",
      testimonial.project || "N/A",
      testimonial.category || "N/A",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 8, cellPadding: 2 },
    });

    const fileName = `testimonials_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(fileName);
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
              <h1 className="text-3xl font-bold text-black mb-2">
                Testimonials Management
              </h1>
              <p className="text-gray-600">
                Manage and track user testimonials
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={exportToExcel}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg transition-colors duration-200"
              >
                <Table className="w-4 h-4" />
                <span>Export to Excel</span>
              </button>
              <button
                onClick={exportToPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg transition-colors duration-200"
              >
                <FileText className="w-4 h-4" />
                <span>Export to PDF</span>
              </button>
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
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg transition-colors duration-200"
                >
                  <span>Actions</span>
                  <ChevronDown className={`w-4 h-4 ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg shadow-lg z-10">
                    <button
                      onClick={handleAddTestimonial}
                      className="w-full text-left px-4 py-2 text-gray-600 font-medium hover:bg-white/10 cursor-pointer transition-colors duration-200"
                    >
                      Add Testimonial
                    </button>
                    <button
                      onClick={handleCopyUrl}
                      className="w-full text-left px-4 py-2 text-gray-600 font-medium hover:bg-white/10 cursor-pointer transition-colors duration-200"
                    >
                      Copy URL
                    </button>
                  </div>
                )}
              </div>
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
          ) : error ? (
            <div className="text-center p-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">{error}</p>
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
                    <th className="text-left p-4 text-gray-600 font-medium">
                      ID
                    </th>
                    <th className="text-left p-4 text-gray-600 font-medium">
                      Name
                    </th>
                    <th className="text-left p-4 text-gray-600 font-medium hidden md:table-cell">
                      Position
                    </th>
                    <th className="text-left p-4 text-gray-600 font-medium hidden md:table-cell">
                      Rating
                    </th>
                    <th className="text-left p-4 text-gray-600 font-medium">
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
                          <p className="text-black font-medium">
                            #{testimonial._id.slice(-5)}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            {testimonial.name || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span className="text-gray-600">
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
                            className="p-2 text-gray-600 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditTestimonial(testimonial)}
                            className="p-2 text-gray-600 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors duration-200"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTestimonial(testimonial._id)}
                            disabled={deletingTestimonial === testimonial._id}
                            className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200 disabled:opacity-50"
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
                <div className="flex flex-wrap justify-center items-center gap-2 p-4">
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
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl w-full max-w-md"
            >
              <div className="p-5 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                  Testimonial #{selectedTestimonial._id?.slice(-5) || "N/A"}
                </h3>
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm flex items-center">
                    <User className="w-4 h-4 mr-2" /> Name
                  </p>
                  <p className="text-white font-medium">
                    {selectedTestimonial.name || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" /> Position
                  </p>
                  <p className="text-white font-medium">
                    {selectedTestimonial.position || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" /> Company
                  </p>
                  <p className="text-white font-medium">
                    {selectedTestimonial.company || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> Location
                  </p>
                  <p className="text-white font-medium">
                    {selectedTestimonial.location || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> Date
                  </p>
                  <p className="text-white">
                    {formatDate(selectedTestimonial.date)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm flex items-center">
                    <Star className="w-4 h-4 mr-2" /> Rating
                  </p>
                  <div className="flex items-center space-x-1">
                    {renderStars(selectedTestimonial.rating || 0)}
                  </div>
                </div>
                {selectedTestimonial.photoURL && (
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm flex items-center">
                      <Camera className="w-4 h-4 mr-2" /> Image
                    </p>
                    <img
                      src={selectedTestimonial.photoURL}
                      alt="Testimonial"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" /> Testimonial
                  </p>
                  <p className="text-gray-200">
                    {selectedTestimonial.testimonial || "No testimonial provided"}
                  </p>
                </div>
                {selectedTestimonial.videoUrl && (
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm flex items-center">
                      <Video className="w-4 h-4 mr-2" /> Video
                    </p>
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
                  <p className="text-gray-400 text-sm flex items-center">
                    <Folder className="w-4 h-4 mr-2" /> Project
                  </p>
                  <p className="text-white font-medium">
                    {selectedTestimonial.project || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm flex items-center">
                    <Tag className="w-4 h-4 mr-2" /> Category
                  </p>
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
            </motion.div>
          </div>
        )}

        {/* Modal for Editing Testimonial */}
        {editingTestimonial && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                  Edit Testimonial #{editingTestimonial._id.slice(-5)}
                </h3>
                <button
                  onClick={() => {
                    setEditingTestimonial(null);
                    setImagePreview(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="flex flex-col h-full">
                <div className="p-5 space-y-6 overflow-y-auto">
                  {/* Image Section */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4">
                    <h4 className="text-base font-semibold text-white mb-4 flex items-center">
                      <Camera className="h-5 w-5 mr-2 text-purple-400" />
                      Testimonial Image
                    </h4>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="relative">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Testimonial Preview"
                            className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/30"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-purple-500/30">
                            T
                          </div>
                        )}
                        <label className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full cursor-pointer transition-all duration-300 border-2 border-gray-900">
                          <Camera className="h-4 w-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div className="text-center md:text-left">
                        <h5 className="text-sm font-medium text-white mb-2">Upload Image</h5>
                        <p className="text-xs text-gray-400 mb-4">JPG, PNG, or GIF. Max size 5MB</p>
                        <label className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded-lg cursor-pointer transition-all duration-300">
                          <Camera className="h-4 w-4 mr-2" />
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
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4">
                    <h4 className="text-base font-semibold text-white mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-blue-400" />
                      Basic Information
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={editingTestimonial.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                          placeholder="Enter name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Position
                        </label>
                        <input
                          type="text"
                          name="position"
                          value={editingTestimonial.position}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                          placeholder="Enter position"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={editingTestimonial.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                          placeholder="Enter company"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={editingTestimonial.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                          placeholder="Enter location"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={editingTestimonial.date}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Rating
                        </label>
                        <input
                          type="number"
                          name="rating"
                          min="1"
                          max="5"
                          value={editingTestimonial.rating}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                          placeholder="Enter rating (1-5)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Details */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4">
                    <h4 className="text-base font-semibold text-white mb-4 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-green-400" />
                      Testimonial Details
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Testimonial
                        </label>
                        <textarea
                          name="testimonial"
                          value={editingTestimonial.testimonial}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300 resize-none"
                          placeholder="Enter testimonial"
                        />
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Video URL
                          </label>
                          <input
                            type="url"
                            name="videoUrl"
                            value={editingTestimonial.videoUrl}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                            placeholder="Enter video URL"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Project
                          </label>
                          <input
                            type="text"
                            name="project"
                            value={editingTestimonial.project}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                            placeholder="Enter project name"
                          />
                        </div>
                        <div className="lg:col-span-2">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Category
                          </label>
                          <input
                            type="text"
                            name="category"
                            value={editingTestimonial.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                            placeholder="Enter category"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-5 border-t border-white/10 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTestimonial(null);
                      setImagePreview(null);
                    }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving || uploadingImage}
                    className="px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
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
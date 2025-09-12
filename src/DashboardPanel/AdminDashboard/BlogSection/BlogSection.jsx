import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://projukti-sheba-server.onrender.com/blogs");
      if (response.data.success) {
        setBlogs(response.data.data);
      } else {
        throw new Error(response.data.error || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to fetch blog posts. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Function to open modal and set selected blog
  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  // Function to handle blog deletion with SweetAlert confirmation
  const handleDelete = async (blogId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the blog post. This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`https://projukti-sheba-server.onrender.com/blogs/${blogId}`);
        if (response.data.success) {
          Swal.fire({
            title: "Deleted!",
            text: "The blog post has been deleted successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchBlogs(); // Refresh blog list
        } else {
          throw new Error(response.data.error || "Failed to delete blog");
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to delete the blog post. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error deleting blog:", error);
      }
    }
  };

  // Function to handle blog edit navigation
  const handleEdit = (blogId) => {
    navigate(`/dashboard/edit-blog/${blogId}`);
  };

  // Format date for display
  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(181, 0, 13); // #B5000D
    doc.text("Blog Posts Report", 14, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${formatDate(new Date())}`, 14, 28);

    let yPosition = 38;

    if (!blogs || blogs.length === 0) {
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text("No blog posts available", 14, yPosition);
      doc.save(`blogs_report_${new Date().toISOString().slice(0, 10)}.pdf`);
      return;
    }

    // Helper function to add section header
    const addSectionHeader = (title) => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(181, 0, 13); // #B5000D
      doc.text(title, 14, yPosition);
      yPosition += 8;
    };

    // Helper function to add blog data
    const addBlogData = (blog) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      const fields = [
        `Title: ${blog.title || "Untitled"}`,
        `Author: ${blog.author || "Unknown Author"}`,
        `Category: ${blog.category || "N/A"}`,
        `Expert/Content: ${blog.content || blog.expert || "No Content"}`,
        `Image: ${blog.image || "N/A"}`,
        `Slug: ${blog.slug || "N/A"}`,
        `Tags: ${blog.tags?.length ? blog.tags.join(", ") : "None"}`,
        `Created At: ${formatDate(blog.createdAt)}`,
        `Updated At: ${formatDate(blog.updatedAt)}`,
        `ID: ${blog._id || "N/A"}`,
      ];

      fields.forEach((field) => {
        const splitText = doc.splitTextToSize(field, 180);
        doc.text(splitText, 14, yPosition);
        yPosition += splitText.length * 6 + 2;
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
      });
      yPosition += 4;
    };

    blogs.forEach((blog, index) => {
      addSectionHeader(`Blog Post ${index + 1}: ${blog.title || "Untitled"} (ID: ${blog._id.slice(-8)})`);
      addBlogData(blog);
      if (index < blogs.length - 1) {
        doc.setDrawColor(181, 0, 13); // #B5000D
        doc.line(14, yPosition, 196, yPosition);
        yPosition += 10;
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
      }
    });

    doc.setDrawColor(181, 0, 13); // #B5000D
    doc.line(14, yPosition, 196, yPosition);
    doc.save(`blogs_report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // Export to Excel
  const exportToExcel = () => {
    if (!blogs || blogs.length === 0) {
      Swal.fire({
        title: "No Data",
        text: "No blog posts available to export.",
        icon: "info",
        confirmButtonText: "OK",
      });
      return;
    }

    const data = blogs.map((blog) => ({
      Title: blog.title || "Untitled",
      Author: blog.author || "Unknown Author",
      Category: blog.category || "N/A",
      "Expert/Content": blog.content || blog.expert || "No Content",
      Image: blog.image || "N/A",
      Slug: blog.slug || "N/A",
      Tags: blog.tags?.length ? blog.tags.join(", ") : "None",
      "Created At": formatDate(blog.createdAt),
      "Updated At": formatDate(blog.updatedAt),
      ID: blog._id || "N/A",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Blog Posts");
    XLSX.writeFile(wb, `blogs_report_${new Date().toISOString().slice(0, 10)}.xlsx`);
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
              <h1 className="text-3xl font-bold text-black mb-2">Blog Posts</h1>
              <p className="text-gray-600">Manage and review blog posts</p>
            </div>
            <div className="flex items-center space-x-4 flex-wrap gap-4">
              <button
                className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-medium text-black transition-all duration-300"
              >
                Total Blogs: {blogs.length}
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard/add-blog")}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Blog</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportToPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export to PDF</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportToExcel}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export to Excel</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Blog List */}
        {loading ? (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-center py-12 text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-lg font-medium mb-2">Loading Blog Posts...</p>
              </div>
            </div>
          </motion.div>
        ) : blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                className="p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-black">
                      {blog.title || "Untitled"}
                    </p>
                    <p className="text-xs text-gray-600">
                      Author: {blog.author || "Unknown Author"}
                    </p>
                    <p className="text-xs text-gray-600">
                      Category: {blog.category || "N/A"}
                    </p>
                    <p className="text-xs text-gray-600">
                      Created: {formatDate(blog.createdAt)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-black/10 cursor-pointer hover:border-[#B5000D]/50 rounded-lg font-medium text-black transition-all duration-300"
                      onClick={() => openModal(blog)}
                    >
                      View Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 rounded-lg font-medium text-white transition-all"
                      onClick={() => handleEdit(blog._id)}
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 rounded-lg font-medium text-white transition-all"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Remove
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-center py-12 text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-lg font-medium mb-2">No Blog Posts Found</p>
                <p className="text-sm">
                  Blog posts will be displayed here once created
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Modal for Blog Details */}
        {isModalOpen && selectedBlog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-white mb-4">Blog Post Details</h2>
              <div className="space-y-4">
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Title:</span>{" "}
                  {selectedBlog.title || "Untitled"}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Author:</span>{" "}
                  {selectedBlog.author || "Unknown Author"}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Category:</span>{" "}
                  {selectedBlog.category || "N/A"}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Expert/Content:</span>{" "}
                  {selectedBlog.content || selectedBlog.expert || "No Content"}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Image:</span>{" "}
                  {selectedBlog.image ? (
                    <a href={selectedBlog.image} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      View Image
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Slug:</span>{" "}
                  {selectedBlog.slug || "N/A"}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Tags:</span>{" "}
                  {selectedBlog.tags?.length ? selectedBlog.tags.join(", ") : "None"}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Created At:</span>{" "}
                  {formatDate(selectedBlog.createdAt)}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Updated At:</span>{" "}
                  {formatDate(selectedBlog.updatedAt)}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">ID:</span>{" "}
                  {selectedBlog._id || "N/A"}
                </p>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(selectedBlog._id)}
                  className="px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 rounded-lg font-medium text-white transition-all"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeModal}
                  className="px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 rounded-lg font-medium text-white transition-all"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogSection;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const PortfolioSection = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch portfolios from API
  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://projukti-sheba-server.onrender.com/portfolio");
      if (response.data.success) {
        setPortfolios(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch portfolios");
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to fetch portfolio items. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Function to open modal and set selected portfolio
  const openModal = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPortfolio(null);
  };

  // Function to handle portfolio deletion with SweetAlert confirmation
  const handleDelete = async (portfolioId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the portfolio item. This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`https://projukti-sheba-server.onrender.com/portfolio/${portfolioId}`);
        if (response.data.success) {
          Swal.fire({
            title: "Deleted!",
            text: "The portfolio item has been deleted successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchPortfolios(); // Refresh portfolio list
        } else {
          throw new Error(response.data.message || "Failed to delete portfolio");
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to delete the portfolio item. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error deleting portfolio:", error);
      }
    }
  };

  // Function to handle portfolio edit navigation
  const handleEdit = (portfolioId) => {
    navigate(`/dashboard/edit-portfolio/${portfolioId}`);
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
    doc.text("Portfolio Items Report", 14, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${formatDate(new Date())}`, 14, 28);

    let yPosition = 38;

    if (!portfolios || portfolios.length === 0) {
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text("No portfolio items available", 14, yPosition);
      doc.save(`portfolios_report_${new Date().toISOString().slice(0, 10)}.pdf`);
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

    // Helper function to add portfolio data
    const addPortfolioData = (portfolio) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      const fields = [
        `Title: ${portfolio.title || "Untitled"}`,
        `Author: ${portfolio.author || "Unknown Author"}`,
        `Category: ${portfolio.category || "N/A"}`,
        `Content: ${portfolio.content || "No Content"}`,
        `Image: ${portfolio.image || "N/A"}`,
        `Slug: ${portfolio.slug || "N/A"}`,
        `Tags: ${portfolio.tags?.length ? portfolio.tags.join(", ") : "None"}`,
        `Created At: ${formatDate(portfolio.createdAt)}`,
        `Updated At: ${formatDate(portfolio.updatedAt)}`,
        `ID: ${portfolio._id || "N/A"}`,
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

    portfolios.forEach((portfolio, index) => {
      addSectionHeader(`Portfolio Item ${index + 1}: ${portfolio.title || "Untitled"} (ID: ${portfolio._id.slice(-8)})`);
      addPortfolioData(portfolio);
      if (index < portfolios.length - 1) {
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
    doc.save(`portfolios_report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // Export to Excel
  const exportToExcel = () => {
    if (!portfolios || portfolios.length === 0) {
      Swal.fire({
        title: "No Data",
        text: "No portfolio items available to export.",
        icon: "info",
        confirmButtonText: "OK",
      });
      return;
    }

    const data = portfolios.map((portfolio) => ({
      Title: portfolio.title || "Untitled",
      Author: portfolio.author || "Unknown Author",
      Category: portfolio.category || "N/A",
      Content: portfolio.content || "No Content",
      Image: portfolio.image || "N/A",
      Slug: portfolio.slug || "N/A",
      Tags: portfolio.tags?.length ? portfolio.tags.join(", ") : "None",
      "Created At": formatDate(portfolio.createdAt),
      "Updated At": formatDate(portfolio.updatedAt),
      ID: portfolio._id || "N/A",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Portfolio Items");
    XLSX.writeFile(wb, `portfolios_report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <motion.div
      className="min-h-screen bg-transparent backdrop-blur-3xl p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 sm:mb-2">
                Portfolio Items
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage and review portfolio items
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                className="px-4 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-medium text-black text-sm sm:text-base w-full sm:w-auto"
              >
                Total Portfolios: {portfolios.length}
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard/add-portfolio")}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1 sm:py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg text-sm sm:text-base transition-colors duration-200 w-full sm:w-auto"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Portfolio</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportToPDF}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1 sm:py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg text-sm sm:text-base transition-colors duration-200 w-full sm:w-auto"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export to PDF</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportToExcel}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1 sm:py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg text-sm sm:text-base transition-colors duration-200 w-full sm:w-auto"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export to Excel</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Portfolio List */}
        {loading ? (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10"
          >
            <div className="flex items-center justify-center py-8 sm:py-12 text-gray-400">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📁</div>
                <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Loading Portfolio Items...</p>
              </div>
            </div>
          </motion.div>
        ) : portfolios.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {portfolios.map((portfolio) => (
              <motion.div
                key={portfolio._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                className="p-3 sm:p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0  sm:space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base text-black truncate">
                      {portfolio.title || "Untitled"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Author: {portfolio.author || "Unknown Author"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Category: {portfolio.category || "N/A"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Created: {formatDate(portfolio.createdAt)}
                    </p>
                  </div>
                  <div className="flex space-x-2 w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-white/5 backdrop-blur-sm border border-black/10 cursor-pointer hover:border-[#B5000D]/50 rounded-lg font-medium text-black text-xs sm:text-sm transition-all duration-300 flex-1 sm:flex-none"
                      onClick={() => openModal(portfolio)}
                    >
                      View Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 rounded-lg font-medium text-white text-xs sm:text-sm transition-all flex-1 sm:flex-none"
                      onClick={() => handleEdit(portfolio._id)}
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 rounded-lg font-medium text-white text-xs sm:text-sm transition-all flex-1 sm:flex-none"
                      onClick={() => handleDelete(portfolio._id)}
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
            className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10"
          >
            <div className="flex items-center justify-center py-8 sm:py-12 text-gray-400">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📁</div>
                <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">No Portfolio Items Found</p>
                <p className="text-xs sm:text-sm">
                  Portfolio items will be displayed here once created
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Modal for Portfolio Details */}
        {isModalOpen && selectedPortfolio && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/5 backdrop-blur-lg p-4 sm:p-6 rounded-xl border border-white/10 max-w-xs sm:max-w-sm md:max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Portfolio Item Details</h2>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-xs sm:text-sm text-gray-300">
                  <span className="font-medium">Title:</span>{" "}
                  {selectedPortfolio.title || "Untitled"}
                </p>
                <p className="text-xs sm:text-sm text-gray-300">
                  <span className="font-medium">Author:</span>{" "}
                  {selectedPortfolio.author || "Unknown Author"}
                </p>
                <p className="text-xs sm:text-sm text-gray-300">
                  <span className="font-medium">Category:</span>{" "}
                  {selectedPortfolio.category || "N/A"}
                </p>
                <p className="text-xs sm:text-sm text-gray-300">
                  <span className="font-medium">Content:</span>{" "}
                  {selectedPortfolio.content || "No Content"}
                </p>
                <p className="text-xs sm:text-sm text-gray-300">
                  <span className="font-medium">Image:</span>{" "}
                  {selectedPortfolio.image ? (
                    <a href={selectedPortfolio.image} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      View Image
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
                <p className="text-xs sm:text-sm text-gray-300">
                  <span className="font-medium">Slug:</span>{" "}
                  {selectedPortfolio.slug || "N/A"}
                </p>
                <p className="text-xs sm:text-sm text-gray-300">
                  <span className="font-medium">Tags:</span>{" "}
                  {selectedPortfolio.tags?.length ? selectedPortfolio.tags.join(", ") : "None"}
                </p>
                <p className="text-xs sm:text-sm text-gray-300">
                  <span className="font-medium">Created At:</span>{" "}
                  {formatDate(selectedPortfolio.createdAt)}
                </p>
                <p className="text-xs sm:text-sm text-gray-300">
                  <span className="font-medium">Updated At:</span>{" "}
                  {formatDate(selectedPortfolio.updatedAt)}
                </p>
                <p className="text-xs sm:text-sm text-gray-300">
                  <span className="font-medium">ID:</span>{" "}
                  {selectedPortfolio._id || "N/A"}
                </p>
              </div>
              <div className="mt-4 sm:mt-6 flex justify-end space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(selectedPortfolio._id)}
                  className="px-3 sm:px-4 py-1 sm:py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 rounded-lg font-medium text-white text-xs sm:text-sm transition-all"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeModal}
                  className="px-3 sm:px-4 py-1 sm:py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 rounded-lg font-medium text-white text-xs sm:text-sm transition-all"
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

export default PortfolioSection;
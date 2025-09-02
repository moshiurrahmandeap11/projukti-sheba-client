import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const UsersSection = ({ totalUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Function to open modal and set selected user
  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Function to handle user deletion with SweetAlert confirmation
  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the user. This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://projukti-sheba-server.onrender.com/users/${userId}`);
        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        window.location.reload(); // Replace with state management if needed
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the user. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error deleting user:", error);
      }
    }
  };

  // Calculate storage bar width (assuming max storage is 2GB)
  const getStorageBarWidth = (storageUsed) => {
    const maxStorage = 2 * 1024 * 1024 * 1024; // 2GB in bytes
    return Math.min((storageUsed / maxStorage) * 100, 100);
  };

  // Format date for display
  const formatDate = (date) => {
    return date ? new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) : "N/A";
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(181, 0, 13); // #B5000D
    doc.text("User Management Report", 14, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${formatDate(new Date())}`, 14, 28);

    let yPosition = 38;

    if (!totalUsers || totalUsers.length === 0) {
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text("No users available", 14, yPosition);
      doc.save(`users_report_${new Date().toISOString().slice(0, 10)}.pdf`);
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

    // Helper function to add user data
    const addUserData = (user) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      const fields = [
        `Name: ${user.fullName || "Unnamed User"}`,
        `Email: ${user.email || "No Email"}`,
        `ID: ${user._id || "N/A"}`,
        `Firebase UID: ${user.firebaseUID || "N/A"}`,
        `Premium: ${user.premium ? "Yes" : "No"}`,
        `Role: ${user.role || "user"}`,
        `Storage Used: ${(user.storageUsed / 1024).toFixed(2)} KB (${((user.storageUsed / (2 * 1024 * 1024 * 1024)) * 100).toFixed(2)}% of 2GB)`,
        `Projects: ${user.projects || 0}`,
        `Created At: ${formatDate(user.createdAt)}`,
        `Updated At: ${formatDate(user.updatedAt)}`,
        `Last Storage Update: ${formatDate(user.lastStorageUpdate)}`,
        `Privacy Settings:`,
        `  - Show Email: ${user.privacy?.showEmail ? "Yes" : "No"}`,
        `  - Show Phone: ${user.privacy?.showPhone ? "Yes" : "No"}`,
        `  - Show Location: ${user.privacy?.showLocation ? "Yes" : "No"}`,
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

    totalUsers.forEach((user, index) => {
      addSectionHeader(`User ${index + 1}: ${user.fullName || "Unnamed User"} (ID: ${user._id.slice(-8)})`);
      addUserData(user);
      if (index < totalUsers.length - 1) {
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
    doc.save(`users_report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // Export to Excel
  const exportToExcel = () => {
    if (!totalUsers || totalUsers.length === 0) {
      Swal.fire({
        title: "No Data",
        text: "No users available to export.",
        icon: "info",
        confirmButtonText: "OK",
      });
      return;
    }

    const data = totalUsers.map((user) => ({
      Name: user.fullName || "Unnamed User",
      Email: user.email || "No Email",
      ID: user._id || "N/A",
      "Firebase UID": user.firebaseUID || "N/A",
      Premium: user.premium ? "Yes" : "No",
      Role: user.role || "user",
      "Storage Used (KB)": (user.storageUsed / 1024).toFixed(2),
      "Storage Used (% of 2GB)": ((user.storageUsed / (2 * 1024 * 1024 * 1024)) * 100).toFixed(2),
      Projects: user.projects || 0,
      "Created At": formatDate(user.createdAt),
      "Updated At": formatDate(user.updatedAt),
      "Last Storage Update": formatDate(user.lastStorageUpdate),
      "Show Email": user.privacy?.showEmail ? "Yes" : "No",
      "Show Phone": user.privacy?.showPhone ? "Yes" : "No",
      "Show Location": user.privacy?.showLocation ? "Yes" : "No",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, `users_report_${new Date().toISOString().slice(0, 10)}.xlsx`);
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
              <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
              <p className="text-gray-300">Manage and review user details</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-medium text-white"
              >
                Total Users: {totalUsers?.length || 0}
              </button>
              <button
                onClick={exportToPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export to PDF</span>
              </button>
              <button
                onClick={exportToExcel}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export to Excel</span>
              </button>
            </div>
          </div>
        </div>

        {/* User List */}
        {totalUsers?.length > 0 ? (
          <div className="space-y-4">
            {totalUsers.map((user) => (
              <motion.div
                key={user._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                className="p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center overflow-hidden">
                    {user?.photoURL ? (
                      <img
                        src={`${user.photoURL}`}
                        alt={user.fullName || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold">
                        {user.fullName
                          ? user.fullName.charAt(0).toUpperCase()
                          : "👤"}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-white">
                      {user.fullName || "Unnamed User"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user.email || "No Email"}
                    </p>
                    <p className="text-xs text-gray-400">
                      Role: {user.role || "user"}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#B5000D]/50 rounded-lg font-medium text-white transition-all duration-300"
                    onClick={() => openModal(user)}
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 rounded-lg font-medium text-white transition-all"
                    onClick={() => handleDelete(user._id)}
                  >
                    Remove
                  </motion.button>
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
                <div className="text-4xl mb-4">👥</div>
                <p className="text-lg font-medium mb-2">No Users Found</p>
                <p className="text-sm">
                  Users will be displayed here once registered
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Modal for User Details */}
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 max-w-md w-full mx-4"
            >
              <h2 className="text-xl font-bold text-white mb-4">User Details</h2>
              <div className="space-y-4">
                {/* Photo */}
                <div className="flex justify-center">
                  {selectedUser.photoURL ? (
                    <img
                      src={`${selectedUser.photoURL}`}
                      alt={selectedUser.fullName || "User"}
                      className="w-24 h-24 rounded-full object-cover border border-white/10"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">
                        {selectedUser.fullName
                          ? selectedUser.fullName.charAt(0).toUpperCase()
                          : "👤"}
                      </span>
                    </div>
                  )}
                </div>
                {/* Name */}
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Name:</span>{" "}
                  {selectedUser.fullName || "Unnamed User"}
                </p>
                {/* Email */}
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Email:</span>{" "}
                  {selectedUser.email || "No Email"}
                </p>
                {/* ID */}
                <p className="text-sm text-gray-300">
                  <span className="font-medium">ID:</span> {selectedUser._id}
                </p>
                {/* Firebase UID */}
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Firebase UID:</span>{" "}
                  {selectedUser.firebaseUID || "N/A"}
                </p>
                {/* Premium */}
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Premium:</span>{" "}
                  {selectedUser.premium ? "Yes" : "No"}
                </p>
                {/* Role */}
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Role:</span>{" "}
                  {selectedUser.role || "user"}
                </p>
                {/* Storage Used (Graph) */}
                <div className="text-sm text-gray-300">
                  <span className="font-medium">Storage Used:</span>{" "}
                  {(selectedUser.storageUsed / 1024).toFixed(2)} KB
                  <div className="mt-2 bg-gray-700/50 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${getStorageBarWidth(selectedUser.storageUsed)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {((selectedUser.storageUsed / (2 * 1024 * 1024 * 1024)) * 100).toFixed(2)}% of 2GB
                  </p>
                </div>
                {/* Projects */}
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Projects:</span>{" "}
                  {selectedUser.projects || 0}
                </p>
                {/* Created At */}
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Created At:</span>{" "}
                  {formatDate(selectedUser.createdAt)}
                </p>
                {/* Updated At */}
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Updated At:</span>{" "}
                  {formatDate(selectedUser.updatedAt)}
                </p>
                {/* Last Storage Update */}
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Last Storage Update:</span>{" "}
                  {formatDate(selectedUser.lastStorageUpdate)}
                </p>
                {/* Privacy Settings */}
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Privacy Settings:</span>
                  <ul className="ml-4 list-disc">
                    <li>Show Email: {selectedUser.privacy?.showEmail ? "Yes" : "No"}</li>
                    <li>Show Phone: {selectedUser.privacy?.showPhone ? "Yes" : "No"}</li>
                    <li>Show Location: {selectedUser.privacy?.showLocation ? "Yes" : "No"}</li>
                  </ul>
                </p>
              </div>
              <div className="mt-6 flex justify-end">
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

export default UsersSection;
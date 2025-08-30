import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2"; // Import SweetAlert2
import axios from "axios"; // Import axios for HTTP requests

const UsersSection = ({ totalUsers }) => {
  // State to manage modal visibility and selected user
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
    // Show SweetAlert confirmation dialog
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

    // If user confirms deletion
    if (result.isConfirmed) {
      try {
        // Make DELETE request to backend
        await axios.delete(`https://projukti-sheba-server.onrender.com/users/${userId}`);
        // Show success message
        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        // Optionally, refresh the user list (you may need to pass a callback or refetch users)
        window.location.reload(); // Simple way to refresh the page; replace with better state management if needed
      } catch (error) {
        // Show error message
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">User Management</h2>
        <button className="px-6 py-3 border rounded-xl font-medium transition-all">
          Total Users: {totalUsers?.length || 0}
        </button>
      </div>

      {totalUsers?.length > 0 ? (
        <div>
          {totalUsers.map((user) => (
            <div
              key={user._id}
              className="mb-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center overflow-hidden">
                  {user?.photoURL ? (
                    <img
                      src={`https://projukti-sheba-server.onrender.com${user.photoURL}`}
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
                  <p className="font-medium text-sm">
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
                  className="group px-6 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl border border-orange-500/30 hover:border-orange-400/50 rounded-xl font-medium transition-all duration-300 text-white shadow-lg hover:shadow-orange-500/25 relative overflow-hidden"
                  onClick={() => openModal(user)}
                >
                  <span className="relative flex items-center justify-center space-x-2">
                    <span>View Details</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </motion.button>
                <button
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-medium transition-all"
                  onClick={() => handleDelete(user._id)} // Call handleDelete with user ID
                >
                  Remove
                </button>
              </div>
            </div>
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
          className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
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
            className="bg-gray-800/90 p-6 rounded-2xl border border-gray-700/50 max-w-md w-full mx-4"
          >
            <h2 className="text-xl font-bold text-white mb-4">User Details</h2>
            <div className="space-y-4">
              {/* Photo */}
              <div className="flex justify-center">
                {selectedUser.photoURL ? (
                  <img
                    src={`https://projukti-sheba-server.onrender.com/${selectedUser.photoURL}`}
                    alt={selectedUser.fullName || "User"}
                    className="w-24 h-24 rounded-full object-cover border border-gray-600"
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
                {selectedUser.firebaseUID}
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
                {new Date(selectedUser.createdAt).toLocaleString()}
              </p>
              {/* Updated At */}
              <p className="text-sm text-gray-300">
                <span className="font-medium">Updated At:</span>{" "}
                {new Date(selectedUser.updatedAt).toLocaleString()}
              </p>
              {/* Last Storage Update */}
              <p className="text-sm text-gray-300">
                <span className="font-medium">Last Storage Update:</span>{" "}
                {new Date(selectedUser.lastStorageUpdate).toLocaleString()}
              </p>
              {/* Privacy Settings */}
              <p className="text-sm text-gray-300">
                <span className="font-medium">Privacy Settings:</span>
                <ul className="ml-4 list-disc">
                  <li>Show Email: {selectedUser.privacy.showEmail ? "Yes" : "No"}</li>
                  <li>Show Phone: {selectedUser.privacy.showPhone ? "Yes" : "No"}</li>
                  <li>Show Location: {selectedUser.privacy.showLocation ? "Yes" : "No"}</li>
                </ul>
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-medium text-white hover:from-orange-600 hover:to-red-600 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UsersSection;
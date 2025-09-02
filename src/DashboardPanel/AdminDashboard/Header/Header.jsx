import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../hooks/AuthContexts/AuthContexts";
import { useNavigate } from "react-router";

const Header = ({ activeSection, menuItems, adminProfile, loading }) => {
  const { logOut } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    navigate("/");
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {menuItems.find((item) => item.id === activeSection)?.label ||
                "Dashboard"}
            </h1>
            <p className="text-gray-400">
              {loading
                ? "Loading admin data..."
                : `Welcome back, ${
                    adminProfile?.fullName || "Admin"
                  }! Manage your application from this central hub`}
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="flex items-center space-x-2">
              {adminProfile && (
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">
                    {adminProfile.fullName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {adminProfile.role || "admin"}
                  </p>
                </div>
              )}
              <button onClick={handleLogout} className="cursor-pointer px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-medium transition-all">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
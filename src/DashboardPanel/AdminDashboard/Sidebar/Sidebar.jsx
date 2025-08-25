import React from "react";
import { motion } from "framer-motion";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeSection,
  setActiveSection,
  menuItems,
  adminProfile,
  loading,
}) => {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: sidebarOpen ? 0 : -250 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } min-h-screen bg-gray-900/60 backdrop-blur-xl border-r border-gray-700/50 transition-all duration-300 relative z-10`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              ⚡ Admin Panel
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          >
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
              activeSection === item.id
                ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-orange-300"
                : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
            }`}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {sidebarOpen && (
              <>
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Admin Profile */}
      {sidebarOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center overflow-hidden">
                {adminProfile?.photoURL ? (
                  <img
                    src={`https://projukti-sheba-server.onrender.com${adminProfile.photoURL}`}
                    alt="Admin"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold">
                    {adminProfile?.fullName
                      ? adminProfile.fullName.charAt(0).toUpperCase()
                      : "👨‍💼"}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {loading
                    ? "Loading..."
                    : adminProfile?.fullName || "Admin User"}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {loading
                    ? "Loading..."
                    : adminProfile?.email || "admin@example.com"}
                </p>
                {adminProfile?.role === "admin" && (
                  <div className="flex items-center mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-500/20 text-orange-300">
                      Admin
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;
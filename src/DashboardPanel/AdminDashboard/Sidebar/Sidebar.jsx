import React from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeSection,
  setActiveSection, // This now receives the handleSectionChange function
  menuItems,
}) => {
  return (
    <div className="relative">
      {/* Toggle Button (Visible on both PC and Mobile) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-4 z-20 p-3 rounded-lg bg-red-50 hover:bg-red-100 text-black transition-all duration-300 ease-in-out shadow-lg ${
          sidebarOpen ? "left-60" : "left-12"
        } lg:block hidden`}
      >
        {sidebarOpen ? <FaArrowLeft size={20} /> : <FaArrowRight size={20} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: sidebarOpen ? 256 : 64,
          x: 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="min-h-screen bg-[#f3f4f8] backdrop-blur-xl border-r border-gray-700/50 transition-all duration-300 relative z-10 shadow-lg"
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700/50">
          {sidebarOpen && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
            >
              ⚡ Admin Panel
            </motion.h1>
          )}
          {!sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl text-center"
            >
              ⚡
            </motion.div>
          )}
        </div>

        {/* Menu Items with Scrollbar */}
        <nav className="p-4 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveSection(item.id); // This now calls handleSectionChange
                if (window.innerWidth < 1024) {
                  setSidebarOpen(false); // Close sidebar on mobile after selection
                }
              }}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-[#f3f4f8]/40 border border-orange-500/30 text-black"
                  : "hover:bg-[#f3f4f8]/40 text-black shadow-md cursor-pointer hover:text-black"
              } ${!sidebarOpen ? 'justify-center' : ''}`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center w-full"
                >
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-400 text-black text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </motion.div>
              )}
            </motion.button>
          ))}
        </nav>
      </motion.aside>
    </div>
  );
};

export default Sidebar;
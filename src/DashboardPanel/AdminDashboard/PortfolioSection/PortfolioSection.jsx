import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const PortfolioSection = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0 text-white">Order Management</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-800/30 hover:bg-gray-700/40 backdrop-blur-md rounded-xl border border-gray-600/50 text-white transition-all duration-300 hover:shadow-lg">
            Filter
          </button>
          <button className="px-4 py-2 bg-gray-800/30 hover:bg-gray-700/40 backdrop-blur-md rounded-xl border border-gray-600/50 text-white transition-all duration-300 hover:shadow-lg">
            Export
          </button>
          <button onClick={ () => navigate("/add-portfolio")} className="px-4 py-2 bg-gradient-to-r from-blue-600/50 to-purple-600/50 hover:from-blue-500/60 hover:to-purple-500/60 backdrop-blur-md rounded-xl border border-gray-600/50 text-white transition-all duration-300 hover:shadow-lg">
            Add Portfolio
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600/50 to-purple-600/50 hover:from-blue-500/60 hover:to-purple-500/60 backdrop-blur-md rounded-xl border border-gray-600/50 text-white transition-all duration-300 hover:shadow-lg">
            Manage Portfolio
          </button>
        </div>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 backdrop-blur-xl rounded-2xl p-6 border border-gray-600/30 shadow-xl"
      >
        <div className="flex items-center justify-center py-12 text-gray-300">
          <div className="text-center">
            <div className="text-4xl mb-4">📦</div>
            <p className="text-lg font-medium mb-2">No Orders Found</p>
            <p className="text-sm">
              Orders will appear here once customers place them
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioSection;
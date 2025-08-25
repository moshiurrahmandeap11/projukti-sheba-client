import React from "react";
import { motion } from "framer-motion";

const OrdersSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Order Management</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700/50 transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700/50 transition-colors">
            Export
          </button>
        </div>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
      >
        <div className="flex items-center justify-center py-12 text-gray-400">
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

export default OrdersSection;
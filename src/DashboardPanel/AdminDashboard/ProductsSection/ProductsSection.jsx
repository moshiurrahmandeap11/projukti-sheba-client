import React from "react";
import { motion } from "framer-motion";

const ProductsSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Product Management</h2>
        <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl font-medium transition-all">
          + Add Product
        </button>
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
            <div className="text-4xl mb-4">🛍️</div>
            <p className="text-lg font-medium mb-2">No Products Found</p>
            <p className="text-sm">Add your first product to get started</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductsSection;
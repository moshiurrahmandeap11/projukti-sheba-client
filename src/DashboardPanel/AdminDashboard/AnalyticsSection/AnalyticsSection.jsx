import React from "react";
import { motion } from "framer-motion";

const AnalyticsSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics & Reports</h2>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
      >
        <div className="flex items-center justify-center py-12 text-gray-400">
          <div className="text-center">
            <div className="text-4xl mb-4">📈</div>
            <p className="text-lg font-medium mb-2">No Analytics Data</p>
            <p className="text-sm">
              Analytics will be available once you have data
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsSection;
import React from "react";
import { motion } from "framer-motion";

const SettingsSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">System Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="shadow-md backdrop-blur-xl rounded-2xl p-6 "
        >
          <h3 className="text-lg font-bold mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Site Name
              </label>
              <input
                type="text"
                placeholder="Projukti Sheba"
                className="w-full bg-gray-200/50 border border-gray-700 rounded-xl px-4 py-3 text-black placeholder-gray-400  focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Site Description
              </label>
              <textarea
                placeholder="Your site description"
                rows="3"
                className="w-full bg-gray-200/50 border border-gray-700 rounded-xl px-4 py-3 text-black placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
              ></textarea>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className=" backdrop-blur-xl rounded-2xl p-6 shadow-md"
        >
          <h3 className="text-lg font-bold mb-4">Notification Settings</h3>
          <div className="space-y-4">
            {[
              "Email Notifications",
              "SMS Notifications",
              "Push Notifications",
              "Order Alerts",
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{setting}</span>
                <button className="w-12 h-6 bg-gray-700 rounded-full relative transition-colors focus:outline-none">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsSection;
import React from "react";
import { motion } from "framer-motion";

const OverviewSection = ({ totalUsers }) => {
  const stats = [
    {
      title: "Total Users",
      value: `${totalUsers?.length || 0}`,
      change: "+0%",
      icon: "👥",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Orders",
      value: "0",
      change: "+0%",
      icon: "📦",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Revenue",
      value: "৳0",
      change: "+0%",
      icon: "💰",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Products",
      value: "0",
      change: "+0%",
      icon: "🛍️",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-xl`}
              >
                {stat.icon}
              </div>
              <span className="text-xs text-green-400 font-medium">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
      >
        <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Add User", icon: "👤", action: "users" },
            { title: "New Product", icon: "📦", action: "products" },
            { title: "View Orders", icon: "🛒", action: "orders" },
            { title: "Analytics", icon: "📊", action: "analytics" },
          ].map((action, index) => (
            <button
              key={index}
              className="bg-gray-800/50 hover:bg-gray-700/50 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all text-center group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              <p className="text-sm font-medium">{action.title}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
      >
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-center py-12 text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <p>No recent activity to display</p>
              <p className="text-sm mt-2">
                Activity will appear here once you start using the system
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OverviewSection;
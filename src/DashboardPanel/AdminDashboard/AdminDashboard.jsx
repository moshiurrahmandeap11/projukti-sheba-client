import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../hooks/AuthContexts/AuthContexts";

// Import all section components
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import OverviewSection from "./OverviewSection/OverviewSection";
import UsersSection from "./UsersSection/UsersSection";
import PortfolioSection from "./PortfolioSection/PortfolioSection";
import ProductsSection from "./ProductsSection/ProductsSection";
import AnalyticsSection from "./AnalyticsSection/AnalyticsSection";
import MessagesSection from "./MessagesSection/MessagesSection";
import SettingsSection from "./SettingsSection/SettingsSection";
import ReportsSection from "./ReportsSection/ReportsSection";
import { useNavigate } from "react-router";
import ServicesSection from "./ServicesSection/ServicesSection";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const { user, loading } = useAuth();
  const [adminProfile, setAdminProfile] = useState(null);
  const [totalUsers, setTotalUsers] = useState([]);
  const navigate = useNavigate();

  const userId = user?.uid;

  // Fetch admin profile data
  useEffect(() => {
    const fetchAdminProfile = async () => {
      if (!userId) {
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setAdminProfile(response.data);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
        // Handle error - maybe show a toast or error state
      }
    };

    fetchAdminProfile();
  }, [userId]);

  // Fetch total users
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setTotalUsers(response.data);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  // Navigate to home when activeSection is "Home"
  useEffect(() => {
    if (activeSection === "Home") {
      navigate("/");
    }
  }, [activeSection, navigate]);

  // Sidebar menu items
  const menuItems = [
    { id: "overview", icon: "📊", label: "Overview", badge: null },
    { id: "users", icon: "👥", label: "Users", badge: null },
    { id: "portfolio", icon: "📦", label: "Portfolio", badge: null },
    { id: "products", icon: "🛍️", label: "Products", badge: null },
    { id: "analytics", icon: "📈", label: "Analytics", badge: null },
    { id: "messages", icon: "💬", label: "Messages", badge: null },
    { id: "settings", icon: "⚙️", label: "Settings", badge: null },
    { id: "reports", icon: "📋", label: "Reports", badge: null },
    { id: "services", icon: "🛠️", label: "Services", badge: null },
    { id: "home", icon: "🏠", label: "Home", badge: null }, // Added Home menu item
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection totalUsers={totalUsers} />;
      case "users":
        return <UsersSection totalUsers={totalUsers} />;
      case "portfolio":
        return <PortfolioSection />;
      case "products":
        return <ProductsSection />;
      case "analytics":
        return <AnalyticsSection />;
      case "messages":
        return <MessagesSection />;
      case "settings":
        return <SettingsSection />;
      case "reports":
        return <ReportsSection />;
      case "services":
        return <ServicesSection />;
      case "home":
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="flex relative">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          menuItems={menuItems}
          adminProfile={adminProfile}
          loading={loading}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Top Header */}
          <Header
            activeSection={activeSection}
            menuItems={menuItems}
            adminProfile={adminProfile}
            loading={loading}
          />

          {/* Dynamic Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            key={activeSection}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
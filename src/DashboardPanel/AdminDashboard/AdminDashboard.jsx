import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../hooks/AuthContexts/AuthContexts";
import { useNavigate } from "react-router";

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
import ServicesSection from "./ServicesSection/ServicesSection";
import AboutSection from "../AboutSection/AboutSection";
import ContactSection from "./ContactSection/ContactSection";
import SupportSection from "./SupportSection/SupportSection";
import ContactUsDraft from "./ContactSection/ContactUsDraft/ContactUsDraft";
import TestimonialsSection from "./TestimonialSection/TestimonialSection";
import BlogSection from "./BlogSection/BlogSection";
import OurClients from "../OurClients/OurClients";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default to closed on mobile
  const [activeSection, setActiveSection] = useState(() => {
    // Initialize activeSection from localStorage or default to "overview"
    // But exclude "home" to prevent immediate redirect
    const saved = localStorage.getItem("activeSection");
    return (saved && saved !== "home") ? saved : "overview";
  });
  const { user, loading } = useAuth();
  const [adminProfile, setAdminProfile] = useState(null);
  const [totalUsers, setTotalUsers] = useState([]);
  const navigate = useNavigate();

  const userId = user?.uid;

  // Persist activeSection to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  // Fetch admin profile data
  useEffect(() => {
    const fetchAdminProfile = async () => {
      if (!userId) {
        return;
      }

      try {
        const response = await axios.get(
          `https://projukti-sheba-server.onrender.com/users/${userId}`
        );
        setAdminProfile(response.data);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };

    fetchAdminProfile();
  }, [userId]);

  // Fetch total users
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get(
          "https://projukti-sheba-server.onrender.com/users"
        );
        setTotalUsers(response.data);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  // Handle navigation when "home" is selected (only when user explicitly clicks home)
  const handleSectionChange = (sectionId) => {
    if (sectionId === "home") {
      navigate("/");
    } else {
      setActiveSection(sectionId);
    }
  };

  // Sidebar menu items
  const menuItems = [
    { id: "overview", icon: "📊", label: "Overview", badge: null },
    { id: "users", icon: "👥", label: "Users", badge: null },
    { id: "portfolio", icon: "📦", label: "Portfolio", badge: null },
    { id: "products", icon: "🛍️", label: "Products", badge: null },
    { id: "analytics", icon: "📈", label: "Analytics", badge: null },
    { id: "messages", icon: "💬", label: "Messages", badge: null },
    { id: "contact-us", icon: "📞", label: "Contact Us", badge: null },
    { id: "contact-us-draft", icon: "📞", label: "C Draft", badge: "New" },
    { id: "support", icon: "🆘", label: "Support", badge: "New" },
    { id: "testimonials", icon: "🖊️", label: "Testimonials", badge: "New" },
    { id: "blogs", icon: "📝", label: "Blogs", badge: "New" },
    { id: "our-clients", icon: "⚙️", label: "Our Clients", badge: null },
    { id: "services", icon: "🛠️", label: "Services", badge: null },
    { id: "about", icon: "ℹ️", label: "About Us", badge: null },
    { id: "home", icon: "🏠", label: "Home", badge: null },
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
      case "contact-us":
        return <ContactSection />;
      case "contact-us-draft":
        return <ContactUsDraft />;
      case "support":
        return <SupportSection />;
      case "testimonials":
        return <TestimonialsSection />;
      case "blogs":
        return <BlogSection />;
      case "our-clients":
        return <OurClients />;
      case "services":
        return <ServicesSection />;
      case "about":
        return <AboutSection />;
      default:
        return <OverviewSection totalUsers={totalUsers} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f8]/40 text-black">
      <div className="flex flex-col lg:flex-row relative">
        {/* Sidebar */}
        <div className="lg:block hidden">
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            activeSection={activeSection}
            setActiveSection={handleSectionChange} // Use the new handler
            menuItems={menuItems}
            adminProfile={adminProfile}
            loading={loading}
          />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <Sidebar
            sidebarOpen={true} // Always show full sidebar on mobile when open
            setSidebarOpen={setSidebarOpen}
            activeSection={activeSection}
            setActiveSection={handleSectionChange}
            menuItems={menuItems}
            adminProfile={adminProfile}
            loading={loading}
          />
        </div>

        {/* Main Content */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-auto transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'
        }`}>
          {/* Mobile Sidebar Toggle */}
          <button
            className="lg:hidden mb-4 p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="text-black">{sidebarOpen ? "Close" : "Menu"}</span>
          </button>

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
            className="mt-4 sm:mt-6"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
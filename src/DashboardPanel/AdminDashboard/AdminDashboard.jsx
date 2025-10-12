import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import ServicesSection from "./ServicesSection/ServicesSection";
import AboutSection from "../AboutSection/AboutSection";
import ContactSection from "./ContactSection/ContactSection";
import SupportSection from "./SupportSection/SupportSection";
import ContactUsDraft from "./ContactSection/ContactUsDraft/ContactUsDraft";
import TestimonialsSection from "./TestimonialSection/TestimonialSection";
import BlogSection from "./BlogSection/BlogSection";
import OurClients from "../OurClients/OurClients";
import axiosInstance from "../../hooks/AxiosInstance/AxiosInstance";
import OurSolutionsAdmin from "./OurSolutionsAdmin/OurSolutionsAdmin";
import OverviewAdmin from "./OverviewAdmin/OverviewAdmin";
import PricingAdmin from "./PricingAdmin/PricingAdmin";
import { BarChart3, Box, FileText, Home, Info, LifeBuoy, LineChart, MessageSquare, PenTool, Phone, Settings, ShoppingBag, Users, Wrench } from "lucide-react";

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
        const response = await axiosInstance.get(`/users/${userId}`);
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
        const response = await axiosInstance.get("/users");
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
  { id: "overview", icon: <BarChart3 size={18} />, label: "Overview", badge: null },
  { id: "users", icon: <Users size={18} />, label: "Users", badge: null },
  { id: "portfolio", icon: <Box size={18} />, label: "Portfolio", badge: null },
  { id: "pricing", icon: <ShoppingBag size={18} />, label: "Pricing", badge: null },
  { id: "analytics", icon: <LineChart size={18} />, label: "Analytics", badge: null },
  { id: "messages", icon: <MessageSquare size={18} />, label: "Messages", badge: null },
  { id: "contact-us", icon: <Phone size={18} />, label: "Contact Us", badge: null },
  { id: "contact-us-draft", icon: <Phone size={18} />, label: "C Draft", badge: null },
  { id: "support", icon: <LifeBuoy size={18} />, label: "Support", badge: null },
  { id: "testimonials", icon: <PenTool size={18} />, label: "Testimonials", badge: null },
  { id: "blogs", icon: <FileText size={18} />, label: "Blogs", badge: null },
  { id: "our-clients", icon: <Settings size={18} />, label: "Our Clients", badge: null },
  { id: "our-solutions", icon: <Wrench size={18} />, label: "Our Solutions", badge: null },
  { id: "services", icon: <Wrench size={18} />, label: "Services", badge: null },
  { id: "overview-admin", icon: <BarChart3 size={18} />, label: "Overview Admin", badge: null },
  { id: "about", icon: <Info size={18} />, label: "About Us", badge: null },
  { id: "home", icon: <Home size={18} />, label: "Home", badge: null },
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
      case "pricing":
        return <PricingAdmin />;
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
      case "our-solutions":
        return <OurSolutionsAdmin />;
      case "services":
        return <ServicesSection />;
        case "overview-admin":
          return <OverviewAdmin></OverviewAdmin>;
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
            sidebarOpen={true} 
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
            className="lg:hidden mb-4 p-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
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
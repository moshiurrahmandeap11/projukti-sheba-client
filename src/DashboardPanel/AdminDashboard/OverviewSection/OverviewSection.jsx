import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  User,
  MessageSquare,
  Ticket,
  Star,
  FileText,
  Loader2,
  ChevronDown,
  Eye,
} from "lucide-react";

const OverviewSection = ({ totalUsers }) => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: totalUsers?.length || 0,
    totalContacts: 0,
    totalSupportTickets: 0,
    totalTestimonials: 0,
    totalBlogs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage] = useState(10);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Fetch recent activities from all APIs
  const fetchActivities = async () => {
    setLoading(true);
    try {
      const [usersRes, contactsRes, draftContactsRes, supportRes, testimonialsRes, blogsRes] =
        await Promise.all([
          axios.get("http://localhost:3000/users"),
          axios.get("http://localhost:3000/contact-us-submitted"),
          axios.get("http://localhost:3000/contact-us"),
          axios.get("http://localhost:3000/support"),
          axios.get("http://localhost:3000/testimonials"),
          axios.get("http://localhost:3000/blogs"),
        ]);

      const users = usersRes.data || [];
      const contacts = contactsRes.data.data || [];
      const draftContacts = draftContactsRes.data.data || [];
      const supportTickets = supportRes.data.data || [];
      const testimonials = testimonialsRes.data.data || [];
      const blogs = blogsRes.data.data || [];

      // Combine and normalize activities
      const allActivities = [
        ...users.map((user) => ({
          type: "user",
          id: user._id,
          title: `New user registered: ${user.fullName || "Unnamed User"}`,
          details: {
            email: user.email || "N/A",
            createdAt: user.createdAt,
          },
          timestamp: new Date(user.createdAt).getTime(),
        })),
        ...contacts.map((contact) => ({
          type: "contact",
          id: contact._id,
          title: `New contact form submitted: ${contact.name || "N/A"}`,
          details: {
            email: contact.email || "N/A",
            status: contact.status || "pending",
            createdAt: contact.createdAt,
          },
          timestamp: new Date(contact.createdAt).getTime(),
        })),
        ...draftContacts.map((contact) => ({
          type: "draft_contact",
          id: contact._id,
          title: `New draft contact form: ${contact.name || "N/A"}`,
          details: {
            email: contact.email || "N/A",
            status: contact.status || "pending",
            createdAt: contact.createdAt,
          },
          timestamp: new Date(contact.createdAt).getTime(),
        })),
        ...supportTickets.map((ticket) => ({
          type: "support",
          id: ticket._id,
          title: `New support ticket: ${ticket.category || "N/A"}`,
          details: {
            phone: ticket.phone || "N/A",
            status: ticket.status || "pending",
            createdAt: ticket.createdAt,
          },
          timestamp: new Date(ticket.createdAt).getTime(),
        })),
        ...testimonials.map((testimonial) => ({
          type: "testimonial",
          id: testimonial._id,
          title: `New testimonial by ${testimonial.name || "N/A"}`,
          details: {
            rating: testimonial.rating || 0,
            createdAt: testimonial.createdAt,
          },
          timestamp: new Date(testimonial.createdAt).getTime(),
        })),
        ...blogs.map((blog) => ({
          type: "blog",
          id: blog._id,
          title: `New blog post: ${blog.title || "Untitled"}`,
          details: {
            author: blog.author || "Unknown Author",
            createdAt: blog.createdAt,
          },
          timestamp: new Date(blog.createdAt).getTime(),
        })),
      ].sort((a, b) => b.timestamp - a.timestamp); // Sort by latest first

      setActivities(allActivities);
      setStats({
        totalUsers: users.length,
        totalContacts: contacts.length + draftContacts.length,
        totalSupportTickets: supportTickets.length,
        totalTestimonials: testimonials.length,
        totalBlogs: blogs.length,
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching activities:", err);
      setError("⚠️ Failed to load recent activities. Please try again.");
      toast.error("Failed to load activities");
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Pagination
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = activities.slice(indexOfFirstActivity, indexOfLastActivity);
  const totalPages = Math.ceil(activities.length / activitiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Render stars for testimonials
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3 h-3 sm:w-4 sm:h-4 ${
            i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
          }`}
        />
      );
    }
    return stars;
  };

  // Get icon based on activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case "user":
        return <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />;
      case "contact":
      case "draft_contact":
        return <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />;
      case "support":
        return <Ticket className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />;
      case "testimonial":
        return <Star className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />;
      case "blog":
        return <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />;
      default:
        return <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />;
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-yellow-400 bg-yellow-400/10";
      case "engage":
        return "text-blue-400 bg-blue-400/10";
      case "completed":
        return "text-green-400 bg-green-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-transparent backdrop-blur-3xl p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 sm:mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            Summary of recent activities and key metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {[
            {
              title: "Total Users",
              value: stats?.totalUsers,
              icon: <User className="w-5 h-5 sm:w-6 sm:h-6 text-black" />,
              color: "bg-blue-400/10",
            },
            {
              title: "Total Contacts",
              value: stats.totalContacts,
              icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />,
              color: "bg-green-400/10",
            },
            {
              title: "Support Tickets",
              value: stats.totalSupportTickets,
              icon: <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />,
              color: "bg-yellow-400/10",
            },
            {
              title: "Testimonials",
              value: stats.totalTestimonials,
              icon: <Star className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />,
              color: "bg-purple-400/10",
            },
            {
              title: "Blog Posts",
              value: stats.totalBlogs,
              icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />,
              color: "bg-red-400/10",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl shadow-sm p-4 sm:p-6 border border-white/10 hover:border-[#B5000D]/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black text-xs sm:text-sm">{stat.title}</p>
                  <p className="text-lg sm:text-2xl font-bold text-black">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-2 sm:p-3 rounded-lg`}>{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-black">Recent Activity</h3>
            <button
              onClick={fetchActivities}
              disabled={loading}
              className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1 sm:py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 disabled:opacity-50 text-white rounded-lg text-sm sm:text-base transition-colors duration-200 mt-2 sm:mt-0"
            >
              <ChevronDown className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center p-8 sm:p-12">
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 animate-spin" />
              <span className="ml-2 sm:ml-3 text-gray-300 text-sm sm:text-base">
                Loading activities...
              </span>
            </div>
          ) : error ? (
            <div className="text-center p-8 sm:p-12">
              <MessageSquare className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-400 text-base sm:text-lg">{error}</p>
            </div>
          ) : currentActivities.length === 0 ? (
            <div className="text-center p-8 sm:p-12">
              <MessageSquare className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-black text-base sm:text-lg">No recent activity found</p>
              <p className="text-black text-xs sm:text-sm">
                Activity will appear here once available
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {currentActivities.map((activity, index) => (
                <motion.div
                  key={`${activity.type}-${activity.id}`}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between shadow-xs p-3 sm:p-4 bg-white/10 rounded-lg border border-white/5 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="bg-blue-500/10 p-1 sm:p-2 rounded-lg">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <p className="text-black font-medium text-sm sm:text-base">{activity.title}</p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {formatDate(activity.details.createdAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedActivity(activity)}
                    className="p-1 sm:p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200"
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </motion.div>
              ))}
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 p-3 sm:p-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-white/10 rounded-lg text-black hover:bg-white/20 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg ${
                        currentPage === page
                          ? "bg-[#B5000D] text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-white/10 rounded-lg text-black hover:bg-white/20 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Modal for Activity Details */}
        {selectedActivity && (
          <div className="fixed inset-0 bg-transparent backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-5 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {selectedActivity.type.charAt(0).toUpperCase() +
                    selectedActivity.type.slice(1)}{" "}
                  #{selectedActivity.id.slice(-6)}
                </h3>
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                {selectedActivity.type === "user" && (
                  <>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">👤 Name</p>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {selectedActivity.title.split(": ")[1]}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">📧 Email</p>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {selectedActivity.details.email}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">📅 Created At</p>
                      <p className="text-white text-sm sm:text-base">
                        {formatDate(selectedActivity.details.createdAt)}
                      </p>
                    </div>
                  </>
                )}
                {(selectedActivity.type === "contact" || selectedActivity.type === "draft_contact") && (
                  <>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">👤 Name</p>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {selectedActivity.title.split(": ")[1]}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">📧 Email</p>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {selectedActivity.details.email}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">🎯 Status</p>
                      <span
                        className={`inline-flex items-center space-x-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
                          selectedActivity.details.status
                        )}`}
                      >
                        <span className="capitalize">{selectedActivity.details.status}</span>
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">📅 Created At</p>
                      <p className="text-white text-sm sm:text-base">
                        {formatDate(selectedActivity.details.createdAt)}
                      </p>
                    </div>
                  </>
                )}
                {selectedActivity.type === "support" && (
                  <>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">📂 Category</p>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {selectedActivity.title.split(": ")[1]}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">📞 Phone</p>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {selectedActivity.details.phone}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">🎯 Status</p>
                      <span
                        className={`inline-flex items-center space-x-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
                          selectedActivity.details.status
                        )}`}
                      >
                        <span className="capitalize">{selectedActivity.details.status}</span>
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">📅 Created At</p>
                      <p className="text-white text-sm sm:text-base">
                        {formatDate(selectedActivity.details.createdAt)}
                      </p>
                    </div>
                  </>
                )}
                {selectedActivity.type === "testimonial" && (
                  <>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">👤 Name</p>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {selectedActivity.title.split(": ")[1]}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">⭐ Rating</p>
                      <div className="flex items-center space-x-1">
                        {renderStars(selectedActivity.details.rating)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">📅 Created At</p>
                      <p className="text-white text-sm sm:text-base">
                        {formatDate(selectedActivity.details.createdAt)}
                      </p>
                    </div>
                  </>
                )}
                {selectedActivity.type === "blog" && (
                  <>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">📝 Title</p>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {selectedActivity.title.split(": ")[1]}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">👤 Author</p>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {selectedActivity.details.author}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs sm:text-sm">📅 Created At</p>
                      <p className="text-white text-sm sm:text-base">
                        {formatDate(selectedActivity.details.createdAt)}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="p-3 sm:p-4 border-t border-white/10 text-right">
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OverviewSection;
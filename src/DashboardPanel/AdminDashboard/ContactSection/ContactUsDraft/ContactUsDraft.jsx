
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MessageSquare,
  Phone,
  Users,
  Clock,
  CheckCircle,
  Search,
  Loader2,
  Calendar,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  Eye,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

const ContactUsDraft = () => {
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingForm, setUpdatingForm] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);

  // Fetch draft forms
  const fetchForms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://projukti-sheba-server.onrender.com/contact-us"
      );
      setForms(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching draft contact forms:", err);
      setError("⚠️ Failed to load draft contact forms. Please try again.");
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  // Update form status
  const updateFormStatus = async (formId, newStatus) => {
    setUpdatingForm(formId);
    try {
      const response = await axios.patch(
        `https://projukti-sheba-server.onrender.com/contact-us/${formId}`,
        { status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setForms((prev) =>
          prev.map((form) =>
            form._id === formId ? { ...form, status: newStatus } : form
          )
        );
        setSelectedForm(null);
      } else {
        alert("Failed to update form status");
      }
    } catch (error) {
      console.error("Error updating draft form:", error);
      alert("Error updating form status");
    } finally {
      setUpdatingForm(null);
    }
  };

  // Filter forms based on active tab and search
  useEffect(() => {
    let filtered = forms.filter((form) => {
      const status = form.status || "pending";
      return status.toLowerCase() === activeTab.toLowerCase();
    });

    if (searchTerm) {
      filtered = filtered.filter(
        (form) =>
          form.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          form.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          form.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          form.subject?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredForms(filtered);
  }, [forms, activeTab, searchTerm]);

  useEffect(() => {
    fetchForms();
  }, []);

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

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "engage":
        return <Users className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getFormCounts = () => {
    return {
      pending: forms.filter(
        (f) => (f.status || "pending").toLowerCase() === "pending"
      ).length,
      engage: forms.filter(
        (f) => (f.status || "pending").toLowerCase() === "engage"
      ).length,
      completed: forms.filter(
        (f) => (f.status || "pending").toLowerCase() === "completed"
      ).length,
    };
  };

  const counts = getFormCounts();

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

  return (
    <motion.div
      className="min-h-screen bg-transparent backdrop-blur-3xl p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Draft Contact Forms Management
              </h1>
              <p className="text-gray-300">
                Manage and track draft contact forms
              </p>
            </div>
            <button
              onClick={fetchForms}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 disabled:opacity-50 text-white rounded-lg transition-colors duration-200"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {counts.pending}
                </p>
              </div>
              <div className="bg-yellow-400/10 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-blue-400">
                  {counts.engage}
                </p>
              </div>
              <div className="bg-blue-400/10 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-400">
                  {counts.completed}
                </p>
              </div>
              <div className="bg-green-400/10 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search draft forms by name, email, phone, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "pending", label: "Pending", count: counts.pending },
              { key: "engage", label: "In Progress", count: counts.engage },
              { key: "completed", label: "Completed", count: counts.completed },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === tab.key
                    ? "bg-[#B5000D] text-white shadow-lg"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                <span>{tab.label}</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Forms List */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              <span className="ml-3 text-gray-300">Loading draft forms...</span>
            </div>
          ) : filteredForms.length === 0 ? (
            <div className="text-center p-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No draft forms found</p>
              <p className="text-gray-500 text-sm">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : `No ${activeTab} draft forms at the moment`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Form
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Name
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Email
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium hidden md:table-cell">
                      Phone
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium hidden lg:table-cell">
                      Subject
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium hidden md:table-cell">
                      Status
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium hidden md:table-cell">
                      Created
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredForms.map((form, index) => (
                    <tr
                      key={form._id || index}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-500/10 p-2 rounded-lg">
                            <MessageSquare className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              #{form._id?.slice(-6) || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">
                            {form.name || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-300">
                          {form.email || "N/A"}
                        </span>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">
                            {form.phone || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <span className="text-gray-300">
                          {form.subject || "N/A"}
                        </span>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span
                          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            form.status || "pending"
                          )}`}
                        >
                          {getStatusIcon(form.status || "pending")}
                          <span className="capitalize">
                            {form.status || "pending"}
                          </span>
                        </span>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300 text-sm">
                            {formatDate(form.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedForm(form)}
                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <select
                              value={form.status || "pending"}
                              onChange={(e) =>
                                updateFormStatus(form._id, e.target.value)
                              }
                              disabled={updatingForm === form._id}
                              className="appearance-none bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400 pr-8"
                            >
                              <option value="pending" className="bg-gray-800">
                                Pending
                              </option>
                              <option value="engage" className="bg-gray-800">
                                In Progress
                              </option>
                              <option value="completed" className="bg-gray-800">
                                Completed
                              </option>
                            </select>
                            {updatingForm === form._id ? (
                              <Loader2 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400 animate-spin" />
                            ) : (
                              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal for Form Details */}
        {selectedForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl w-full max-w-md">
              <div className="p-5 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                  Draft Form #{selectedForm._id?.slice(-6) || "N/A"}
                </h3>
                <button
                  onClick={() => setSelectedForm(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">👤 Name</p>
                  <p className="text-white font-medium">
                    {selectedForm.name || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📧 Email</p>
                  <p className="text-white font-medium">
                    {selectedForm.email || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📞 Phone</p>
                  <p className="text-white font-medium">
                    {selectedForm.phone || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">🏢 Company</p>
                  <p className="text-white font-medium">
                    {selectedForm.company || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">🔧 Service</p>
                  <p className="text-white font-medium">
                    {selectedForm.service || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📝 Subject</p>
                  <p className="text-gray-200">
                    {selectedForm.subject || "No subject provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📝 Message</p>
                  <p className="text-gray-200">
                    {selectedForm.message || "No message provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📅 Created At</p>
                  <p className="text-white">
                    {formatDate(selectedForm.createdAt)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">🎯 Status</p>
                  <span
                    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      selectedForm.status || "pending"
                    )}`}
                  >
                    {getStatusIcon(selectedForm.status || "pending")}
                    <span className="capitalize">
                      {selectedForm.status || "pending"}
                    </span>
                  </span>
                </div>
              </div>
              <div className="p-4 border-t border-white/10 text-right">
                <button
                  onClick={() => setSelectedForm(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContactUsDraft;
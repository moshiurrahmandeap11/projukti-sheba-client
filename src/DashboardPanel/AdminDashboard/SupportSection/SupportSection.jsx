import React, { useState, useEffect } from "react";
import {
  Ticket,
  Phone,
  MessageSquare,
  Clock,
  Users,
  CheckCircle,
  Filter,
  Search,
  Loader2,
  Calendar,
  User,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  Edit3,
  Eye,
  FileText,
  Table,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axiosInstance from "../../../hooks/AxiosInstance/AxiosInstance";

const SupportSection = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingTicket, setUpdatingTicket] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Fetch support tickets
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/support");
      
  
      if (response.data && Array.isArray(response.data.data)) {
        setTickets(response.data.data);
      } else if (Array.isArray(response.data)) {
        setTickets(response.data);
      } else {
        console.warn("Unexpected response structure:", response.data);
        setTickets([]);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      // error handling
      if (error.response) {
        console.error("Server responded with:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  // Update ticket status
  const updateTicketStatus = async (ticketId, newStatus) => {
    if (!ticketId) {
      console.error("No ticket ID provided");
      return;
    }

    setUpdatingTicket(ticketId);
    try {
      const response = await axiosInstance.patch(`/support/${ticketId}`, {
        status: newStatus,
      });


      if (response.status >= 200 && response.status < 300) {
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
          )
        );
        setSelectedTicket(null);
      } else {
        alert("Failed to update ticket status");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Error updating ticket status");
    } finally {
      setUpdatingTicket(null);
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    if (filteredTickets.length === 0) {
      alert("No data to export");
      return;
    }

    try {
      const exportData = filteredTickets.map((ticket) => ({
        ID: ticket._id?.slice(-6) || "N/A",
        Phone: ticket.phone || "N/A",
        Category: ticket.category || "N/A",
        Problem: ticket.problem || "N/A",
        Status: ticket.status || "pending",
        "Created At": formatDate(ticket.createdAt),
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Support Tickets");

      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const fileName = `support_tickets_${activeTab}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      saveAs(new Blob([wbout], { type: "application/octet-stream" }), fileName);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Error exporting to Excel");
    }
  };

  // Export to PDF
  const exportToPDF = () => {
    if (filteredTickets.length === 0) {
      alert("No data to export");
      return;
    }

    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(
        `Support Tickets - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`,
        14,
        20
      );

      const tableColumn = [
        "ID",
        "Phone",
        "Category",
        "Problem",
        "Status",
        "Created At",
      ];

      const tableRows = filteredTickets.map((ticket) => [
        ticket._id?.slice(-6) || "N/A",
        ticket.phone || "N/A",
        ticket.category || "N/A",
        ticket.problem || "N/A",
        ticket.status || "pending",
        formatDate(ticket.createdAt),
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        styles: { fontSize: 8, cellPadding: 2 },
      });

      const fileName = `support_tickets_${activeTab}_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      alert("Error exporting to PDF");
    }
  };

  // Filter tickets based on active tab and search
  useEffect(() => {
    let filtered = tickets.filter((ticket) => {
      const status = ticket.status || "pending";
      return status.toLowerCase() === activeTab.toLowerCase();
    });

    if (searchTerm) {
      filtered = filtered.filter(
        (ticket) =>
          (ticket.phone?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (ticket.category?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (ticket.problem?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTickets(filtered);
  }, [tickets, activeTab, searchTerm]);

  useEffect(() => {
    fetchTickets();
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

  const getTicketCounts = () => {
    return {
      pending: tickets.filter(
        (t) => (t.status || "pending").toLowerCase() === "pending"
      ).length,
      engage: tickets.filter(
        (t) => (t.status || "pending").toLowerCase() === "engage"
      ).length,
      completed: tickets.filter(
        (t) => (t.status || "pending").toLowerCase() === "completed"
      ).length,
    };
  };

  const counts = getTicketCounts();

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  return (
    <div className="min-h-screen bg-transparent backdrop-blur-3xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">
                Support Management
              </h1>
              <p className="text-gray-600">
                Manage and track customer support tickets
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={exportToExcel}
                disabled={filteredTickets.length === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
              >
                <Table className="w-4 h-4" />
                <span>Export to Excel</span>
              </button>
              <button
                onClick={exportToPDF}
                disabled={filteredTickets.length === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
              >
                <FileText className="w-4 h-4" />
                <span>Export to PDF</span>
              </button>
              <button
                onClick={fetchTickets}
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border shadow-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {counts.pending}
                </p>
              </div>
              <div className="bg-yellow-400/10 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border shadow-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-blue-400">
                  {counts.engage}
                </p>
              </div>
              <div className="bg-blue-400/10 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border shadow-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
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

        {/* Search and Filters */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tickets by phone, category, or problem..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
            </div>
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
                    : "bg-white/5 text-gray-600 hover:bg-white/10"
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

        {/* Tickets List */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              <span className="ml-3 text-gray-300">Loading tickets...</span>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="text-center p-12">
              <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No tickets found</p>
              <p className="text-gray-500 text-sm">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : `No ${activeTab} tickets at the moment`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left p-4 text-gray-600 font-medium">
                      Ticket
                    </th>
                    <th className="text-left p-4 text-gray-600 font-medium">
                      Contact
                    </th>
                    <th className="text-left p-4 text-gray-600 font-medium">
                      Category
                    </th>
                    <th className="text-left p-4 text-gray-600 font-medium">
                      Status
                    </th>
                    <th className="text-left p-4 text-gray-600 font-medium">
                      Created
                    </th>
                    <th className="text-left p-4 text-gray-600 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket, index) => (
                    <tr
                      key={ticket._id || index}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-500/10 p-2 rounded-lg">
                            <Ticket className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-black font-medium">
                              #{ticket._id?.slice(-6) || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-600">
                            {ticket.phone || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-600">
                          {ticket.category || "N/A"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            ticket.status || "pending"
                          )}`}
                        >
                          {getStatusIcon(ticket.status || "pending")}
                          <span className="capitalize">
                            {ticket.status || "pending"}
                          </span>
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-600 text-sm">
                            {formatDate(ticket.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedTicket(ticket)}
                            className="p-2 text-gray-600 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <select
                              value={ticket.status || "pending"}
                              onChange={(e) =>
                                updateTicketStatus(ticket._id, e.target.value)
                              }
                              disabled={updatingTicket === ticket._id}
                              className="appearance-none bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-black text-sm focus:outline-none focus:border-blue-400 pr-8"
                            >
                              <option value="pending" className="bg-white/50">
                                Pending
                              </option>
                              <option value="engage" className="bg-white/50">
                                In Progress
                              </option>
                              <option value="completed" className="bg-white/50">
                                Completed
                              </option>
                            </select>
                            {updatingTicket === ticket._id ? (
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

        {/* Modal for Ticket Details */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl w-full max-w-md">
              <div className="p-5 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                  Ticket #{selectedTicket._id?.slice(-6) || "N/A"}
                </h3>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📞 Phone</p>
                  <p className="text-white font-medium">
                    {selectedTicket.phone || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📂 Category</p>
                  <p className="text-white font-medium">
                    {selectedTicket.category || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📝 Problem</p>
                  <p className="text-gray-200">
                    {selectedTicket.problem || "No description provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📅 Created At</p>
                  <p className="text-white">
                    {formatDate(selectedTicket.createdAt)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">🎯 Status</p>
                  <span
                    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      selectedTicket.status || "pending"
                    )}`}
                  >
                    {getStatusIcon(selectedTicket.status || "pending")}
                    <span className="capitalize">
                      {selectedTicket.status || "pending"}
                    </span>
                  </span>
                </div>
              </div>
              <div className="p-4 border-t border-white/10 text-right">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportSection;
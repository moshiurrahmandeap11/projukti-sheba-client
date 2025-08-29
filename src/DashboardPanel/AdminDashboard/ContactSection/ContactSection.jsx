import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ITEMS_PER_PAGE = 10;

const ContactSection = () => {
  const [submittedForms, setSubmittedForms] = useState([]);
  const [nonSubmittedForms, setNonSubmittedForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [submittedPage, setSubmittedPage] = useState(1);
  const [draftPage, setDraftPage] = useState(1);

  // Fetch both submitted and non-submitted forms
  useEffect(() => {
    const fetchForms = async () => {
      try {
        setLoading(true);
        const [submittedRes, nonSubmittedRes] = await Promise.all([
          axios.get(
            "https://projukti-sheba-server.onrender.com/contact-us-submitted"
          ),
          axios.get("https://projukti-sheba-server.onrender.com/contact-us"),
        ]);
        setSubmittedForms(submittedRes.data.data);
        setNonSubmittedForms(nonSubmittedRes.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching contact forms:", err);
        setError("⚠️ Failed to load contact forms. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  // Handle delete for submitted forms
  const handleDeleteSubmitted = async (id) => {
    try {
      await axios.delete(
        `https://projukti-sheba-server.onrender.com/contact-us-submitted/${id}`
      );
      setSubmittedForms(submittedForms.filter((form) => form._id !== id));
    } catch (err) {
      console.error("Error deleting submitted form:", err);
      setError("❌ Failed to delete submitted form.");
    }
  };

  // Handle delete for non-submitted forms
  const handleDeleteNonSubmitted = async (id) => {
    try {
      await axios.delete(
        `https://projukti-sheba-server.onrender.com/contact-us/${id}`
      );
      setNonSubmittedForms(nonSubmittedForms.filter((form) => form._id !== id));
    } catch (err) {
      console.error("Error deleting non-submitted form:", err);
      setError("❌ Failed to delete draft form.");
    }
  };

  // Pagination logic
  const paginate = (forms, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return forms.slice(start, start + ITEMS_PER_PAGE);
  };

  // Pagination component
  const Pagination = ({ totalItems, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 bg-gray-700 text-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => onPageChange(idx + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 bg-gray-700 text-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  // Render table for forms
  const renderTable = (forms, isSubmitted, handleDelete, currentPage, setPage) => {
    const paginatedForms = paginate(forms, currentPage);

    return (
      <div className="overflow-x-auto rounded-lg border border-gray-700/40">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-800/70 text-gray-100 uppercase tracking-wide text-xs">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4 hidden md:table-cell">Phone</th>
              <th className="p-4 hidden lg:table-cell">Company</th>
              <th className="p-4 hidden lg:table-cell">Service</th>
              <th className="p-4">Subject</th>
              <th className="p-4 hidden md:table-cell">Created At</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedForms.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-400">
                  {isSubmitted
                    ? "📭 No submitted forms yet."
                    : "📝 No draft forms found."}
                </td>
              </tr>
            ) : (
              paginatedForms.map((form) => (
                <tr
                  key={form._id}
                  className="border-b border-gray-700/40 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="p-4 font-medium text-gray-200">{form.name}</td>
                  <td className="p-4">{form.email}</td>
                  <td className="p-4 hidden md:table-cell">
                    {form.phone || "-"}
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    {form.company || "-"}
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    {form.service || "-"}
                  </td>
                  <td className="p-4">{form.subject}</td>
                  <td className="p-4 hidden md:table-cell">
                    {new Date(form.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(form._id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition"
                      title="Delete this form"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <Pagination
          totalItems={forms.length}
          currentPage={currentPage}
          onPageChange={setPage}
        />
      </div>
    );
  };

  return (
    <motion.div
      className="relative z-10 p-6 bg-gray-800/60 rounded-2xl backdrop-blur-md border border-gray-700/40 shadow-lg"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
        Contact Forms Dashboard
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submitted Forms Box */}
          <motion.div
            className="bg-gray-900/60 p-6 rounded-xl border border-gray-700/50 shadow-md"
            variants={cardVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">
                Submitted Forms
              </h3>
              <span className="text-sm px-3 py-1 rounded-full bg-green-500/20 text-green-400">
                {submittedForms.length}
              </span>
            </div>
            {renderTable(
              submittedForms,
              true,
              handleDeleteSubmitted,
              submittedPage,
              setSubmittedPage
            )}
          </motion.div>

          {/* Non-Submitted Forms Box */}
          <motion.div
            className="bg-gray-900/60 p-6 rounded-xl border border-gray-700/50 shadow-md"
            variants={cardVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Draft Forms</h3>
              <span className="text-sm px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                {nonSubmittedForms.length}
              </span>
            </div>
            {renderTable(
              nonSubmittedForms,
              false,
              handleDeleteNonSubmitted,
              draftPage,
              setDraftPage
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ContactSection;

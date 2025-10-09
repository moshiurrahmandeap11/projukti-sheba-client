import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Package,
  DollarSign,
  Tag,
  Eye,
  Trash2,
  Plus,
  Search,
  Loader2,
  Calendar,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import axiosInstance from "../../../hooks/AxiosInstance/AxiosInstance";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("⚠️ Failed to load products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/products/${id}`);
        setProducts((prev) => prev.filter((p) => p._id !== id));
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting product:", err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    const exportData = filteredProducts.map((product) => ({
      ID: product._id?.slice(-6) || "N/A",
      Name: product.name || "N/A",
      Price: product.price ? `$${product.price}` : "N/A",
      Category: product.category || "N/A",
      Status: product.status || "active",
      "Created At": formatDate(product.createdAt),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileName = `products_${activeTab}_${new Date().toISOString().slice(0, 10)}.xlsx`;
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), fileName);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(
      `Products - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`,
      14,
      20
    );

    const tableColumn = ["ID", "Name", "Price", "Category", "Status", "Created At"];
    const tableRows = filteredProducts.map((product) => [
      product._id?.slice(-6) || "N/A",
      product.name || "N/A",
      product.price ? `$${product.price}` : "N/A",
      product.category || "N/A",
      product.status || "active",
      formatDate(product.createdAt),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 8, cellPadding: 2 },
    });

    const fileName = `products_${activeTab}_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(fileName);
  };

  // Filter products based on active tab and search
  useEffect(() => {
    let filtered = products;
    if (activeTab !== "all") {
      filtered = products.filter((product) => {
        const status = product.status || "active";
        return status.toLowerCase() === activeTab.toLowerCase();
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, activeTab, searchTerm]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-green-400 bg-green-400/10";
      case "inactive":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "inactive":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getProductCounts = () => {
    return {
      all: products.length,
      active: products.filter(
        (p) => (p.status || "active").toLowerCase() === "active"
      ).length,
      inactive: products.filter(
        (p) => (p.status || "active").toLowerCase() === "inactive"
      ).length,
    };
  };

  const counts = getProductCounts();

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
              <h1 className="text-3xl font-bold text-black mb-2">Products Management</h1>
              <p className="text-gray-600">Manage and track your products</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={exportToExcel}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg transition-colors duration-200"
              >
                <Package className="w-4 h-4" />
                <span>Export to Excel</span>
              </button>
              <button
                onClick={exportToPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg transition-colors duration-200"
              >
                <Package className="w-4 h-4" />
                <span>Export to PDF</span>
              </button>
              <button
                onClick={fetchProducts}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 disabled:opacity-50 text-white rounded-lg transition-colors duration-200"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => navigate("/dashboard/add-product")}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border shadow-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">All Products</p>
                <p className="text-2xl font-bold text-blue-400">{counts.all}</p>
              </div>
              <div className="bg-blue-400/10 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border shadow-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-2xl font-bold text-green-400">{counts.active}</p>
              </div>
              <div className="bg-green-400/10 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border shadow-md border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Inactive</p>
                <p className="text-2xl font-bold text-red-400">{counts.inactive}</p>
              </div>
              <div className="bg-red-400/10 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-400" />
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
              placeholder="Search products by name or category..."
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
              { key: "all", label: "All Products", count: counts.all },
              { key: "active", label: "Active", count: counts.active },
              { key: "inactive", label: "Inactive", count: counts.inactive },
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

        {/* Products List */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              <span className="ml-3 text-gray-300">Loading products...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center p-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No products found</p>
              <p className="text-gray-500 text-sm">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : `No ${activeTab} products at the moment`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left p-4 text-gray-600 font-medium">Product</th>
                    <th className="text-left p-4 text-gray-600 font-medium">Name</th>
                    <th className="text-left p-4 text-gray-600 font-medium">Price</th>
                    <th className="text-left p-4 text-gray-600 font-medium hidden md:table-cell">
                      Category
                    </th>
                    <th className="text-left p-4 text-gray-600 font-medium hidden md:table-cell">
                      Status
                    </th>
                    <th className="text-left p-4 text-gray-600 font-medium hidden md:table-cell">
                      Created
                    </th>
                    <th className="text-left p-4 text-gray-600 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr
                      key={product._id || index}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-500/10 p-2 rounded-lg">
                            <Package className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-black font-medium">
                              #{product._id?.slice(-6) || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-600">{product.name || "N/A"}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-600">
                            {product.price ? `$${product.price}` : "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex items-center space-x-2">
                          <Tag className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-600">{product.category || "N/A"}</span>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span
                          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            product.status || "active"
                          )}`}
                        >
                          {getStatusIcon(product.status || "active")}
                          <span className="capitalize">{product.status || "active"}</span>
                        </span>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-600 text-sm">
                            {formatDate(product.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="p-2 text-gray-600 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/dashboard/edit-product/${product._id}`)}
                            className="p-2 text-gray-600 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors duration-200"
                          >
                            <Tag className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal for Product Details */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl w-full max-w-md">
              <div className="p-5 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                  Product #{selectedProduct._id?.slice(-6) || "N/A"}
                </h3>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📦 Name</p>
                  <p className="text-white font-medium">{selectedProduct.name || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">💰 Price</p>
                  <p className="text-white font-medium">
                    {selectedProduct.price ? `$${selectedProduct.price}` : "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">🏷️ Category</p>
                  <p className="text-white font-medium">{selectedProduct.category || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">📅 Created At</p>
                  <p className="text-white">{formatDate(selectedProduct.createdAt)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">🎯 Status</p>
                  <span
                    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      selectedProduct.status || "active"
                    )}`}
                  >
                    {getStatusIcon(selectedProduct.status || "active")}
                    <span className="capitalize">{selectedProduct.status || "active"}</span>
                  </span>
                </div>
              </div>
              <div className="p-4 border-t border-white/10 text-right">
                <button
                  onClick={() => setSelectedProduct(null)}
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

export default ProductsTable;
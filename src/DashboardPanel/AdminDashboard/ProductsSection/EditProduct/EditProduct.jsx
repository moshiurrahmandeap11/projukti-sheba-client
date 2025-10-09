import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Package, DollarSign, Tag, FileText, List, Calendar, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "../../../../hooks/AxiosInstance/AxiosInstance";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from URL
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    price: "",
    startingPriceText: "",
    emi: "",
    features: [],
    category: "",
    createdAt: new Date().toISOString(),
  });
  const [categories, setCategories] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        setCategories(response.data.data || []);
      } catch {
        Swal.fire("Error!", "Failed to load categories.", "error");
      } finally {
        setCategoryLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        if (response.data.success) {
          const product = response.data.data;
          setFormData({
            title: product.name || "",
            shortDescription: product.description || "",
            price: product.price || "",
            startingPriceText: product.startingPriceText || "",
            emi: product.emi || "",
            features: product.features || [],
            category: product.category || "",
            createdAt: product.createdAt || new Date().toISOString(),
          });
        } else {
          Swal.fire("Error!", "Failed to load product data.", "error");
        }
      } catch {
        Swal.fire("Error!", "Failed to load product data.", "error");
      } finally {
        setProductLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Memoized formatted date
  const formattedDate = useMemo(
    () =>
      new Date(formData.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [formData.createdAt]
  );

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle feature addition
  const handleAddFeature = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newFeature.trim()) {
        setFormData((prev) => ({
          ...prev,
          features: [...prev.features, newFeature.trim()],
        }));
        setNewFeature("");
      }
    }
  };

  // Handle feature removal
  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/products/${id}`,
        {
          name: formData.title,
          description: formData.shortDescription,
          price: parseFloat(formData.price) || 0,
          startingPriceText: formData.startingPriceText,
          emi: formData.emi,
          features: formData.features,
          category: formData.category,
          createdAt: formData.createdAt,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Product updated successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => navigate("/dashboard/admin"));
      } else {
        Swal.fire("Error!", "Failed to update product.", "error");
      }
    } catch {
      Swal.fire("Error!", "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while fetching product or categories
  if (productLoading || categoryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-transparent backdrop-blur-3xl p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Edit Product</h1>
              <p className="text-black">Update the details for the product</p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#A0000C] text-black rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-gray-200/20 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-black">
                <Package className="w-5 h-5" />
                <span>Title</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter product title"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-100/20 rounded-lg text-black placeholder-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-black">
                <FileText className="w-5 h-5" />
                <span>Short Description</span>
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                placeholder="Enter short description"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-200/20 rounded-lg text-black placeholder-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                rows="4"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-black">
                <DollarSign className="w-5 h-5" />
                <span>Price (in $)</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price in dollars"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-200/20 rounded-lg text-black placeholder-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                step="0.01"
              />
            </div>

            {/* Starting Price Text */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-black">
                <DollarSign className="w-5 h-5" />
                <span>Starting Price Text</span>
              </label>
              <input
                type="text"
                name="startingPriceText"
                value={formData.startingPriceText}
                onChange={handleInputChange}
                placeholder="Enter starting price text (e.g., Starting at $99)"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-200/20 rounded-lg text-black placeholder-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* EMI */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-black">
                <DollarSign className="w-5 h-5" />
                <span>EMI</span>
              </label>
              <input
                type="text"
                name="emi"
                value={formData.emi}
                onChange={handleInputChange}
                placeholder="$5/month"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-200/20 rounded-lg text-black placeholder-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Features */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-black">
                <List className="w-5 h-5" />
                <span>Features (Press Enter to add)</span>
              </label>
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={handleAddFeature}
                placeholder="Type a feature and press Enter"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-200/20 rounded-lg text-black placeholder-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 text-black rounded-full text-sm"
                  >
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-300 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-black">
                <Tag className="w-5 h-5" />
                <span>Category</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                disabled={categoryLoading}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-200/20 rounded-lg text-black placeholder-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="" disabled>
                  {categoryLoading ? "Loading categories..." : "Select a category"}
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Created At */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-black">
                <Calendar className="w-5 h-5" />
                <span>Created At</span>
              </label>
              <input
                type="text"
                value={formattedDate}
                disabled
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-200/20 rounded-lg text-black"
              />
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#B5000D] hover:bg-[#A0000C] disabled:opacity-50 text-white rounded-lg transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Package className="w-4 h-4" />
                    <span>Update Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default EditProduct;
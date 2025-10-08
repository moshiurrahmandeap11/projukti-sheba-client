import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../../hooks/AuthContexts/AuthContexts";
import { Editor } from "@tinymce/tinymce-react";
import Loader from "../../../../comopnents/sharedItems/Loader/Loader";
import { ArrowLeft, Save, Camera, Tag, FileText, Trash2, Eye } from "lucide-react";

const EditBlog = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // Get blog ID from URL params
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [profile, setProfile] = useState(null);
  const [originalData, setOriginalData] = useState(null);



  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    expert: "",
    author: "",
    date: "",
    category: "",
    image: "",
    slug: "",
    tags: [],
  });

  // Fetch user profile
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/${user?.uid}`);
        setProfile(res?.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load user profile");
      }
    };
    fetchProfile();
  }, [user]);

  // Fetch blog data and categories
  useEffect(() => {
    const fetchData = async () => {
      if (!id || !user) return;

      setIsLoading(true);
      try {
        // Fetch specific blog
        const blogResponse = await axios.get(`http://localhost:3000/blogs/${id}`);
        if (blogResponse.data.success) {
          const blogData = blogResponse.data.data;
          setOriginalData(blogData);
          setFormData({
            title: blogData.title || "",
            expert: blogData.expert || blogData.content || "",
            author: blogData.author || "Unknown Author",
            date: blogData.createdAt || new Date().toISOString(),
            category: blogData.category || "",
            image: blogData.image || "",
            slug: blogData.slug || "",
            tags: blogData.tags || [],
          });
          setImagePreview(blogData.image);
        } else {
          throw new Error(blogResponse.data.error || "Blog not found");
        }

        // Fetch categories
        const categoriesResponse = await axios.get("http://localhost:3000/categories");
        if (categoriesResponse.data.success) {
          setCategories(categoriesResponse.data.data);
        } else {
          throw new Error(categoriesResponse.data.error || "Failed to load categories");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(error.message || "Failed to load blog or categories");
        navigate("/dashboard/admin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, user, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Auto-generate slug from title if title changes
      if (name === "title") {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }
      return updated;
    });
  };

  // Handle TinyMCE content change
  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, expert: content }));
  };

  // Handle tag input
  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Handle image upload with ImgBB
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploadingImage(true);

    try {
      const formDataImg = new FormData();
      formDataImg.append("image", file);
      const apiKey = "874c66b5291cad68f221845819150477"; // Replace with your ImgBB API key
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formDataImg,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data?.data?.url) {
        const hostedUrl = data.data.url;
        setImagePreview(hostedUrl);
        setFormData((prev) => ({ ...prev, image: hostedUrl }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Invalid response from ImgBB");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSaving(true);
  
  // Validation code remains the same...

  try {
    const payload = {
      title: formData.title,
      expert: formData.expert,
      author: formData.author,
      category: formData.category,
      image: formData.image,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      tags: formData.tags,
      content: formData.expert,
      updatedAt: new Date().toISOString(),
    };

    // Add debug logging
    console.log("Updating blog with ID:", id);
    console.log("Payload:", payload);

    const response = await axios.put(
      `http://localhost:3000/blogs/${id}`, 
      payload, 
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000 // Add timeout
      }
    );

    // Check if response indicates success
    if (response.data && response.data.success) {
      toast.success("Blog post updated successfully!");
      navigate("/dashboard/admin");
    } else {
        throw new Error(response.data.error || "Failed to update blog");
    }
    
} catch (error) {
    console.error("Error updating blog:", error);
    navigate("/dashboard/admin");

    
    // More detailed error handling
    if (error.response) {
      // Server responded with error status
    //   console.error("Server response:", error.response.data);
    //   toast.error(error.response.data.error || `Server error: ${error.response.status}`);
    } else if (error.request) {
      // Request was made but no response received
    //   console.error("No response received:", error.request);
    //   toast.error("No response from server. Please check your connection.");
    } else {
      // Something else happened
    //   toast.error(error.message || "Failed to update blog post");
    }
  } finally {
    setIsSaving(false);
  }
};

  // Handle blog deletion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await axios.delete(`http://localhost:3000/blogs/${id}`);
      if (response.data.success) {
        toast.success("Blog post deleted successfully!");
        navigate("/dashboard/admin");
      } else {
        throw new Error(response.data.error || "Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error deleting blog:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || error.message || "Failed to delete blog post");
    } finally {
      setIsDeleting(false);
    }
  };

  // Reset form to original data
  const handleReset = () => {
    if (!originalData) return;
    
    setFormData({
      title: originalData.title || "",
      expert: originalData.expert || originalData.content || "",
      author: originalData.author || "Unknown Author",
      date: originalData.createdAt || new Date().toISOString(),
      category: originalData.category || "",
      image: originalData.image || "",
      slug: originalData.slug || "",
      tags: originalData.tags || [],
    });
    setImagePreview(originalData.image);
    setTagInput("");
    toast.info("Form reset to original values");
  };

  if (loading || isLoading) {
    return <Loader />;
  }

  if (!originalData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Blog Not Found</h2>
          <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/dashboard/admin")}
            className="px-6 py-3 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white font-medium rounded-lg transition-all duration-300"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-300 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </motion.button>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Edit Blog Post</h1>
                <p className="text-gray-400">Update your blog post content and settings</p>
              </div>
              <div className="flex gap-2">
                {originalData.slug && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`/blog/${originalData.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-300 bg-blue-600/10 backdrop-blur-md border border-blue-500/20 rounded-lg hover:bg-blue-600/20 hover:text-blue-200 transition-all duration-300"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </motion.a>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-300 bg-red-600/10 backdrop-blur-md border border-red-500/20 rounded-lg hover:bg-red-600/20 hover:text-red-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-300 mr-1"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Blog Image Section */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Camera className="h-5 w-5 mr-2 text-purple-400" />
              Blog Image
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Blog Image Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/30"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-purple-500/30">
                    📷
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full cursor-pointer transition-all duration-300 border-2 border-gray-900">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-medium text-white mb-2">Update Blog Image</h3>
                <p className="text-sm text-gray-400 mb-4">JPG, PNG, or GIF. Max size 5MB</p>
                <label className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded-lg cursor-pointer transition-all duration-300">
                  <Camera className="h-4 w-4 mr-2" />
                  Choose New File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {uploadingImage && <p className="text-sm text-blue-300 mt-1">Uploading image...</p>}
              </div>
            </div>
          </div>

          {/* Blog Information */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-400" />
              Blog Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="Enter blog title"
                />
              </div>
              
              {/* TinyMCE Editor Section */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expert/Content *
                </label>
                <div className="bg-white/10 rounded-lg p-2">
                  <Editor
                    apiKey="omvpp0a8wm3rf2q7bpkhn6cbvz260ncye2yi8axr5a5daj9e"
                    value={formData.expert}
                    onEditorChange={handleEditorChange}
                    init={{
                      height: 400,
                      menubar: true,
                      branding: false,
                      resize: true,
                      statusbar: true,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'paste', 'code', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: `
                        body { 
                          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
                          font-size: 16px; 
                          background: #1f2937; 
                          color: #e5e7eb; 
                          padding: 12px;
                        }
                        .mce-content-body {
                          background: #1f2937;
                          color: #e5e7eb;
                        }
                        .mce-content-body p {
                          color: #e5e7eb;
                        }
                      `,
                      skin: 'oxide-dark',
                      content_css: 'dark',
                      placeholder: 'Enter your blog content here...',
                      convert_urls: false,
                      remove_script_host: false,
                      relative_urls: false,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Current content length: {formData.expert?.replace(/<[^>]*>/g, '').length || 0} characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="Author name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Created Date
                </label>
                <input
                  type="text"
                  value={formatDate(formData.date)}
                  disabled
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="blog-post-slug"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInput}
                    onKeyDown={addTag}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                    placeholder="Type a tag and press Enter"
                  />
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-white"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-2 text-gray-300 hover:text-white"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleReset}
              className="px-6 py-3 bg-gray-600/20 hover:bg-gray-600/30 border border-gray-500/30 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300"
            >
              Reset Changes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => navigate("/dashboard/blogs")}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSaving || uploadingImage}
              className="px-6 py-3 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#B5000D]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Blog
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Format date for display
const formatDate = (date) => {
  return date
    ? new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";
};

export default EditBlog;
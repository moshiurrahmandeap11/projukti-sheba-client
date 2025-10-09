
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  MapPin,
  Calendar,
  Star,
  Camera,
  MessageSquare,
  Video,
  Folder,
  Tag,
  Save,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import axiosInstance from "../../hooks/AxiosInstance/AxiosInstance";

const AddTestimonial = () => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    company: "",
    location: "",
    date: new Date().toISOString().split('T')[0],
    rating: "",
    photoURL: "",
    testimonial: "",
    videoUrl: "",
    project: "",
    category: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploadingImage(true);

    try {
      const formDataImg = new FormData();
      formDataImg.append("image", file);

      const apiKey = "874c66b5291cad68f221845819150477"; 
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formDataImg,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data && data.data && data.data.url) {
        const hostedUrl = data.data.url;
        setImagePreview(hostedUrl);
        setFormData((prev) => ({ ...prev, photoURL: hostedUrl }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Invalid response from ImgBB");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await axiosInstance.post("/testimonials", formData);
      if (response.data.success) {
        toast.success("Testimonial added successfully!");
        setFormData({
          name: "",
          position: "",
          company: "",
          location: "",
          date: new Date().toISOString().split('T')[0],
          rating: "",
          photoURL: "",
          testimonial: "",
          videoUrl: "",
          project: "",
          category: "",
        });
        setImagePreview(null);
      } else {
        toast.error("Failed to add testimonial");
      }
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast.error("Error adding testimonial");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Add New Testimonial</h1>
          <p className="text-gray-400">Fill in the details to add a new testimonial</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Section */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Camera className="h-5 w-5 mr-2 text-purple-400" />
              Testimonial Image
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Testimonial Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/30"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-purple-500/30">
                    T
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
                <h3 className="text-lg font-medium text-white mb-2">Upload Image</h3>
                <p className="text-sm text-gray-400 mb-4">JPG, PNG, or GIF. Max size 5MB</p>
                <label className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded-lg cursor-pointer transition-all duration-300">
                  <Camera className="h-4 w-4 mr-2" />
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {uploadingImage && (
                  <p className="text-sm text-blue-300 mt-1">Uploading image...</p>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-400" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="Enter position"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="Enter company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="Enter rating (1-5)"
                />
              </div>
            </div>
          </div>

          {/* Testimonial Details */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-green-400" />
              Testimonial Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Testimonial
                </label>
                <textarea
                  name="testimonial"
                  value={formData.testimonial}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300 resize-none"
                  placeholder="Enter testimonial"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Video URL
                </label>
                <input
                  type="text"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="Enter video URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project
                </label>
                <input
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="Enter category"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: "",
                  position: "",
                  company: "",
                  location: "",
                  date: new Date().toISOString().split('T')[0],
                  rating: "",
                  photoURL: "",
                  testimonial: "",
                  videoUrl: "",
                  project: "",
                  category: "",
                });
                setImagePreview(null);
              }}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isSaving || uploadingImage}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Add Testimonial
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddTestimonial;
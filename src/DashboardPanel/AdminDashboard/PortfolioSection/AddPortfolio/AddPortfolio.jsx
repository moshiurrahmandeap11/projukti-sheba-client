import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { ArrowLeft, XCircle, Image, Camera, Save } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

const AddPortfolio = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    client: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
    description: '',
    technologies: [],
    features: [],
    status: 'ongoing',
  });
  const [categories, setCategories] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [filteredTechnologies, setFilteredTechnologies] = useState([]);
  const [techSearch, setTechSearch] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch categories and technologies
  useEffect(() => {
    const fetchData = async () => {
      setIsSaving(true);
      try {
        const [categoriesResponse, technologiesResponse] = await Promise.all([
          axios.get('http://localhost:3000/categories'),
          axios.get('http://localhost:3000/technologies'),
        ]);

        setCategories(categoriesResponse.data.data || categoriesResponse.data);
        setTechnologies(technologiesResponse.data.data || technologiesResponse.data);
        setFilteredTechnologies(technologiesResponse.data.data || technologiesResponse.data);
      } catch {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load categories or technologies. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setIsSaving(false);
      }
    };
    fetchData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Handle image upload to ImgBB
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      const formDataImg = new FormData();
      formDataImg.append('image', file);

      const apiKey = '874c66b5291cad68f221845819150477';
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formDataImg,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (data && data.data && data.data.url) {
        const hostedUrl = data.data.url;
        setImagePreview(hostedUrl);
        setFormData((prev) => ({ ...prev, image: hostedUrl }));
        toast.success('Image uploaded successfully!');
      } else {
        throw new Error('Invalid response from ImgBB');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      toast.error('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  // Remove image
  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }));
    setImagePreview(null);
  };

  // Handle technology search
  const handleTechSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setTechSearch(searchTerm);
    setFilteredTechnologies(
      technologies.filter((tech) =>
        (tech.name || tech).toLowerCase().includes(searchTerm)
      )
    );
  };

  // Handle technology selection
  const toggleTechnology = (tech) => {
    const techValue = tech.name || tech;
    setFormData((prev) => {
      const newTechnologies = prev.technologies.includes(techValue)
        ? prev.technologies.filter((t) => t !== techValue)
        : [...prev.technologies, techValue];
      return { ...prev, technologies: newTechnologies };
    });
  };

  // Handle features input (comma-separated)
  const handleFeaturesChange = (e) => {
    const features = e.target.value.split(',').map((item) => item.trim()).filter((item) => item);
    setFormData((prev) => ({ ...prev, features }));
    setErrors((prev) => ({ ...prev, features: '' }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.client) newErrors.client = 'Client is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.description) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    setIsSaving(true);
    try {
      const response = await axios.post('http://localhost:3000/portfolio', {
        title: formData.title,
        category: formData.category,
        client: formData.client,
        date: formData.date,
        image: formData.image,
        description: formData.description,
        technologies: formData.technologies,
        features: formData.features,
        status: formData.status,
      });

      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Portfolio item added successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/dashboard/admin');
        });
      } else {
        throw new Error(response.data.message || 'Failed to add portfolio item');
      }
    } catch {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add portfolio item. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle form clear
  const handleClear = () => {
    setFormData({
      title: '',
      category: '',
      client: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
      description: '',
      technologies: [],
      features: [],
      status: 'ongoing',
    });
    setImagePreview(null);
    setTechSearch('');
    setFilteredTechnologies(technologies);
    toast.success('Form cleared!');
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900/50 backdrop-blur-3xl p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-gray-600/30 shadow-2xl relative">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard/admin')}
          className="absolute top-4 left-4 flex items-center space-x-2 text-gray-200 hover:text-[#B5000D] transition-colors duration-200"
          disabled={isSaving || uploadingImage}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-semibold">Back</span>
        </motion.button>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-6 sm:mb-8 text-center">Add New Portfolio Item</h2>
        {Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 mb-6 p-4 bg-red-500/10 rounded-lg border border-red-500/30"
          >
            {Object.values(errors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-100 mb-2">Portfolio Image</label>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 sm:w-48 lg:w-64 h-auto rounded-lg object-cover shadow-md"
                  />
                ) : (
                  <div className="w-32 sm:w-48 lg:w-64 h-32 sm:h-48 bg-gray-700/50 rounded-lg flex items-center justify-center">
                    <Image className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                {imagePreview && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={removeImage}
                    className="absolute top-0 right-0 text-red-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <XCircle className="w-6 h-6" />
                  </motion.button>
                )}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-medium text-gray-100 mb-2">Upload Image</h3>
                <p className="text-sm text-gray-400 mb-4">JPG, PNG, or GIF. Max size 5MB</p>
                <label className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-gray-100 text-sm font-medium rounded-lg cursor-pointer transition-all duration-300">
                  <Camera className="h-4 w-4 mr-2" />
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isSaving || uploadingImage}
                  />
                </label>
                {uploadingImage && (
                  <p className="text-sm text-blue-300 mt-1">Uploading image...</p>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-100 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm rounded-lg border ${errors.status ? 'border-red-500' : 'border-gray-600/50'} text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B5000D]/80 transition-all duration-200`}
              disabled={isSaving || uploadingImage}
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-100 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm rounded-lg border ${errors.category ? 'border-red-500' : 'border-gray-600/50'} text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B5000D]/80 transition-all duration-200`}
              disabled={isSaving || uploadingImage || !categories.length}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id || cat.name} value={cat.name || cat}>
                  {cat.name || cat}
                </option>
              ))}
            </select>
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm font-semibold text-gray-100 mb-2">Client</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              placeholder="Enter client name"
              className={`w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm rounded-lg border ${errors.client ? 'border-red-500' : 'border-gray-600/50'} text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B5000D]/80 transition-all duration-200`}
              disabled={isSaving || uploadingImage}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-100 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm rounded-lg border ${errors.date ? 'border-red-500' : 'border-gray-600/50'} text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B5000D]/80 transition-all duration-200`}
              disabled={isSaving || uploadingImage}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-100 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter portfolio title"
              className={`w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-600/50'} text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B5000D]/80 transition-all duration-200`}
              disabled={isSaving || uploadingImage}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-100 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter portfolio description"
              rows="6"
              className={`w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-600/50'} text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B5000D]/80 resize-y transition-all duration-200`}
              disabled={isSaving || uploadingImage}
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-semibold text-gray-100 mb-2">Technologies</label>
            <input
              type="text"
              value={techSearch}
              onChange={handleTechSearch}
              placeholder="Search technologies..."
              className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B5000D]/80 transition-all duration-200"
              disabled={isSaving || uploadingImage || !technologies.length}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.technologies.map((tech) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center px-3 py-1 bg-[#B5000D]/20 text-gray-200 rounded-full text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => toggleTechnology({ name: tech })}
                    className="ml-2 text-gray-400 hover:text-red-400"
                    disabled={isSaving || uploadingImage}
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
            {techSearch && filteredTechnologies.length > 0 && (
              <div className="mt-2 max-h-40 overflow-y-auto bg-gray-700/50 rounded-lg border border-gray-600/50">
                {filteredTechnologies.map((tech) => (
                  <motion.div
                    key={tech._id || tech.name}
                    whileHover={{ backgroundColor: '#B5000D33' }}
                    onClick={() => toggleTechnology(tech)}
                    className="px-4 py-2 text-gray-200 hover:bg-[#B5000D]/20 cursor-pointer transition-colors duration-200"
                  >
                    {tech.name || tech}
                  </motion.div>
                ))}
              </div>
            )}
            {techSearch && filteredTechnologies.length === 0 && (
              <p className="mt-2 text-sm text-gray-400">No technologies found</p>
            )}
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-semibold text-gray-100 mb-2">Features</label>
            <input
              type="text"
              name="features"
              value={formData.features.join(', ')}
              onChange={handleFeaturesChange}
              placeholder="Enter features (comma-separated)"
              className={`w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm rounded-lg border ${errors.features ? 'border-red-500' : 'border-gray-600/50'} text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B5000D]/80 transition-all duration-200`}
              disabled={isSaving || uploadingImage}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleClear}
              className="px-6 py-3 bg-gray-600/50 hover:bg-gray-500/60 rounded-lg border border-gray-600/50 text-gray-200 transition-all duration-300"
              disabled={isSaving || uploadingImage}
            >
              Clear
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 bg-[#B5000D] hover:bg-[#B5000D]/80 rounded-lg border border-gray-600/50 text-gray-100 transition-all duration-300 flex items-center justify-center"
              disabled={isSaving || uploadingImage}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Add Portfolio
                </>
              )}
            </motion.button>
          </div>
        </form>
        {isSaving && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center rounded-2xl">
            <svg className="animate-spin h-8 w-8 text-[#B5000D]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AddPortfolio;
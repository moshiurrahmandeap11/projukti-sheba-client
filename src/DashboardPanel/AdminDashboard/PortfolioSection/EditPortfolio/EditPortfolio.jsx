import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';

const EditPortfolio = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [portfolio, setPortfolio] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'software',
        client: '',
        description: '',
        features: [''],
        technologies: [''],
        status: 'Completed',
        projectDate: new Date().toISOString().split('T')[0],
        featured: false,
        liveUrl: '',
        githubUrl: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImage, setCurrentImage] = useState('');

    const categories = [
        { value: 'erp', label: 'ERP Solutions' },
        { value: 'software', label: 'Business Software' },
        { value: 'e-commerce', label: 'E-Commerce Platforms' },
        { value: 'website', label: 'Custom Websites' },
        { value: 'mobile', label: 'Mobile Apps' }
    ];

    useEffect(() => {
        fetchPortfolio();
    }, [id]);

    const fetchPortfolio = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://projukti-sheba-server.onrender.com/portfolio/${id}`);
            if (response.data.success) {
                const portfolioData = response.data.data;
                setPortfolio(portfolioData);
                setCurrentImage(portfolioData.image);
                setFormData({
                    title: portfolioData.title || '',
                    category: portfolioData.category || 'software',
                    client: portfolioData.client || '',
                    description: portfolioData.description || '',
                    features: portfolioData.features && portfolioData.features.length > 0 ? portfolioData.features : [''],
                    technologies: portfolioData.technologies && portfolioData.technologies.length > 0 ? portfolioData.technologies : [''],
                    status: portfolioData.status || 'Completed',
                    projectDate: portfolioData.projectDate ? portfolioData.projectDate.split('T')[0] : new Date().toISOString().split('T')[0],
                    featured: portfolioData.featured || false,
                    liveUrl: portfolioData.liveUrl || '',
                    githubUrl: portfolioData.githubUrl || ''
                });
            }
        } catch (error) {
            console.error('Error fetching portfolio:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to fetch portfolio data'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index) => {
        if (formData.features.length > 1) {
            const newFeatures = formData.features.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, features: newFeatures }));
        }
    };

    const handleTechnologyChange = (index, value) => {
        const newTechnologies = [...formData.technologies];
        newTechnologies[index] = value;
        setFormData(prev => ({ ...prev, technologies: newTechnologies }));
    };

    const addTechnology = () => {
        setFormData(prev => ({ ...prev, technologies: [...prev.technologies, ''] }));
    };

    const removeTechnology = (index) => {
        if (formData.technologies.length > 1) {
            const newTechnologies = formData.technologies.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, technologies: newTechnologies }));
        }
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid File Type',
                    text: 'Please select a valid image file (JPEG, PNG, WebP)'
                });
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                Swal.fire({
                    icon: 'error',
                    title: 'File Too Large',
                    text: 'Please select an image smaller than 10MB'
                });
                return;
            }
            setSelectedImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.title.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Title Required',
                text: 'Please enter a project title'
            });
            return;
        }

        if (!formData.client.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Client Required',
                text: 'Please enter client name'
            });
            return;
        }

        if (!formData.description.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Description Required',
                text: 'Please enter project description'
            });
            return;
        }

        const validFeatures = formData.features.filter(f => f.trim() !== '');
        if (validFeatures.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Features Required',
                text: 'Please add at least one feature'
            });
            return;
        }

        const validTechnologies = formData.technologies.filter(t => t.trim() !== '');
        if (validTechnologies.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Technologies Required',
                text: 'Please add at least one technology'
            });
            return;
        }

        setLoading(true);
        try {
            const submitData = new FormData();
            if (selectedImage) {
                submitData.append('image', selectedImage);
            }
            submitData.append('title', formData.title.trim());
            submitData.append('category', formData.category);
            submitData.append('client', formData.client.trim());
            submitData.append('description', formData.description.trim());
            submitData.append('features', JSON.stringify(validFeatures));
            submitData.append('technologies', JSON.stringify(validTechnologies));
            submitData.append('status', formData.status);
            submitData.append('projectDate', formData.projectDate);
            submitData.append('featured', formData.featured);
            submitData.append('liveUrl', formData.liveUrl.trim());
            submitData.append('githubUrl', formData.githubUrl.trim());

            const response = await axios.put(`https://projukti-sheba-server.onrender.com/portfolio/${id}`, submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Portfolio item updated successfully',
                    timer: 2000,
                    showConfirmButton: false
                });

                navigate(-1);
            } else {
                throw new Error(response.data.message || 'Update failed');
            }
        } catch (error) {
            console.error('Error updating portfolio:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to update portfolio item'
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading && !portfolio) {
        return (
            <div className="min-h-screen bg-transparent backdrop-blur-3xl flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B5000D] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading portfolio data...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="min-h-screen bg-transparent backdrop-blur-3xl p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                                Edit Portfolio
                            </h1>
                            <p className="text-gray-600">
                                Update portfolio item details
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                        >
                            Back to Portfolio
                        </motion.button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5000D] focus:border-[#B5000D]"
                                    placeholder="Enter project title"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5000D] focus:border-[#B5000D]"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Client */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Client Name *
                                </label>
                                <input
                                    type="text"
                                    name="client"
                                    value={formData.client}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5000D] focus:border-[#B5000D]"
                                    placeholder="Enter client name"
                                />
                            </div>

                            {/* Project Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Date *
                                </label>
                                <input
                                    type="date"
                                    name="projectDate"
                                    value={formData.projectDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5000D] focus:border-[#B5000D]"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5000D] focus:border-[#B5000D]"
                                >
                                    <option value="Completed">Completed</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Planning">Planning</option>
                                </select>
                            </div>

                            {/* Featured */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-[#B5000D] border-gray-300 rounded focus:ring-[#B5000D]"
                                />
                                <label className="ml-2 text-sm text-gray-700">
                                    Mark as featured project
                                </label>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-6">
                            {/* Project Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Image {!currentImage && '*'}
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    {selectedImage ? (
                                        <div>
                                            <img
                                                src={URL.createObjectURL(selectedImage)}
                                                alt="Preview"
                                                className="mx-auto h-32 object-cover rounded-lg mb-4"
                                            />
                                            <p className="text-sm text-gray-600 mb-2">
                                                {selectedImage.name}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedImage(null)}
                                                className="text-sm text-[#B5000D] hover:text-[#B5000D]/80"
                                            >
                                                Change Image
                                            </button>
                                        </div>
                                    ) : currentImage ? (
                                        <div>
                                            <img
                                                src={`https://projukti-sheba-server.onrender.com${currentImage}`}
                                                alt="Current"
                                                className="mx-auto h-32 object-cover rounded-lg mb-4"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'block';
                                                }}
                                            />
                                            <div style={{display: 'none'}} className="text-gray-400 mb-2">
                                                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                Current image
                                            </p>
                                            <label htmlFor="image-upload" className="cursor-pointer">
                                                <span className="text-[#B5000D] hover:text-[#B5000D]/80 font-medium">
                                                    Change Image
                                                </span>
                                            </label>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="text-gray-400 mb-2">
                                                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <label htmlFor="image-upload" className="cursor-pointer">
                                                <span className="text-[#B5000D] hover:text-[#B5000D]/80 font-medium">
                                                    Click to upload
                                                </span>
                                                <span className="text-gray-600"> or drag and drop</span>
                                            </label>
                                            <p className="text-xs text-gray-500 mt-1">
                                                PNG, JPG, WebP up to 10MB
                                            </p>
                                        </div>
                                    )}
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageSelect}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* Live URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Live Project URL
                                </label>
                                <input
                                    type="url"
                                    name="liveUrl"
                                    value={formData.liveUrl}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5000D] focus:border-[#B5000D]"
                                    placeholder="https://example.com"
                                />
                            </div>

                            {/* GitHub URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    name="githubUrl"
                                    value={formData.githubUrl}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5000D] focus:border-[#B5000D]"
                                    placeholder="https://github.com/username/repo"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5000D] focus:border-[#B5000D]"
                            placeholder="Describe the project in detail..."
                        />
                    </div>

                    {/* Features */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Key Features *
                        </label>
                        <div className="space-y-2">
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        required
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5000D] focus:border-[#B5000D]"
                                        placeholder={`Feature ${index + 1}`}
                                    />
                                    {formData.features.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addFeature}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Add Feature
                            </button>
                        </div>
                    </div>

                    {/* Technologies */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Technologies Used *
                        </label>
                        <div className="space-y-2">
                            {formData.technologies.map((tech, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={tech}
                                        onChange={(e) => handleTechnologyChange(index, e.target.value)}
                                        required
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5000D] focus:border-[#B5000D]"
                                        placeholder={`Technology ${index + 1}`}
                                    />
                                    {formData.technologies.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeTechnology(index)}
                                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addTechnology}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Add Technology
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-6">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/dashboard/portfolio')}
                            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-[#B5000D] text-white rounded-lg hover:bg-[#B5000D]/80 disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Updating Portfolio...' : 'Update Portfolio Item'}
                        </motion.button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default EditPortfolio;
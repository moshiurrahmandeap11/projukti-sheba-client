import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../hooks/AxiosInstance/AxiosInstance';
import {
    Plus,
    Edit,
    Trash2,
    Save,
    X,
    Video,
    FileText,
    Star,
    Loader2,
    User
} from 'lucide-react';
import Swal from 'sweetalert2';

const TestimonialAdmin = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('video');
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [newTestimonial, setNewTestimonial] = useState({
        name: '',
        position: '',
        company: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        rating: 5,
        category: '',
        project: '',
        photoURL: '',
        testimonial: '',
        videoUrl: '',
        type: 'video'
    });
    const [showForm, setShowForm] = useState(false);

    // Fetch testimonials from API
    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/testimonials');
            if (response.data.success) {
                setTestimonials(response.data.data);
            } else {
                setTestimonials([]);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load testimonials',
                    timer: 3000
                });
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            setTestimonials([]);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load testimonials',
                timer: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    // Save testimonial
    const saveTestimonial = async (testimonialData) => {
        try {
            setSaving(true);
            
            let response;
            if (editingTestimonial) {

                const updateData = {
                    name: testimonialData.name,
                    position: testimonialData.position,
                    company: testimonialData.company,
                    location: testimonialData.location,
                    date: testimonialData.date,
                    rating: testimonialData.rating,
                    category: testimonialData.category,
                    project: testimonialData.project,
                    photoURL: testimonialData.photoURL,
                    testimonial: testimonialData.testimonial,
                    videoUrl: testimonialData.videoUrl,
                    type: testimonialData.type,
                    updatedAt: new Date().toISOString()
                };

                response = await axiosInstance.put(`/testimonials/${editingTestimonial._id}`, updateData);
                
                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Testimonial updated successfully!',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    setEditingTestimonial(null);
                }
            } else {
                // Create new
                response = await axiosInstance.post('/testimonials', testimonialData);
                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Testimonial created successfully!',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    setShowForm(false);
                }
            }
            
            // Reset form
            setNewTestimonial({
                name: '',
                position: '',
                company: '',
                location: '',
                date: new Date().toISOString().split('T')[0],
                rating: 5,
                category: '',
                project: '',
                photoURL: '',
                testimonial: '',
                videoUrl: '',
                type: 'video'
            });
            
            // Refresh list
            fetchTestimonials();
        } catch (error) {
            console.error('Error saving testimonial:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to save testimonial',
                timer: 3000
            });
        } finally {
            setSaving(false);
        }
    };

    // Delete testimonial
    const deleteTestimonial = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            const response = await axiosInstance.delete(`/testimonials/${id}`);
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Testimonial deleted successfully!',
                    timer: 2000,
                    showConfirmButton: false
                });
                fetchTestimonials();
            }
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to delete testimonial',
                timer: 3000
            });
        }
    };

    // Initialize new testimonial form
    const initNewTestimonial = (type) => {
        setNewTestimonial({
            name: '',
            position: '',
            company: '',
            location: '',
            date: new Date().toISOString().split('T')[0],
            rating: 5,
            category: '',
            project: '',
            photoURL: '',
            testimonial: '',
            videoUrl: type === 'video' ? '' : undefined,
            type: type
        });
        setEditingTestimonial(null);
        setShowForm(true);
    };

    // Edit testimonial
    const editTestimonial = (testimonial) => {
        setEditingTestimonial(testimonial);
        setNewTestimonial({
            name: testimonial.name || '',
            position: testimonial.position || '',
            company: testimonial.company || '',
            location: testimonial.location || '',
            date: testimonial.date ? testimonial.date.split('T')[0] : new Date().toISOString().split('T')[0],
            rating: testimonial.rating || 5,
            category: testimonial.category || '',
            project: testimonial.project || '',
            photoURL: testimonial.photoURL || '',
            testimonial: testimonial.testimonial || '',
            videoUrl: testimonial.videoUrl || '',
            type: testimonial.type || 'video'
        });
        setShowForm(true);
    };

    // Cancel editing
    const cancelEditing = () => {
        setShowForm(false);
        setEditingTestimonial(null);
        setNewTestimonial({
            name: '',
            position: '',
            company: '',
            location: '',
            date: new Date().toISOString().split('T')[0],
            rating: 5,
            category: '',
            project: '',
            photoURL: '',
            testimonial: '',
            videoUrl: '',
            type: 'video'
        });
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const filteredTestimonials = testimonials.filter(t => t.type === activeTab);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="ml-2 text-gray-600">Loading testimonials...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Testimonials Management
                    </h1>
                    <p className="text-gray-600">
                        Manage video and text testimonials from your clients
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('video')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                            activeTab === 'video'
                                ? 'bg-red-600 text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                    >
                        <Video className="w-5 h-5" />
                        Video Testimonials
                        <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                            {testimonials.filter(t => t.type === 'video').length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('text')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                            activeTab === 'text'
                                ? 'bg-red-600 text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                    >
                        <FileText className="w-5 h-5" />
                        Text Testimonials
                        <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                            {testimonials.filter(t => t.type === 'text').length}
                        </span>
                    </button>
                </div>

                {/* Add New Button */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {activeTab === 'video' ? 'Video' : 'Text'} Testimonials
                        <span className="ml-2 text-sm text-gray-500 font-normal">
                            ({filteredTestimonials.length} items)
                        </span>
                    </h2>
                    <button
                        onClick={() => initNewTestimonial(activeTab)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Testimonial
                    </button>
                </div>

                {/* Testimonials List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredTestimonials.map((testimonial) => (
                        <div
                            key={testimonial._id}
                            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                                        {testimonial.photoURL ? (
                                            <img
                                                src={testimonial.photoURL}
                                                alt={testimonial.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${testimonial.photoURL ? 'hidden' : 'flex'}`}>
                                            <User className="w-6 h-6 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-800 truncate">{testimonial.name}</h3>
                                        <p className="text-sm text-gray-600 truncate">
                                            {testimonial.position}{testimonial.company && `, ${testimonial.company}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => editTestimonial(testimonial)}
                                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                        title="Edit"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteTestimonial(testimonial._id)}
                                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                "{testimonial.testimonial}"
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3 h-3 ${
                                                i < (testimonial.rating || 5)
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span>
                                    {testimonial.date ? new Date(testimonial.date).toLocaleDateString() : 'No date'}
                                </span>
                            </div>

                            {testimonial.videoUrl && (
                                <div className="mt-3 text-xs text-blue-600 truncate" title={testimonial.videoUrl}>
                                    Video: {testimonial.videoUrl}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredTestimonials.length === 0 && !showForm && (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No {activeTab} testimonials yet
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Get started by adding your first {activeTab} testimonial
                        </p>
                        <button
                            onClick={() => initNewTestimonial(activeTab)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            Add Testimonial
                        </button>
                    </div>
                )}

                {/* Add/Edit Form */}
                {showForm && (
                    <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {editingTestimonial ? 'Edit' : 'Add New'} Testimonial
                                <span className="ml-2 text-sm font-normal text-gray-500 capitalize">
                                    ({activeTab})
                                </span>
                            </h3>
                            <button
                                onClick={cancelEditing}
                                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-900">Basic Information</h4>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={newTestimonial.name}
                                        onChange={(e) => setNewTestimonial(prev => ({
                                            ...prev,
                                            name: e.target.value
                                        }))}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter client name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Position
                                    </label>
                                    <input
                                        type="text"
                                        value={newTestimonial.position}
                                        onChange={(e) => setNewTestimonial(prev => ({
                                            ...prev,
                                            position: e.target.value
                                        }))}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Client position"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        value={newTestimonial.company}
                                        onChange={(e) => setNewTestimonial(prev => ({
                                            ...prev,
                                            company: e.target.value
                                        }))}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Company name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={newTestimonial.location}
                                        onChange={(e) => setNewTestimonial(prev => ({
                                            ...prev,
                                            location: e.target.value
                                        }))}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="City, Country"
                                    />
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-900">Additional Information</h4>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        value={newTestimonial.date}
                                        onChange={(e) => setNewTestimonial(prev => ({
                                            ...prev,
                                            date: e.target.value
                                        }))}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Rating *
                                    </label>
                                    <select
                                        value={newTestimonial.rating}
                                        onChange={(e) => setNewTestimonial(prev => ({
                                            ...prev,
                                            rating: parseInt(e.target.value)
                                        }))}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    >
                                        {[1, 2, 3, 4, 5].map(num => (
                                            <option key={num} value={num}>
                                                {num} Star{num > 1 ? 's' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {activeTab === 'video' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Video URL (YouTube)
                                        </label>
                                        <input
                                            type="url"
                                            value={newTestimonial.videoUrl}
                                            onChange={(e) => setNewTestimonial(prev => ({
                                                ...prev,
                                                videoUrl: e.target.value
                                            }))}
                                            placeholder="https://youtube.com/watch?v=..."
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Photo URL
                                    </label>
                                    <input
                                        type="url"
                                        value={newTestimonial.photoURL}
                                        onChange={(e) => setNewTestimonial(prev => ({
                                            ...prev,
                                            photoURL: e.target.value
                                        }))}
                                        placeholder="https://example.com/photo.jpg"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Testimonial Text */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Testimonial Text *
                            </label>
                            <textarea
                                value={newTestimonial.testimonial}
                                onChange={(e) => setNewTestimonial(prev => ({
                                    ...prev,
                                    testimonial: e.target.value
                                }))}
                                rows="4"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
                                placeholder="Enter the testimonial content..."
                                required
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-gray-200">
                            <button
                                onClick={cancelEditing}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => saveTestimonial(newTestimonial)}
                                disabled={saving || !newTestimonial.name || !newTestimonial.testimonial || !newTestimonial.date}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                            >
                                {saving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {editingTestimonial ? 'Update' : 'Save'} Testimonial
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestimonialAdmin;
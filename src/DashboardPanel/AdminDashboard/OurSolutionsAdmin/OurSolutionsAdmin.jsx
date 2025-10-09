import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../hooks/AxiosInstance/AxiosInstance';
import {
    Plus,
    Edit,
    Trash2,
    Save,
    X,
    BarChart3,
    BookOpen,
    Boxes,
    Building2,
    Bus,
    Car,
    DollarSign,
    GraduationCap,
    Home,
    Hotel,
    LayoutGrid,
    MessageCircle,
    MessageSquareText,
    MonitorSmartphone,
    Newspaper,
    PenLine,
    Plane,
    Repeat,
    School,
    ShoppingCart,
    Smartphone,
    UserCircle2,
    Users,
    Utensils,
    Loader2,
    ExternalLink
} from 'lucide-react';

const OurSolutionsAdmin = () => {
    const [solutions, setSolutions] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [newItem, setNewItem] = useState({ title: '', subtitle: '', icon: '', link: '' });
    const [activeTab, setActiveTab] = useState('ERP Solutions');

    const tabs = [
        'ERP Solutions', 'E-commerce', 'Restaurant', 'School', 
        'Blog', 'Travel Agency', 'Real Estate', 'Others'
    ];

    const iconComponents = {
        BarChart3, BookOpen, Boxes, Building2, Bus, Car, DollarSign,
        GraduationCap, Home, Hotel, LayoutGrid, MessageCircle,
        MessageSquareText, MonitorSmartphone, Newspaper, PenLine,
        Plane, Repeat, School, ShoppingCart, Smartphone,
        UserCircle2, Users, Utensils
    };

    // Fetch solutions from API
    const fetchSolutions = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/our-solutions');
            if (response.data.success) {
                const solutionsData = {};
                response.data.data.forEach(item => {
                    solutionsData[item.category] = item.solutions;
                });
                setSolutions(solutionsData);
            } else {
                // Initialize with empty structure if no data exists
                initializeEmptySolutions();
            }
        } catch (error) {
            console.error('Error fetching solutions:', error);
            // Initialize with empty structure if API fails
            initializeEmptySolutions();
        } finally {
            setLoading(false);
        }
    };

    // Initialize empty solutions structure
    const initializeEmptySolutions = () => {
        const initialSolutions = {};
        tabs.forEach(tab => {
            initialSolutions[tab] = [];
        });
        setSolutions(initialSolutions);
    };

    // Save solutions to API
    const saveSolutions = async (category) => {
        try {
            setSaving(true);
            const categorySolutions = solutions[category] || [];
            
            const response = await axiosInstance.post('/our-solutions', {
                category,
                solutions: categorySolutions
            });

            if (response.data.success) {
                alert('Solutions saved successfully!');
                setEditingCategory(null);
                setEditingItem(null);
                setNewItem({ title: '', subtitle: '', icon: '', link: '' });
                // Refresh data after save
                fetchSolutions();
            } else {
                alert('Failed to save solutions: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error saving solutions:', error);
            alert('Failed to save solutions. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    // Add new solution item
    const addNewItem = (category) => {
        if (!newItem.title || !newItem.subtitle || !newItem.icon) {
            alert('Please fill all required fields (Title, Subtitle, and Icon)');
            return;
        }

        const newItemWithId = {
            id: Date.now(), // Temporary ID
            title: newItem.title,
            subtitle: newItem.subtitle,
            icon: newItem.icon,
            link: newItem.link || '',
            bgColor: 'bg-gray-100'
        };

        setSolutions(prev => ({
            ...prev,
            [category]: [...(prev[category] || []), newItemWithId]
        }));

        setNewItem({ title: '', subtitle: '', icon: '', link: '' });
    };

    // Update solution item
    const updateItem = (category, itemId) => {
        if (!editingItem.title || !editingItem.subtitle || !editingItem.icon) {
            alert('Please fill all required fields');
            return;
        }

        setSolutions(prev => ({
            ...prev,
            [category]: prev[category].map(item =>
                item.id === itemId ? { ...item, ...editingItem } : item
            )
        }));

        setEditingItem(null);
    };

    // Delete solution item
    const deleteItem = (category, itemId) => {
        if (window.confirm('Are you sure you want to delete this solution?')) {
            setSolutions(prev => ({
                ...prev,
                [category]: prev[category].filter(item => item.id !== itemId)
            }));
        }
    };

    // Initialize new category
    const initializeCategory = (category) => {
        if (!solutions[category]) {
            setSolutions(prev => ({
                ...prev,
                [category]: []
            }));
        }
        setEditingCategory(category);
    };

    // Cancel editing
    const cancelEditing = () => {
        setEditingCategory(null);
        setEditingItem(null);
        setNewItem({ title: '', subtitle: '', icon: '', link: '' });
        // Reload original data
        fetchSolutions();
    };

    useEffect(() => {
        fetchSolutions();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="ml-2 text-gray-600">Loading solutions...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Our Solutions Management
                    </h1>
                    <p className="text-gray-600">
                        Manage and customize the solutions displayed on the website
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Category Management */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {activeTab} Solutions
                            <span className="ml-2 text-sm text-gray-500 font-normal">
                                ({(solutions[activeTab] || []).length} items)
                            </span>
                        </h2>
                        <div className="flex gap-2">
                            {editingCategory === activeTab ? (
                                <>
                                    <button
                                        onClick={() => saveSolutions(activeTab)}
                                        disabled={saving}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                                    >
                                        {saving ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Save className="w-4 h-4" />
                                        )}
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        onClick={cancelEditing}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => initializeCategory(activeTab)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit Solutions
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Solutions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Existing Solutions */}
                        {(solutions[activeTab] || []).map((solution) => (
                            <div
                                key={solution.id}
                                className={`${solution.bgColor} rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow`}
                            >
                                {editingCategory === activeTab && editingItem?.id === solution.id ? (
                                    // Edit Mode
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Icon *
                                            </label>
                                            <select
                                                value={editingItem.icon}
                                                onChange={(e) => setEditingItem(prev => ({
                                                    ...prev,
                                                    icon: e.target.value
                                                }))}
                                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                                required
                                            >
                                                <option value="">Select Icon</option>
                                                {Object.keys(iconComponents).map(iconName => (
                                                    <option key={iconName} value={iconName}>
                                                        {iconName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Title *
                                            </label>
                                            <input
                                                type="text"
                                                value={editingItem.title}
                                                onChange={(e) => setEditingItem(prev => ({
                                                    ...prev,
                                                    title: e.target.value
                                                }))}
                                                placeholder="Solution Title"
                                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description *
                                            </label>
                                            <textarea
                                                value={editingItem.subtitle}
                                                onChange={(e) => setEditingItem(prev => ({
                                                    ...prev,
                                                    subtitle: e.target.value
                                                }))}
                                                placeholder="Solution Description"
                                                className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
                                                rows="2"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Link (Optional)
                                            </label>
                                            <input
                                                type="url"
                                                value={editingItem.link || ''}
                                                onChange={(e) => setEditingItem(prev => ({
                                                    ...prev,
                                                    link: e.target.value
                                                }))}
                                                placeholder="https://example.com"
                                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            />
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <button
                                                onClick={() => updateItem(activeTab, solution.id)}
                                                className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingItem(null)}
                                                className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // View Mode
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                                    {React.createElement(iconComponents[solution.icon] || BarChart3, {
                                                        className: "w-5 h-5 text-blue-500"
                                                    })}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">
                                                    {solution.title}
                                                </h3>
                                                <p className="text-gray-600 text-xs leading-tight line-clamp-2">
                                                    {solution.subtitle}
                                                </p>
                                            </div>
                                            {editingCategory === activeTab && (
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => setEditingItem({...solution})}
                                                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteItem(activeTab, solution.id)}
                                                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {solution.link && (
                                            <div className="flex items-center gap-1 text-xs">
                                                <ExternalLink className="w-3 h-3 text-blue-500" />
                                                <a 
                                                    href={solution.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-700 truncate"
                                                    title={solution.link}
                                                >
                                                    {solution.link.length > 30 
                                                        ? solution.link.substring(0, 30) + '...' 
                                                        : solution.link
                                                    }
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Add New Item Form */}
                        {editingCategory === activeTab && (
                            <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add New Solution
                                </h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Icon *
                                        </label>
                                        <select
                                            value={newItem.icon}
                                            onChange={(e) => setNewItem(prev => ({
                                                ...prev,
                                                icon: e.target.value
                                            }))}
                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            required
                                        >
                                            <option value="">Select Icon</option>
                                            {Object.keys(iconComponents).map(iconName => (
                                                <option key={iconName} value={iconName}>
                                                    {iconName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={newItem.title}
                                            onChange={(e) => setNewItem(prev => ({
                                                ...prev,
                                                title: e.target.value
                                            }))}
                                            placeholder="Solution Title"
                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description *
                                        </label>
                                        <textarea
                                            value={newItem.subtitle}
                                            onChange={(e) => setNewItem(prev => ({
                                                ...prev,
                                                subtitle: e.target.value
                                            }))}
                                            placeholder="Solution Description"
                                            className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
                                            rows="2"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Link (Optional)
                                        </label>
                                        <input
                                            type="url"
                                            value={newItem.link}
                                            onChange={(e) => setNewItem(prev => ({
                                                ...prev,
                                                link: e.target.value
                                            }))}
                                            placeholder="https://example.com"
                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        />
                                    </div>

                                    <button
                                        onClick={() => addNewItem(activeTab)}
                                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Solution
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Empty State */}
                    {(!solutions[activeTab] || solutions[activeTab].length === 0) && editingCategory !== activeTab && (
                        <div className="text-center py-12 text-gray-500">
                            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                            <p className="text-lg mb-2">No solutions added yet</p>
                            <p className="text-sm mb-4">Get started by adding your first solution</p>
                            <button
                                onClick={() => initializeCategory(activeTab)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Add Solutions
                            </button>
                        </div>
                    )}
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">Instructions</h3>
                    <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Click "Edit Solutions" to modify a category</li>
                        <li>• Add new solutions using the form at the bottom</li>
                        <li>• Click the edit/delete icons to manage existing solutions</li>
                        <li>• Link field is optional - use it to direct users to detailed pages</li>
                        <li>• Don't forget to click "Save Changes" when done</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OurSolutionsAdmin;
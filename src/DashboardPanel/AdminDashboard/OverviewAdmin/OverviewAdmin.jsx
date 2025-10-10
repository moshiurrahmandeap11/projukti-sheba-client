import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../hooks/AxiosInstance/AxiosInstance';


const OverviewAdmin = () => {
    const [stats, setStats] = useState([
        { label: "Total Projects", value: 128 },
        { label: "Happy Clients", value: 84 },
        { label: "Total Products", value: 256 },
        { label: "Countries Served", value: 12 },
    ]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchOverviewData();
    }, []);

    const fetchOverviewData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/overview");
            
            if (response.data.success && response.data.data.length > 0) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching overview data:", error);
            setMessage({
                type: 'error',
                text: 'Failed to load overview data'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedStats = [...stats];
        if (field === 'value') {
            updatedStats[index][field] = parseInt(value) || 0;
        } else {
            updatedStats[index][field] = value;
        }
        setStats(updatedStats);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axiosInstance.put("/overview", { stats });
            
            if (response.data.success) {
                setMessage({
                    type: 'success',
                    text: 'Overview data updated successfully!'
                });
                
                // Clear message after 3 seconds
                setTimeout(() => {
                    setMessage({ type: '', text: '' });
                }, 3000);
            } else {
                setMessage({
                    type: 'error',
                    text: 'Failed to update overview data'
                });
            }
        } catch (error) {
            console.error("Error updating overview data:", error);
            setMessage({
                type: 'error',
                text: 'Failed to update overview data'
            });
        } finally {
            setLoading(false);
        }
    };

    const addNewStat = () => {
        setStats([...stats, { label: "New Stat", value: 0 }]);
    };

    const removeStat = (index) => {
        if (stats.length > 1) {
            const updatedStats = stats.filter((_, i) => i !== index);
            setStats(updatedStats);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Overview Management</h1>
                        <p className="text-gray-600">Manage the statistics displayed on the overview section</p>
                    </div>

                    {message.text && (
                        <div className={`mb-6 p-4 rounded-md ${
                            message.type === 'success' 
                                ? 'bg-green-100 border border-green-400 text-green-700' 
                                : 'bg-red-100 border border-red-400 text-red-700'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-medium text-gray-900">Stat #{index + 1}</h3>
                                        <button
                                            type="button"
                                            onClick={() => removeStat(index)}
                                            disabled={stats.length <= 1}
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Label
                                            </label>
                                            <input
                                                type="text"
                                                value={stat.label}
                                                onChange={(e) => handleInputChange(index, 'label', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Value
                                            </label>
                                            <input
                                                type="number"
                                                value={stat.value}
                                                onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                min="0"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={addNewStat}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Add New Stat
                            </button>
                            
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Updating...' : 'Update Overview'}
                            </button>
                        </div>
                    </form>

                    {/* Preview Section */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Preview</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-gray-100 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewAdmin;
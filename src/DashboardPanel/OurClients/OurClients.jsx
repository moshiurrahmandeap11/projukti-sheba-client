import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const OurClients = () => {
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const res = await axios.get('https://projukti-sheba-server.onrender.com/ourclients');
            setClients(res.data.data || []);
        } catch (error) {
            console.error('Error fetching clients:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch clients data',
            });
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
            if (!allowedTypes.includes(file.type)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid File',
                    text: 'Only PNG, JPG, and JPEG files are allowed',
                });
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            Swal.fire({
                icon: 'warning',
                title: 'No File Selected',
                text: 'Please select a file first',
            });
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('logo', selectedFile);

            await axios.post('https://projukti-sheba-server.onrender.com/ourclients/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSelectedFile(null);
            setShowModal(false);
            fetchClients();
            
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Logo uploaded successfully!',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error uploading logo:', error);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'Failed to upload logo. Please try again.',
            });
        } finally {
            setUploading(false);
        }
    };

    const deleteClient = async (id) => {
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

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://projukti-sheba-server.onrender.com/ourclients/${id}`);
                fetchClients();
                
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Logo has been deleted successfully.',
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                console.error('Error deleting client:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Delete Failed',
                    text: 'Failed to delete logo. Please try again.',
                });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Our Clients
                    </h1>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-md"
                    >
                        Add Clients Logo
                    </button>
                </div>

                {/* Clients Grid */}
                {clients.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {clients.map((client) => (
                            <div key={client._id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-200">
                                <div className="aspect-square mb-3 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                                    <img 
                                        src={`https://projukti-sheba-server.onrender.com${client.logoUrl}`} 
                                        alt={client.originalName}
                                        className="w-full h-full object-contain p-2"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                        }}
                                    />
                                </div>
                                <button 
                                    onClick={() => deleteClient(client._id)}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No client logos found</p>
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md mx-auto">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-800">
                                Upload New Logo
                            </h2>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            >
                                &times;
                            </button>
                        </div>
                        
                        {/* Upload Form */}
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Logo File
                                </label>
                                <input
                                    type="file"
                                    accept=".png,.jpg,.jpeg"
                                    onChange={handleFileSelect}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Only PNG, JPG, JPEG files are supported
                                </p>
                                
                                {selectedFile && (
                                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-green-700 text-sm">
                                            Selected file: <strong>{selectedFile.name}</strong>
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Modal Actions */}
                            <div className="flex gap-3 justify-end">
                                <button 
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={!selectedFile || uploading}
                                    className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${
                                        !selectedFile || uploading
                                            ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                                >
                                    {uploading ? 'Uploading...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OurClients;
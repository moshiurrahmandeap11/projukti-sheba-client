import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Plus, Image, X } from 'lucide-react';

const LogoSettings = () => {
    const [logos, setLogos] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    // Fetch existing logos
    useEffect(() => {
        fetchLogos();
    }, []);

    const fetchLogos = async () => {
        try {
            const response = await fetch('http://localhost:3000/logos');
            const data = await response.json();
            setLogos(data.data);
        } catch (error) {
            console.error('Error fetching logos:', error);
            showAlert('Error fetching logos!', 'error');
        }
    };

    // Sweet Alert function
    const showAlert = (message, type = 'success') => {
        // Using browser's built-in alert for now - you can replace with SweetAlert library
        if (type === 'success') {
            alert(`✅ ${message}`);
        } else if (type === 'error') {
            alert(`❌ ${message}`);
        } else if (type === 'warning') {
            return confirm(`⚠️ ${message}`);
        }
    };

    // Upload to ImgBB
    const uploadToImgBB = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=874c66b5291cad68f221845819150477`, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            if (result.success) {
                return result.data.url;
            } else {
                throw new Error('ImgBB upload failed');
            }
        } catch  {
            throw new Error('Failed to upload to ImgBB');
        }
    };

    // Save logo to backend
    const saveLogoToBackend = async (logoData) => {
        try {
            const response = await fetch('http://localhost:3000/logos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logoData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to save logo');
            }
            
            return await response.json();
        } catch  {
            throw new Error('Failed to save logo to database');
        }
    };

    // Handle file upload
    const handleFileUpload = async (file) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            showAlert('Please select a valid image file!', 'error');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showAlert('File size should be less than 5MB!', 'error');
            return;
        }

        setIsUploading(true);

        try {
            // Upload to ImgBB
            const imageUrl = await uploadToImgBB(file);
            
            // Save to backend
            const logoData = {
                name: file.name,
                url: imageUrl,
                uploadedAt: new Date().toISOString()
            };
            
            const savedLogo = await saveLogoToBackend(logoData);
            
            // Update local state
            setLogos(prev => [...prev, savedLogo]);
            
            showAlert('Logo uploaded successfully!', 'success');
            
        } catch (error) {
            console.error('Upload error:', error);
            showAlert('Failed to upload logo!', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    // Handle drag and drop
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    // Delete logo
    const deleteLogo = async (logoId) => {
        const confirmed = showAlert('Are you sure you want to delete this logo?', 'warning');
        
        if (!confirmed) return;

        try {
            const response = await fetch(`http://localhost:3000/logos/${logoId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete logo');
            }

            // Remove from local state
            setLogos(prev => prev.filter(logo => logo.id !== logoId));
            
            showAlert('Logo deleted successfully!', 'success');
            
        } catch (error) {
            console.error('Delete error:', error);
            showAlert('Failed to delete logo!', 'error');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Logo Settings</h2>
                <p className="text-gray-600">Upload and manage your website logos</p>
            </div>

            {/* Upload Section */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload New Logo</h3>
                
                {/* Drag & Drop Area */}
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                        dragActive 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                            <p className="text-gray-600">Uploading logo...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <Upload className="w-12 h-12 text-gray-400 mb-4" />
                            <p className="text-lg font-medium text-gray-700 mb-2">
                                Drop your logo here or click to browse
                            </p>
                            <p className="text-sm text-gray-500 mb-4">
                                Support: JPG, PNG, GIF (Max 5MB)
                            </p>
                            <label className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors duration-200">
                                <Plus className="w-4 h-4 inline mr-2" />
                                Choose File
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e.target.files[0])}
                                />
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {/* Previous Logos Section */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Previous Logos ({logos.length})
                </h3>
                
                {logos.length === 0 ? (
                    <div className="text-center py-12">
                        <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No logos uploaded yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {logos.map((logo) => (
                            <div
                                key={logo.id}
                                className="relative group bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-200"
                            >
                                {/* Logo Image */}
                                <div className="aspect-square p-4">
                                    <img
                                        src={logo.url}
                                        alt={logo.name}
                                        className="w-full h-full object-contain rounded"
                                    />
                                </div>
                                
                                {/* Logo Info */}
                                <div className="p-3 bg-white">
                                    <p className="text-sm font-medium text-gray-700 truncate">
                                        {logo.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(logo.uploadedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                
                                {/* Delete Button */}
                                <button
                                    onClick={() => deleteLogo(logo.id)}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogoSettings;
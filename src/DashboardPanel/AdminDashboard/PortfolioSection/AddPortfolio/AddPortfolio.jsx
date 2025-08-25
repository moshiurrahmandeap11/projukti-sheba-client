import React, { useState } from 'react';

const AddPortfolio = () => {
  const [formData, setFormData] = useState({
    image: null,
    status: 'pending',
    category: '',
    date: '',
    title: '',
    postBy: '',
    postDetails: '',
    tags: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log('Form submitted:', formData);
    } catch (err) {
      setError('Error submitting form: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900/20 to-gray-800/20">
      <div className="max-w-3xl mx-auto bg-gray-900/20 backdrop-blur-xl rounded-2xl p-8 border border-gray-600/30 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Add New Portfolio</h2>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-600/50 text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-600/50 file:text-white hover:file:bg-blue-500/60"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            >
              <option value="pending">Pending</option>
              <option value="complete">Complete</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Enter category"
              className="w-full px-4 py-2 bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter portfolio title"
              className="w-full px-4 py-2 bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
          </div>

          {/* Post By */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Post By</label>
            <input
              type="text"
              name="postBy"
              value={formData.postBy}
              onChange={handleInputChange}
              placeholder="Enter author name"
              className="w-full px-4 py-2 bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
          </div>

          {/* Post Details (Textarea) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Post Details</label>
            <textarea
              name="postDetails"
              value={formData.postDetails}
              onChange={handleInputChange}
              placeholder="Enter portfolio details"
              rows="6"
              className="w-full px-4 py-2 bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60 resize-y"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Enter tags (comma-separated)"
              className="w-full px-4 py-2 bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-600/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600/50 to-purple-600/50 hover:from-blue-500/60 hover:to-purple-500/60 backdrop-blur-md rounded-xl border border-gray-600/50 text-white transition-all duration-300 hover:shadow-lg"
            >
              Add Portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPortfolio;
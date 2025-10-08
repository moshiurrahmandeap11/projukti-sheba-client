import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const AddTeamMember = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    experience: '',
    expertise: [],
    bio: '',
    social: { linkedin: '', twitter: '', email: '', github: '' },
    skills: [],
    icon: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [expertiseInput, setExpertiseInput] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('social.')) {
      const socialField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        social: { ...prev.social, [socialField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === 'image') {
        setImagePreview(value); // Update preview when image URL changes
      }
    }
  };

  // Handle array inputs (expertise, skills)
  const handleArrayInput = (e, field) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const value = e.target.value.trim();
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
      }));
      if (field === 'expertise') setExpertiseInput('');
      if (field === 'skills') setSkillsInput('');
    }
  };

  // Remove item from array
  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

// Import statements baki same thakbe
const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setUploadingImage(true);

  try {
    const formDataImg = new FormData();
    formDataImg.append('image', file);

    const apiKey = '874c66b5291cad68f221845819150477'; // <-- ekhane imgbb api key boshabe
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formDataImg, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (data && data.data && data.data.url) {
      const hostedUrl = data.data.url;
      setImagePreview(hostedUrl);
      setFormData((prev) => ({ ...prev, image: hostedUrl }));
      toast.success('Image uploaded successfully!');
    } else {
      throw new Error('Invalid response from ImgBB');
    }
  } catch (err) {
    console.error(err);
    toast.error('Image upload failed');
  } finally {
    setUploadingImage(false);
  }
};


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side validation
    if (!formData.name || !formData.position || !formData.department || !formData.experience || !formData.bio) {
      toast.error('Please fill all required fields');
      setLoading(false);
      return;
    }
    if (formData.expertise.length === 0 || formData.skills.length === 0) {
      toast.error('Please add at least one expertise and skill');
      setLoading(false);
      return;
    }
    if (!formData.social.linkedin || !formData.social.twitter || !formData.social.email || !formData.social.github) {
      toast.error('Please provide all social links');
      setLoading(false);
      return;
    }
    if (!formData.icon || !formData.image) {
      toast.error('Please provide an icon and image URL');
      setLoading(false);
      return;
    }
    // Validate image URL format
    try {
      new URL(formData.image);
    } catch {
      toast.error('Please provide a valid image URL');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://projukti-sheba-server.onrender.com/our-team', formData);
      toast.success(response.data.message);
      // Reset form
      setFormData({
        name: '',
        position: '',
        department: '',
        experience: '',
        expertise: [],
        bio: '',
        social: { linkedin: '', twitter: '', email: '', github: '' },
        skills: [],
        icon: '',
        image: '',
      });
      setImagePreview(null);
      navigate(-1); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add team member');
    } finally {
      setLoading(false);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black p-6 flex items-center justify-center"
    >
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 w-full max-w-2xl">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="mb-6 flex items-center px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors backdrop-blur-sm"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Users
        </motion.button>

        <h2 className="text-2xl font-bold text-white mb-6">Add New Team Member</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Position *</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Enter position"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Department *</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Enter department"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Experience *</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Enter experience (e.g., 5 years)"
              required
            />
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Expertise *</label>
            <input
              type="text"
              value={expertiseInput}
              onChange={(e) => setExpertiseInput(e.target.value)}
              onKeyDown={(e) => handleArrayInput(e, 'expertise')}
              className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Type expertise and press Enter"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.expertise.map((item, index) => (
                <span
                  key={index}
                  className="bg-blue-500/20 text-blue-300 text-sm px-3 py-1 rounded-full flex items-center"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeArrayItem('expertise', index)}
                    className="ml-2 text-red-400 hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Bio *</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Enter bio"
              rows="4"
              required
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">LinkedIn *</label>
              <input
                type="url"
                name="social.linkedin"
                value={formData.social.linkedin}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="LinkedIn URL"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Twitter *</label>
              <input
                type="url"
                name="social.twitter"
                value={formData.social.twitter}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Twitter URL"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
              <input
                type="email"
                name="social.email"
                value={formData.social.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Email address"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">GitHub *</label>
              <input
                type="url"
                name="social.github"
                value={formData.social.github}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="GitHub URL"
                required
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Skills *</label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              onKeyDown={(e) => handleArrayInput(e, 'skills')}
              className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Type skill and press Enter"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((item, index) => (
                <span
                  key={index}
                  className="bg-blue-500/20 text-blue-300 text-sm px-3 py-1 rounded-full flex items-center"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeArrayItem('skills', index)}
                    className="ml-2 text-red-400 hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Icon (Emoji) *</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Enter emoji (e.g., 👨‍💻)"
              required
            />
          </div>

          {/* Image URL */}

          {/* File Upload */}
          <div>
            <label className="text-white mb-1 block">Profile Image *</label>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="w-full p-2 rounded-lg bg-gray-800/50 text-white" />
            {uploadingImage && <p className="text-sm text-blue-300 mt-1">Uploading image...</p>}
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-700/50" />}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 bg-blue-500/80 text-white rounded-lg hover:bg-blue-600/80 transition-colors backdrop-blur-sm ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Adding...' : 'Add Team Member'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddTeamMember;
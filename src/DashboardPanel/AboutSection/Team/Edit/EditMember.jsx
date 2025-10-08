import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Loader from '../../../../comopnents/sharedItems/Loader/Loader';

const EditMember = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [expertiseInput, setExpertiseInput] = useState('');
  const [skillsInput, setSkillsInput] = useState('');

  // Fetch member data
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/our-team/${id}`);
        const member = response.data.data;
        setFormData(member);
        setImagePreview(member.image || null);
      } catch (error) {
        console.error('Error fetching member:', error);
        toast.error(error.response?.data?.message || 'Failed to load team member');
        navigate('/dashboard/dashboard/admin');
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id, navigate]);

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
        setImagePreview(value);
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Client-side validation
    if (!formData.name || !formData.position || !formData.department || !formData.experience || !formData.bio) {
      toast.error('Please fill all required fields');
      setSubmitting(false);
      return;
    }
    if (formData.expertise.length === 0 || formData.skills.length === 0) {
      toast.error('Please add at least one expertise and skill');
      setSubmitting(false);
      return;
    }
    if (!formData.social.linkedin || !formData.social.twitter || !formData.social.email || !formData.social.github) {
      toast.error('Please provide all social links');
      setSubmitting(false);
      return;
    }
    if (!formData.icon || !formData.image) {
      toast.error('Please provide an icon and image URL');
      setSubmitting(false);
      return;
    }
    try {
      new URL(formData.image);
    } catch {
      toast.error('Please provide a valid image URL');
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/our-team/${id}`, formData);
      toast.success(response.data.message || 'Team member updated successfully');
      navigate('/dashboard/admin');
    } catch (error) {
      console.error('Error updating member:', error);
      toast.error(error.response?.data?.message || 'Failed to update team member');
    } finally {
      setSubmitting(false);
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

  if (loading) {
    return <Loader></Loader>
  }

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
          aria-label="Back to team list"
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
          Back to Team
        </motion.button>

        <h2 className="text-2xl font-bold text-white mb-6">Edit Team Member</h2>
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
                    aria-label={`Remove expertise ${item}`}
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
                    aria-label={`Remove skill ${item}`}
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
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Profile Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-lg border border-gray-700/50"
                onError={() => {
                  setImagePreview(null);
                  toast.error('Invalid image URL');
                }}
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 bg-blue-500/80 text-white rounded-lg hover:bg-blue-600/80 transition-colors backdrop-blur-sm ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Update team member"
            >
              {submitting ? 'Updating...' : 'Update Team Member'}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EditMember;
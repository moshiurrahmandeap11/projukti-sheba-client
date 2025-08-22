import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Camera,
  Save,
  ArrowLeft,
  Shield,
  Globe,
  Building,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../../../hooks/AuthContexts/AuthContexts';
import Loader from '../../../../comopnents/sharedItems/Loader/Loader';

const Edit = () => {
  const { user, loading, updateProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    position: '',
    bio: '',
    website: '',
    linkedIn: '',
    github: '',
    twitter: '',
    dateOfBirth: '',
    privacy: {
      showEmail: true,
      showPhone: false,
      showLocation: true
    }
  });


  // Fetch user profile data
  useEffect(() => {
    if (!user?.uid) return;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/users/${user.uid}`);
        const profileData = response.data;
        
        setProfile(profileData);
        setFormData({
          fullName: profileData.fullName || user.displayName || '',
          email: profileData.email || user.email || '',
          phone: profileData.phone || '',
          location: profileData.location || '',
          company: profileData.company || '',
          position: profileData.position || '',
          bio: profileData.bio || '',
          website: profileData.website || '',
          linkedIn: profileData.linkedIn || '',
          github: profileData.github || '',
          twitter: profileData.twitter || '',
          dateOfBirth: profileData.dateOfBirth || '',
          privacy: {
            showEmail: profileData.privacy?.showEmail !== false,
            showPhone: profileData.privacy?.showPhone || false,
            showLocation: profileData.privacy?.showLocation !== false
          }
        });
        
        if (profileData.photoURL) {
          setImagePreview(profileData.photoURL);
        }
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Error loading profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);



  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('privacy.')) {
      const privacyField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        privacy: {
          ...prev.privacy,
          [privacyField]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSaving(true);

  try {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      setIsSaving(false);
      return;
    }

    if (!user?.uid) {
      toast.error("User not authenticated");
      setIsSaving(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("firebaseUID", user.uid); // Add firebaseUID
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("company", formData.company);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("linkedIn", formData.linkedIn);
    formDataToSend.append("github", formData.github);
    formDataToSend.append("twitter", formData.twitter);
    formDataToSend.append("dateOfBirth", formData.dateOfBirth);
    formDataToSend.append("privacy", JSON.stringify(formData.privacy));
    formDataToSend.append("updatedAt", new Date().toISOString());

    if (profileImage) {
      formDataToSend.append("profileImage", profileImage);
    }

    // Log FormData for debugging
    console.log("FormData entries:", [...formDataToSend.entries()]);

    const response = await axios.put(`http://localhost:3000/users/${user.uid}`, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    if (formData.fullName !== user.displayName || profileImage) {
      const updateData = { displayName: formData.fullName };
      if (response.data.photoURL) {
        updateData.photoURL = response.data.photoURL;
      }
      try {
        await updateProfile(updateData);
        console.log("Firebase profile updated successfully");
      } catch (firebaseError) {
        console.error("Firebase update error:", firebaseError);
      }
    }

    toast.success("Profile updated successfully!");
    navigate('/profile');
  } catch (error) {
    console.error("Error updating profile:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    toast.error(error.response?.data?.message || "Failed to update profile");
  } finally {
    setIsSaving(false);
  }
};

  if (loading || isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/profile')}
            className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-300 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </button>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h1 className="text-3xl font-bold text-white mb-2">Edit Profile</h1>
            <p className="text-gray-400">Update your personal information and preferences</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture Section */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Camera className="h-5 w-5 mr-2 text-purple-400" />
              Profile Picture
            </h2>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/30"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-purple-500/30">
                    {formData.fullName?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full cursor-pointer transition-all duration-300 border-2 border-gray-900">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-medium text-white mb-2">Upload New Picture</h3>
                <p className="text-sm text-gray-400 mb-4">JPG, PNG or GIF. Max size 5MB</p>
                <label className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded-lg cursor-pointer transition-all duration-300">
                  <Camera className="h-4 w-4 mr-2" />
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-400" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                  placeholder="Email cannot be changed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-green-400" />
              Professional Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="Your job title"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-pink-400" />
              Social Links
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all duration-300"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-yellow-400" />
              Privacy Settings
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Show Email Publicly</h3>
                  <p className="text-gray-400 text-sm">Allow others to see your email address</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="privacy.showEmail"
                    checked={formData.privacy.showEmail}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Show Phone Publicly</h3>
                  <p className="text-gray-400 text-sm">Allow others to see your phone number</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="privacy.showPhone"
                    checked={formData.privacy.showPhone}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Show Location Publicly</h3>
                  <p className="text-gray-400 text-sm">Allow others to see your location</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="privacy.showLocation"
                    checked={formData.privacy.showLocation}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
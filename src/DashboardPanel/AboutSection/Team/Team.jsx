import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center text-center animate-pulse">
    <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
    <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 w-1/2 bg-gray-300 rounded mb-4"></div>
    <div className="flex gap-2">
      <div className="h-4 w-16 bg-gray-300 rounded"></div>
      <div className="h-4 w-16 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("https://projukti-sheba-server.onrender.com/our-team");
        setTeamMembers(response.data.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
        toast.error(error.response?.data?.message || "Failed to fetch team members");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) return;

    try {
      const response = await axios.delete(`https://projukti-sheba-server.onrender.com/our-team/${id}`);
      if (response.data.success) {
        setTeamMembers((prev) => prev.filter((member) => member._id !== id));
        toast.success(response.data.message || "Team member deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error(error.response?.data?.message || "Failed to delete team member");
    }
  };

  // Placeholder for Edit (to be implemented)
  const handleEdit = (id) => {
    navigate(`/dashboard/edit-member/${id}`);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-9xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get to know the talented professionals behind Projukti Sheba who are dedicated to delivering exceptional solutions.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Team Members</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard/add-team-member")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
            aria-label="Add new team member"
          >
            Add Team Member
          </motion.button>
        </div>

        {/* Team Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill()
              .map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-300 text-6xl mb-4">
              <svg className="w-24 h-24 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No team members found.</p>
            <p className="text-gray-400 text-sm mt-2">Add your first team member to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <motion.div
                key={member._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative bg-white rounded-xl p-6 flex flex-col items-center text-center border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group"
                role="region"
                aria-label={`Team member ${member.name}`}
              >
                {/* Profile Image */}
                <div className="relative mb-4">
                  <img
                    src={member.image || "/default-avatar.png"}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-red-100 shadow-md"
                    loading="lazy"
                    onError={(e) => (e.target.src = "/default-avatar.png")}
                  />
                </div>

                {/* Basic Info */}
                <h3 className="font-bold text-lg text-gray-800 mb-1">{member.name}</h3>
                <p className="text-red-600 font-medium text-sm mb-1">{member.position}</p>
                <p className="text-gray-600 text-xs mb-2">{member.department}</p>
                <p className="text-gray-500 text-xs mb-3">{member.experience}</p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1 mb-3 justify-center">
                  {member.expertise?.slice(0, 3).map((exp, index) => (
                    <span
                      key={index}
                      className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded-full border border-red-100"
                    >
                      {exp}
                    </span>
                  ))}
                  {member.expertise?.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      +{member.expertise.length - 3}
                    </span>
                  )}
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {member.bio || "No bio available"}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-4 justify-center">
                  {member.skills?.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills?.length > 4 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      +{member.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex gap-3 mb-4">
                  {member.social?.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-110"
                      aria-label={`Visit ${member.name}'s LinkedIn`}
                    >
                      <FaLinkedin size={18} />
                    </a>
                  )}
                  {member.social?.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
                      aria-label={`Visit ${member.name}'s Twitter`}
                    >
                      <FaTwitter size={18} />
                    </a>
                  )}
                  {member.social?.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-700 transition-colors transform hover:scale-110"
                      aria-label={`Visit ${member.name}'s GitHub`}
                    >
                      <FaGithub size={18} />
                    </a>
                  )}
                  {member.social?.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110"
                      aria-label={`Email ${member.name}`}
                    >
                      <FaEnvelope size={18} />
                    </a>
                  )}
                </div>

                {/* Action Buttons - Show on Hover */}
                <AnimatePresence>
                  <motion.div
                    className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(member._id)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white shadow-md"
                      aria-label={`Edit ${member.name}`}
                    >
                      <FaEdit size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(member._id)}
                      className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-md"
                      aria-label={`Delete ${member.name}`}
                    >
                      <FaTrash size={14} />
                    </motion.button>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {teamMembers.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Team at a Glance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">{teamMembers.length}</div>
                <div className="text-gray-600">Team Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {new Set(teamMembers.map(m => m.department)).size}
                </div>
                <div className="text-gray-600">Departments</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {new Set(teamMembers.flatMap(m => m.expertise || [])).size}
                </div>
                <div className="text-gray-600">Expertise Areas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {teamMembers.filter(m => m.social?.linkedin).length}
                </div>
                <div className="text-gray-600">LinkedIn Profiles</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
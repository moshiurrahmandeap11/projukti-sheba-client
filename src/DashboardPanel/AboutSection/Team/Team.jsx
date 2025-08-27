import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center animate-pulse">
    <div className="w-24 h-24 rounded-full bg-gray-700/50 mb-4"></div>
    <div className="h-5 w-3/4 bg-gray-700/50 rounded mb-2"></div>
    <div className="h-4 w-1/2 bg-gray-700/50 rounded mb-4"></div>
    <div className="flex gap-2">
      <div className="h-4 w-16 bg-gray-700/50 rounded"></div>
      <div className="h-4 w-16 bg-gray-700/50 rounded"></div>
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
    // TODO: Implement edit functionality (e.g., navigate to edit page)
    navigate(`/dashboard/edit-member/${id}`);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Our Team</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard/add-team-member")}
            className="bg-blue-500/80 hover:bg-blue-600/80 text-white px-6 py-3 rounded-lg backdrop-blur-sm transition-colors"
            aria-label="Add new team member"
          >
            Add Team Member
          </motion.button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(4)
              .fill()
              .map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          </div>
        ) : teamMembers.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">No team members found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <motion.div
                key={member._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative bg-gray-900/40 backdrop-blur-xl rounded-lg p-4 flex flex-col items-center text-center border border-gray-700/50 group"
                role="region"
                aria-label={`Team member ${member.name}`}
              >
                <img
                  src={member.image || "/default-avatar.png"}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover border border-gray-600/50"
                  loading="lazy"
                  onError={(e) => (e.target.src = "/default-avatar.png")}
                />
                <h3 className="font-semibold text-lg text-white">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.position}</p>
                <p className="text-gray-500 text-xs mt-1">{member.department}</p>
                <p className="text-gray-500 text-xs">{member.experience}</p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {member.expertise.map((exp, index) => (
                    <span
                      key={index}
                      className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
                <p className="text-gray-400 text-sm mt-2 line-clamp-3">{member.bio}</p>
                <div className="flex gap-3 mt-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      aria-label={`Visit ${member.name}'s LinkedIn`}
                    >
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      aria-label={`Visit ${member.name}'s Twitter`}
                    >
                      <FaTwitter size={20} />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      aria-label={`Visit ${member.name}'s GitHub`}
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <FaEnvelope size={20} />
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-3 justify-center">
                  {member.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {member.icon && (
                  <span className="text-2xl mt-3">{member.icon}</span>
                )}
                {/* Hover Buttons */}
                <AnimatePresence>
                  <motion.div
                    className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(member._id)}
                      className="p-2 bg-blue-500/80 hover:bg-blue-600/80 rounded-full text-white backdrop-blur-sm"
                      aria-label={`Edit ${member.name}`}
                    >
                      <FaEdit size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(member._id)}
                      className="p-2 bg-red-500/80 hover:bg-red-600/80 rounded-full text-white backdrop-blur-sm"
                      aria-label={`Delete ${member.name}`}
                    >
                      <FaTrash size={16} />
                    </motion.button>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
import React, { useState, useEffect, useMemo, memo } from 'react';
import { Users, Linkedin, Twitter, Mail, Github, ChevronLeft, ChevronRight, X, Award, Code, Palette, TrendingUp, Database, Shield } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Constants for gradients and icons
const GRADIENTS = {
  default: 'from-blue-400 to-purple-400',
  alt1: 'from-green-400 to-teal-400',
  alt2: 'from-pink-400 to-red-400',
};
const ICONS = {
  Award, Code, Palette, TrendingUp, Database, Shield
};

// Team Card Component
const TeamCard = memo(({ member, onClick }) => (
  <div
    className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-lg bg-[rgba(10,25,47,0.5)] border border-[rgba(255,255,255,0.1)]"
    onClick={() => onClick(member)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick(member)}
    aria-label={`View details for ${member.name}`}
  >
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${member.image || '/default-avatar.png'})` }}
    >
      <img
        src={member.image || '/default-avatar.png'}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        loading="lazy"
        onError={(e) => (e.target.src = '/default-avatar.png')}
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,25,47,0.8)] via-[rgba(10,25,47,0.4)] to-transparent group-hover:from-[rgba(10,25,47,0.9)] transition-all duration-300"></div>
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[rgba(0,120,160,0.8)] transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-gray-300 font-semibold text-lg">
          {member.position}
        </p>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3">
          <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-full text-xs text-gray-300 border border-[rgba(255,255,255,0.1)]">
            Click to learn more
          </span>
        </div>
      </div>
    </div>
  </div>
));

// Modal Component
const TeamModal = memo(({ isOpen, member, onClose }) => {
  const Icon = ICONS[member?.icon] || Users;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-[rgba(10,25,47,0.3)] backdrop-blur-sm"
            onClick={onClose}
          ></div>
          <div
            className="relative bg-[rgba(10,25,47,0.5)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
          >
            <div className="relative h-48 rounded-t-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${member?.image || '/default-avatar.png'})` }}
              >
                <img
                  src={member?.image || '/default-avatar.png'}
                  alt={member?.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-0"
                  loading="lazy"
                  onError={(e) => (e.target.src = '/default-avatar.png')}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,25,47,0.8)] to-transparent"></div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-[rgba(10,25,47,0.5)] backdrop-blur-sm text-white hover:bg-[rgba(10,25,47,0.7)] transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 id="modal-title" className="text-3xl font-bold text-white mb-2">{member?.name}</h2>
                <p className="text-xl text-[rgba(0,120,160,0.8)] font-semibold">
                  {member?.position}
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="px-4 py-2 bg-[rgba(255,255,255,0.05)] rounded-full border border-[rgba(255,255,255,0.1)] backdrop-blur-sm">
                  <span className="text-gray-300 text-sm">{member?.experience}</span>
                </div>
                <div className="px-4 py-2 bg-[rgba(255,255,255,0.05)] rounded-full border border-[rgba(255,255,255,0.1)] backdrop-blur-sm">
                  <span className="text-gray-300 text-sm">{member?.department}</span>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">About</h3>
                <p className="text-gray-300 leading-relaxed">{member?.bio}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {member?.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[rgba(255,255,255,0.05)] rounded-full text-sm text-gray-300 border border-[rgba(255,255,255,0.1)] backdrop-blur-sm hover:border-[rgba(0,120,160,0.5)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Expertise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {member?.expertise.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-[rgba(0,120,160,0.7)]"></div>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-[rgba(255,255,255,0.1)] pt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Connect</h3>
                <div className="flex space-x-4">
                  {member?.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-gray-400 hover:text-[rgba(0,120,160,0.8)] hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                      aria-label={`Visit ${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member?.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-gray-400 hover:text-[rgba(0,120,160,0.8)] hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                      aria-label={`Visit ${member.name}'s Twitter`}
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member?.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="p-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-gray-400 hover:text-[rgba(0,120,160,0.8)] hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {member?.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-gray-400 hover:text-[rgba(0,120,160,0.8)] hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                      aria-label={`Visit ${member.name}'s GitHub`}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

const OurTeam = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch team members
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://projukti-sheba-server.onrender.com/our-team');
        setTeamMembers(res.data.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
        toast.error(error.response?.data?.message || 'Failed to load team members');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Memoized team members and slides
  const memoizedTeamMembers = useMemo(() => teamMembers, [teamMembers]);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(memoizedTeamMembers.length / itemsPerSlide);

  // Navigation handlers
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedMember(null), 300);
  };

  return (
    <div className="min-h-screen relative overflow-hidden  backdrop-blur-lg">
 

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-10/12 mx-auto bg-[#FBFAF6] shadow-lg md:px-12 md:py-6 text-center">
            <div className="inline-block p-4 rounded-full bg-[rgba(0,120,160,0.2)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] mb-6">
              <Users className="w-16 h-16 text-black" aria-hidden="true" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
              Our <span
                
              >Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the passionate professionals behind Projukti Sheba. Click on any member to learn more about their expertise.
            </p>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                  {Array(3).fill().map((_, index) => (
                    <div key={index} className="h-96 rounded-2xl bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)]"></div>
                  ))}
                </div>
              ) : memoizedTeamMembers.length === 0 ? (
                <p className="text-center text-gray-400 text-lg">No team members found.</p>
              ) : (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 p-3 rounded-full bg-[rgba(10,25,47,0.5)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(10,25,47,0.7)] transition-all duration-300"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 p-3 rounded-full bg-[rgba(10,25,47,0.5)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(10,25,47,0.7)] transition-all duration-300"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="overflow-hidden rounded-2xl">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {Array.from({ length: totalSlides }, (_, slideIndex) => (
                        <div key={slideIndex} className="w-full flex-shrink-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                            {memoizedTeamMembers
                              .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                              .map((member) => (
                                <TeamCard key={member._id} member={member} onClick={openModal} />
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center space-x-2 mt-8">
                    {Array.from({ length: totalSlides }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentSlide === index
                            ? 'bg-[rgba(0,120,160,0.8)] scale-110'
                            : 'bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(0,120,160,0.5)]'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Team Stats */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '7+', label: 'Team Members' },
                { value: '10+', label: 'Years Combined Experience' },
                { value: '1000+', label: 'Projects Completed' },
                { value: '500+', label: 'Happy Clients' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center  backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-2xl p-6  transition-all duration-300 "
                >
                  <div className="text-3xl font-bold text-[rgba(0,120,160,0.8)] mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        <TeamModal isOpen={isModalOpen} member={selectedMember} onClose={closeModal} />
      </div>
    </div>
  );
};

export default OurTeam;
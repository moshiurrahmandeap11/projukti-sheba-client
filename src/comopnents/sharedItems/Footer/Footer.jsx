import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Send,
  Code,
  Globe,
  Video,
  Megaphone,
  Heart,
  ExternalLink,
  PhoneCall,
  X,
  Music2,
  ParkingCircle,
  Ticket,
  User,
  MessageSquare,
  ChevronDown,
  Loader2,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

// FancyButton component (inline for this example)
const FancyButton = ({ children, className, onClick, disabled, ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} transition-all duration-300 transform hover:scale-105 active:scale-95 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [submittingTicket, setSubmittingTicket] = useState(false);

  // Ticket form state
  const [ticketForm, setTicketForm] = useState({
    phone: "",
    category: "",
    problem: "",
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // Fetch categories when modal opens
  useEffect(() => {
    if (isTicketModalOpen && categories.length === 0) {
      fetchCategories();
    }
  }, [isTicketModalOpen]);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await fetch(
        "https://projukti-sheba-server.onrender.com/categories"
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data);
      } else {
        console.error("Failed to fetch categories");
        // Fallback categories
        setCategories([
          { id: 1, name: "Software Development" },
          { id: 2, name: "Website Development" },
          { id: 3, name: "Video Editing" },
          { id: 4, name: "Social Ads Campaign" },
          { id: 5, name: "Technical Support" },
          { id: 6, name: "Other" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Fallback categories
      setCategories([
        { id: 1, name: "Software Development" },
        { id: 2, name: "Website Development" },
        { id: 3, name: "Video Editing" },
        { id: 4, name: "Social Ads Campaign" },
        { id: 5, name: "Technical Support" },
        { id: 6, name: "Other" },
      ]);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    if (!ticketForm.phone || !ticketForm.category || !ticketForm.problem) {
      alert('Please fill in all fields');
      return;
    }

    setSubmittingTicket(true);

    const payload = {
      phone: ticketForm.phone,
      category: ticketForm.category,
      problem: ticketForm.problem,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    try {
      const res = await axios.post('https://projukti-sheba-server.onrender.com/support', payload);

      if (res.data?.data?.insertedId) {
        // ✅ SweetAlert instead of toast
        Swal.fire({
          icon: 'success',
          title: '✅ Ticket Created',
          html: `
            <p><b>Your ticket created successfully</b></p>
            <p>An admin will contact with you within 10 minutes.</p>
            <hr/>
            <p className="bengali"><b>আপনার টিকেট সফলভাবে তৈরি হয়েছে</b></p>
            <p className="bengali">একজন অ্যাডমিন ১০ মিনিটের মধ্যে আপনার সাথে যোগাযোগ করবে।</p>
          `,
          confirmButtonText: 'Okay',
          confirmButtonColor: '#4F46E5'
        });

        // reset + modal close
        setTicketForm({ phone: '', category: '', problem: '' });
        setIsTicketModalOpen(false);
      }

    } catch (error) {
      console.log("Error posting ticket:", error);
      Swal.fire({
        icon: 'error',
        title: '❌ Failed!',
        text: 'Failed to submit ticket! Please try again.',
        confirmButtonColor: '#DC2626'
      });
    } finally {
      setSubmittingTicket(false);
    }
  };

  const handleInputChange = (field, value) => {
    setTicketForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const socialLinks = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/projuktishebaofficial/",
      color: "hover:text-blue-600",
    },
    {
      icon: PhoneCall,
      name: "Twitter",
      href: "https://wa.me/+8801712377406",
      color: "hover:text-sky-500",
    },
    {
      icon: Facebook,
      name: "Facebook",
      href: "https://www.facebook.com/projuktishebaofficial",
      color: "hover:text-blue-500",
    },
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://www.instagram.com/projukti_sheba",
      color: "hover:text-pink-500",
    },
    {
      icon: X,
      name: "X",
      href: "https://x.com/ProjuktiSheba",
      color: "hover:text-blue-500",
    },
    {
      icon: Youtube,
      name: "Youtube",
      href: "https://www.youtube.com/@projuktishebaofficial",
      color: "hover:text-pink-500",
    },
    {
      icon: Music2,
      name: "Tiktok",
      href: "https://www.tiktok.com/@projukti.sheba",
      color: "hover:text-pink-500",
    },
    {
      icon: ParkingCircle,
      name: "Pinterest",
      href: "https://www.pinterest.com/projuktisheba",
      color: "hover:text-pink-500",
    },
  ];

  const services = [
    { name: "Software Development", href: "#software", icon: Code },
    { name: "Website Development", href: "#websites", icon: Globe },
    { name: "Video Editing", href: "#video", icon: Video },
    { name: "Social Ads Campaign", href: "#ads", icon: Megaphone },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+8801712377406"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["support@projuktisheba.com"],
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "Teribazar, UCB Bank Building (3rd Floor), Netrakona, Bangladesh-2400.",
      ],
    },
  ];

  return (
    <>
      <footer className="relative bg-black backdrop-blur-lg overflow-hidden">
        {/* Background Overlay */}
        <div />

        {/* Decorative Elements */}

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="backdrop-blur-xl bg-[rgba(10,25,47,0.5)] border-t border-[rgba(255,255,255,0.1)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
                {/* Company Info */}
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-400/70 rounded-xl p-2 sm:p-3 shadow-xl backdrop-blur-sm border border-[rgba(255,255,255,0.1)]">
                        <Code className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          Projukti Sheba
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300">
                          Technology Solutions
                        </p>
                      </div>
                    </div>

                    {/* Company Description */}
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      Leading technology solutions provider specializing in
                      software development, web design, video editing, and
                      digital marketing campaigns.
                    </p>

                    {/* Social Links */}
                    <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-3 max-w-xs">
                      {socialLinks.map((social, index) => {
                        const SocialIcon = social.icon;
                        return (
                          <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`bg-red-400/70 backdrop-blur-sm rounded-xl p-2 sm:p-3  text-white ${social.color}  group flex items-center justify-center transition-all duration-300 hover:scale-105`}
                          >
                            <SocialIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 sm:space-y-6">
                  <h4 className="text-base sm:text-lg font-semibold text-white">
                    Contact Info
                  </h4>
                  <div className="space-y-3 sm:space-y-4">
                    {contactInfo.map((contact, index) => {
                      const ContactIcon = contact.icon;
                      return (
                        <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                          <div className="bg-red-400/70 rounded-lg p-1 sm:p-2 backdrop-blur-sm">
                            <ContactIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-200">
                              {contact.title}
                            </p>
                            {contact.details.map((detail, idx) => (
                              <p key={idx} className="text-xs sm:text-sm text-gray-300">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-4 sm:space-y-6">
                  <h4 className="text-base sm:text-lg font-semibold text-white">
                    Our Services
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {services.map((service, index) => {
                      const ServiceIcon = service.icon;
                      return (
                        <li key={index}>
                          <a
                            href={service.href}
                            className="text-sm sm:text-base text-gray-300 hover:text-white flex items-center space-x-2 sm:space-x-3 group hover:bg-[rgba(255,255,255,0.05)] rounded-lg p-2 -m-2 backdrop-blur-sm transition-all duration-300"
                          >
                            <ServiceIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 group-hover:text-red-600" />
                            <span>{service.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-red-600" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Newsletter */}
                <div className="space-y-4 sm:space-y-6">
                  <h4 className="text-base sm:text-lg font-semibold text-white">
                    Stay Updated
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Subscribe to our newsletter for latest updates and tech
                    insights.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[rgba(10,25,47,0.5)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[rgba(0,120,160,0.5)] focus:bg-[rgba(10,25,47,0.6)] transition-all duration-300"
                      />
                    </div>
                    <button
                      onClick={handleNewsletterSubmit}
                      className="group relative w-full bg-red-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-xl border border-[rgba(0,120,160,0.5)] backdrop-blur-sm overflow-hidden  cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                        {isSubscribed ? (
                          <>
                            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Subscribed!</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Subscribe</span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Support Ticket Box */}
              <div className="mt-8 sm:mt-10 md:mt-12 bg-[rgba(10,25,47,0.7)] backdrop-blur-md rounded-xl p-4 sm:p-6 border border-[rgba(255,255,255,0.1)] shadow-xl flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-red-400/70" />
                  <h4 className="text-base sm:text-lg font-semibold text-white">
                    Need Support? Get Ticket
                  </h4>
                </div>
                <FancyButton
                  onClick={() => setIsTicketModalOpen(true)}
                  className="group relative w-full md:w-auto bg-red-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-xl border border-[rgba(0,120,160,0.5)] backdrop-blur-sm overflow-hidden cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Open Ticket</span>
                  </span>
                </FancyButton>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="backdrop-blur-xl bg-[rgba(10,25,47,0.5)] border-t border-[rgba(255,255,255,0.1)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-xs sm:text-sm">
                <div className="flex items-center space-x-2 text-gray-400">
                  <span>
                    &copy; 2019-2025 Projukti Sheba. All rights reserved.
                  </span>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6">
                  <a
                    href="#privacy"
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#terms"
                    className="text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </a>
                  <a
                    href="#cookies"
                    className="text-gray-400 hover:text-white"
                  >
                    Cookie Policy
                  </a>
                </div>

                <div className="flex items-center space-x-2 text-gray-400">
                  <span>Developed By</span>
                  <a
                    href="https://moshiurrahman.online"
                    target="_blank"
                    className="text-[rgba(0,120,160,0.8)] animate-pulse"
                  >
                    MRD
                  </a>
                  <span>From Projukti Sheba</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Support Ticket Modal */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[rgba(10,25,47,0.95)] backdrop-blur-xl rounded-2xl border border-[rgba(255,255,255,0.1)] shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[rgba(255,255,255,0.1)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-red-400/70 rounded-lg p-1 sm:p-2">
                    <Ticket className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
                    Support Ticket
                  </h3>
                </div>
                <button
                  onClick={() => setIsTicketModalOpen(false)}
                  className="text-red-600 hover:text-white transition-colors duration-200"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Phone Number */}
              <div className="space-y-1 sm:space-y-2">
                <label className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium text-gray-200">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  value={ticketForm.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[rgba(10,25,47,0.5)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-red-200 focus:bg-[rgba(10,25,47,0.6)] transition-all duration-300"
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1 sm:space-y-2">
                <label className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium text-gray-200">
                  <Code className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                  <span>Category</span>
                </label>
                <div className="relative">
                  <select
                    value={ticketForm.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[rgba(10,25,47,0.5)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-[rgba(0,120,160,0.5)] focus:bg-[rgba(10,25,47,0.6)] transition-all duration-300 appearance-none cursor-pointer"
                    required
                    disabled={loadingCategories}
                  >
                    <option
                      value=""
                      className="bg-[rgba(10,25,47,1)] text-gray-400"
                    >
                      {loadingCategories
                        ? "Loading categories..."
                        : "Select a category"}
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category._id}
                        value={category.name}
                        className="bg-[rgba(10,25,47,1)] text-white"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                  {loadingCategories && (
                    <Loader2 className="absolute right-8 sm:right-10 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[rgba(0,120,160,0.8)] animate-spin" />
                  )}
                </div>
              </div>

              {/* Problem Description */}
              <div className="space-y-1 sm:space-y-2">
                <label className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium text-gray-200">
                  <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                  <span>Problem Description</span>
                </label>
                <textarea
                  value={ticketForm.problem}
                  onChange={(e) => handleInputChange("problem", e.target.value)}
                  placeholder="Describe your problem in detail..."
                  rows="3"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[rgba(10,25,47,0.5)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[rgba(0,120,160,0.5)] focus:bg-[rgba(10,25,47,0.6)] transition-all duration-300 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setIsTicketModalOpen(false)}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-xs sm:text-sm text-gray-300 hover:bg-[rgba(255,255,255,0.1)] hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingTicket}
                  onClick={handleTicketSubmit}
                  className="flex-1 bg-red-700 text-white font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-xl border border-[rgba(0,120,160,0.5)] backdrop-blur-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                    {submittingTicket ? (
                      <>
                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Submit Ticket</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
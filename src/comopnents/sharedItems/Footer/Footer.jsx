import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  X,
  Music2,
  Send,
  User,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import FancyButton from "../FancyButtons/FancyButton";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Refs for debouncing and tracking
  const saveTimeoutRef = useRef(null);
  const formDataRef = useRef({ phone: "", subject: "", problem: "" });
  const hasDataRef = useRef(false);
  const isFormSubmittedRef = useRef(false);

  const [ticketForm, setTicketForm] = useState({ 
    phone: "", 
    subject: "", 
    problem: "" 
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // Draft save function
  const saveToDraft = useCallback(async (data) => {
    if (isFormSubmittedRef.current) {
      return;
    }

    const hasValidData = Object.values(data).some(
      (value) => value && value.trim() !== ""
    );
    if (!hasValidData) {
      hasDataRef.current = false;
      return;
    }

    hasDataRef.current = true;
    setIsSaving(true);

    try {
      await axios.post(
        "https://projukti-sheba-server.onrender.com/support-draft",
        data
      );
      console.log("Support draft saved successfully");
    } catch (error) {
      console.error("Error saving support draft:", error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Debounced auto-save effect
  useEffect(() => {
    formDataRef.current = ticketForm;

    if (isSubmitting || isFormSubmittedRef.current) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveToDraft(ticketForm);
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [ticketForm, saveToDraft, isSubmitting]);

  const handleInputChange = (field, value) => {
    if (isFormSubmittedRef.current) return;
    
    setTicketForm((prev) => ({ 
      ...prev, 
      [field]: value 
    }));
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    if (!ticketForm.phone || !ticketForm.subject || !ticketForm.problem) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all fields",
        confirmButtonColor: "#4F46E5",
      });
      return;
    }

    setIsSubmitting(true);
    isFormSubmittedRef.current = true;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    try {
      const payload = { 
        ...ticketForm, 
        status: "pending", 
        createdAt: new Date().toISOString() 
      };
      
      const res = await axios.post(
        "https://projukti-sheba-server.onrender.com/support", 
        payload
      );
      
      if (res.data?.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "✅ Ticket Created",
          html: `
            <p><b>Your ticket created successfully</b></p>
            <p>An admin will contact with you within 10 minutes.</p>
          `,
          confirmButtonText: "Okay",
          confirmButtonColor: "#4F46E5",
        });
        
        setIsSubmitted(true);
        hasDataRef.current = false;

        setTimeout(() => {
          setIsSubmitted(false);
          isFormSubmittedRef.current = false;
          setTicketForm({ phone: "", subject: "", problem: "" });
          setIsTicketModalOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
      Swal.fire({
        icon: "error",
        title: "❌ Failed!",
        text: "Failed to submit ticket! Please try again.",
        confirmButtonColor: "#DC2626",
      });
      isFormSubmittedRef.current = false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTicketForm({ phone: "", subject: "", problem: "" });
    setIsTicketModalOpen(false);
    isFormSubmittedRef.current = false;
  };

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/projuktishebaofficial/", color: "hover:text-red-600" },
    { icon: Facebook, href: "https://www.facebook.com/projuktishebaofficial", color: "hover:text-red-500" },
    { icon: Instagram, href: "https://www.instagram.com/projukti_sheba", color: "hover:text-red-500" },
    { icon: X, href: "https://x.com/ProjuktiSheba", color: "hover:text-red-500" },
    { icon: Youtube, href: "https://www.youtube.com/@projuktishebaofficial", color: "hover:text-red-500" },
    { icon: Music2, href: "https://www.tiktok.com/@projukti.sheba", color: "hover:text-red-500" },
    { icon: FaWhatsapp, href: "https://wa.me/+8801712377406", color: "hover:text-red-500" },
  ];

  const contactInfo = [
    { icon: Phone, details: ["+8801712377406"] },
    { icon: Mail, details: ["support@projuktisheba.com"] },
    { icon: MapPin, details: ["Teribazar, UCB Bank Building (3rd Floor), Netrakona, Bangladesh-2400."] },
  ];

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-3">Projukti Sheba</h3>
            <p className="text-sm leading-relaxed mb-4">
              Leading technology solutions provider specializing in software and web development.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social, i) => {
                const SocialIcon = social.icon;
                return (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`text-gray-300 ${social.color}`}>
                    <SocialIcon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-3">Contact Info</h3>
            <ul className="space-y-2">
              {contactInfo.map((contact, i) => {
                const ContactIcon = contact.icon;
                return (
                  <li key={i} className="flex items-center justify-center md:justify-start space-x-2 text-sm">
                    <ContactIcon size={16} className="text-gray-400" />
                    <span>{contact.details[0]}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter & Ticket */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
            <p className="text-sm mb-3">Subscribe to our newsletter for latest updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-700"
              />
              <FancyButton type="submit" className="text-white">
                {isSubscribed ? "Subscribed!" : "Subscribe"}
              </FancyButton>
            </form>
            <FancyButton
              onClick={() => setIsTicketModalOpen(true)}
              className="text-white w-full mt-2"
            >
              Open Support Ticket
            </FancyButton>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-700 py-4 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto text-sm text-gray-400 px-6">
          <p>© {new Date().getFullYear()} Projukti Sheba. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center md:justify-start space-x-4">
            <a href="#privacy" className="hover:text-red-700">Privacy Policy</a>
            <a href="#terms" className="hover:text-red-700">Terms of Service</a>
            <a href="#cookies" className="hover:text-red-700">Cookie Policy</a>
          </div>
          <p>
            Developed By{" "}
            <a href="https://projuktisheba.com" target="_blank" rel="noreferrer" className="text-red-700 hover:underline">
              PS Developer Team
            </a>
          </p>
        </div>
      </footer>

      {/* Support Ticket Modal - Updated Design */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
            {/* Auto-save indicator */}
            {isSaving && !isFormSubmittedRef.current && (
              <div className="bg-yellow-500 text-white px-3 py-1 rounded-lg flex items-center space-x-2 text-sm mb-2">
                <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
                <span>Saving draft...</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Support Ticket</h3>
              <button 
                onClick={resetForm} 
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  Your support ticket has been submitted successfully. We'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={ticketForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                    disabled={isFormSubmittedRef.current}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={ticketForm.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Enter subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                    disabled={isFormSubmittedRef.current}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Problem Description
                  </label>
                  <textarea
                    value={ticketForm.problem}
                    onChange={(e) => handleInputChange("problem", e.target.value)}
                    placeholder="Describe your problem in detail..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    required
                    disabled={isFormSubmittedRef.current}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <FancyButton
                    type="submit"
                    disabled={isSubmitting || isFormSubmittedRef.current}
                    className="flex-1 px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      "Submit Ticket"
                    )}
                  </FancyButton>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
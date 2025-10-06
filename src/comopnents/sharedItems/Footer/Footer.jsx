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
  X,
  Music2,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import FancyButton from "../FancyButtons/FancyButton";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [submittingTicket, setSubmittingTicket] = useState(false);
  const [ticketForm, setTicketForm] = useState({ phone: "", category: "", problem: "" });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  useEffect(() => {
    if (isTicketModalOpen && categories.length === 0) fetchCategories();
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
        fallbackCategories();
      }
    } catch {
      fallbackCategories();
    } finally {
      setLoadingCategories(false);
    }
  };

  const fallbackCategories = () => {
    setCategories([
      { id: 1, name: "Software Development" },
      { id: 2, name: "Website Development" },
      { id: 3, name: "Video Editing" },
      { id: 4, name: "Social Ads Campaign" },
      { id: 5, name: "Technical Support" },
      { id: 6, name: "Other" },
    ]);
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    if (!ticketForm.phone || !ticketForm.category || !ticketForm.problem) {
      alert("Please fill in all fields");
      return;
    }
    setSubmittingTicket(true);
    try {
      const payload = { ...ticketForm, status: "pending", createdAt: new Date().toISOString() };
      const res = await axios.post("https://projukti-sheba-server.onrender.com/support", payload);
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
        setTicketForm({ phone: "", category: "", problem: "" });
        setIsTicketModalOpen(false);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "❌ Failed!",
        text: "Failed to submit ticket! Please try again.",
        confirmButtonColor: "#DC2626",
      });
    } finally {
      setSubmittingTicket(false);
    }
  };

  const handleInputChange = (field, value) => {
    setTicketForm((prev) => ({ ...prev, [field]: value }));
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
              Leading technology solutions provider specializing in software development, web design, video editing, and digital marketing campaigns.
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
              <FancyButton type="submit" className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 text-sm">
                {isSubscribed ? "Subscribed!" : "Subscribe"}
              </FancyButton>
            </form>
            <FancyButton
              onClick={() => setIsTicketModalOpen(true)}
              className="mt-4 w-full px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 text-sm"
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

      {/* Support Ticket Modal */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Support Ticket</h3>
              <button onClick={() => setIsTicketModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={ticketForm.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Category</label>
                <select
                  value={ticketForm.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-white focus:outline-none focus:border-red-700"
                  required
                  disabled={loadingCategories}
                >
                  <option value="">{loadingCategories ? "Loading..." : "Select a category"}</option>
                  {categories.map((category) => (
                    <option key={category._id || category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Problem Description</label>
                <textarea
                  value={ticketForm.problem}
                  onChange={(e) => handleInputChange("problem", e.target.value)}
                  placeholder="Describe your problem..."
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-700"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                <button
                  type="button"
                  onClick={() => setIsTicketModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
                <FancyButton
                  type="submit"
                  disabled={submittingTicket}
                  className="flex-1 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 text-sm disabled:opacity-50"
                >
                  {submittingTicket ? "Submitting..." : "Submit Ticket"}
                </FancyButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;

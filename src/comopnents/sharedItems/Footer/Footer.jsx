import React, { useState } from "react";
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
  PhoneCall,
} from "lucide-react";
import { FaFacebookMessenger, FaPinterest, FaReddit, FaTelegram, FaWhatsapp } from "react-icons/fa";
import SupportTicketModal from "../../SupportTicketModal/SupportTicketModal";
import FancyButton from "../FancyButtons/FancyButton";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // First line of social links
  const socialLinksLine1 = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/projuktishebaofficial/", color: "hover:text-red-600" },
    { icon: FaWhatsapp, href: "https://wa.me/+8801712377406", color: "hover:text-red-500" },
    { icon: PhoneCall, href: "https://profile.imo.im/profileshare/shr.AAAAAAAAAAAAAAAAAAAAAEBIYJGneLnemFnQJcOzBf_8VWCx8D3MDY0iQP3Dcpc7", color: "hover:text-red-500" },
    { icon: FaFacebookMessenger, href: "https://m.me/projuktishebaofficial", color: "hover:text-red-500" },
    { icon: FaTelegram, href: "https://t.me/projuktishebaofficial", color: "hover:text-red-500" },
    { icon: Facebook, href: "https://www.facebook.com/projuktishebaofficial", color: "hover:text-red-500" },
  ];

  // Second line of social links
  const socialLinksLine2 = [
    { icon: Instagram, href: "https://www.instagram.com/projukti_sheba", color: "hover:text-red-500" },
    { icon: X, href: "https://x.com/ProjuktiSheba", color: "hover:text-red-500" },
    { icon: Youtube, href: "https://www.youtube.com/@projuktishebaofficial", color: "hover:text-red-500" },
    { icon: Music2, href: "https://www.tiktok.com/@projukti.sheba", color: "hover:text-red-500" },
    { icon: FaPinterest, href: "https://www.pinterest.com/projuktisheba/", color: "hover:text-red-500" },
    { icon: FaReddit, href: "https://www.reddit.com/user/Projukti-Sheba/", color: "hover:text-red-500" },
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
            
            {/* Social Links - First Line */}
            <div className="flex justify-center md:justify-start space-x-4 mb-2">
              {socialLinksLine1.map((social, i) => {
                const SocialIcon = social.icon;
                return (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`text-gray-300 ${social.color}`}>
                    <SocialIcon size={20} />
                  </a>
                );
              })}
            </div>
            
            {/* Social Links - Second Line */}
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinksLine2.map((social, i) => {
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
            <a href="/privacy-policy" className="hover:text-red-700">Privacy Policy</a>
            <a href="/terms" className="hover:text-red-700">Terms of Service</a>
            <a href="/cookies" className="hover:text-red-700">Cookie Policy</a>
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
      <SupportTicketModal
        isOpen={isTicketModalOpen} 
        onClose={() => setIsTicketModalOpen(false)} 
      />
    </>
  );
};

export default Footer;
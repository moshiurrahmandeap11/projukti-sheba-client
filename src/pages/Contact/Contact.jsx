import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import FancyButton from "../../comopnents/sharedItems/FancyButtons/FancyButton";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Refs for debouncing and tracking
  const saveTimeoutRef = useRef(null);
  const formDataRef = useRef(formData);
  const hasDataRef = useRef(false);
  const isFormSubmittedRef = useRef(false); 

  // Draft save
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
        "https://projukti-sheba-server.onrender.com/contact-us",
        data
      );
      console.log("Draft saved successfully");
    } catch (error) {
      console.error("Error saving draft:", error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Debounced auto-save effect
  useEffect(() => {
    formDataRef.current = formData;

    if (isSubmitting || isFormSubmittedRef.current) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveToDraft(formData);
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData, saveToDraft, isSubmitting]);

  // Save on page unload/close
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isSubmitting || isFormSubmittedRef.current) return;

      if (hasDataRef.current && formDataRef.current) {
        try {
          navigator.sendBeacon(
            "https://projukti-sheba-server.onrender.com/contact-us",
            JSON.stringify(formDataRef.current)
          );
        } catch (error) {
          console.error("Error saving draft on page unload:", error);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSubmitting]);

  const handleInputChange = (e) => {
    if (isFormSubmittedRef.current) return;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    isFormSubmittedRef.current = true;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    try {
      await axios.post(
        "https://projukti-sheba-server.onrender.com/contact-us-submitted",
        formData
      );
      console.log("Form submitted successfully:", formData);
      setIsSubmitted(true);

      hasDataRef.current = false; // Reset draft flag

      setTimeout(() => {
        setIsSubmitted(false);
        isFormSubmittedRef.current = false; 
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);

      isFormSubmittedRef.current = false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Address",
      details: "Teribazar, UCB Bank Building (3rd Floor), Netrakona, Bangladesh-2400.",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "support@projuktisheba.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+8801712377406",
    },
  ];

  return (
    <div className="min-h-screen mt-5 lg:mt-20 bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Auto-save indicator */}
      {isSaving && !isFormSubmittedRef.current && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          <span className="text-sm">Saving draft...</span>
        </div>
      )}

      <h1 className="text-5xl text-center font-bold text-black mb-6 tracking-wide">Get In Touch </h1>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {contactInfo.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-dashed border-yellow-400 mb-4">
              <item.icon className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.details}</p>
          </div>
        ))}
      </div>

      {/* Map and Form Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Map */}
        <div className="h-96 lg:h-auto rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14477.155334444315!2d90.7248511!3d24.88812765!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3756df11d1045b37%3A0x72ab806eaeeb8afb!2zUHJvanVrdGkgU2hlYmEg4Kaq4KeN4Kaw4Kav4KeB4KaV4KeN4Kaq4Ka_IOCmuOCnh-CmrOCmvg!5e0!3m2!1sen!2sbd!4v1755599266118!5m2!1sen!2sbd"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Projukti Sheba Location"
          ></iframe>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {isSubmitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600">
                Your message has been sent successfully. We'll get back to you soon!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                required
                disabled={isFormSubmittedRef.current}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="phone"
                disabled={isFormSubmittedRef.current}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Whatsapp Number"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                required
                disabled={isFormSubmittedRef.current}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="subject"
                required
                disabled={isFormSubmittedRef.current}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
              <textarea
                name="message"
                rows="4"
                required
                disabled={isFormSubmittedRef.current}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
              />
              <FancyButton
                type="submit"
                disabled={isSubmitting || isFormSubmittedRef.current}
                className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Send Message"
                )}
              </FancyButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
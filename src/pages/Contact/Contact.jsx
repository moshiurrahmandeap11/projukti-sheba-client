import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Building,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  CheckCircle,
  PhoneCall,
  Youtube,
  X,
  Music2,
  ParkingCircle,
} from "lucide-react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    service: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [services, setServices] = useState([]);

  // Refs for debouncing and tracking
  const saveTimeoutRef = useRef(null);
  const formDataRef = useRef(formData);
  const hasDataRef = useRef(false);
  const isFormSubmittedRef = useRef(false); 

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://projukti-sheba-server.onrender.com/categories"
        );
        setServices(response.data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // Draft save
  const saveToDraft = useCallback(async (data) => {
    // 🚀 যদি form submit হয়ে গেছে তাহলে draft save করবে না
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

    // 🚀 যদি submit হয়ে যায় বা submitting চলে তাহলে draft save করবে না
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
      // 🚀 যদি submit হয়ে গেছে তাহলে draft পাঠাবে না
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
    // 🚀 যদি form submit হয়ে গেছে তাহলে input change allow করবে না
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

    // 🔥 যত তাড়াতাড়ি সম্ভব flag set করা যাতে draft save বন্ধ হয়ে যায়
    isFormSubmittedRef.current = true;

    // 🔥 Timeout clear করা যাতে draft save না চলে
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    try {
      // ✅ শুধুমাত্র submitted endpoint এ পাঠানো
      await axios.post(
        "https://projukti-sheba-server.onrender.com/contact-us-submitted",
        formData
      );
      console.log("Form submitted successfully:", formData);
      setIsSubmitted(true);

      hasDataRef.current = false; // ✅ draft disable

      setTimeout(() => {
        setIsSubmitted(false);
        isFormSubmittedRef.current = false; 
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
          service: "",
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
      icon: Phone,
      title: "Phone",
      details: ["+8801712377406"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["support@projuktisheba.com"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "Teribazar, UCB Bank Building (3rd Floor), Netrakona, Bangladesh-2400.",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["we work 24/7"],
      color: "from-orange-500 to-red-500",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/projuktishebaofficial/",
      color: "hover:text-blue-600",
    },
    {
      icon: PhoneCall,
      name: "Twitter",
      url: "https://wa.me/+8801712377406",
      color: "hover:text-sky-500",
    },
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://www.facebook.com/projuktishebaofficial",
      color: "hover:text-blue-500",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://www.instagram.com/projukti_sheba",
      color: "hover:text-pink-500",
    },
    {
      icon: X,
      name: "X",
      url: "https://x.com/ProjuktiSheba",
      color: "hover:text-blue-500",
    },
    {
      icon: Youtube,
      name: "Youtube",
      url: "https://www.youtube.com/@projuktishebaofficial",
      color: "hover:text-pink-500",
    },
    {
      icon: Music2,
      name: "Tiktok",
      url: "https://www.tiktok.com/@projukti.sheba",
      color: "hover:text-pink-500",
    },
    {
      icon: ParkingCircle,
      name: "Pinterest",
      url: "https://www.pinterest.com/projuktisheba",
      color: "hover:text-pink-500",
    },
  ];

  return (
    <div className="min-h-screen pt-10 relative backdrop-blur-lg">
      {/* Auto-save indicator */}
      {isSaving && !isFormSubmittedRef.current && (
        <div className="fixed top-4 right-4 z-50 bg-[rgba(0,120,160,0.8)] text-white px-4 py-2 rounded-lg backdrop-blur-sm border border-[rgba(255,255,255,0.1)] flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          <span className="text-sm">Saving draft...</span>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block p-4 rounded-full bg-[rgba(0,120,160,0.2)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] mb-6">
              <MessageSquare className="w-16 h-16 text-black" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black tracking-tight">
              Get In{" "}
              <span
                
              >
                Touch
              </span>
            </h1>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className=" backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 relative shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-8">
                    Send us a Message
                  </h2>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-[rgba(0,120,160,0.8)] mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        Thank You!
                      </h3>
                      <p className="text-gray-300">
                        Your message has been sent successfully. We'll get back
                        to you soon!
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            required
                            disabled={isFormSubmittedRef.current}
                            className="w-full pl-10 pr-3 py-3 border border-[rgba(255,255,255,0.1)] rounded-lg bg-[#b2beb5] backdrop-blur-sm text-black placeholder-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-[rgba(0,120,160,0.5)] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            required
                            disabled={isFormSubmittedRef.current}
                            className="w-full pl-10 pr-3 py-3 border border-[rgba(255,255,255,0.1)] rounded-lg bg-[#b2beb5] backdrop-blur-sm text-black placeholder-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-[rgba(0,120,160,0.5)] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Phone & Company Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            disabled={isFormSubmittedRef.current}
                            className="w-full pl-10 pr-3 py-3 border border-[rgba(255,255,255,0.1)] rounded-lg bg-[rgba(178,190,181,0.5)] backdrop-blur-sm text-black placeholder-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-[rgba(0,120,160,0.5)] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="company"
                            disabled={isFormSubmittedRef.current}
                            className="w-full pl-10 pr-3 py-3 border border-[rgba(255,255,255,0.1)] rounded-lg bg-[rgba(178,190,181,0.5)] backdrop-blur-sm text-black placeholder-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-[rgba(0,120,160,0.5)] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Service Selection */}
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select
                          name="service"
                          disabled={isFormSubmittedRef.current}
                          className="w-full pl-10 pr-3 py-3 border border-[rgba(255,255,255,0.1)] rounded-lg bg-[rgba(178,190,181,0.5)] backdrop-blur-sm text-black focus:outline-none focus:ring-2 focus:ring-[rgba(0,120,160,0.5)] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          value={formData.service}
                          onChange={handleInputChange}
                        >
                          <option value="" className="bg-[rgba(178,190,181,0.7)]">
                            Select Service
                          </option>
                          {services.map((service, index) => (
                            <option
                              key={index}
                              value={service.name}
                              className="bg-[rgba(10,25,47,0.7)]"
                            >
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Subject */}
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="subject"
                          required
                          disabled={isFormSubmittedRef.current}
                          className="w-full pl-10 pr-3 py-3 border border-[rgba(255,255,255,0.1)] rounded-lg bg-[rgba(178,190,181,0.5)] backdrop-blur-sm text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[rgba(0,120,160,0.5)] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Message */}
                      <div className="relative">
                        <textarea
                          name="message"
                          rows="5"
                          required
                          disabled={isFormSubmittedRef.current}
                          className="w-full p-3 border border-[rgba(255,255,255,0.1)] rounded-lg bg-[rgba(178,190,181,0.5)] backdrop-blur-sm text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[rgba(0,120,160,0.5)] focus:border-transparent transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Tell us about your project..."
                          value={formData.message}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting || isFormSubmittedRef.current}
                        className="group relative cursor-pointer w-full bg-[rgba(0,120,160,0.5)] text-white font-semibold py-4 rounded-full text-lg transition-all duration-500 shadow-2xl hover:shadow-[0_4px_30px_rgba(0,120,160,0.2)] transform hover:scale-105 border border-[rgba(0,120,160,0.5)] backdrop-blur-sm overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <div className="absolute inset-0 bg-[rgba(0,120,160,0.7)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                        <div className="absolute inset-0 bg-[rgba(0,120,160,0.5)] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>

                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span>Send Message</span>
                              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </>
                          )}
                        </span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Company Info & Map */}
              <div className="space-y-8">
                {/* Company Info */}
                <div className=" backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 relative shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-black mb-6">
                      Projukti Sheba
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Leading IT solutions provider in Bangladesh, specializing
                      in cutting-edge web development, mobile applications, and
                      digital transformation services. We turn your ideas into
                      reality with innovative technology solutions.
                    </p>

                    {/* Services List */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-black mb-3">
                        Our Services
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {services.map((service, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-gray-600"
                          >
                            <CheckCircle className="w-4 h-4 text-[rgba(0,120,160,0.8)]" />
                            <span className="text-sm">{service.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h4 className="text-lg font-semibold text-black mb-3">
                        Connect With Us
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {socialLinks.map((social, index) => (
                          <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-gray-600 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-[rgba(255,255,255,0.1)] backdrop-blur-sm`}
                            aria-label={social.name}
                          >
                            <social.icon className="w-5 h-5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 relative h-64 md:h-96 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
                  {/* Embedded Map */}
                  <div className="relative z-10 h-full w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14477.155334444315!2d90.7248511!3d24.88812765!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3756df11d1045b37%3A0x72ab806eaeeb8afb!2zUHJvanVrdGkgU2hlYmEg4Kaq4KeN4Kaw4Kav4KeB4KaV4KeN4Kaq4Ka_IOCmuOCnh-CmrOCmvg!5e0!3m2!1sen!2sbd!4v1755599266118!5m2!1sen!2sbd"
                      className="w-full h-full rounded-xl border-0"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Projukti Sheba Location"
                    ></iframe>

                  </div>
                </div>
              </div>
            </div>
            <div className="text-center py-6">
              <p className="text-xl text-gray-600 max-w-3xl mx-auto py-3 leading-relaxed">
                Ready to transform your digital presence? Let's discuss your
                project and bring your vision to life with cutting-edge IT
                solutions.
              </p>
              {/* Contact Info Cards */}
              <div className="px-4 sm:px-6 lg:px-8 mb-20">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((item, index) => (
                      <div
                        key={index}
                        className="group backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-2xl p-6  transition-all duration-500 hover:scale-105 hover:shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
                      >
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(0,120,160,0.5)] mb-4 group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-[rgba(0,120,160,0.8)] transition-colors duration-300">
                          {item.title}
                        </h3>
                        {item.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className="text-gray-600 group-hover:text-gray-600 transition-colors duration-300"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
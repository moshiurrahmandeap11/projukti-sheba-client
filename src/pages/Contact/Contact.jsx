import React, { useState, useEffect } from "react";
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
} from "lucide-react";

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
  const [particles, setParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          y: particle.y > 100 ? -5 : particle.y + particle.speed * 0.1,
          x: particle.x + Math.sin(particle.y * 0.01) * 0.05,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log("Form submitted:", formData);

      // Reset form after success message
      setTimeout(() => {
        setIsSubmitted(false);
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
    }, 2000);
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
      details: ["Teribazar, UCB Bank Building (3rd Floor), Netrakona, Bangladesh-2400."],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["we work 24/7"],
      color: "from-orange-500 to-red-500",
    },
  ];

  const services = [
    "Web Development",
    "Software Development",
    "Video Editing",
    "Social Ads Campaign"
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://www.facebook.com/projuktishebaofficial",
      color: "hover:text-blue-500",
    },
    { icon: PhoneCall, name: "Twitter", url: "https://wa.me/+8801712377406", color: "hover:text-sky-500" },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/projuktishebaofficial/",
      color: "hover:text-blue-600",
    },
    {
      icon: Youtube,
      name: "Youtube",
      url: "https://www.youtube.com/@projuktishebaofficial",
      color: "hover:text-pink-500",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-slate-900">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-pulse"></div>

        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`,
            }}
          ></div>
        ))}

        {/* Geometric shapes */}
        <div
          className="absolute top-20 right-20 w-40 h-40 border border-white/5 rounded-full animate-spin"
          style={{ animationDuration: "25s" }}
        ></div>
        <div className="absolute bottom-32 left-20 w-32 h-32 border border-purple-400/10 rounded-lg rotate-45 animate-pulse"></div>
        <div
          className="absolute top-1/2 right-10 w-20 h-20 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/5 mb-6">
              <MessageSquare className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Get In{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your digital presence? Let's discuss your
              project and bring your vision to life with cutting-edge IT
              solutions.
            </p>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  {item.details.map((detail, idx) => (
                    <p
                      key={idx}
                      className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur-xl"></div>

                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-8">
                    Send us a Message
                  </h2>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        Thank You!
                      </h3>
                      <p className="text-gray-400">
                        Your message has been sent successfully. We'll get back
                        to you soon!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            required
                            className="w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
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
                            className="w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
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
                            className="w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
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
                            className="w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
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
                          className="w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                          value={formData.service}
                          onChange={handleInputChange}
                        >
                          <option value="" className="bg-gray-800">
                            Select Service
                          </option>
                          {services.map((service, index) => (
                            <option
                              key={index}
                              value={service}
                              className="bg-gray-800"
                            >
                              {service}
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
                          className="w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
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
                          className="w-full p-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="Tell us about your project..."
                          value={formData.message}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="group relative cursor-pointer w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold py-4 rounded-full text-lg transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 border border-purple-500/30 backdrop-blur-sm overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>

                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          {isSubmitting ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span>Send Message</span>
                              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Company Info & Map */}
              <div className="space-y-8">
                {/* Company Info */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-2xl blur-xl"></div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Projukti Sheba
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Leading IT solutions provider in Bangladesh, specializing
                      in cutting-edge web development, mobile applications, and
                      digital transformation services. We turn your ideas into
                      reality with innovative technology solutions.
                    </p>

                    {/* Services List */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Our Services
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {services.map((service, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-gray-400"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Connect With Us
                      </h4>
                      <div className="flex space-x-4">
                        {socialLinks.map((social, index) => (
                          <a
                            key={index}
                            href={social.url}
                            className={`p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/10`}
                            aria-label={social.name}
                          >
                            <social.icon className="w-5 h-5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

<div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative h-64 md:h-96 overflow-hidden">
    {/* Soft gradient background blur */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-green-500/5 to-purple-500/5 rounded-2xl blur-xl"></div>

    {/* Embedded Map */}
    <div className="relative z-10 h-full w-full">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14477.155334444315!2d90.7248511!3d24.88812765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3756df11d1045b37%3A0x72ab806eaeeb8afb!2zUHJvanVrdGkgU2hlYmEg4Kaq4KeN4Kaw4Kav4KeB4KaV4KeN4Kak4Ka_IOCmuOCnh-CmrOCmvg!5e0!3m2!1sen!2sbd!4v1755599266118!5m2!1sen!2sbd"
            className="w-full h-full rounded-xl border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-gray-900/30 to-black/50 rounded-xl pointer-events-none"></div>
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

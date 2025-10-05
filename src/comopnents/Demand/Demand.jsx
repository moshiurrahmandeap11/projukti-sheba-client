import React from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import {
  Laptop,
  Globe,
  Smartphone,
  ShoppingCart,
  PenTool,
  Wrench,
} from "lucide-react";

const Demand = ({ className = "" }) => {
  const navigate = useNavigate();

  const services = [
    {
      name: "Software Development",
      icon: <Laptop size={32} />,
      description:
        "We craft robust, scalable, and secure software tailored to your business workflow.",
    },
    {
      name: "Website Development",
      icon: <Globe size={32} />,
      description:
        "Build blazing-fast, responsive websites designed for performance and aesthetics.",
    },
    {
      name: "Mobile App Development",
      icon: <Smartphone size={32} />,
      description:
        "Deliver seamless experiences on Android and iOS with intuitive mobile apps.",
    },
    {
      name: "E-Commerce Solutions",
      icon: <ShoppingCart size={32} />,
      description:
        "Empower your online business with custom, conversion-focused eCommerce systems.",
    },
    {
      name: "Blogging Platform",
      icon: <PenTool size={32} />,
      description:
        "Launch a modern CMS or blogging system optimized for speed and SEO ranking.",
    },
    {
      name: "Custom Software Development",
      icon: <Wrench size={32} />,
      description:
        "Got unique requirements? Let’s transform your idea into a powerful custom solution.",
      cta: true,
    },
  ];

  return (
    <section className={`py-20 bg-neutral-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Let’s Build Your{" "}
          <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
            Perfect Solution
          </span>
        </h2>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          We analyze, design, and develop digital products that bring
          innovation, automation, and growth to your business.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon with subtle glass effect */}
              <div className="mb-5 flex items-center justify-center w-16 h-16 rounded-xl bg-white/30 backdrop-blur-sm shadow-inner group-hover:shadow-lg transition-all duration-500">
                <span className="text-red-600 group-hover:text-rose-600 group-hover:scale-125 transition-all duration-500">
                  {service.icon}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {service.cta && (
                <button
                  onClick={() => navigate("/contact")}
                  className="mt-4 w-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-sm font-medium py-2.5 px-6 rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Submit Request
                </button>
              )}

              {/* hover glow border */}
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-rose-200 pointer-events-none transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Demand.propTypes = {
  className: PropTypes.string,
};

Demand.defaultProps = {
  className: "",
};

export default Demand;

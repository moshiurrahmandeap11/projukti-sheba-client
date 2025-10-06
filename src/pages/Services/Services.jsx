import React from "react";
import { useNavigate } from "react-router";
import { Code, Globe, Smartphone, ShoppingCart, PenTool, Wrench } from "lucide-react";
import FancyButton from "../../comopnents/sharedItems/FancyButtons/FancyButton";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      name: "Software Development",
      icon: Code,
      description:
        "We develop custom software solutions that streamline your business workflow, automate tasks, and enhance productivity.",
    },
    {
      name: "Web Development",
      icon: Globe,
      description:
        "A well-built website defines your brand identity. We craft responsive and fast web apps tailored to your business goals.",
    },
    {
      name: "Mobile App Development",
      icon: Smartphone,
      description:
        "We build Android and iOS apps with smooth UI, high performance, and scalability for your modern business needs.",
    },
    {
      name: "E-Commerce",
      icon: ShoppingCart,
      description:
        "Whether you want a readymade or custom eCommerce solution — we design and develop it to boost your online sales.",
    },
    {
      name: "Blogging Platform",
      icon: PenTool,
      description:
        "We can create a full-featured blogging platform or CMS for publishing SEO-friendly articles, news, and blogs.",
    },
    {
      name: "Custom Development",
      icon: Wrench,
      description:
        "Need something unique? We specialize in custom-tailored solutions built exactly according to your vision and goals.",
    },
  ];

  return (
<div className="bg-gray-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto text-center">
    {/* Header */}
    <h2 className="text-5xl font-bold text-black mb-6 tracking-wide">
      Our Services
    </h2>
    <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-lg leading-relaxed">
      Explore our wide range of digital solutions — from software to web and mobile development. We design, build, and deliver excellence.
    </p>

    {/* Services Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-between text-center hover:shadow-lg hover:scale-102 transition-all duration-300 relative group"
          >
            <span className="text-5xl mb-4 group-hover:text-red-600 transition-colors duration-300">
              <Icon className="w-12 h-12" />
            </span>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              {service.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {service.description}
            </p>
            <FancyButton onClick={() => navigate("/contact")}>
              Get Started
            </FancyButton>
          </div>
        );
      })}
    </div>
  </div>
</div>

  );
};

export default Services;

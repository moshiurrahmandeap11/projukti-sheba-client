import React from "react";
import { useNavigate } from "react-router";
import { Code, Globe, Smartphone, ShoppingCart, PenTool, Wrench, LayoutDashboard, ShoppingBag } from "lucide-react";
import FancyButton from "../../comopnents/sharedItems/FancyButtons/FancyButton";

const Services = () => {
  const navigate = useNavigate();

const services = [
  {
    name: "ERP Solutions",
    icon: LayoutDashboard, // dashboard-style system = perfect for ERP
    description:
      "We develop custom ERP systems to automate workflow, manage inventory, HR, and finance with ease.",
  },
  {
    name: "E-Commerce",
    icon: ShoppingBag, // directly represents online store
    description:
      "We build responsive and fast eCommerce solutions that boost your online sales and customer engagement.",
  },
  {
    name: "Custom Development",
    icon: Code, // custom coding = best match
    description:
      "We build tailored applications exactly how your business needs them — efficient, secure, and scalable.",
  },
  {
    name: "Software Development",
    icon: Wrench, // represents building and fixing tools
    description:
      "From desktop apps to web platforms, we develop robust software to streamline your digital operations.",
  },
  {
    name: "Web Development",
    icon: Globe, // represents websites/internet
    description:
      "We create modern, SEO-friendly, and high-performance websites to grow your online presence.",
  },
  {
    name: "Mobile App Development",
    icon: Smartphone, // self-explanatory
    description:
      "We craft beautiful, fast, and scalable mobile apps for both Android and iOS with stunning UI/UX.",
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

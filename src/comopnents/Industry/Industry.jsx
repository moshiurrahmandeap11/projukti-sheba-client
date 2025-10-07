import React, { useMemo } from "react";
import { 
  Landmark, // Fintech
  HeartPulse, // Healthcare
  ShoppingBag, // E-commerce
  Car, // Automotive
  GraduationCap, // Education
  Building2, // Real Estate
  Hotel, // Hospitality
  Shirt, // RMG
  Pill, // Pharmacy
  Plane, // Aviation
  Palette, // UI/UX
  Layers, // Many More
  Factory,
  UtensilsCrossed,
  Building,
  Hospital,
  User
} from "lucide-react";
import PropTypes from "prop-types";

const Industry = ({ className = "" }) => {
  const industries = useMemo(
    () => [
  { name: "Manufacturer", icon: Factory }, // factory = perfect for manufacturing
  { name: "E-commerce", icon: ShoppingBag }, // shopping icon for e-commerce
  { name: "Restaurant", icon: UtensilsCrossed }, // fork+knife = restaurant
  { name: "Education", icon: GraduationCap }, // education = graduation cap
  { name: "Company", icon: Building2 }, // office/company = building
  { name: "Hospitality", icon: Hotel }, // hotels, resorts = hospitality
  { name: "Aviation", icon: Plane }, // airplane = aviation
  { name: "Real Estate", icon: Building }, // building = real estate
  { name: "RMG", icon: Shirt }, // ready-made garments = shirt
  { name: "Hospital", icon: Hospital }, // hospital = perfect match
  { name: "Personal", icon: User }, // personal = user
  { name: "Many More", icon: Layers }, // layers = “many things”
    ],
    []
  );

  return (
    <div className={`bg-gray-50 ${className}`}>
      <div className="py-16 px-4 text-center max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-black mb-6 tracking-wide">
          Industries We Serve
        </h2>
        <p className="text-gray-600 mb-10 text-lg">
          Empowering every business through modern digital transformation
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                className="bg-white group p-6 rounded-2xl shadow-md flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="z-10 flex flex-col items-center space-y-2">
                  <Icon className="w-10 h-10 text-black group-hover:text-red-600 transition-colors duration-300" />
                  <p className="text-gray-800 font-semibold text-sm md:text-base group-hover:text-black transition-colors duration-300">
                    {industry.name}
                  </p>
                </div>

                {/* Fancy Hover BG Effect */}
                {/* <div className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Industry.propTypes = {
  className: PropTypes.string,
};

export default Industry;

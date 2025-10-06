import React from "react";
import { FaClipboardList, FaBullseye, FaDraftingCompass, FaCode, FaClipboardCheck, FaRocket, FaCogs } from "react-icons/fa";

const steps = [
  { icon: <FaClipboardList className="text-black text-3xl" />, title: "Analysis", color: "border-black" },
  { icon: <FaBullseye className="text-black text-3xl" />, title: "Planning", color: "border-black" },
  { icon: <FaDraftingCompass className="text-black text-3xl" />, title: "Design", color: "border-black" },
  { icon: <FaCode className="text-black text-3xl" />, title: "Development", color: "border-black" },
  { icon: <FaClipboardCheck className="text-black text-3xl" />, title: "Testing", color: "border-black" },
  { icon: <FaRocket className="text-black text-3xl" />, title: "Deployment", color: "border-black" },
  { icon: <FaCogs className="text-black text-3xl" />, title: "Maintenance", color: "border-black" },
];

const Progress = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <h3 className="text-black uppercase tracking-widest font-bold text-sm mb-2">
          Working Process
        </h3>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Deliver Excellence in Every Step
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          From analysis to deployment, we deliver solutions that drive growth and efficiency.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div
                className={`w-20 h-20 flex items-center justify-center rounded-full border-2 ${step.color} bg-white shadow-md transition-transform duration-500 group-hover:scale-110`}
              >
                {step.icon}
              </div>
              <p className="mt-4 font-semibold text-gray-800">{step.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Progress;
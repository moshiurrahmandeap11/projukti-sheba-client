import React from "react";
import {
  Users,
  Award,
  Clock,
  Globe,
  Target,
  Lightbulb,
  Heart,
  Zap,
} from "lucide-react";
import OurTeam from "../../comopnents/OurTeam/OurTeam";

const About = () => {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Happy Clients",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      number: "10+",
      label: "Years Experience",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      number: "1000+",
      label: "Projects Completed",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      number: "10+",
      label: "Countries Served",
      color: "from-orange-500 to-red-500",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for perfection in every project, delivering solutions that exceed expectations and drive real results.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Embracing cutting-edge technologies and creative approaches to solve complex challenges and stay ahead.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Heart,
      title: "Integrity",
      description:
        "Building trust through transparency, honest communication, and ethical business practices in everything we do.",
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: Zap,
      title: "Agility",
      description:
        "Adapting quickly to changing needs and market trends while maintaining quality and delivering on time.",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <div className="relative min-h-screen pt-10  overflow-hidden">
      <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto  rounded-2xl px-4 sm:px-8 md:px-12 py-10">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              <span className="text-black">About Projukti Sheba</span>
            </h2>
            <div className="max-w-4xl mx-auto backdrop-blur-xl rounded-3xl border border-black p-6 sm:p-8 md:p-10">
              <p className="text-base sm:text-lg md:text-sm text-black leading-relaxed mb-4">
                We are a leading technology solutions provider, dedicated to
                transforming businesses through innovative software development,
                cutting-edge web solutions, professional video editing, and
                strategic social media campaigns.
                <br />
                Since our inception, we've been at the forefront of digital
                innovation, helping companies worldwide achieve their
                technological goals and drive sustainable growth.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-12 sm:mb-16">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 sm:gap-6 md:gap-8">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={index}
                    className="backdrop-blur-xl rounded-2xl border border-[rgba(255,255,255,0.1)] p-6 sm:p-8 hover:scale-105 group transition-all duration-300"
                  >
                    <div
                      className={`bg-red-400/70 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 w-fit mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <StatIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2 group-hover:text-[rgba(0,120,160,1)] transition-colors duration-300">
                        {stat.number}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-400 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-12 sm:mb-16">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
                  Our Mission
                </h3>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium leading-relaxed">
                    To empower businesses with cutting-edge technology solutions
                    that drive growth, enhance efficiency, and create meaningful
                    digital experiences that connect companies with their
                    audiences.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium leading-relaxed">
                    We believe in the transformative power of technology and
                    strive to make advanced digital solutions accessible to
                    businesses of all sizes, helping them thrive in an
                    increasingly connected world.
                  </p>
                </div>
                <div className="flex justify-start">
                  <button className="relative group bg-red-700 px-4 sm:px-6 py-2 sm:py-3 rounded-md cursor-pointer text-white text-sm sm:text-base font-medium overflow-hidden">
                    <span className="relative z-10">Learn More About Us</span>
                  </button>
                </div>
              </div>
              <div className="backdrop-blur-xl rounded-3xl border border-[rgba(255,255,255,0.1)] p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="bg-red-400/70 rounded-xl p-2 sm:p-3">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black">
                      Our Vision
                    </h4>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium leading-relaxed">
                    To become the global leader in innovative technology
                    solutions, setting industry standards for quality,
                    creativity, and client satisfaction while fostering a
                    culture of continuous learning and technological
                    advancement.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
                Our Core Values
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto">
                The principles that guide everything we do and shape our company
                culture
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {values.map((value, index) => {
                const ValueIcon = value.icon;
                return (
                  <div
                    key={index}
                    className="backdrop-blur-xl rounded-2xl border border-[rgba(255,255,255,0.1)] p-6 sm:p-8 hover:scale-105 group transition-all duration-300"
                  >
                    <div
                      className={`bg-red-400/70 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 w-fit mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <ValueIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 text-center group-hover:text-red-700 transition-colors duration-300">
                      {value.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 font-medium text-center leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div>
            <div className="backdrop-blur-xl rounded-3xl border border-[rgba(255,255,255,0.1)] p-6 sm:p-8 md:p-10">
              <div className="text-center mb-8 sm:mb-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
                  Why Choose Us?
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <div className="space-y-4">
                  <div className="bg-red-400/70 rounded-xl p-2 sm:p-3 w-fit">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-black">
                    Expert Team
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Our team consists of highly skilled professionals with years
                    of experience in their respective fields, committed to
                    delivering excellence.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-red-400/70 rounded-xl p-2 sm:p-3 w-fit">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-black">
                    Proven Track Record
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    With over 15 years in the industry and 1000+ successful
                    projects, we have the experience to handle any challenge.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-red-400/70 rounded-xl p-2 sm:p-3 w-fit">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-black">
                    Cutting-Edge Technology
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    We stay up-to-date with the latest technologies and industry
                    trends to provide you with the most advanced solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <OurTeam />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-[rgba(0,120,160,0.2)] rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-32 sm:w-40 h-32 sm:h-40 bg-[rgba(50,40,130,0.2)] rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-5 sm:left-20 w-16 sm:w-20 h-16 sm:h-20 bg-[rgba(0,120,160,0.2)] rounded-full blur-xl"></div>
    </div>
  );
};

export default About;

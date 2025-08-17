import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: 'services' },
    { name: 'About', href: 'about' },
    { name: 'Blogs', href: 'blogs' },
  ];

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gradient-to-r from-gray-900/70 via-slate-900/60 to-gray-900/70 backdrop-blur-2xl border-b border-white/10 shadow-lg'
          : 'bg-gradient-to-r from-gray-900/40 via-slate-800/30 to-gray-900/40 backdrop-blur-xl border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div onClick={handleLogoClick} className="flex items-center cursor-pointer">
              <div className=" rounded-xl p-2.5 shadow-lg ">
                <span className="text-white font-extrabold text-xl tracking-wider">
                  Projukti Sheba
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10"
                >
                  {link.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Join Us Button */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-purple-500/40 hover:scale-105 border border-purple-500/30 backdrop-blur-sm">
              Join Us
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300 border border-white/10 backdrop-blur-sm"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-br from-gray-900/95 via-slate-900/90 to-gray-900/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-300 hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-xl hover:scale-105 border border-purple-500/30"
            >
              Join Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

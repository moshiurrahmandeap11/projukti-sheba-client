import React, { useState, useEffect } from 'react';
import { Menu, X, User, Settings, HelpCircle, LogOut, Star, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../hooks/AuthContexts/AuthContexts';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled); 
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogOut = () => {
  logOut()
    .then(() => {
      navigate("/");
      toast.success("Logged out successfully");
    })
    .catch((error) => {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    });
};
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: 'services' },
    { name: 'About', href: 'about' },
    { name: 'Contact', href: 'contact' },
    { name: 'Pricing', href: 'pricing' },
    { name: 'Blogs', href: 'blogs' },
  ];

  const profileLinks = [
    { name: 'Profile', icon: <User size={18} />, href: '/profile' },
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/dashboard/user' },
    { name: 'Your Services', icon: <Settings size={18} />, href: '/services' },
    { name: 'Try Premium', icon: <Star size={18} />, href: '/premium', isButton: true },
    { isDivider: true },
    { name: 'Settings', icon: <Settings size={18} />, href: '/settings' },
    { name: 'Support', icon: <HelpCircle size={18} />, href: '/support' },
    { name: 'Logout', icon: <LogOut size={18} />, action: handleLogOut },
  ];

  const handleLogoClick = () => {
    navigate("/");
  };


  const handleJoinUsClick = () => {
    setIsMenuOpen(false);
    navigate("/auth/login");
  };

  const handleProfileClick = (item) => {
    setIsProfileOpen(false);
    if (item.action) {
      item.action();
    } else if (item.href) {
      navigate(item.href);
    }
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <nav
      className={` top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gradient-to-r from-gray-900/70 via-slate-900/60 to-gray-900/70 backdrop-blur-2xl border-b border-white/10 shadow-lg'
          : 'bg-gradient-to-r from-gray-900/40 via-slate-800/30 to-gray-900/40 backdrop-blur-xl border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Mobile Menu Button (Left side) */}
          <div className="flex items-center">
            {/* Mobile Menu Button (Only for logged in users on mobile) */}
            {user && (
              <div className="md:hidden mr-2">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                  aria-expanded={isMenuOpen}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300 border border-white/10 backdrop-blur-sm"
                >
                  {isMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <div onClick={handleLogoClick} className="flex items-center cursor-pointer">
                <div className="rounded-xl p-2.5 shadow-lg">
                  <span className="text-white font-extrabold text-xl tracking-wider">
                    Projukti Sheba
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links (Center) - Show always */}
          <div className="hidden md:block mx-auto">
            <div className="flex items-center space-x-8">
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

          {/* Right Side (Profile/Login) */}
          <div className="flex items-center">
            {/* Desktop - Join Us Button (when no user) */}
            {!user && (
              <div className="hidden md:block">
                <button 
                  onClick={handleJoinUsClick}
                  className="cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-purple-500/40 hover:scale-105 border border-purple-500/30 backdrop-blur-sm"
                >
                  Join Us
                </button>
              </div>
            )}

            {/* Desktop - Profile (when user exists) */}
            {user && (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center cursor-pointer space-x-2 focus:outline-none"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-10 h-10 rounded-full border-2 border-purple-500/30 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold border-2 border-purple-500/30">
                      {getInitials(user.displayName)}
                    </div>
                  )}
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 origin-top-right bg-gradient-to-br from-gray-900/95 via-slate-900/90 to-gray-900/95 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.displayName || 'User'}
                            className="w-10 h-10 rounded-full border-2 border-purple-500/30 object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold border-2 border-purple-500/30">
                            {getInitials(user.displayName)}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-white">{user.displayName || 'User'}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      {profileLinks.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.isDivider ? (
                            <div className="border-t border-white/10 my-1"></div>
                          ) : item.isButton ? (
                            <button
                              onClick={() => handleProfileClick(item)}
                              className="w-full mx-2 my-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2"
                            >
                              {item.icon}
                              <span>{item.name}</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleProfileClick(item)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center space-x-2"
                            >
                              {item.icon}
                              <span>{item.name}</span>
                            </button>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile - Profile Button (Right side) */}
            {user && (
              <div className="md:hidden">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300 border border-white/10 backdrop-blur-sm"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-8 h-8 rounded-full border-2 border-purple-500/30 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold border-2 border-purple-500/30">
                      {getInitials(user.displayName)}
                    </div>
                  )}
                </button>
              </div>
            )}

            {/* Mobile - Join Us Button (when no user) */}
            {!user && (
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                  aria-expanded={isMenuOpen}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300 border border-white/10 backdrop-blur-sm"
                >
                  {isMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu - For logged in users (navigation links) */}
      {user && (
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
          </div>
        </div>
      )}

      {/* Mobile Menu - For non-logged in users */}
      {!user && (
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
                onClick={handleJoinUsClick}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-xl hover:scale-105 border border-purple-500/30"
              >
                Join Us
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Profile Dropdown */}
      {user && isProfileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsProfileOpen(false)}>
          <div className="absolute right-4 top-16 w-64 bg-gradient-to-br from-gray-900/95 via-slate-900/90 to-gray-900/95 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-white/10">
              <div className="flex items-center space-x-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-10 h-10 rounded-full border-2 border-purple-500/30 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold border-2 border-purple-500/30">
                    {getInitials(user.displayName)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-white">{user.displayName || 'User'}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="py-1">
              {profileLinks.map((item, index) => (
                <React.Fragment key={index}>
                  {item.isDivider ? (
                    <div className="border-t border-white/10 my-1"></div>
                  ) : item.isButton ? (
                    <button
                      onClick={() => {
                        handleProfileClick(item);
                        setIsProfileOpen(false);
                      }}
                      className="w-full mx-2 my-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleProfileClick(item);
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center space-x-2"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
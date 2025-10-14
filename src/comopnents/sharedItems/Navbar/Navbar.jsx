import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Star,
  LayoutDashboard,
  Ticket,
  LogIn, 
} from "lucide-react";
import { useNavigate, useLocation, NavLink } from "react-router";
import { useAuth } from "../../../hooks/AuthContexts/AuthContexts";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import logo from "../../../assets/logo.jpg";
import axiosInstance from "../../../hooks/AxiosInstance/AxiosInstance";
import SupportTicketModal from "../../SupportTicketModal/SupportTicketModal";
import FancyButton from "../FancyButtons/FancyButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading, setLoading, logOut } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user profile data when user is available
  useEffect(() => {
    if (!user?.uid) {
      setProfile(null); // Clear profile if user logs out
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/users/${user.uid}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Could not fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.uid, setLoading]);

  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLogOut = async () => {
    try {
      setIsProfileOpen(false);
      setIsMenuOpen(false);
      await logOut();
      setProfile(null);
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  // Support Ticket Handler
  const handleSupportTicket = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setIsTicketModalOpen(true);
  };

  // Login Handler
  const handleLogin = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    navigate("/auth/login");
  };

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blogs", href: "/blogs" },
  ];

  const regularProfileLinks = [
    { name: "Profile", icon: <User size={18} />, href: "/profile" },
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      href: "/dashboard/user",
    },
    { isDivider: true },
    { name: "Settings", icon: <Settings size={18} />, href: "/settings" },
    { name: "Support", icon: <HelpCircle size={18} />, href: "/support" },
    { isDivider: true },
    {
      name: "Try Premium",
      icon: <Star size={18} />,
      href: "/premium",
      isButton: true,
    },
    { name: "Logout", icon: <LogOut size={18} />, action: handleLogOut },
  ];

  const adminProfileLinks = [
    { name: "Admin Profile", icon: <User size={18} />, href: "/profile" },
    {
      name: "Admin Dashboard",
      icon: <LayoutDashboard size={18} />,
      href: "/dashboard/admin",
    },
    { isDivider: true },
    { name: "Logout", icon: <LogOut size={18} />, action: handleLogOut },
  ];

  const profileLinks =
    user?.email === "admin@projuktisheba.com"
      ? adminProfileLinks
      : regularProfileLinks;

  const handleProfileItemClick = (item) => {
    setIsProfileOpen(false);
    if (item.action) {
      item.action();
    } else if (item.href) {
      navigate(item.href);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const profilePhotoUrl = profile?.photoURL
    ? profile.photoURL.startsWith("http")
      ? profile.photoURL
      : `https://projukti-sheba-server.onrender.com${profile.photoURL}`
    : null;

  if (loading) {
    return <Loader />;
  }

  // Common component for profile picture/initials
  const Avatar = ({ size = "w-10 h-10" }) => (
    <>
      {profilePhotoUrl ? (
        <img
          src={profilePhotoUrl}
          alt={profile?.fullName || "User"}
          className={`${size} rounded-full object-cover border-2 border-white/50`}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div
        className={`${size} rounded-full bg-cyan-700 flex items-center justify-center text-white font-bold border-2 border-white/50 ${
          profilePhotoUrl ? 'hidden' : 'flex'
        }`}
      >
        {getInitials(profile?.fullName || user?.displayName)}
      </div>
    </>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-2xl"
            : "bg-white shadow-2xl"
        }`}
      >
        <div className="lg:max-w-9/12 mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center cursor-pointer flex-shrink-0"
            >
              <img
                src={logo}
                alt="Projukti Sheba Logo"
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `relative text-lg font-semibold text-black/70 transition-colors duration-300 hover:text-[#f15a2c]
                     after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-white after:transition-transform after:duration-300 after:origin-center
                     ${
                       isActive
                         ? "text-red-500 after:scale-x-100"
                         : "after:scale-x-0 hover:after:scale-x-100"
                     }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Right Side: Profile/Login & Mobile Menu Button */}
            <div className="flex items-center">
              {user ? (
                // Desktop Profile Dropdown
                <div className="hidden md:block relative ml-4 profile-dropdown">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyan-800 focus:ring-white rounded-full transition-transform duration-200 hover:scale-105"
                  >
                    <Avatar />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 origin-top-right bg-white rounded-xl shadow-2xl ring-1 ring-red-500 ring-opacity-5 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-red-50 to-blue-50">
                        <div className="flex items-center space-x-3">
                          <Avatar />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {profile?.fullName || user?.displayName || "User"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-1">
                        {profileLinks.map((item, index) => (
                          <React.Fragment key={index}>
                            {item.isDivider ? (
                              <div className="border-t border-gray-200 my-1"></div>
                            ) : (
                              <button
                                onClick={() => handleProfileItemClick(item)}
                                className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 transition-colors duration-200 ${
                                  item.name === "Logout"
                                    ? "text-red-600 hover:bg-red-50"
                                    : "text-gray-700 hover:bg-gray-100"
                                } ${
                                  item.isButton
                                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 font-semibold m-2 w-auto rounded-lg shadow-sm"
                                    : ""
                                }`}
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
              ) : (
                // Desktop "Support Ticket" and "Login" Buttons - Only shows when user is NOT logged in
                <div className="hidden md:flex items-center space-x-3 ml-4">
                  <FancyButton
                    onClick={handleSupportTicket}
                    className="flex items-center space-x-2"
                  >
                    <span>Support</span>
                  </FancyButton>
                  
                  <FancyButton
                    onClick={handleLogin}
                    className="flex items-center space-x-2 "
                  >
                    <span>Login</span>
                  </FancyButton>
                </div>
              )}

              {/* Mobile Menu Button */}
              <div className="md:hidden ml-2">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                  className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0  backdrop-blur-sm"
          aria-hidden="true"
        ></div>

        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-red-50 to-blue-50">
              <span className="font-bold text-lg text-cyan-800">Menu</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Profile Section (if logged in) */}
            {user && (
              <div className="p-4 border-b bg-gradient-to-r from-red-50 to-blue-50">
                <div className="flex items-center space-x-3">
                  <Avatar size="w-12 h-12" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {profile?.fullName || user?.displayName || "User"}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="flex-grow p-4 space-y-2 overflow-y-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={`mobile-${link.name}`}
                  to={link.href}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Support Ticket & Login Buttons for Mobile (for non-logged in users) */}
              {/* {!user && (
                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleSupportTicket}
                    className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm"
                  >
                    <Ticket size={18} />
                    <span>Support Ticket</span>
                  </button>
                  
                  <button
                    onClick={handleLogin}
                    className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-sm"
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </button>
                </div>
              )} */}

              {/* Divider */}
              {user && <div className="pt-2 border-b border-gray-200"></div>}

              {/* Profile Links (if logged in) */}
              {user &&
                profileLinks.map((item, index) => (
                  <React.Fragment key={`mobile-profile-${index}`}>
                    {item.isDivider ? (
                      <div className="border-t border-gray-200 my-2"></div>
                    ) : (
                      <button
                        onClick={() => handleProfileItemClick(item)}
                        className={`w-full text-left px-4 py-3 text-base flex items-center space-x-4 rounded-lg transition-all duration-200 ${
                          item.name === "Logout"
                            ? "text-red-600 hover:bg-red-50"
                            : item.isButton
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 font-semibold shadow-sm"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </button>
                    )}
                  </React.Fragment>
                ))}
            </div>

            {/* Support Ticket & Login Buttons for Mobile Footer (if not logged in) - Alternative placement */}
            {!user && (
              <div className="p-4 border-t bg-gray-50 space-y-2">
                <FancyButton
                  onClick={handleSupportTicket}
                  className="w-full flex items-center justify-center space-x-2 "
                >
                  <span>Support Ticket</span>
                </FancyButton>
                
                <FancyButton
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <span>Login</span>
                </FancyButton>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Support Ticket Modal */}
      <SupportTicketModal 
        isOpen={isTicketModalOpen} 
        onClose={() => setIsTicketModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
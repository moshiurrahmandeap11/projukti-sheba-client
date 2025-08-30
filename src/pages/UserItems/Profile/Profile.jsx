import React, { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/AuthContexts/AuthContexts";
import Loader from "../../../comopnents/sharedItems/Loader/Loader";
import {
  User,
  Mail,
  Calendar,
  Clock,
  Settings,
  HelpCircle,
  LogOut,
  Star,
  CreditCard,
  Shield,
  Database,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, loading, logOut } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.uid) return;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://projukti-sheba-server.onrender.com/users/${user.uid}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        toast.error(error.response?.data?.error || "Error fetching profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.uid]);

  console.log("Profile data:", profile?.role);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        alert("Failed to log out. Please try again.");
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return "N/A";
    }
  };

  const getLastLoginFromFirebase = () => {
    if (user?.metadata?.lastSignInTime) {
      const date = new Date(user.metadata.lastSignInTime);
      const dateStr = date.toLocaleDateString();
      const timeStr = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${dateStr} at ${timeStr}`;
    }
    return "N/A";
  };

  const getJoinDateFromFirebase = () => {
    if (user?.metadata?.creationTime) {
      const date = new Date(user.metadata.creationTime);
      const dateStr = date.toLocaleDateString();
      const timeStr = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${dateStr} at ${timeStr}`;
    }
    return "N/A";
  };

  if (loading || !user || isLoading) {
    return <Loader />;
  }

  const upgradeToPremium = () => {
    console.log("Upgrading to premium...");
    // Premium upgrade logic would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Glassy background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
            {profile?.photoURL ? (
<img
  src={
    profile?.photoURL?.startsWith("http")
      ? profile.photoURL
      : `https://projukti-sheba-server.onrender.com${profile?.photoURL || ""}`
  }
  alt={profile?.fullName || user?.displayName || "User"}
  className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/30"
  onError={(e) => {
    console.error("Error loading image:", e.currentTarget.src);
    e.currentTarget.src = "/default-avatar.png";
  }}
/>


            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white text-5xl font-bold border-4 border-purple-500/30">
                {(profile?.fullName || user.displayName || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {profile?.fullName || user.displayName || "User"}
                </h1>
                <p className="text-gray-400 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </p>
              </div>

              {profile?.premium ? (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-100 border border-yellow-500/30">
                  <Star className="h-4 w-4 mr-2" />
                  Premium Member
                </span>
              ) : (
                <button
                  onClick={upgradeToPremium}
                  className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Upgrade to Premium
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Joined</p>
                <p className="text-white font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                  {formatDate(profile?.createdAt) || getJoinDateFromFirebase()}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Login Activity</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Account Created
                    </p>
                    <p className="text-white font-medium flex items-center text-sm">
                      <Calendar className="h-3 w-3 mr-2 text-blue-400" />
                      {getJoinDateFromFirebase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Last Login</p>
                    <p className="text-white font-medium flex items-center text-sm">
                      <Clock className="h-3 w-3 mr-2 text-green-400" />
                      {getLastLoginFromFirebase()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Storage Used</p>
                <p className="text-white font-medium flex items-center">
                  <Database className="h-4 w-4 mr-2 text-pink-400" />
                  {profile?.storageUsed || "0 MB"}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Projects</p>
                <p className="text-white font-medium">
                  {profile?.projects || 0}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Role</p>
                <p className="text-white font-medium">
                  {profile?.role || null}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Features Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text">
            {profile?.premium
              ? "Your Premium Benefits"
              : "Unlock Premium Features"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Advanced Analytics
              </h3>
              <p className="text-gray-400 mb-4">
                {profile?.premium
                  ? "Access to detailed usage statistics and performance metrics"
                  : "Get detailed insights into your usage and performance"}
              </p>
              {!profile?.premium && (
                <button
                  onClick={upgradeToPremium}
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center"
                >
                  Upgrade to unlock
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              )}
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:border-blue-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Increased Storage
              </h3>
              <p className="text-gray-400 mb-4">
                {profile?.premium
                  ? "You have 50GB of storage available"
                  : "Upgrade from 5GB to 50GB of storage space"}
              </p>
              {!profile?.premium && (
                <button
                  onClick={upgradeToPremium}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
                >
                  Upgrade to unlock
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              )}
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:border-pink-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Priority Support
              </h3>
              <p className="text-gray-400 mb-4">
                {profile?.premium
                  ? "24/7 dedicated support with faster response times"
                  : "Get priority access to our support team"}
              </p>
              {!profile?.premium && (
                <button
                  onClick={upgradeToPremium}
                  className="text-pink-400 hover:text-pink-300 text-sm font-medium flex items-center"
                >
                  Upgrade to unlock
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">
            Account Settings
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => navigate(`/edit/${user.uid}`)}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
            >
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-3 text-gray-400" />
                <span className="text-white">Edit Profile</span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-3 text-gray-400" />
                <span className="text-white">Billing & Payments</span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-3 text-gray-400" />
                <span className="text-white">Help & Support</span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </button>

            <button
              onClick={handleLogOut}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all duration-300"
            >
              <div className="flex items-center">
                <LogOut className="h-5 w-5 mr-3 text-red-400" />
                <span className="text-red-400">Log Out</span>
              </div>
              <ArrowRight className="h-5 w-5 text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
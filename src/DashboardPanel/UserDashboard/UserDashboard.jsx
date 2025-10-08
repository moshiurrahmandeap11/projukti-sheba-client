import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Code,
  Globe,
  Video,
  Megaphone,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  User,
  CreditCard,
  FileText,
  Star,
  Activity,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Users,
  Zap,
  Eye,
  Download,
  Filter,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  PlayCircle,
  Smartphone,
  Monitor,
  Target,
  Trophy,
} from "lucide-react";
import { useAuth } from "../../hooks/AuthContexts/AuthContexts";
import Loader from "../../comopnents/sharedItems/Loader/Loader";
import axios from "axios";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const [activeService, setActiveService] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user, loading, setLoading } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://projukti-sheba-server.onrender.com/users/${user.uid}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.uid]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      id: "software",
      name: "Software Development",
      icon: <Code className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      projects: 12,
      completed: 8,
      progress: 67,
      revenue: 45000,
      trend: "+15%",
    },
    {
      id: "website",
      name: "Website Development",
      icon: <Globe className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
      projects: 18,
      completed: 15,
      progress: 83,
      revenue: 32000,
      trend: "+22%",
    },
    {
      id: "video",
      name: "Video Production",
      icon: <Video className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      projects: 9,
      completed: 7,
      progress: 78,
      revenue: 28000,
      trend: "+8%",
    },
    {
      id: "ads",
      name: "Social Ads Campaign",
      icon: <Megaphone className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
      projects: 25,
      completed: 20,
      progress: 80,
      revenue: 55000,
      trend: "+35%",
    },
  ];

  const sidebarItems = [
    {
      id: "overview",
      name: "Overview",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: "software",
      name: "Software Dev",
      icon: <Code className="w-5 h-5" />,
    },
    { id: "website", name: "Web Dev", icon: <Globe className="w-5 h-5" /> },
    {
      id: "video",
      name: "Video Production",
      icon: <Video className="w-5 h-5" />,
    },
    { id: "ads", name: "Social Ads", icon: <Megaphone className="w-5 h-5" /> },
    {
      id: "analytics",
      name: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: "projects",
      name: "Projects",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "billing",
      name: "Billing",
      icon: <CreditCard className="w-5 h-5" />,
    },
    { id: "profile", name: "Profile", icon: <User className="w-5 h-5" /> },
    {
      id: "settings",
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: "E-commerce Platform",
      type: "software",
      status: "In Progress",
      progress: 75,
      deadline: "2024-09-15",
      client: "TechCorp Inc.",
      priority: "High",
    },
    {
      id: 2,
      name: "Brand Website",
      type: "website",
      status: "Completed",
      progress: 100,
      deadline: "2024-08-20",
      client: "StartupXYZ",
      priority: "Medium",
    },
    {
      id: 3,
      name: "Product Demo Video",
      type: "video",
      status: "Review",
      progress: 90,
      deadline: "2024-08-25",
      client: "InnovateLab",
      priority: "High",
    },
    {
      id: 4,
      name: "Social Media Campaign",
      type: "ads",
      status: "Active",
      progress: 60,
      deadline: "2024-09-30",
      client: "Fashion Brand",
      priority: "Medium",
    },
  ];

  const StatCard = ({ title, value, change, icon, trend, color }) => (
    <div className="bg-gradient-to-br from-gray-900/40 via-slate-800/30 to-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color} shadow-lg`}>
          {icon}
        </div>
        <div
          className={`flex items-center text-sm font-medium ${
            trend === "up"
              ? "text-green-400"
              : trend === "down"
              ? "text-red-400"
              : "text-gray-400"
          }`}
        >
          {trend === "up" && <ArrowUpRight className="w-4 h-4 mr-1" />}
          {trend === "down" && <ArrowDownRight className="w-4 h-4 mr-1" />}
          {change}
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-gray-400 text-sm">{title}</p>
      </div>
    </div>
  );

  const ServiceCard = ({ service }) => (
    <div
      className="bg-gradient-to-br from-gray-900/40 via-slate-800/30 to-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group cursor-pointer"
      onClick={() => setActiveService(service.id)}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-r ${service.color} shadow-lg`}
        >
          {service.icon}
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{service.projects}</p>
          <p className="text-gray-400 text-sm">Active Projects</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Progress</span>
          <span className="text-white font-medium">{service.progress}%</span>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${service.color} transition-all duration-500`}
            style={{ width: `${service.progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-400 text-sm">Revenue</span>
          <div className="flex items-center">
            <span className="text-white font-medium">
              ${service.revenue.toLocaleString()}
            </span>
            <span className="text-green-400 text-sm ml-2">{service.trend}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectCard = ({ project }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "Completed":
          return "text-green-400 bg-green-400/10";
        case "In Progress":
          return "text-blue-400 bg-blue-400/10";
        case "Review":
          return "text-yellow-400 bg-yellow-400/10";
        case "Active":
          return "text-purple-400 bg-purple-400/10";
        default:
          return "text-gray-400 bg-gray-400/10";
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case "High":
          return "text-red-400 bg-red-400/10";
        case "Medium":
          return "text-yellow-400 bg-yellow-400/10";
        case "Low":
          return "text-green-400 bg-green-400/10";
        default:
          return "text-gray-400 bg-gray-400/10";
      }
    };

    return (
      <div className="bg-gradient-to-br from-gray-900/40 via-slate-800/30 to-gray-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-medium">{project.name}</h4>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              project.status
            )}`}
          >
            {project.status}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Client:</span>
            <span className="text-white">{project.client}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Deadline:</span>
            <span className="text-white">
              {new Date(project.deadline).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-400 text-xs">Progress</span>
              <span className="text-white text-xs">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
              project.priority
            )}`}
          >
            {project.priority}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900/90 via-slate-900/80 to-gray-900/90 backdrop-blur-2xl border-r border-white/10 transition-all duration-300 z-40 ${
          sidebarCollapsed ? "w-20" : "w-72"
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10  rounded-xl flex items-center justify-center">
              <img
                src={
                  profile?.photoURL
                    ? profile.photoURL.startsWith("http")
                      ? profile.photoURL
                      : `https://projukti-sheba-server.onrender.com${profile.photoURL}`
                    : user?.photoURL || "/default-avatar.png"
                }
                alt={profile?.fullName || user?.displayName || "User"}
                className="w-full h-full rounded-full"
              />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-white">
                  {profile?.fullName}
                </h1>
                <p className="text-gray-400 text-sm">Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveService(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeService === item.id
                  ? "bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              {!sidebarCollapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
        >
          <ChevronRight
            className={`w-5 h-5 text-white transition-transform duration-300 ${
              sidebarCollapsed ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-72"
        }`}
      >
        {/* Header */}
        <header className="bg-gradient-to-r from-gray-900/70 via-slate-900/60 to-gray-900/70 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                {activeService === "overview"
                  ? "Dashboard Overview"
                  : sidebarItems.find((item) => item.id === activeService)
                      ?.name || "Dashboard"}
              </h1>
              <p className="text-gray-400">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                • {currentTime.toLocaleTimeString()}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 backdrop-blur-sm"
                />
              </div>

              <button className="relative p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300">
                <Bell className="w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeService === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Projects"
                  value="64"
                  change="+12%"
                  trend="up"
                  icon={<FileText className="w-6 h-6 text-white" />}
                  color="from-blue-500 to-cyan-500"
                />
                <StatCard
                  title="Active Campaigns"
                  value="28"
                  change="+8%"
                  trend="up"
                  icon={<Activity className="w-6 h-6 text-white" />}
                  color="from-green-500 to-emerald-500"
                />
                <StatCard
                  title="Total Revenue"
                  value="$160K"
                  change="+23%"
                  trend="up"
                  icon={<DollarSign className="w-6 h-6 text-white" />}
                  color="from-purple-500 to-pink-500"
                />
                <StatCard
                  title="Client Satisfaction"
                  value="98%"
                  change="+2%"
                  trend="up"
                  icon={<Star className="w-6 h-6 text-white" />}
                  color="from-orange-500 to-red-500"
                />
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {/* Recent Projects and Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Projects */}
                <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/40 via-slate-800/30 to-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">
                      Recent Projects
                    </h2>
                    <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {recentProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>

                {/* Quick Actions & Notifications */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="bg-gradient-to-br from-gray-900/40 via-slate-800/30 to-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center">
                        <Plus className="w-5 h-5 mr-2" />
                        New Project
                      </button>
                      <button className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Schedule Meeting
                      </button>
                      <button className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center">
                        <Download className="w-5 h-5 mr-2" />
                        Download Report
                      </button>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-gradient-to-br from-gray-900/40 via-slate-800/30 to-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      This Month
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-gray-300">
                            Projects Delivered
                          </span>
                        </div>
                        <span className="text-white font-semibold">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-gray-300">
                            Revenue Generated
                          </span>
                        </div>
                        <span className="text-white font-semibold">$45K</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          <span className="text-gray-300">New Clients</span>
                        </div>
                        <span className="text-white font-semibold">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          <span className="text-gray-300">Team Efficiency</span>
                        </div>
                        <span className="text-white font-semibold">94%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Service-specific content would go here */}
          {activeService !== "overview" && (
            <div className="bg-gradient-to-br from-gray-900/40 via-slate-800/30 to-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
              <div className="mb-4">
                {sidebarItems.find((item) => item.id === activeService)
                  ?.icon && (
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {React.cloneElement(
                      sidebarItems.find((item) => item.id === activeService)
                        .icon,
                      { className: "w-8 h-8 text-white" }
                    )}
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {sidebarItems.find((item) => item.id === activeService)?.name}
              </h2>
              <p className="text-gray-400 mb-6">
                Detailed{" "}
                {sidebarItems
                  .find((item) => item.id === activeService)
                  ?.name.toLowerCase()}{" "}
                management and analytics coming soon.
              </p>
              <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300">
                Explore Features
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;

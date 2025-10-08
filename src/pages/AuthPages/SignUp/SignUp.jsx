import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail, User, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../../hooks/AuthContexts/AuthContexts";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { createUser, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Floating particles effect (same as login)
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          y: particle.y > 100 ? -5 : particle.y + particle.speed * 0.1,
          x: particle.x + Math.sin(particle.y * 0.01) * 0.1,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    try {
      // 1️⃣ Create Firebase user
      const userCredential = await createUser(
        formData.email,
        formData.password
      );

      // 2️⃣ Prepare user data for backend
      const userData = {
        firebaseUID: userCredential.user.uid,
        fullName: formData?.name || "",
        email: formData?.email || "",
        premium: false, // default
        role: "user", // default
        createdAt: new Date().toISOString(),
      };

      // 3️⃣ Send to backend
      const response = await axios.post(
        "https://projukti-sheba-server.onrender.com/users",
        userData
      );
      console.log("Backend response");
      setSuccess("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to create account."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-slate-900">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 animate-pulse"></div>

        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`,
              animation: `float ${particle.speed + 3}s ease-in-out infinite`,
            }}
          ></div>
        ))}

        {/* Geometric shapes */}
        <div
          className="absolute top-20 left-20 w-32 h-32 border border-white/5 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-24 h-24 border border-purple-400/10 rounded-lg rotate-45 animate-bounce"
          style={{ animationDuration: "4s" }}
        ></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/5 mb-4">
            <img
              className="w-16 h-16 rounded-full"
              src="https://i.postimg.cc/NF26BT1w/favicon.jpg"
              alt="projukti sheba"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Projukti Sheba
          </h1>
          <p className="text-gray-300 text-lg">Create Your Account</p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur-xl"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold text-white text-center mb-6">
              Get Started
            </h2>

            {/* Error and Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 text-green-300 rounded-lg text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Password (min 8 characters)"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  )}
                </button>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  )}
                </button>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded bg-white/10"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-300">
                    I agree to the{" "}
                    <a href="#" className="text-blue-400 hover:text-blue-300">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-400 hover:text-blue-300">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold py-4 rounded-full text-lg transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 border border-purple-500/30 backdrop-blur-sm overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-400">
                    Already have an account?
                  </span>
                </div>
              </div>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <Link
                to="/auth/login"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Sign in to your account
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Projukti Sheba. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default SignUp;

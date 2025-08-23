import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../hooks/AuthContexts/AuthContexts';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { emailLogin, googleLogin, loading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [particles, setParticles] = useState([]);

    // Generate floating particles
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
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
            setParticles(newParticles);
        };
        generateParticles();

        const interval = setInterval(() => {
            setParticles(prev => prev.map(particle => ({
                ...particle,
                y: particle.y > 100 ? -5 : particle.y + particle.speed * 0.1,
                x: particle.x + Math.sin(particle.y * 0.01) * 0.1
            })));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await emailLogin(formData.email, formData.password);
            // Check for admin credentials
            if (formData.email === 'admin@projuktisheba.com' && formData.password === '10101010') {
                setSuccess('Admin login successful!');
                toast.success('Admin login successful!');
                navigate('/dashboard/login/ceo/admin');
            } else {
                setSuccess('Login successful!');
                toast.success('Login successful!');
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Failed to login. Please try again.');
            toast.error(err.message || 'Failed to login.');
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        setSuccess(null);

        try {
            const userCredential = await googleLogin();
            const user = userCredential.user;

            // Prepare user data for POST request
            const userData = {
                fullName: user.displayName || 'User',
                email: user.email,
                firebaseUID: user.uid,
                premium: false, // default
                role: 'user',   // default
                createdAt: new Date().toISOString()
            };

            // Send POST request to create user in MongoDB
            try {
                await axios.post('https://projukti-sheba-server.onrender.com/users', userData);
            } catch (postError) {
                console.error("Error saving user to MongoDB:", postError.response?.data || postError.message);
            }

            setSuccess('Google login successful!');
            toast.success('Google login successful!');
            navigate("/");
        } catch (err) {
            setError(err.message || 'Failed to login with Google. Please try again.');
            toast.error(err.message || 'Failed to login with Google.');
        }
    };

    const handleFacebookLogin = async () => {
        alert('Facebook login is not implemented yet.');
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-slate-900">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 animate-pulse"></div>

                {/* Floating particles */}
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            opacity: particle.opacity,
                            transform: `scale(${particle.size})`,
                            animation: `float ${particle.speed + 3}s ease-in-out infinite`
                        }}
                    ></div>
                ))}

                {/* Geometric shapes */}
                <div className="absolute top-20 left-20 w-32 h-32 border border-white/5 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-400/10 rounded-lg rotate-45 animate-bounce" style={{ animationDuration: '4s' }}></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full animate-pulse"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md mx-4">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/5 mb-4">
                        <img className='w-16 h-16 rounded-full' src="https://i.postimg.cc/NF26BT1w/favicon.jpg" alt="projukti sheba" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                        Projukti Sheba
                    </h1>
                    <p className="text-gray-300 text-lg">IT Solutions & Services</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8 relative">
                    {/* Card glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur-xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl font-semibold text-white text-center mb-6">Welcome Back</h2>

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

                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                    placeholder="Password"
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

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white/10"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 text-sm text-gray-300">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative cursor-pointer w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold py-4 rounded-full text-lg transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 border border-purple-500/30 backdrop-blur-sm overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
                            >
                                {/* Water fill animation */}
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>

                                {/* Button glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>

                                {/* Button content */}
                                <span className="relative z-10 flex items-center justify-center space-x-2">
                                    {loading ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
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
                                    <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full inline-flex justify-center cursor-pointer py-3 px-4 border border-white/20 rounded-lg shadow-sm bg-white/5 backdrop-blur-sm text-sm font-medium text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>

                            <button
                                onClick={handleFacebookLogin}
                                disabled={loading}
                                className="w-full inline-flex cursor-pointer justify-center py-3 px-4 border border-white/20 rounded-lg shadow-sm bg-white/5 backdrop-blur-sm text-sm font-medium text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                Don't have an account?{' '}
                                <Link to={"/auth/signup"} className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        © 2025 Projukti Sheba. All rights reserved.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </div>
    );
};

export default Login;
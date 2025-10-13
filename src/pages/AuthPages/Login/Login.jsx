import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../hooks/AuthContexts/AuthContexts';
import toast from 'react-hot-toast';
import logo from "../../../assets/logo.jpg"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { emailLogin, loading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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
                navigate('/');
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

    const handleForgetPassword = () => {

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            {/* Main Content */}
            <div className="w-full max-w-md mx-4">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-block p-4">
                        <img 
                            className='w-full h-16' 
                            src={logo} 
                            alt="projukti sheba" 
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Projukti Sheba
                    </h1>
                    <p className="text-gray-600">IT Solutions & Services</p>
                </div>

                {/* Login Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">

                    {/* Error and Success Messages */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
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
                                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
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
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                )}
                            </button>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            {/* <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div> */}
                            <a onClick={handleForgetPassword} href="#" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    {/* <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a 
                                href="#" 
                                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/auth/signup');
                                }}
                            >
                                Sign up
                            </a>
                        </p>
                    </div> */}
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        © 2025 Projukti Sheba. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
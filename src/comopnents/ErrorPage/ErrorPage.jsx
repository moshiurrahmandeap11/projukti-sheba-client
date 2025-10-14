import React from 'react';
import { useRouteError, Link, useNavigate } from 'react-router';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    
    console.error("Route Error:", error);

    let errorMessage = "An unexpected error has occurred.";
    let errorStatus = "Error";
    let iconColor = "text-red-500";

    if (error) {
        if (error.status === 404) {
            errorMessage = "The page you're looking for doesn't exist.";
            errorStatus = "404 - Page Not Found";
            iconColor = "text-blue-500";
        } else if (error.status === 500) {
            errorMessage = "Internal server error. Please try again later.";
            errorStatus = "500 - Server Error";
            iconColor = "text-red-500";
        } else if (error.status === 403) {
            errorMessage = "You don't have permission to access this page.";
            errorStatus = "403 - Forbidden";
            iconColor = "text-yellow-500";
        } else if (error.status === 401) {
            errorMessage = "Please log in to access this page.";
            errorStatus = "401 - Unauthorized";
            iconColor = "text-orange-500";
        } else if (error.data) {
            errorMessage = error.data.message || error.data;
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Error Icon */}
                <div className={`flex justify-center mb-6 ${iconColor}`}>
                    <AlertTriangle className="h-20 w-20" />
                </div>
                
                {/* Error Status */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {errorStatus}
                </h1>
                
                {/* Error Message */}
                <p className="text-gray-600 mb-8 text-lg">
                    {errorMessage}
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Go Back
                    </button>
                    
                    <Link 
                        to="/" 
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                    >
                        <Home className="h-5 w-5" />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;

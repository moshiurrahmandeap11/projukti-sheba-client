import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="relative flex flex-col items-center justify-center">
                {/* Main icon with gradient */}
                <div className="relative flex items-center justify-center">
                    {/* Outer spinning ring */}
                    <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-transparent"></div>
                    
                    {/* Inner icon container */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-md">
                        {/* 'P' icon - using Lucide's Loader2 as a stylish alternative */}
                        <h1 className='text-2xl font-bold text-white'>P</h1>
                    </div>
                </div>
                
                {/* Optional loading text */}
                <p className="mt-4 text-sm font-medium text-white/80 animate-pulse">
                    Projukti Sheba
                </p>
            </div>
        </div>
    );
};

export default Loader;
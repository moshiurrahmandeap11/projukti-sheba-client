import React from 'react';
import { useNavigate } from 'react-router';

const Logo = () => {
    const navigate = useNavigate();

    return (
        <div 
            className="flex items-center bg-black space-x-3 cursor-pointer group"
        >
            {/* Glassy effect container */}
            <div className="p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 transition-all duration-300 shadow-lg">
                <img 
                onClick={() => navigate('/')}
                    src="https://i.postimg.cc/NF26BT1w/favicon.jpg" 
                    alt="Projukti Sheba" 
                    className="w-10 h-10 rounded-full md:w-12 md:h-12" 
                />
            </div>
            
            {/* Text with gradient and hover effect */}
            <h1 onClick={() => navigate('/')} className="text-xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent md:text-2xl group-hover:from-blue-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-300">
                Projukti Sheba
            </h1>
        </div>
    );
};

export default Logo;
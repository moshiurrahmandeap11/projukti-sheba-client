import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../../comopnents/sharedItems/Logo/Logo';


const AuthLayout = () => {
    return (
        <div className='bg-black'>
            <nav className='sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg'>
                <Logo />
            </nav>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
import React from 'react';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
        <div className='min-h-screen bg-[#f3f4f8] text-black'>
            <Outlet></Outlet>
        </div>
    );
};

export default DashboardLayout;
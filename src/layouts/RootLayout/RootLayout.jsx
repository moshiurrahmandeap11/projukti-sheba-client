import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../comopnents/sharedItems/Navbar/Navbar';
import Footer from '../../comopnents/sharedItems/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='bg-black'>
            <nav className='sticky top-0 left-0 right-0 z-50'>
                <Navbar></Navbar>
            </nav>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default RootLayout;
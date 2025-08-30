import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../comopnents/sharedItems/Navbar/Navbar';
import Footer from '../../comopnents/sharedItems/Footer/Footer';
import { lazy, Suspense } from 'react';
const Chat = lazy(() => import('./Chat/Chat'));


const RootLayout = () => {
    return (
        <div className='bg-black/90'>
            <nav className='sticky top-0 left-0 right-0 z-50 bg-custom-gradient'>
                <Navbar></Navbar>
            </nav>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>

            {/* live chat */}
            <Suspense fallback={null}>
  <Chat />
</Suspense>
        </div>
    );
};

export default RootLayout;
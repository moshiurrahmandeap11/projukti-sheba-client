import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import route from './routes/Router/Router';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router';

// Google Analytics ইনিশিয়ালাইজ করুন
ReactGA.initialize('G-301SY81JB3');

// পেজ ভিউ ট্র্যাক করার জন্য কম্পোনেন্ট
const TrackPageViews = () => {
  const location = useLocation();

  React.useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return null;
};

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <RouterProvider router={route}>
        <TrackPageViews />
      </RouterProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
);
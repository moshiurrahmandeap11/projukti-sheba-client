import React, {  useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/AuthContexts/AuthContexts'; 
import Swal from 'sweetalert2';
import AdminDashboard from '../../DashboardPanel/AdminDashboard/AdminDashboard';

const AdminProtectedRoute = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email !== 'admin@projuktisheba.com')
    {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You must be an admin to access this page.',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      }).then(() => {
        navigate('/');
      });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // শুধুমাত্র admin email থাকলেই ঢুকতে পারবে
  return (user?.email === 'admin@projuktisheba.com') 
    ? <AdminDashboard></AdminDashboard>
    : <Navigate to="/" replace />;
};

export default AdminProtectedRoute;

import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../hooks/AuthContexts/AuthContexts';
import Loader from '../sharedItems/Loader/Loader';

const ProtectedRoute = () => {
  const {user, loading} = useAuth();

  if(loading){
    return <Loader></Loader>
  }



  // Redirect to login if not authenticated
  return user ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
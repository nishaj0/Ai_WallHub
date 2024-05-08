import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RequireAuth() {
   const userId = useSelector((state) => state.user.userId);
   const location = useLocation();

   return userId ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} replace />;
}

export default RequireAuth;

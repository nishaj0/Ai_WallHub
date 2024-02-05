import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../../hooks/useRefreshToken';

const PersistLogin = () => {
   const [isLoading, setIsLoading] = useState(true);

   const refresh = useRefreshToken();
   const user = useSelector((state) => state.user);
   const persist = useSelector((state) => state.persist);
   useEffect(() => {
      let isMounted = true;

      const verifyRefreshToken = async () => {
         try {
            await refresh();
         } catch (err) {
            console.error(err);
         } finally {
            isMounted && setIsLoading(false);
         }
      };

      !user?.token && persist ? verifyRefreshToken() : setIsLoading(false);
   }, []);

   return <>{!persist ? <Outlet /> : isLoading ? <h1>Loading...</h1> : <Outlet />}</>;
};

export default PersistLogin;

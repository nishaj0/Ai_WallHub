import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {
   const [isLoading, setIsLoading] = useState(true);
   const refresh = useRefreshToken();
   const { setAuth, persist } = useAuth();

   useEffect(() => {
      let isMounted = true;

      const verifyRefreshToken = async () => {
         try {
            await refresh();
         } catch (err) {
            console.log(err);
         } finally {
            isMounted && setIsLoading(false);
         }
      };

      !auth?.accessToken && persist
         ? verifyRefreshToken()
         : setIsLoading(false);
   }, []);

   useEffect(() => {
      console.log(`isLoading: ${isLoading}`);
      console.log(`aToken: ${JSON.stringify(auth?.accessToken)}`);
   });

   return (
      <>
         {!persist ? <Outlet /> : isLoading ? <h1>Loading...</h1> : <Outlet />}
      </>
   );
};

export default PersistLogin;
import React from "react";
import {
   Route,
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements,
} from "react-router-dom";
import {
   About,
   Home,
   Catagories,
   Contact,
   Search,
   Signup,
   Login,
   LoginOtp,
   ProfileLayout,
   ProfilePosts,
} from "./pages";
import { action as signupAction } from "./pages/Auth/Signup/Signup.jsx";
import { action as loginAction } from "./pages/Auth/Login/Login.jsx";
import { loader as profileLayoutLoader } from "./pages/Profile/ProfileLayout/ProfileLayout";

import { Layout, PersistLogin } from "./containers";
import useAuth from "./hooks/useAuth";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import useRefreshToken from "./hooks/useRefreshToken";

import "./App.css";

function App() {
   const { auth, setAuth, persist } = useAuth();
   const axiosPrivate = useAxiosPrivate();
   const refresh = useRefreshToken();
   const router = createBrowserRouter(
      createRoutesFromElements(
         <>
            <Route element={<PersistLogin />}>
               <Route path="*" element={<h2>page not found</h2>} />
               <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="catagories" element={<Catagories />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="about" element={<About />} />
                  <Route path="search" element={<Search />} />

                  {/* protected route */}
                  <Route
                     path="profile"
                     loader={profileLayoutLoader(
                        auth,
                        setAuth,
                        persist,
                        axiosPrivate,
                        refresh
                     )}
                     element={<ProfileLayout />}
                  >
                     <Route index element={<ProfilePosts />} />
                  </Route>
               </Route>
            </Route>
            <Route path="signup" action={signupAction} element={<Signup />} />
            <Route path="login" action={loginAction} element={<Login />} />
            <Route path="login-otp" element={<LoginOtp />} />
         </>
      )
   );

   return <RouterProvider router={router} />;
}

export default App;

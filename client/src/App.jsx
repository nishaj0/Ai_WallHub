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

import { Layout, PersistLogin } from "./containers";

import "./App.css";

function App() {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <>
            <Route path="*" element={<h2>page not found</h2>} />
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
               <Route path="catagories" element={<Catagories />} />
               <Route path="contact" element={<Contact />} />
               <Route path="about" element={<About />} />
               <Route path="search" element={<Search />} />

               {/* protected route */}
               <Route element={<PersistLogin />}>
                  <Route path="profile" element={<ProfileLayout />}>
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

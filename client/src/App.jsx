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
} from "./pages";
import { Layout } from "./containers";

import "./App.css";

function App() {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <>
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
               <Route path="catagories" element={<Catagories />} />
               <Route path="contact" element={<Contact />} />
               <Route path="about" element={<About />} />
               <Route path="search" element={<Search />} />
            </Route>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="login-otp" element={<LoginOtp />} />
         </>
      )
   );

   return <RouterProvider router={router} />;
}

export default App;

import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import {
   About,
   Home,
   Catagories,
   Contact,
   Search,
   Signup,
   Login,
   LoginOtp,
   Profile,
   ProfilePosts,
   UploadPost,
   Wallpaper,
   PageNotFound,
} from './pages';

import { Layout, PersistLogin } from './containers';

import './App.css';

function App() {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <>
            <Route element={<PersistLogin />}>
               <Route path="upload-post" element={<UploadPost />} />
               <Route path="/" element={<Layout />}>
                  <Route path="*" element={<PageNotFound />} />
                  <Route index element={<Home />} />
                  <Route path="catagories" element={<Catagories />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="about" element={<About />} />
                  <Route path="search" element={<Search />} />
                  <Route path="image/:id" element={<Wallpaper />} />

                  {/* protected route */}
                  <Route path="profile" element={<Profile />}>
                     <Route index element={<ProfilePosts />} />
                  </Route>
               </Route>
            </Route>
            {/* page without header and footer */}
            {/* Auth pages */}
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="login-otp" element={<LoginOtp />} />
         </>,
      ),
   );

   return <RouterProvider router={router} />;
}

export default App;

import React from "react";
import { BrowserRouter, Route, Routes,Outlet } from "react-router-dom";
import {
   About,
   Home,
   Catagories,
   Contact,
   Search,
   Signup,
   Login,
} from "./pages";
import { Layout } from "./containers";

import "./App.css";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
               <Route path="catagories" element={<Catagories />} />
               <Route path="contact" element={<Contact />} />
               <Route path="about" element={<About />} />
               <Route path="search" element={<Search />} />
            </Route>
               <Route path="signup" element={<Signup />} />
               <Route path="login" element={<Login />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;

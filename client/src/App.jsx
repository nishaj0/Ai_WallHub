import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About, Home, Catagories,Contact } from "./pages";
import { Layout } from "./containers";

import "./App.css";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
               <Route path="catagories" element={<Catagories/>} />
               <Route path="contact" element={<Contact/>} />
               <Route path="about" element={<About/>} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About, Home } from "./pages";
import { Layout } from "./components";

import "./App.css";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
               <Route path="about" element={<About/>} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;

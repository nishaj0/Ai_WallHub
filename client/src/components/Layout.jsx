import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function Layout() {
   return (
      <div className="wallHub">
         <Header />
         <div className="wallHub__main">
            <Outlet />
         </div>
         <Footer />
      </div>
   );
}

export default Layout;

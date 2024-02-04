import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

import './layout.css';

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

import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
   return (
      <div className="wallHub__header">
         <Link to="/" className="wallHub__logo">
            <img src="../../assets/main-logo.png" alt="" />
         </Link>

         <nav className="wallHub__nav">
            <NavLink
               to="/home"
               className={({ isActive }) =>
                  isActive ? "wallHub__nav-active" : null
               }
            >
               Home
            </NavLink>
            <NavLink
               to="/catagories"
               className={({ isActive }) =>
                  isActive ? "wallHub__nav-active" : null
               }
            >
               Catagories
            </NavLink>
            <NavLink
               to="/about"
               className={({ isActive }) =>
                  isActive ? "wallHub__nav-active" : null
               }
            >
               About
            </NavLink>
            <NavLink
               to="/contact"
               className={({ isActive }) =>
                  isActive ? "wallHub__nav-active" : null
               }
            >
               Contact
            </NavLink>

            <Link to="/login" className="wallHub__nav-login">
               <button>Login</button>
            </Link>
         </nav>
      </div>
   );
}

export default Header;
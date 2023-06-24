import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import "./header.css";
import logoImg from "../../assets/images/logo/main-logo.svg";

function Header() {
   const [toggleMenu, setToggleMenu] = useState(false);

   const activeLinkClass = "wallHub__nav-active";
   const menuLinkClass = "wallHub__header-menu_links-link";

   return (
      <div className="wallHub__header">
         <div className="wallHub__header-main">
            <Link to="/" className="wallHub__header__logo">
               <img src={logoImg} alt="" />
            </Link>

            <nav className="wallHub__nav">
               <div className="wallHub__nav-links">
                  <NavLink
                     to="/"
                     className={({ isActive }) =>
                        isActive ? activeLinkClass : null
                     }
                  >
                     Home
                  </NavLink>
                  <NavLink
                     to="/catagories"
                     className={({ isActive }) =>
                        isActive ? activeLinkClass : null
                     }
                  >
                     Catagories
                  </NavLink>
                  <NavLink
                     to="/contact"
                     className={({ isActive }) =>
                        isActive ? activeLinkClass : null
                     }
                  >
                     Contact
                  </NavLink>
                  <NavLink
                     to="/about"
                     className={({ isActive }) =>
                        isActive ? activeLinkClass : null
                     }
                  >
                     About
                  </NavLink>
               </div>
               <Link to="/login" className="wallHub__nav-login">
                  <button>Login</button>
               </Link>
               <div className="wallHub__nav-toggler">
                  {toggleMenu ? (
                     <RiCloseLine
                        color="#333333"
                        size={30}
                        onClick={() => setToggleMenu(false)}
                     />
                  ) : (
                     <RiMenuLine
                        color="#333333"
                        size={27}
                        onClick={() => setToggleMenu(true)}
                     />
                  )}
               </div>
            </nav>
         </div>
         <div className="wallHub__header-menu_container">
            {toggleMenu && (
               <div className="wallHub__header-menu_links">
                  <NavLink
                     to="/"
                     className={({ isActive }) =>
                        //? here "wallHub__nav-active" class used to give active routes a different color
                        isActive
                           ? activeLinkClass + " " + menuLinkClass
                           : menuLinkClass
                     }
                  >
                     Home
                  </NavLink>
                  <NavLink
                     to="/catagories"
                     className={({ isActive }) =>
                        isActive
                           ? activeLinkClass + " " + menuLinkClass
                           : menuLinkClass
                     }
                  >
                     Catagories
                  </NavLink>
                  <NavLink
                     to="/contact"
                     className={({ isActive }) =>
                        isActive
                           ? activeLinkClass + " " + menuLinkClass
                           : menuLinkClass
                     }
                  >
                     Contact
                  </NavLink>
                  <NavLink
                     to="/about"
                     className={({ isActive }) =>
                        isActive
                           ? activeLinkClass + " " + menuLinkClass
                           : menuLinkClass
                     }
                  >
                     About
                  </NavLink>
                  <div className="wallHub__header-menu_login">
                     <Link to="/login">
                        <button>Login</button>
                     </Link>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default Header;

import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import "./header.css";
import logoImgDark from "../../assets/images/logo/main-logo_dark.svg";
import logoImgLight from "../../assets/images/logo/main-logo_light.svg";

function Header() {
   const [toggleMenu, setToggleMenu] = useState(false);
   const [isNavAtTop, setIsNavAtTop] = useState(true);

   const activeLinkClass = "wallHub__nav-active";
   const menuLinkClass = "wallHub__header-menu_links-link";
   const transparentNavClass = "wallHub__header-transparent";
   const defaultNavClass = "wallHub__header-default";

   useEffect(() => {
      const handleScroll = () => {
         const scrollTop = window.scrollY;

         if (scrollTop > 60) {
            setIsNavAtTop(false);
         } else {
            setIsNavAtTop(true);
         }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [isNavAtTop]);

   return (
      <div
         className={
            "header__container" +
            " " +
            (isNavAtTop ? transparentNavClass : defaultNavClass)
         }
      >
         <div className="wallHub__header container">
            <div className="wallHub__header-main">
               <Link to="/" className="wallHub__header__logo">
                  <img
                     src={isNavAtTop ? logoImgLight : logoImgDark}
                     alt="Logo Image"
                  />
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
                           color={isNavAtTop ? "#f8f8f8" : "#333"}
                           size={30}
                           onClick={() =>
                              setToggleMenu(false) + setIsNavAtTop(true)
                           }
                        />
                     ) : (
                        <RiMenuLine
                           color={isNavAtTop ? "#f8f8f8" : "#333"}
                           size={27}
                           onClick={() =>
                              setToggleMenu(true) + setIsNavAtTop(false)
                           }
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
                              ? menuLinkClass + " " + activeLinkClass
                              : menuLinkClass
                        }
                     >
                        Home
                     </NavLink>
                     <NavLink
                        to="/catagories"
                        className={({ isActive }) =>
                           isActive
                              ? menuLinkClass + " " + activeLinkClass
                              : menuLinkClass
                        }
                     >
                        Catagories
                     </NavLink>
                     <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                           isActive
                              ? menuLinkClass + " " + activeLinkClass
                              : menuLinkClass
                        }
                     >
                        Contact
                     </NavLink>
                     <NavLink
                        to="/about"
                        className={({ isActive }) =>
                           isActive
                              ? menuLinkClass + " " + activeLinkClass
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
      </div>
   );
}

export default Header;

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
   const [isTransparent, setIsTransparent] = useState(true);

   // ? here "wallHub__nav-active" class used to give active routes a different color
   const activeLinkClass = "wallHub__nav-active";
   const menuLinkClass = "wallHub__header-menu_links-link";
   // ? here "wallHub__header-transparent" class used to give transparent background to the header when it is at the top
   const transparentNavClass = "wallHub__header-transparent";
   const defaultNavClass = "wallHub__header-default";

   useEffect(() => {
      // ? this function used to check if the header is at the top or not
      const handleScroll = () => {
         const scrollTop = window.scrollY;
         if (scrollTop > 60) {
            setIsNavAtTop(false);
            setIsTransparent(false);
         } else {
            setIsNavAtTop(true);
            
            // ? when the header is at the top and the menu is not open then it will be transparent otherwise it will be default
            toggleMenu ? setIsTransparent(false) : setIsTransparent(true);
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
            (isTransparent ? transparentNavClass : defaultNavClass)
         }
      >
         <div className="wallHub__header container">
            <div className="wallHub__header-main">
               <Link to="/" className="wallHub__header__logo">
                  <img
                     src={isTransparent ? logoImgLight : logoImgDark}
                     alt="Logo Image"
                  />
               </Link>

               <nav className="wallHub__nav">
                  <div className="wallHub__nav-links">
                     <NavLink
                        to="/"
                        // ? isActive is a in-built property of NavLink which returns true if the route is active
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
                     <NavLink
                        to="/login"
                        className={({ isActive }) =>
                           isActive ? activeLinkClass : null
                        }
                     >
                        Login
                     </NavLink>
                  </div>
                  <Link to="/signup" className="wallHub__nav-login">
                     <button>Sign up</button>
                  </Link>
                  <div className="wallHub__nav-toggler">
                     {toggleMenu ? (
                        <RiCloseLine
                           color={isTransparent ? "#f8f8f8" : "#333"}
                           size={30}
                           onClick={() => {
                              setToggleMenu(false);
                              // ? if the header is at the top then it will be transparent otherwise it will be default
                              isNavAtTop
                                 ? setIsTransparent(true)
                                 : setIsTransparent(false);
                           }}
                        />
                     ) : (
                        <RiMenuLine
                           color={isTransparent ? "#f8f8f8" : "#333"}
                           size={27}
                           onClick={() => {
                              setToggleMenu(true);
                              setIsTransparent(false);
                           }}
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
                           //? here "activeLinkClass" class used to give active Link a different color
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
                     <NavLink
                        to="/login"
                        className={({ isActive }) =>
                           isActive
                              ? menuLinkClass + " " + activeLinkClass
                              : menuLinkClass
                        }
                     >
                        Login
                     </NavLink>
                     <div className="wallHub__header-menu_login">
                        <Link to="/signup">
                           <button>Sign up</button>
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

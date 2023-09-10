import React from "react";
import "./header.css";
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
   RiAccountCircleFill,
} from "react-icons/ri";

import logoImgDark from "../../assets/images/logo/main-logo_dark.svg";
import logoImgLight from "../../assets/images/logo/main-logo_light.svg";
import miniLogo from "../../assets/images/logo/mini-logo.png";

import HeaderSearchBar from "./HeaderSearchBar/HeaderSearchBar";
import HeaderMenu from "./HeaderMenu/HeaderMenu";

import { isSmallScreen as checkScreenSize } from "../../utils";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

function Header() {
   const [isLogged, setIsLogged] = useState(false);
   const [toggleMenu, setToggleMenu] = useState(false);
   const [isNavAtTop, setIsNavAtTop] = useState(true);
   const [isTransparent, setIsTransparent] = useState(true);
   const [screenSize, setScreenSize] = useState(checkScreenSize());

   const navigate = useNavigate();
   const location = useLocation();
   const currentPath = location.pathname;

   // ? here "wallHub__header-transparent" class used to give transparent background to the header when it is at the top
   const transparentNavClass = "wallHub__header-transparent";
   const defaultNavClass = "wallHub__header-default";

   const { auth } = useAuth();
   const logout = useLogout();

   useEffect(() => {
      if (auth?.accessToken) {
         setIsLogged(true);
      } else {
         setIsLogged(false);
      }
      // console.log([auth?.accessToken]);
      // console.log({ isLogged });
   }, [auth]);

   useEffect(() => {
      // adding event lister for check screen size
      const handleResize = () => {
         if (window.innerWidth <= 550) {
            setScreenSize("small");
         } else if (window.innerWidth <= 768) {
            setScreenSize("medium");
         } else {
            setScreenSize("large");
         }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   // ? turn off toggle menu when route is change
   useEffect(() => {
      setToggleMenu(false);
   }, [location]);

   useEffect(() => {
      // ? this function used to check if the header is at the top or not
      const handleScroll = () => {
         const scrollTop = window.scrollY;
         if (scrollTop > 60) {
            setIsNavAtTop(false);
            setIsTransparent(false);
         } else {
            setIsNavAtTop(true);
            setIsTransparent(true);
         }
      };

      // ? if the current path is "/" then it will add the event listener otherwise it will not
      if (currentPath === "/") {
         window.addEventListener("scroll", handleScroll);
         return () => {
            window.removeEventListener("scroll", handleScroll);
         };
      } else {
         setIsTransparent(false);
      }
   }, [isNavAtTop, location]);

   // ? component for NavLink used in the header
   function NavLinkTag({ to, content }) {
      return <NavLink to={to}>{content}</NavLink>;
   }

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
                     src={
                        screenSize === "small"
                           ? miniLogo
                           : isTransparent
                           ? logoImgLight
                           : logoImgDark
                     }
                     alt="Logo Image"
                  />
               </Link>
               {!isTransparent && <HeaderSearchBar />}
               <nav className="wallHub__nav">
                  {isLogged ? (
                     <>
                        <button
                           onClick={() => setToggleMenu((prev) => !prev)}
                           className="wallHub__nav-icon"
                        >
                           <RiAccountCircleFill
                              color={
                                 toggleMenu
                                    ? "#808080"
                                    : isTransparent
                                    ? "#f8f8f8"
                                    : "#333"
                              }
                              size={30}
                           />
                        </button>
                        {toggleMenu && <HeaderMenu />}
                     </>
                  ) : (
                     <div className="wallHub__nav-button">
                        <div className="wallHub__nav-links">
                           <NavLinkTag to="/login" content="Login" />
                        </div>
                        <Link to="/signup" className="wallHub__nav-signup">
                           <button>Sign up</button>
                        </Link>
                        <Link to="/login" className="wallHub__nav-login">
                           <button>Login</button>
                        </Link>
                     </div>
                  )}
               </nav>
            </div>
         </div>
      </div>
   );
}

export default Header;

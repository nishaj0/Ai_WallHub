import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
   RiSearchLine,
   RiAccountCircleFill,
   RiLogoutBoxLine,
   RiQuestionLine,
} from "react-icons/ri";
import logoImgDark from "../../assets/images/logo/main-logo_dark.svg";
import logoImgLight from "../../assets/images/logo/main-logo_light.svg";
import miniLogo from "../../assets/images/logo/mini-logo.png";
import { isSmallScreen as checkScreenSize } from "../../utils";
import "./header.css";

function Header() {
   const [toggleMenu, setToggleMenu] = useState(false);
   const [isNavAtTop, setIsNavAtTop] = useState(true);
   const [isTransparent, setIsTransparent] = useState(true);
   const [screenSize, setScreenSize] = useState(checkScreenSize());
   const isLogged = false;

   // ? this state is used to store the search data
   const [searchData, setSearchData] = useState({ search: "" });

   const location = useLocation();
   const currentPath = location.pathname;

   // ? here "wallHub__header-transparent" class used to give transparent background to the header when it is at the top
   const transparentNavClass = "wallHub__header-transparent";
   const defaultNavClass = "wallHub__header-default";

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

   // ? this function is used to handle the search data
   const handleSearch = (e) => {
      setSearchData((prevFormData) => {
         return {
            ...prevFormData,
            [e.target.name]: e.target.value,
         };
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   // ? component for NavLink used in the header
   function NavLinkTag({ to, content }) {
      return <NavLink to={to}>{content}</NavLink>;
   }

   // ? component for NavLink used in the header menu
   function MenuLinkTag({ to, content }) {
      return (
         <NavLink to={to} className={"wallHub__header-menu_links-link"}>
            {content}
         </NavLink>
      );
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
               {!isTransparent && (
                  <div className="wallHub__header-search">
                     <form onSubmit={handleSubmit}>
                        <input
                           type="search"
                           name="search"
                           placeholder={
                              screenSize === "small"
                                 ? "Search"
                                 : "Search Wallpaper"
                           }
                           onChange={handleSearch}
                           value={searchData.search}
                        />
                        <Link to={`search?keyword=${searchData.search}`}>
                           <button type="submit">
                              <RiSearchLine
                                 color="#333333"
                                 size={
                                    screenSize === "medium" ||
                                    screenSize === "small"
                                       ? 20
                                       : 27
                                 }
                              />
                           </button>
                        </Link>
                     </form>
                  </div>
               )}
               <nav className="wallHub__nav">
                  {isLogged ? (
                     <>
                        <button
                           onClick={() =>
                              toggleMenu
                                 ? setToggleMenu(false)
                                 : setToggleMenu(true)
                           }
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
                        {toggleMenu && (
                           <div className="wallHub__header-menu">
                              <h4>None</h4>
                              <div className="wallHub__header-menu_links">
                                 <Link to={"/profile"}>Profile</Link>
                              </div>
                              <hr />
                              <div className="wallHub__header-menu_options">
                                 <Link to={"/help"}>
                                    <RiQuestionLine color="000" /> Help
                                 </Link>
                                 <Link to={"/logout"}>
                                    <RiLogoutBoxLine color="000" /> Logout
                                 </Link>
                              </div>
                           </div>
                        )}
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

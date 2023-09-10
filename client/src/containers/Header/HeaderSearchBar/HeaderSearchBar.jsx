import React from "react";
import './headerSearchBar.css'

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { isSmallScreen as checkScreenSize } from "../../../utils";

function HeaderSearchBar() {
   const [screenSize, setScreenSize] = useState(checkScreenSize());
   // ? this state is used to store the search data
   const [searchData, setSearchData] = useState({ search: "" });

   // ? this function is used to handle the search data
   const handleSearch = (e) => {
      setSearchData((prevFormData) => {
         return {
            ...prevFormData,
            [e.target.name]: e.target.value,
         };
      });
   };

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

   const handleSubmit = (e) => {
      e.preventDefault();
   };
   return (
      <div className="wallHub__header-search">
         <form onSubmit={handleSubmit}>
            <input
               type="search"
               name="search"
               placeholder={
                  screenSize === "small" ? "Search" : "Search Wallpaper"
               }
               onChange={handleSearch}
               value={searchData.search}
            />
            <Link to={`search?keyword=${searchData.search}`}>
               <button type="submit">
                  <RiSearchLine
                     color="#333333"
                     size={
                        screenSize === "medium" || screenSize === "small"
                           ? 20
                           : 27
                     }
                  />
               </button>
            </Link>
         </form>
      </div>
   );
}

export default HeaderSearchBar;

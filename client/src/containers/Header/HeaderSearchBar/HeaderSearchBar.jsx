import React from "react";
import './headerSearchBar.css'

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import useScreenWidth from "../../../hooks/useScreenWidth";

function HeaderSearchBar() {
   // ? this state is used to store the search data
   const [searchData, setSearchData] = useState({ search: "" });

   let screenSize = useScreenWidth();

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

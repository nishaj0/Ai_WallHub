import React from "react";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

import "./home.css";

function Home() {
   const [isSmallScreen, setIsSmallScreen] = useState(false);
   const [searchData, setSearchData] = useState({ search: "" });
   console.log(searchData);

   useEffect(() => {
      const handleResize = () => {
         setIsSmallScreen(window.innerWidth < 550);
      };
      handleResize();
   }, []);

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
      console.log("searched");
   };
   return (
      <div className="wallHub__home">
         <div className="wallHub__home-search_div section__padding">
            <div className="wallHub__home-search_container ">
               <h1>Discover the Future of Wallpapers</h1>
               <h2> Embrace the Beauty of AI-Generated Wallpapers</h2>
               <div className="wallHub__home-search_bar">
                  <form onSubmit={handleSubmit}>
                     <input
                        type="text"
                        placeholder={
                           isSmallScreen
                              ? "Search Wallpaper"
                              : "Search AI-Generated Wallpapers"
                        }
                        onChange={handleSearch}
                        name="search"
                        value={searchData.search}
                     />
                     <button type="submit">
                        <RiSearchLine color="#333333" size={27} />
                     </button>
                  </form>
               </div>
            </div>
         </div>
         <div className="wallHub__home-wallpapers section__padding">
            <div className="wallHub__home-wallpapers_filter-container">
               <div className="wallHub__home-wallpapers_filter">
                  <a href=""></a>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Home;

import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";

import "./home.css";

function Home() {
   const [isSmallScreen, setIsSmallScreen] = useState(false);
   const [searchData, setSearchData] = useState({ search: "" });

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
                  <Link to="search?searchText=anime">Anime</Link>
               </div>
               <div className="wallHub__home-wallpapers_filter">
                  <Link to="search?searchText=pc">PC</Link>
               </div>
               <div className="wallHub__home-wallpapers_filter">
                  <Link to="search?searchText=phone">Phone</Link>
               </div>
               <div className="wallHub__home-wallpapers_filter">
                  <Link to="search?searchText=landscape">Landscape</Link>
               </div>
               <div className="wallHub__home-wallpapers_filter">
                  <Link to="search?searchText=mountain">Mountain</Link>
               </div>
               <div className="wallHub__home-wallpapers_filter">
                  <Link to="search?searchText=forest">Forest</Link>
               </div>
               <div className="wallHub__home-wallpapers_filter">
                  <Link to="search?searchText=japan">Japan</Link>
               </div>
               <div className="wallHub__home-wallpapers_filter">
                  <Link to="search?searchText=character">Character</Link>
               </div>
               <div className="wallHub__home-wallpapers_filter">
                  <Link to="search?searchText=realistic">Realistic</Link>
               </div>
               <div className="wallHub__home-wallpapers_filter">
                  <Link to="search?searchText=dark">Dark</Link>
               </div>
            </div>
            <div className="wallHub__home-wallpapers_img-container">
            </div>
         </div>
      </div>
   );
}

export default Home;

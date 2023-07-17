import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";

import "./home.css";

function Home() {
   const [isSmallScreen, setIsSmallScreen] = useState(false);

   // ? this state is used to store the search data
   const [searchData, setSearchData] = useState({ search: "" });

   // ? this useEffect is used to check if the screen is small or not
   useEffect(() => {
      const handleResize = () => {
         setIsSmallScreen(window.innerWidth < 550);
      };
      handleResize();
   }, []);

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

   function FilterLink({ searchText, content }) {
      return (
         <div className="wallHub__home-wallpapers_filter">
            <Link to={`search?searchText=${searchText}`}>{content}</Link>
         </div>
      );
   }

   return (
      <div className="wallHub__home">
         {/* ? this div have background image */}
         <div className="wallHub__home-search_div section__padding">
            <div className="wallHub__home-search_container ">
               <h1>Discover the Future of Wallpapers</h1>
               <h3> Embrace the Beauty of AI-Generated Wallpapers</h3>
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
               <FilterLink searchText={"anime"} content={"Anime"} />
               <FilterLink searchText={"nature"} content={"Nature"} />
               <FilterLink searchText={"landscape"} content={"Landscape"} />
               <FilterLink searchText={"mountain"} content={"Mountain"} />
               <FilterLink searchText={"forest"} content={"Forest"} />
               <FilterLink searchText={"japan"} content={"Japan"} />
               <FilterLink searchText={"character"} content={"Character"} />
               <FilterLink searchText={"realistic"} content={"Realistic"} />
               <FilterLink searchText={"city"} content={"City"} />
               <FilterLink searchText={"space"} content={"Space"} />
               <FilterLink searchText={"minimal"} content={"Minimal"} />
               <FilterLink searchText={"dark"} content={"Dark"} />
               <FilterLink searchText={"light"} content={"Light"} />
               <FilterLink searchText={"4k"} content={"4K"} />
            </div>
            <div className="wallHub__home-wallpapers_img-container"></div>
         </div>
      </div>
   );
}

export default Home;

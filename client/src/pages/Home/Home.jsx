import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { SearchTag } from "../../components";
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
                        type="search"
                        placeholder={
                           isSmallScreen
                              ? "Search Wallpaper"
                              : "Search AI-Generated Wallpapers"
                        }
                        onChange={handleSearch}
                        name="search"
                        value={searchData.search}
                     />
                     <Link to={`search?keyword=${searchData.search}`}>
                        <button type="submit">
                           <RiSearchLine color="#333333" size={27} />
                        </button>
                     </Link>
                  </form>
               </div>
            </div>
         </div>
         <div className="wallHub__home-wallpapers section__padding">
            <div className="wallHub__home-wallpapers_searchTag-container">
               {/* <Link to={"/profile"}>Profile</Link> */}
               <SearchTag searchText={"anime"} content={"Anime"} />
               <SearchTag searchText={"nature"} content={"Nature"} />
               <SearchTag searchText={"landscape"} content={"Landscape"} />
               <SearchTag searchText={"mountain"} content={"Mountain"} />
               <SearchTag searchText={"forest"} content={"Forest"} />
               <SearchTag searchText={"japan"} content={"Japan"} />
               <SearchTag searchText={"character"} content={"Character"} />
               <SearchTag searchText={"realistic"} content={"Realistic"} />
               <SearchTag searchText={"city"} content={"City"} />
               <SearchTag searchText={"space"} content={"Space"} />
               <SearchTag searchText={"minimal"} content={"Minimal"} />
               <SearchTag searchText={"dark"} content={"Dark"} />
               <SearchTag searchText={"light"} content={"Light"} />
               <SearchTag searchText={"4k"} content={"4K"} />
            </div>
            <div className="wallHub__home-wallpapers_img-container"></div>
         </div>
      </div>
   );
}

export default Home;

import React from "react";
import BackgroundImg from "../../assets/images/landscape_mountain_view_1536 x512px.webp";
import { RiSearchLine } from "react-icons/ri";

import "./home.css";

function Home() {
   return (
      <div className="wallHub__home section__padding">
         <div className="wallHub__home-search_container ">
            <h1>Discover the Future of Wallpapers</h1>
            <h2> Embrace the Beauty of AI-Generated Wallpapers</h2>
            <div className="wallHub__home-search_bar">
               <form action="get">
                  <input
                     type="text"
                     placeholder="Search AI-Generated Wallpapers"
                  />
                  <button type="submit">
                     <RiSearchLine color="#333333" size={27} />
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Home;

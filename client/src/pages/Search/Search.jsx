import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import "./search.css";

function Search() {
   const [searchData, setSearchData] = useState({ search: "", resultType: "mostRelevant" });
   const [searchParams, SetSearchParams] = useSearchParams();
   const searchText = searchParams.get("searchText");

   // ? this function is used to handle the search data
   const handleSearch = (e) => {
      setSearchData((prevFormData) => {
         return {
            ...prevFormData,
            [e.target.name]: e.target.value,
         };
      });
   };

   console.log(searchData);

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   return (
      <div>
         <div className="wallHub__search">
            <div className="wallHub__searchBar-container">
               <div className="wallHub__searchBar-input_container">
                  <form onSubmit={handleSubmit}>
                     <input
                        type="search"
                        placeholder={"Search Wallpaper"}
                        onChange={handleSearch}
                        name="search"
                        value={searchData.search}
                     />
                     <Link to={`?keyword=${searchData.search}`}>
                        <button type="submit">
                           <RiSearchLine color="#333333" size={27} />
                        </button>
                     </Link>
                  </form>
               </div>
               <select
                  name="resultType"
                  onChange={handleSearch}
                  value={FormData.resultType}
                  id="wallHub__searchBar-select"
                  className="wallHub__searchBar-select"
               >
                  <option value="mostRelevant">Most Relevant</option>
                  <option value="mostRecent">Most Recent</option>
                  <option value="mostViewed">Most Viewed</option>
                  <option value="mostDownloaded">Most Downloaded</option>
               </select>
            </div>
         </div>
      </div>
   );
}

export default Search;

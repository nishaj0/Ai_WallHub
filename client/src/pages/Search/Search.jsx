import React from "react";
import { useSearchParams } from "react-router-dom";

import "./search.css";

function Search() {
   const [searchParams, SetSearchParams] = useSearchParams();
   const searchText = searchParams.get("searchText");

   return (
      <div>
         <h1>Search</h1>
         <h1>{searchText}</h1>
      </div>
   );
}

export default Search;

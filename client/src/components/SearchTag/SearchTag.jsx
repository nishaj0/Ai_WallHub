import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './searchTag.css';

function SearchTag({ searchText }) {
   const { pathname } = useLocation();

   const makeCapital = (str) => {
      if (str.charAt(0).match(/[a-zA-Z]/)) {
         return str.charAt(0).toUpperCase() + str.slice(1);
      } else {
         return str;
      }
   };

   return (
      <Link
         className="wallHub__searchTag"
         to={pathname === '/search' ? `?keyword=${searchText}` : `search?keyword=${searchText}`}
      >
         {makeCapital(searchText)}
      </Link>
   );
}

export default SearchTag;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './searchTag.css';

function SearchTag({ searchText, content }) {
  const { pathname } = useLocation();
  return (
    <Link
      className="wallHub__searchTag"
      to={
        pathname === '/search'
          ? `?keyword=${searchText}`
          : `search?keyword=${searchText}`
      }
    >
      {content}
    </Link>
  );
}

export default SearchTag;

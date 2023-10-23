import React from 'react';
import { useEffect, useState } from 'react';

import { useSearchParams, Link } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';

import './search.css';
import { SearchTag } from '../../components';
import axios from '../../api/axios';

function Search() {
  // using searchparams
  const [searchResult, setSearchResult] = useState([]);

  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');

  const SEARCH_URL = '/search';

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.post(SEARCH_URL, { searchKeyword }, { signal: controller.signal });
        console.log(response.data);
        isMounted && setSearchResult(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request cancelled:', err.message);
        } else {
          console.error(err);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="wallHub__search">
      <div className="wallHub__search-header">
        <h2>
          {
            //converting first letter to capital
            searchKeyword.charAt(0).toUpperCase() + searchKeyword.slice(1)
          }
        </h2>
        <p>Discover and download our AI-generated wallpapers.</p>
      </div>
      <div className="wallHub__search-tags">
        <SearchTag searchText={'phone'} content={'Phone'} />
        <SearchTag searchText={'pc'} content={'PC'} />
        <SearchTag searchText={'nature'} content={'Nature'} />
        <SearchTag searchText={'landscape'} content={'Landscape'} />
      </div>
      <div className="wallHub__search-images">{/* images comes here */}</div>
    </div>
  );
}

export default Search;

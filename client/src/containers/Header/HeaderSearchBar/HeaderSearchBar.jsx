import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import './headerSearchBar.css';
import useScreenWidth from '../../../hooks/useScreenWidth';

function HeaderSearchBar() {
   const [searchParams] = useSearchParams();
   const keyword = searchParams.get('keyword');
   const [searchKeyword, setSearchKeyword] = useState(keyword || '');
   const navigate = useNavigate();

   let screenSize = useScreenWidth();

   const handleSearch = (e) => {
      setSearchKeyword(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // ? only navigate to search page when there is a searchKeyword
      if (searchKeyword) {
         navigate(`search?keyword=${searchKeyword}`);
      }
   };

   return (
      <div className="wallHub__header-search">
         <form onSubmit={handleSubmit}>
            <input
               type="search"
               name="search"
               placeholder={screenSize === 'small' ? 'Search' : 'Search Wallpaper'}
               onChange={handleSearch}
               value={searchKeyword}
            />
            <button type="submit">
               <RiSearchLine color="#333333" size={screenSize === 'medium' || screenSize === 'small' ? 20 : 27} />
            </button>
         </form>
      </div>
   );
}

export default HeaderSearchBar;

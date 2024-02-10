import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import './headerSearchBar.css';
import useScreenWidth from '../../../hooks/useScreenWidth';

function HeaderSearchBar() {
   const [searchKeyword, setSearchKeyword] = useState('');

   let screenSize = useScreenWidth();

   const handleSearch = (e) => {
      setSearchKeyword(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
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
            <Link to={`search?keyword=${searchKeyword}`}>
               <button type="submit">
                  <RiSearchLine color="#333333" size={screenSize === 'medium' || screenSize === 'small' ? 20 : 27} />
               </button>
            </Link>
         </form>
      </div>
   );
}

export default HeaderSearchBar;

import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';

import { SearchTag } from '../../components';
import './home.css';

function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const searchString = [
    'anime',
    'nature',
    'landscape',
    'mountain',
    'forest',
    'japan',
    'character',
    'realistic',
    'city',
    'space',
    'minimal',
    'dark',
    'light',
    '4k',
  ];

  // ? this state is used to store the search data
  const [searchData, setSearchData] = useState({ search: '' });

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
                placeholder={isSmallScreen ? 'Search Wallpaper' : 'Search AI-Generated Wallpapers'}
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
          {searchString.map((tag, index) => (
            <SearchTag searchText={tag} key={index} />
          ))}
        </div>
        <div className="wallHub__home-wallpapers_img-container"></div>
      </div>
    </div>
  );
}

export default Home;

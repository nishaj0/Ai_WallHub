import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import PhotoAlbum from 'react-photo-album';
import './home.css';
import { LoadingSvg, SearchTag } from '../../components';
import useScreenWidth from '../../hooks/useScreenWidth';
import axios from '../../api/axios';

function Home() {
   const [searchKeyword, setSearchKeyword] = useState('');
   const [transformedData, setTransformedData] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [abortController, setAbortController] = useState(null);

   const navigate = useNavigate();
   const screenSize = useScreenWidth();

   const RECENT_POSTS_URL = '/api/search/recent';
   const recentPostLimit = 20;
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

   useEffect(() => {
      const controller = new AbortController();
      setAbortController(controller);
      const fetchImages = async () => {
         try {
            const response = await axios.get(`${RECENT_POSTS_URL}?limit=${recentPostLimit}`, {
               signal: controller.signal,
            });

            // ? giving manual delay
            // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            // await delay(3000);

            // ? transform data to usable format
            const transformData = response.data.map((img) => ({
               key: img._id,
               src: img.url,
               width: img.width,
               height: img.height,
            }));

            setTransformedData(transformData);
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchImages();

      return () => {
         if (abortController) {
            controller.abort();
         }
      };
   }, []);

   // ? this function is used to handle the search data
   const handleChange = (e) => {
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
                        placeholder={screenSize == 'small' ? 'Search Wallpaper' : 'Search AI-Generated Wallpapers'}
                        onChange={handleChange}
                        name="search"
                        value={searchKeyword}
                     />
                     <button type="submit">
                        <RiSearchLine color="#333333" size={27} />
                     </button>
                  </form>
               </div>
            </div>
         </div>
         {isLoading ? (
            <div className="wallHub__home-Loading">
               <LoadingSvg />
            </div>
         ) : (
            <div className="wallHub__home-wallpapers section__padding">
               <div className="wallHub__home-wallpapers_searchTag-container">
                  {searchString.map((tag, index) => (
                     <SearchTag searchText={tag} key={index} />
                  ))}
               </div>
               <div className="wallHub__home-wallpapers_img-container">
                  <h2>Most Recent</h2>
                  <PhotoAlbum
                     layout="masonry"
                     photos={transformedData}
                     columns={(containerWidth) => {
                        if (containerWidth < 550) return 1;
                        if (containerWidth < 768) return 3;
                     }}
                     onClick={(e) => navigate(`/image/${e.photo.key}`)}
                  />
               </div>
               <div className="wallHub__home-wallpapers_footer">
                  <button onClick={() => navigate('/')}>show more</button>
               </div>
            </div>
         )}
      </div>
   );
}

export default Home;

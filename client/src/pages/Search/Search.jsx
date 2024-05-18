import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './search.css';
import { SearchTag, ImageGallery } from '../../components';
import axios from '../../api/axios';

function Search() {
   const [fetchedImages, setFetchedImages] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [abortController, setAbortController] = useState(null);

   const [searchParams] = useSearchParams();
   const keyword = searchParams.get('keyword');

   const SEARCH_URL = '/api/search';
   const searchString = ['phone', 'PC', 'nature', 'landscape'];

   useEffect(() => {
      // ? this will fetch the images from the server
      // ? and convert to the format that react-photo-album accepts
      const fetchData = async () => {
         try {
            setIsLoading(true);
            const controller = new AbortController();
            setAbortController(controller);

            const response = await axios(`${SEARCH_URL}?keyword=${keyword}`, { signal: controller.signal });

            // ? giving manual delay
            // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            // await delay(3000);

            setFetchedImages(response.data);
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();

      return () => {
         if (abortController) {
            abortController.abort();
         }
      };
   }, [keyword]);

   return (
      <div className="wallHub__search">
         <div className="wallHub__search-header">
            <h2>{keyword.charAt(0).toUpperCase() + keyword.slice(1)}</h2>
            <p>Discover and download our AI-generated wallpapers.</p>
         </div>
         <div className="wallHub__search-tags" style={{ display: isLoading ? 'none' : 'flex' }}>
            {searchString.map((tag, index) => (
               <SearchTag searchText={tag} key={index} />
            ))}
         </div>
         <ImageGallery
            className={'wallHub__search-gallery'}
            isLoading={isLoading}
            images={fetchedImages}
            noResultDescription={'Try searching for something else.'}
         />
      </div>
   );
}

export default Search;

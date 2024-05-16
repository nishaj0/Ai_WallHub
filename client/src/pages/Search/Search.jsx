import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CiImageOff } from 'react-icons/ci';
import PhotoAlbum from 'react-photo-album';
import './search.css';
import { SearchTag, LoadingSvg } from '../../components';
import axios from '../../api/axios';
import { formatToGalleryData } from '../../utils';

function Search() {
   const [fetchedImages, setFetchedImages] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [abortController, setAbortController] = useState(null);

   const [searchParams] = useSearchParams();
   const keyword = searchParams.get('keyword');
   const navigate = useNavigate();

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
         {/* -------image gallery----- */}
         {/* if the image is fetching, show "loading svg" */}
         {/* else */}
         {/*   if there is no image, show "no result found" */}
         {/*   else if the image is fetched, show the images */}
         {isLoading ? (
            <div className="wallHub__search-loading">
               <LoadingSvg />
            </div>
         ) : !fetchedImages?.length ? (
            <div className="wallHub__search-noResult">
               <h3>No images found!</h3>
               <p>Try searching for something else.</p>
               <CiImageOff size={40} color="#1b8dca" />
            </div>
         ) : (
            <div className="wallHub__search-images">
               <PhotoAlbum
                  layout="masonry"
                  photos={formatToGalleryData(fetchedImages)}
                  columns={(containerWidth) => {
                     if (containerWidth < 550) return 1;
                     if (containerWidth < 768) return 3;
                  }}
                  onClick={(e) => navigate(`/image/${e.photo.key}`)}
               />
            </div>
         )}
      </div>
   );
}

export default Search;

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PhotoAlbum from 'react-photo-album';
import './search.css';
import { SearchTag, LoadingSvg } from '../../components';
import axios from '../../api/axios';

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
            const controller = new AbortController();
            setAbortController(controller);

            const response = await axios(`${SEARCH_URL}?keyword=${keyword}`, { signal: controller.signal });

            // ? giving manual delay
            // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            // await delay(3000);

            // ? transform to usable data
            const transformedData = response.data.map((img, index) => ({
               key: img._id,
               src: img.url,
               width: img.width,
               height: img.height,
            }));
            setFetchedImages(transformedData);
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
         {/* image gallery */}
         {isLoading ? (
            <div className="wallHub__search-loading">
               <LoadingSvg />
            </div>
         ) : (
            <div className="wallHub__search-images">
               <PhotoAlbum
                  layout="masonry"
                  photos={fetchedImages}
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

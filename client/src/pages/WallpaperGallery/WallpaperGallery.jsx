import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './wallpaperGallery.css';
import { LoadingSvg, PaginationBar } from '../../components';
import PhotoAlbum from 'react-photo-album';
import axios from '../../api/axios';
import { formatToGalleryData } from '../../utils';

const FILTERS = {
   RECENT: 'recent',
   OLD: 'old',
   LIKE: 'like',
};

const options = [
   { value: FILTERS.RECENT, label: 'Newest' },
   { value: FILTERS.OLD, label: 'Oldest' },
   { value: FILTERS.LIKE, label: 'Most Liked' },
];

const selectStyle = {
   option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#1b8dca' : '#f8f8f8',
      color: state.isSelected ? '#f8f8f8' : '#333333',
   }),
};

function WallpaperGallery() {
   const [selectedFilter, setSelectedFilter] = useState(options[0]);
   const [fetchedData, setFetchedData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [abortController, setAbortController] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);

   const navigate = useNavigate();
   const postPerPage = 30;
   const POSTS_URL = `/api/post?filter=${selectedFilter.value}&page=${currentPage}&size=${postPerPage}`;

   // ? this will fetch the images from the server
   const fetchData = async () => {
      try {
         setIsLoading(true);
         const controller = new AbortController();
         setAbortController(controller);

         const response = await axios(POSTS_URL, { signal: controller.signal });

         // ? giving manual delay
         // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
         // await delay(3000);

         setFetchedData(response.data);
      } catch (error) {
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchData();

      return () => {
         if (abortController) {
            abortController.abort();
         }
      };
   }, [selectedFilter, currentPage]);

   return (
      <div className="wallHub__gallery">
         <div className="wallHub__gallery__header">
            <h2>Wallpapers</h2>
            <p>Discover and download our AI-generated wallpapers.</p>
            <div className="wallHub__gallery-filter">
               <Select
                  className="wallHub__gallery-filter-select"
                  styles={selectStyle}
                  defaultValue={options[0]}
                  value={selectedFilter}
                  onChange={setSelectedFilter}
                  isSearchable={false}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  options={options}
               />
            </div>
         </div>
         <div className="wallHub__gallery-content">
            {isLoading ? (
               <div className="wallHub__gallery-loading">
                  <LoadingSvg />
               </div>
            ) : !fetchedData?.posts?.length ? (
               <div className="wallHub__gallery-noResult">
                  <h3>No images found!</h3>
               </div>
            ) : (
               <div className="wallHub__gallery-images">
                  <PhotoAlbum
                     layout="masonry"
                     componentsProps={{
                        imageProps: {
                           loading: 'lazy',
                        },
                     }}
                     photos={formatToGalleryData(fetchedData.posts)}
                     columns={(containerWidth) => {
                        if (containerWidth < 550) return 1;
                        if (containerWidth < 768) return 3;
                     }}
                     onClick={(e) => navigate(`/image/${e.photo.key}`)}
                  />
               </div>
            )}
         </div>
         <div className="wallHub__gallery-footer">
            <PaginationBar
               className={'wallHub__gallery-footer-pageBar'}
               isDisabled={isLoading}
               currentPage={currentPage}
               onPageChange={setCurrentPage}
               totalPage={fetchedData.totalPageCount}
            />
         </div>
      </div>
   );
}

export default WallpaperGallery;

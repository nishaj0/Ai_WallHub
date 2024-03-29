import { useState, useEffect } from 'react';
import PhotoAlbum from 'react-photo-album';
import { useNavigate } from 'react-router-dom';
import './profilePost.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { LoadingSvg } from '../../../components';


function ProfilePosts() {
   const [fetchedImages, setFetchedImages] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [abortController, setAbortController] = useState(null);
   
   const navigate = useNavigate();
   const axiosPrivate = useAxiosPrivate();

   const SEARCH_URL = '/api/user/posts';

   useEffect(() => {
      const fetchData = async () => {
         try {
            const controller = new AbortController();
            setAbortController(controller);

            const response = await axiosPrivate.get(SEARCH_URL, { signal: controller.signal });

            // ? giving manual delay
            // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            // await delay(3000);

            // ? converting to the format that react-photo-album accepts
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
   }, []);

   return (
      <div className="wallHub__profilePost">
         {isLoading ? (
            <div className="wallHub__profilePost-loading">
               <LoadingSvg />
            </div>
         ) : (
            <div className="wallHub__profilePost-images">
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

export default ProfilePosts;

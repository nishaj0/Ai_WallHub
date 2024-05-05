import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import './wallpaper.css';
import axios from '../../api/axios';
import { LoadingSvg, BlueButton } from '../../components';
import PostLike from './PostLike/PostLike';

function Wallpaper() {
   const [isUserLiked, setIsUserLiked] = useState(false);
   const [imageDetails, setImageDetails] = useState({});
   const [abortController, setAbortController] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [likeTrigger, setLikeTrigger] = useState(false);

   const { id: imageId } = useParams();
   const currentUserId = useSelector((state) => state.user.userId);

   useEffect(() => {
      const controller = new AbortController();
      setAbortController(controller);
      const fetchImageDetails = async () => {
         try {
            const response = await axios.get(`/api/post/${imageId}`, {
               signal: controller.signal,
            });

            // ? give manual delay
            // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            // await delay(30000);

            setImageDetails(response.data);

            // ? check if user already liked the image
            setIsUserLiked(response.data.likedBy.includes(currentUserId) ? true : false);
         } catch (err) {
            console.error(err);
         } finally {
            setIsLoading(false);
         }
      };
      fetchImageDetails();

      return () => {
         if (abortController) controller.abort();
      };
   }, [likeTrigger]);

   // ? download image when user click download button
   const downloadImage = () => {
      saveAs(imageDetails.url, imageDetails.title);
   };

   // ? convert to useful date format
   const convertDate = (date) => {
      if (imageDetails) {
         let dateObj = new Date(date);
         let month = dateObj.getMonth() + 1;
         let day = dateObj.getDate();
         let year = dateObj.getFullYear();
         let newDate = `${day}/${month}/${year}`;
         return newDate;
      }
   };

   return (
      <div className="wallHub__wallpaper">
         {isLoading ? (
            <LoadingSvg />
         ) : (
            <>
               <div className="wallHub__wallpaper-image_container">
                  <img className="wallHub__wallpaper-image" src={imageDetails.url} alt="wallpaper image" />
               </div>
               <div className="wallHub__wallpaper-info">
                  <div className="wallHub__wallpaper-button-container">
                     <PostLike
                        isUserLiked={isUserLiked}
                        imageDetails={imageDetails}
                        currentUserId={currentUserId}
                        setLikeTrigger={setLikeTrigger}
                     />
                     <BlueButton onClick={downloadImage}>Download</BlueButton>
                  </div>
                  <h2 className="wallHub__wallpaper-title">{imageDetails.title}</h2>
                  <h4 className="wallHub__wallpaper-prompt">{imageDetails.prompt}</h4>
                  <div className="wallHub__wallpaper-about">
                     <p>
                        posted by: <a href="#">{imageDetails.username}</a>
                     </p>
                     <p>upload date: {convertDate(imageDetails.createdAt)}</p>
                     <p>
                        size: {imageDetails.width}x{imageDetails.height}
                     </p>
                  </div>
               </div>
            </>
         )}
      </div>
   );
}

export default Wallpaper;

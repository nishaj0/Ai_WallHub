import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';
import { saveAs } from 'file-saver';
import './wallpaper.css';
import axios from '../../api/axios';
import { LoadingSvg, BlueButton } from '../../components';

function Wallpaper() {
   const [isUserLiked, setIsUserLiked] = useState(false);
   const [imageDetails, setImageDetails] = useState({});
   const [abortController, setAbortController] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const { id: imageId } = useParams();

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
   }, []);

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
                     <div className="wallHub__wallpaper-button-like_container">
                        {isUserLiked ? <IoMdHeart /> : <IoIosHeartEmpty />}
                        <p>203</p>
                     </div>
                     <BlueButton  onClick={downloadImage}>
                        Download
                     </BlueButton>
                  </div>
                  <h2 className="wallHub__wallpaper-title">{imageDetails.title}</h2>
                  <h4 className="wallHub__wallpaper-prompt">{imageDetails.prompt}</h4>
                  <div className="wallHub__wallpaper-about">
                     <p>
                        posted by: <a href="#">{imageDetails.userEmail}</a>
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

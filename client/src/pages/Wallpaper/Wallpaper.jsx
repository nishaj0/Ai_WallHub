import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { SlOptionsVertical } from 'react-icons/sl';
import './wallpaper.css';
import axios from '../../api/axios';
import { LoadingSvg, BlueButton, ToggleMenu, ConfirmDialogBox } from '../../components';
import PostLike from './PostLike/PostLike';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function Wallpaper() {
   const [isUserLiked, setIsUserLiked] = useState(false);
   const [imageDetails, setImageDetails] = useState({});
   const [abortController, setAbortController] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [likeTrigger, setLikeTrigger] = useState(false);
   const [toggleMenu, setToggleMenu] = useState(false);
   const [isConfirmOpen, setIsConfirmOpen] = useState(false);

   const { id: imageId } = useParams();
   const location = useLocation();
   const navigate = useNavigate();
   const axiosPrivate = useAxiosPrivate();
   const currentUserId = useSelector((state) => state.user.userId);

   const IMAGE_URL = `/api/post/${imageId}`;
   const from = location.state?.from?.pathname || '/';

   useEffect(() => {
      const controller = new AbortController();
      setAbortController(controller);
      const fetchImageDetails = async () => {
         try {
            const response = await axios.get(IMAGE_URL, {
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

   const handleToggleButton = () => {
      setToggleMenu(!toggleMenu);

      // ? close confirm dialog box if it is open
      if (isConfirmOpen) setIsConfirmOpen(false);
   };

   const handlePostDelete = async () => {
      try {
         setIsConfirmOpen(false);
         const res = await axiosPrivate.delete(IMAGE_URL);
         navigate(from);
      } catch (err) {
         console.error(err);
      }
   };

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
                     <div className="wallHub__wallpaper-download-edit-buttons">
                        <BlueButton onClick={downloadImage}>Download</BlueButton>
                        {imageDetails.userRef === currentUserId && (
                           <>
                              <button onClick={handleToggleButton} className="wallHub__wallpaper-menu-button">
                                 <SlOptionsVertical size={25} color="333333" />
                              </button>
                              {toggleMenu && (
                                 <ToggleMenu className="wallHub__wallpaper-menu">
                                    <Link
                                       onClick={() => setIsConfirmOpen(true)}
                                       className="wallHub__wallpaper-menu-delete-button"
                                    >
                                       delete post
                                    </Link>
                                    <ConfirmDialogBox
                                       isOpen={isConfirmOpen}
                                       question={'Are you sure you want to delete this post'}
                                       description={'This action cannot be undone.'}
                                    >
                                       <button
                                          onClick={handlePostDelete}
                                          className="wallHub__wallpaper-confirmBox-button-confirm"
                                       >
                                          Confirm
                                       </button>
                                       <button
                                          onClick={() => setIsConfirmOpen(false)}
                                          className="wallHub__wallpaper-confirmBox-button-cancel"
                                       >
                                          Cancel
                                       </button>
                                    </ConfirmDialogBox>
                                 </ToggleMenu>
                              )}
                           </>
                        )}
                     </div>
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

import { useCallback, useEffect, useState } from 'react';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import './postLike.css';

function PostLike({ isUserLiked, imageDetails, currentUserId, setLikeTrigger }) {
   const [likeIcon, setLikeIcon] = useState();
   const [userLiked, setUserLiked] = useState(isUserLiked);
   const navigate = useNavigate();
   const axiosPrivate = useAxiosPrivate();

   const POST_URL = '/api/post';
   const LIKE_URL = `${POST_URL}/${imageDetails._id}/like`;

   const handlePostLike = useCallback(
      async (method) => {
         try {
            // ? if user is not logged in then redirect to login page
            if (!currentUserId) {
               return navigate('/login');
            }
            method === 'like' ? await axiosPrivate.post(LIKE_URL) : await axiosPrivate.delete(LIKE_URL);

            setUserLiked((prev) => !prev);
            // ? trigger to fetch new image data
            setLikeTrigger((prev) => !prev);
         } catch (error) {
            console.error(error);
         }
      },
      [LIKE_URL],
   );

   useEffect(() => {
      userLiked ? setLikeIcon(<IoMdHeart color="#ff1d1d" />) : setLikeIcon(<IoIosHeartEmpty color="#333333" />);
   }, [isUserLiked]);

   return (
      <div className="wallHub__wallpaper-like">
         <button onClick={() => handlePostLike(userLiked ? 'unlike' : 'like')}>{likeIcon}</button>
         <p>{imageDetails?.likedBy?.length}</p>
      </div>
   );
}

export default PostLike;

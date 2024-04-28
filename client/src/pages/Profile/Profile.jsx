import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { RiShareForwardFill } from 'react-icons/ri';
import { SlOptionsVertical } from 'react-icons/sl';
import './profile.css';
import userNullProfile from '../../assets/svg/user-null-profile.svg';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useScreenWidth from '../../hooks/useScreenWidth';
import { BlueButton } from '../../components';
import ProfileActivityLink from './ProfileActivityLink/ProfileActivityLink';

function Profile() {
   const [customProfile, setCustomProfile] = useState(false);
   const [userData, setUserData] = useState();
   const [abortController, setAbortController] = useState(null);

   const location = useLocation();
   const navigate = useNavigate();
   const axiosPrivate = useAxiosPrivate();
   const screenWidth = useScreenWidth();

   const PROFILE_URL = '/api/user/profile';

   let avatarIconsSize = 150;
   if (screenWidth === 'large') {
      avatarIconsSize = 150;
   } else if (screenWidth === 'medium') {
      avatarIconsSize = 110;
   } else {
      avatarIconsSize = 80;
   }

   useEffect(() => {
      const controller = new AbortController();
      setAbortController(controller);

      const getUserData = async () => {
         try {
            const response = await axiosPrivate.get(PROFILE_URL, {
               signal: controller.signal,
            });
            setUserData(response.data);
         } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
         }
      };
      getUserData();

      return () => {
         if (abortController) {
            abortController.abort();
         }
      };
   }, []);

   return (
      // <div className="wallHub__profile-container">
      //    <div className="wallHub__profile">
      //       <div className="wallHub__profile-details">
      //          <div className="wallHub__profile-details_dp">
      //             <div className="wallHub__profile-details_dp-frame">
      //                {customProfile ? <img src="" alt="" /> : <RiUserFill size={50} />}
      //             </div>
      //          </div>
      //          <div className="wallHub__profile-details_info">
      //             <h3>{userData?.fullName}</h3>
      //             <div className="wallHub__profile-details_info-likes">
      //                <div>
      //                   <h4>10</h4>
      //                   <p>Posts</p>
      //                </div>
      //                <div>
      //                   <h4>23</h4>
      //                   <p>Likes</p>
      //                </div>
      //                <div>
      //                   <h4>134</h4>
      //                   <p>Followers</p>
      //                </div>
      //             </div>
      //          </div>
      //          <div className="wallHub__profile-details-button">
      //             <button>Follow</button>
      //          </div>
      //       </div>
      //       <div className="wallHub__profile-activity section__margin">
      //          <ActivityLink to={'.'} content={'Post'} />
      //          <ActivityLink to={'likes'} content={'Likes'} />
      //       </div>
      //       <Outlet />
      //    </div>
      // </div>

      <div className="wallHub__profile">
         <div className="wallHub__profile_info-container">
            <div className="wallHub__profile-info">
               <div className="wallHub__profile-info_col1">
                  {screenWidth === 'small' && <h3 className="wallHub__profile-info_fullName">{userData?.fullName}</h3>}
                  <div className="wallHub__profile-info_avatar">
                     <img src={customProfile ? '' : userNullProfile} alt="profileIcon" />
                  </div>
                  <div className="wallHub__profile-info_name">
                     {screenWidth !== 'small' && (
                        <>
                           <h3 className="wallHub__profile-info_fullName">{userData?.fullName}</h3>
                           <h4 className="wallHub__profile-info_username">@{userData?.username}</h4>
                        </>
                     )}
                  </div>
                  {screenWidth === 'small' && <h4 className="wallHub__profile-info_username">@{userData?.username}</h4>}
               </div>
               <div className="wallHub__profile-info_col2">
                  <div className="wallHub__profile-info_count">
                     <div className="wallHub__profile-info_count-item">
                        <h4>23</h4>
                        <p>posts</p>
                     </div>
                     <div className="wallHub__profile-info_count-item">
                        <h4>542</h4>
                        <p>likes</p>
                     </div>
                  </div>
                  <SlOptionsVertical size={28} color="333333" />
               </div>
            </div>
            <div className="wallHub__profile-buttons">
               <BlueButton>Message</BlueButton>
               <RiShareForwardFill className="wallHub__profile-buttons_share" size={32} color="333333" />
            </div>

            <div className="wallHub__profile-media_link">
               <ProfileActivityLink to={'.'}>Post</ProfileActivityLink>
               <ProfileActivityLink to={'.likes'}>Likes</ProfileActivityLink>
            </div>
         </div>
         <div className="wallHub__profile-media_images">
            <Outlet />
         </div>
      </div>
   );
}

export default Profile;

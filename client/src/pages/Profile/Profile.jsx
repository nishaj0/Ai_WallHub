import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { RiShareForwardFill } from 'react-icons/ri';
import { SlOptionsVertical } from 'react-icons/sl';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin2Line } from 'react-icons/ri';
import './profile.css';
import userNullProfile from '../../assets/svg/user-null-profile.svg';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useScreenWidth from '../../hooks/useScreenWidth';
import { BlueButton, ToggleMenu, LoadingSvg } from '../../components';
import ProfileActivityLink from './ProfileActivityLink/ProfileActivityLink';

function Profile() {
   const [customProfile, setCustomProfile] = useState(false);
   const [userData, setUserData] = useState();
   const [abortController, setAbortController] = useState(null);
   const [toggleMenu, setToggleMenu] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   const location = useLocation();
   const navigate = useNavigate();
   const axiosPrivate = useAxiosPrivate();
   const screenWidth = useScreenWidth();

   const PROFILE_URL = '/api/user/profile';

   const handleMenuToggle = () => {
      setToggleMenu(!toggleMenu);
   };

   useEffect(() => {
      const controller = new AbortController();
      setAbortController(controller);

      const getUserData = async () => {
         try {
            const response = await axiosPrivate.get(PROFILE_URL, {
               signal: controller.signal,
            });

            // ? giving manual delay
            // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            // await delay(3000);

            setUserData(response.data);
         } catch (err) {
            console.error(err);
         } finally {
            setIsLoading(false);
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
      <div className="wallHub__profile">
         {isLoading ? (
            <div className="wallHub__profile-loader">
               <LoadingSvg />
            </div>
         ) : (
            <div className="wallHub__profile_info-container">
               <div className="wallHub__profile-info">
                  <div className="wallHub__profile-info_col1">
                     {screenWidth === 'small' && (
                        <h3 className="wallHub__profile-info_fullName">{userData?.fullName}</h3>
                     )}
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
                     {screenWidth === 'small' && (
                        <h4 className="wallHub__profile-info_username">@{userData?.username}</h4>
                     )}
                  </div>
                  <div className="wallHub__profile-info_col2">
                     <div className="wallHub__profile-info_count">
                        <div className="wallHub__profile-info_count-item">
                           <h4>{userData?.posts?.length}</h4>
                           <p>posts</p>
                        </div>
                        <div className="wallHub__profile-info_count-item">
                           <h4>542</h4>
                           <p>likes</p>
                        </div>
                     </div>
                     <button onClick={handleMenuToggle} className="wallHub__profile-menu-button">
                        <SlOptionsVertical size={28} color="333333" />
                     </button>
                     {toggleMenu && (
                        <ToggleMenu className="wallHub__profile-menu">
                           <Link to={'/edit-profile'}>
                              <FiEdit color="000" /> Edit Profile
                           </Link>
                           <Link to={'/delete-account'} className="wallHub__profile-menu-link-hover-red">
                              <RiDeleteBin2Line color="000" />
                              Delete Account
                           </Link>
                        </ToggleMenu>
                     )}
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
         )}
         <div className="wallHub__profile-media_images">
            <Outlet />
         </div>
      </div>
   );
}

export default Profile;

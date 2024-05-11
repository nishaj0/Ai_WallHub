import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { RiShareForwardFill } from 'react-icons/ri';
import { SlOptionsVertical } from 'react-icons/sl';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin2Line } from 'react-icons/ri';
import './profile.css';
import userNullProfile from '../../assets/svg/user-null-profile.svg';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useScreenWidth from '../../hooks/useScreenWidth';
import { BlueButton, ToggleMenu, LoadingSvg, ConfirmDialogBox } from '../../components';
import ProfileActivityLink from './ProfileActivityLink/ProfileActivityLink';
import useLogout from '../../hooks/useLogout';

function Profile() {
   const [customProfile, setCustomProfile] = useState(false);
   const [userData, setUserData] = useState();
   const [abortController, setAbortController] = useState(null);
   const [toggleMenu, setToggleMenu] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [isConfirmOpen, setIsConfirmOpen] = useState(false);

   const location = useLocation();
   const navigate = useNavigate();
   const axiosPrivate = useAxiosPrivate();
   const screenWidth = useScreenWidth();
   const logout = useLogout();

   const PROFILE_URL = '/api/user/profile';
   const USER_URL = '/api/user';

   const handleMenuToggle = () => {
      setToggleMenu(!toggleMenu);

      // ? close confirm dialog box if it is open
      if (isConfirmOpen) setIsConfirmOpen(false);
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

   const handleUserDelete = async () => {
      try {
         await axiosPrivate.delete(USER_URL);

         // ? signing out user for removing the tokens that stored in cookies
         await logout();

         // ? navigate to previous route
         navigate(-1);
      } catch (err) {
         console.error(err);
      }
   };

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
                        <>
                           <ToggleMenu className="wallHub__profile-menu">
                              <Link to={'/edit-profile'}>
                                 <FiEdit color="000" /> Edit Profile
                              </Link>
                              <Link
                                 onClick={() => setIsConfirmOpen(true)}
                                 className="wallHub__profile-menu-link-hover-red"
                              >
                                 <RiDeleteBin2Line color="000" />
                                 Delete Account
                              </Link>
                           </ToggleMenu>
                           {/* confirm box for account deletion */}
                           <ConfirmDialogBox
                              isOpen={isConfirmOpen}
                              question={'Are you sure you want to delete your account?'}
                              description={'This action cannot be undone.'}
                           >
                              <button
                                 onClick={handleUserDelete}
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
                        </>
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

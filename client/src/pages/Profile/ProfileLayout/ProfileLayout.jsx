import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { RiUserFill } from 'react-icons/ri';
import './profileLayout.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

function ActivityLink({ content, to }) {
   return (
      <NavLink
         to={to}
         className="wallHub__profile-activity_button"
         style={({ isActive }) => {
            return {
               // ? --main-sky-blue: #33a1de;
               // ? --main-color-light: #f8f8f8;
               backgroundColor: isActive && '#33a1de',
               color: isActive && '#f8f8f8',
            };
         }}
      >
         {content}
      </NavLink>
   );
}

function Profile() {
   const [customProfile, setCustomProfile] = useState(false);
   const [userData, setUserData] = useState();
   const [abortController, setAbortController] = useState(null);

   const location = useLocation();
   const navigate = useNavigate();
   const axiosPrivate = useAxiosPrivate();

   const PROFILE_URL = '/api/user/profile';

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
      <div className="wallHub__profile-container">
         <div className="wallHub__profile">
            <div className="wallHub__profile-details">
               <div className="wallHub__profile-details_dp">
                  <div className="wallHub__profile-details_dp-frame">
                     {customProfile ? <img src="" alt="" /> : <RiUserFill size={50} />}
                  </div>
               </div>
               <div className="wallHub__profile-details_info">
                  <h3>{userData?.fullName}</h3>
                  <div className="wallHub__profile-details_info-likes">
                     <div>
                        <h4>10</h4>
                        <p>Posts</p>
                     </div>
                     <div>
                        <h4>23</h4>
                        <p>Likes</p>
                     </div>
                     <div>
                        <h4>134</h4>
                        <p>Followers</p>
                     </div>
                  </div>
               </div>
               <div className="wallHub__profile-details-button">
                  <button>Follow</button>
               </div>
            </div>
            <div className="wallHub__profile-activity section__margin">
               <ActivityLink to={'.'} content={'Post'} />
               <ActivityLink to={'likes'} content={'Likes'} />
            </div>
            <Outlet />
         </div>
      </div>
   );
}

export default Profile;

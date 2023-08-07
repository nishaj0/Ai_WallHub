import React from "react";
import "./profileLayout.css";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { RiUserFill } from "react-icons/ri";

function ActivityLink({ content, to }) {
   return (
      <NavLink
         to={to}
         className="wallHub__profile-activity_button"
         style={({ isActive }) => {
            return {
               // ? --main-sky-blue: #33a1de;
               // ? --main-color-light: #f8f8f8;
               backgroundColor: isActive && "#33a1de",
               color: isActive && "#f8f8f8",
            };
         }}
      >
         {content}
      </NavLink>
   );
}

function Profile() {
   const [customProfile, setCustomProfile] = useState(false);
   return (
      <div className="wallHub__profile-container">
         <div className="wallHub__profile">
            <div className="wallHub__profile-details">
               <div className="wallHub__profile-details_dp">
                  <div className="wallHub__profile-details_dp-frame">
                     {customProfile ? (
                        <img src="" alt="" />
                     ) : (
                        <RiUserFill size={50} />
                     )}
                  </div>
               </div>
               <div className="wallHub__profile-details_info">
                  <h3>John Doe</h3>
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
               <ActivityLink to={"."} content={"Post"} />
               <ActivityLink to={"likes"} content={"Likes"} />
            </div>
            <Outlet />
         </div>
      </div>
   );
}

export default Profile;

import React from "react";
import "./profileLayout.css";
import { useState, useEffect } from "react";
import {
   NavLink,
   Outlet,
   redirect,
   useNavigate,
   useLocation,
   useLoaderData,
} from "react-router-dom";
import axios from 'axios';
import useAuth from "../../../hooks/useAuth";
import { RiUserFill } from "react-icons/ri";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const loader =
   (auth, setAuth, persist, axiosPrivate, refresh) => async () => {
      // ? using useEffect instead of loader, because there is some bugs when using loader
      // ? 1. send so many requests to server 2. persist login not working
      // let responseData;
      // // console.log(auth);

      // // const verifyRefreshToken = async () => {
      // //    try {
      // //       await refresh();
      // //    } catch (err) {
      // //       console.error(err);
      // //    }
      // // };

      // // !auth?.accessToken && persist && verifyRefreshToken() && console.log({afterRefresh:auth})
      // if (!auth?.accessToken) throw redirect("/login");
      // else {
      //    // let isMounted = true;
      //    const controller = new AbortController();
      //    console.log(controller)
      //    try {
      //       const response = await axiosPrivate.get("/api/profile", {
      //          signal: controller.signal,
      //       });
      //       responseData = response.data;
      //       // console.log(responseData);
      //    } catch (err) {
      //       console.error(err);
      //       return redirect("/login");
      //    }
      // }
      // return responseData;
      return null;
   };

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
   const [userData, setUserData] = useState();

   const loaderData = useLoaderData();
   const location = useLocation();
   const navigate = useNavigate();

   const { auth } = useAuth();
   const axiosPrivate = useAxiosPrivate();

   useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      console.log(controller);

      const getUserData = async () => {
         try {
            const response = await axiosPrivate.get("/api/profile", {
               signal: controller.signal,
            });
            console.log(response.data);
            isMounted && setUserData(response.data);
         } catch (err) {
            if (axios.isCancel(err)) {
               console.log("Request cancelled:", err.message);
            } else {
               console.error(err);
               navigate("/login", { state: { from: location }, replace: true });
            }
         }
      };

      getUserData();

      return () => {
         isMounted = false;
         controller.abort();
      };
   }, []);

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
                  <h3>{userData?.name || loaderData?.name}</h3>
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

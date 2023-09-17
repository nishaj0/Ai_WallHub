import React from "react";
import "./headerMenu.css";

import { Link } from "react-router-dom";
import { RiQuestionLine, RiLogoutBoxLine } from "react-icons/ri";
import useAuth from "../../../hooks/useAuth";
import useLogout from "../../../hooks/useLogout";

function HeaderMenu() {
   const { auth } = useAuth();
   const logout = useLogout();

   const signOut = async () => {
      if (auth?.accessToken) {
         await logout();
      }
   };
   return (
      <div className="wallHub__header-menu">
         <h4>None</h4>
         <div className="wallHub__header-menu_links">
            <Link to={"/profile"}>Profile</Link>
         </div>
         <hr />
         <div className="wallHub__header-menu_options">
            <Link to={"/help"}>
               <RiQuestionLine color="000" /> Help
            </Link>
            <Link onClick={() => signOut()}>
               <RiLogoutBoxLine color="000" /> Logout
            </Link>
         </div>
      </div>
   );
}

export default HeaderMenu;
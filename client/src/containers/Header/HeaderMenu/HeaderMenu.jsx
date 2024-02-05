import React from 'react';
import { Link } from 'react-router-dom';
import { RiQuestionLine, RiLogoutBoxLine } from 'react-icons/ri';
import { FiUpload } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import './headerMenu.css';
import useLogout from '../../../hooks/useLogout';

function HeaderMenu() {
   const accessToken = useSelector((state) => state.user.token);
   const logout = useLogout();

   const signOut = async () => {
      if (accessToken) {
         await logout();
      }
   };
   return (
      <div className="wallHub__header-menu">
         <h4>None</h4>
         <div className="wallHub__header-menu_links">
            <Link to={'/profile'}>Profile</Link>
         </div>
         <hr />
         <div className="wallHub__header-menu_options">
            <Link to={'/upload-post'}>
               <FiUpload color="000" /> Upload
            </Link>
            <Link to={'/help'}>
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

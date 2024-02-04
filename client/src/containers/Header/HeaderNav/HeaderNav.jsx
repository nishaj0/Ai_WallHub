import React from 'react';
import './headerNav.css';
import { Link } from 'react-router-dom';
import { RiAccountCircleFill } from 'react-icons/ri';

import HeaderMenu from '../HeaderMenu/HeaderMenu';

function HeaderNav({ isTransparent, isLogged, toggleMenu, setToggleMenu }) {
   return (
      <nav className="wallHub__nav">
         {isLogged ? (
            <>
               <Link to="/upload-post" className="wallHub__nav-upload">
                  Upload
               </Link>
               <button onClick={() => setToggleMenu((prev) => !prev)} className="wallHub__nav-icon">
                  <RiAccountCircleFill color={toggleMenu ? '#808080' : isTransparent ? '#f8f8f8' : '#333'} size={30} />
               </button>
               {toggleMenu && <HeaderMenu />}
            </>
         ) : (
            <div className="wallHub__nav-button">
               <div className="wallHub__nav-links">
                  <Link to="/login">login</Link>
               </div>
               <Link to="/signup" className="wallHub__nav-signup">
                  <button>Sign up</button>
               </Link>
               <Link to="/login" className="wallHub__nav-login">
                  <button>Login</button>
               </Link>
            </div>
         )}
      </nav>
   );
}

export default HeaderNav;

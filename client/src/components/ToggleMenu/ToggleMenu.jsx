import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './toggleMenu.css';

function ToggleMenu({ showHeader = false, children, className }) {
   const user = useSelector((state) => state.user.user);

   return (
      <div className={'wallHub_menu ' + className}>
         {showHeader && (
            <>
               <h4>{user}</h4>
               <div className="wallHub_menu-links">
                  <Link to={'/profile'}>Profile</Link>
               </div>
               <hr />
            </>
         )}
         <div className="wallHub_menu-options">{children}</div>
      </div>
   );
}

export default ToggleMenu;

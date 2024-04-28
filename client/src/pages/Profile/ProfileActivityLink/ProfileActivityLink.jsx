import { NavLink } from 'react-router-dom';
import './profileActivityLink.css';

function ProfileActivityLink({to, children}) {
   return (
      <NavLink
         to={to}
         className="wallHub__profile-activity_button"
         style={({ isActive }) => {
            return {
               // ? --main-sky-blue: #33a1de;
               // ? --main-color-light: #f8f8f8;
               backgroundColor: isActive && '#333',
               color: isActive && '#f8f8f8',
            };
         }}
      >
         {children}
      </NavLink>
   );
}

export default ProfileActivityLink;

import { Link } from 'react-router-dom';
import { RiAccountCircleFill } from 'react-icons/ri';
import './headerNav.css';
import { BlueButton } from '../../../components';

function HeaderNav({ isTransparent, isLogged, toggleMenu, setToggleMenu, children }) {
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
               {children}
            </>
         ) : (
            <div className="wallHub__nav-button">
               <div className="wallHub__nav-links">
                  <Link to="/login">login</Link>
               </div>
               <Link to="/signup" className="wallHub__nav-signup">
                  <BlueButton>Sign up</BlueButton>
               </Link>
               <Link to="/login" className="wallHub__nav-login">
                  <BlueButton>Login</BlueButton>
               </Link>
            </div>
         )}
      </nav>
   );
}

export default HeaderNav;

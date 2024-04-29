import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiUpload } from 'react-icons/fi';
import { RiLogoutBoxLine, RiQuestionLine } from 'react-icons/ri';
import './header.css';
import HeaderSearchBar from './HeaderSearchBar/HeaderSearchBar';
import HeaderNav from './HeaderNav/HeaderNav';
import { ToggleMenu } from '../../components';
import useScreenWidth from '../../hooks/useScreenWidth';
import useLogout from '../../hooks/useLogout';
import logoImgDark from '../../assets/images/logo/main-logo_dark.svg';
import logoImgLight from '../../assets/images/logo/main-logo_light.svg';
import miniLogo from '../../assets/images/logo/mini-logo.png';

function Header() {
   const [toggleMenu, setToggleMenu] = useState(false);
   const [isNavAtTop, setIsNavAtTop] = useState(true);
   const [isTransparent, setIsTransparent] = useState(true);

   let screenSize = useScreenWidth();
   const location = useLocation();
   const logout = useLogout();
   const currentPath = location.pathname;

   // ? here "wallHub__header-transparent" class used to give transparent background to the header when it is at the top
   const transparentNavClass = 'wallHub__header-transparent';
   const defaultNavClass = 'wallHub__header-default';

   const token = useSelector((state) => state.user.token);

   const handleSignOut = async () => {
      // ? if user is logged in then logout
      if (!!token) {
         await logout();
      }
   };

   // ? turn off toggle menu when route is change
   useEffect(() => {
      setToggleMenu(false);
   }, [location]);

   useEffect(() => {
      // ? check header at top
      const handleScroll = () => {
         const scrollTop = window.scrollY;
         if (scrollTop > 60) {
            setIsNavAtTop(false);
            setIsTransparent(false);
         } else {
            setIsNavAtTop(true);
            setIsTransparent(true);
         }
      };

      // ? adding event listener to handle header's transparency
      if (currentPath === '/') {
         window.addEventListener('scroll', handleScroll);
         return () => {
            window.removeEventListener('scroll', handleScroll);
         };
      } else {
         setIsTransparent(false);
      }
   }, [isNavAtTop, location]);

   return (
      <div className={'header__container' + ' ' + (isTransparent ? transparentNavClass : defaultNavClass)}>
         <div className="wallHub__header container">
            <div className="wallHub__header-main">
               <Link to="/" className="wallHub__header__logo">
                  <img
                     src={screenSize === 'small' ? miniLogo : isTransparent ? logoImgLight : logoImgDark}
                     alt="Logo Image"
                  />
               </Link>
               {!isTransparent && <HeaderSearchBar />}
               <HeaderNav
                  isTransparent={isTransparent}
                  isLogged={!!token}
                  toggleMenu={toggleMenu}
                  setToggleMenu={setToggleMenu}
               >
                  {toggleMenu && (
                     <ToggleMenu showHeader={true} className="wallHub__header-menu">
                        <Link to={'/upload-post'}>
                           <FiUpload color="000" /> Upload
                        </Link>
                        <Link to={'/help'}>
                           <RiQuestionLine color="000" /> Help
                        </Link>
                        <Link onClick={() => handleSignOut()} className="wallHub__header-menu-link-hover-red">
                           <RiLogoutBoxLine color="000" /> Logout
                        </Link>
                     </ToggleMenu>
                  )}
               </HeaderNav>
            </div>
         </div>
      </div>
   );
}

export default Header;

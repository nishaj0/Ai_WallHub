import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './header.css';
import logoImgDark from '../../assets/images/logo/main-logo_dark.svg';
import logoImgLight from '../../assets/images/logo/main-logo_light.svg';
import miniLogo from '../../assets/images/logo/mini-logo.png';
import HeaderSearchBar from './HeaderSearchBar/HeaderSearchBar';
import HeaderNav from './HeaderNav/HeaderNav';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import useScreenWidth from '../../hooks/useScreenWidth';

function Header() {
   const [toggleMenu, setToggleMenu] = useState(false);
   const [isNavAtTop, setIsNavAtTop] = useState(true);
   const [isTransparent, setIsTransparent] = useState(true);

   let screenSize = useScreenWidth();
   const location = useLocation();
   const currentPath = location.pathname;

   // ? here "wallHub__header-transparent" class used to give transparent background to the header when it is at the top
   const transparentNavClass = 'wallHub__header-transparent';
   const defaultNavClass = 'wallHub__header-default';

   const token = useSelector((state) => state.user.token);

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
                  {toggleMenu && <HeaderMenu isLogged={!!token} />}
               </HeaderNav>
            </div>
         </div>
      </div>
   );
}

export default Header;

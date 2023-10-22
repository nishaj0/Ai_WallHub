import React from 'react';
import './header.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logoImgDark from '../../assets/images/logo/main-logo_dark.svg';
import logoImgLight from '../../assets/images/logo/main-logo_light.svg';
import miniLogo from '../../assets/images/logo/mini-logo.png';

import HeaderNav from './HeaderNav/HeaderNav';
import HeaderSearchBar from './HeaderSearchBar/HeaderSearchBar';

import useAuth from '../../hooks/useAuth';
import useScreenWidth from '../../hooks/useScreenWidth';

function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isNavAtTop, setIsNavAtTop] = useState(true);
  const [isTransparent, setIsTransparent] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // ? here "wallHub__header-transparent" class used to give transparent background to the header when it is at the top
  const transparentNavClass = 'wallHub__header-transparent';
  const defaultNavClass = 'wallHub__header-default';

  const { auth } = useAuth();
  let screenSize = useScreenWidth();

  useEffect(() => {
    if (auth?.accessToken) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
    // console.log([auth?.accessToken]);
    // console.log({ isLogged });
  }, [auth]);

  // ? turn off toggle menu when route is change
  useEffect(() => {
    setToggleMenu(false);
  }, [location]);

  useEffect(() => {
    // ? this function used to check if the header is at the top or not
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

    // ? if the current path is "/" then it will add the event listener otherwise it will not
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
    <div
      className={
        'header__container' +
        ' ' +
        (isTransparent ? transparentNavClass : defaultNavClass)
      }
    >
      <div className="wallHub__header container">
        <div className="wallHub__header-main">
          <Link to="/" className="wallHub__header__logo">
            <img
              src={
                screenSize === 'small'
                  ? miniLogo
                  : isTransparent
                  ? logoImgLight
                  : logoImgDark
              }
              alt="Logo Image"
            />
          </Link>
          {!isTransparent && <HeaderSearchBar />}
          <HeaderNav
            isTransparent={isTransparent}
            isLogged={isLogged}
            toggleMenu={toggleMenu}
            setToggleMenu={setToggleMenu}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

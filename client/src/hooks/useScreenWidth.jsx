import React from 'react';
import { useState, useEffect } from 'react';

const checkScreenSize = () => {
  if (window.innerWidth <= 550) {
    return 'small';
  } else if (window.innerWidth <= 768) {
    return 'medium';
  } else {
    return 'large';
  }
};

function useScreenWidth() {
  const [screenSize, setScreenSize] = useState(checkScreenSize());
  useEffect(() => {
    // adding event lister for check screen size
    const handleResize = () => {
      if (window.innerWidth <= 550) {
        setScreenSize('small');
      } else if (window.innerWidth <= 768) {
        setScreenSize('medium');
      } else {
        setScreenSize('large');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
}

export default useScreenWidth;

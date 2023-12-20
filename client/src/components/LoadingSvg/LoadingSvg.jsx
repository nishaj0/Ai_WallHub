import React from 'react';
import './loadingSvg.css';

import svg from '../../assets/svg/loading-svg-rolling.svg';

function LoadingSvg({ children }) {
  return (
    <div className="wallHub__loadingSvg">
      <img className="wallHub__loadingSvg-image" src={svg} alt="loading svg" />
      {children && <h3>{children}</h3>}
    </div>
  );
}

export default LoadingSvg;

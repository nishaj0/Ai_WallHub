import React, { useEffect, useState } from 'react';
import './wallpaper.css';

import { useParams } from 'react-router-dom';
import { RiUserFill } from 'react-icons/ri';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';

import useScreenWidth from '../../hooks/useScreenWidth';

function Wallpaper() {
  const [customProfile, setCustomProfile] = useState(false);
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [imageDetails, setImageDetails] = useState({});
  const { id: imageId } = useParams();
  let screenSize = useScreenWidth();

  useEffect(() => {}, []);

  return (
    <div className="wallHub__wallpaper">
      <div className="wallHub__wallpaper-image_container">
        <img
          className="wallHub__wallpaper-image"
          // style={{
          //   width: imageDetails.width > imageDetails.height ? '100%' : 'auto',
          //   height: imageDetails.width > imageDetails.height ? 'auto' : '100%',
          // }}
          // src="https://res.cloudinary.com/dvsi6ulf3/image/upload/v1701268673/wallHub/wallpapers/ejtjdhvsk87t2lk6gcak.jpg"
          src="https://res.cloudinary.com/dvsi6ulf3/image/upload/v1700900100/wallHub/wallpapers/rnuyvqjo46swwa3g4w7c.png"
          alt="wallpaper image"
        />
      </div>
      <div className="wallHub__wallpaper-info">
        <div className="wallHub__wallpaper-button-container">
          <div className="wallHub__wallpaper-button-like_container">
            {isUserLiked ? <IoMdHeart /> : <IoIosHeartEmpty />}
            <p>203</p>
          </div>
          <button className="wallHub__wallpaper-button-download">Download</button>
        </div>
        <h2 className="wallHub__wallpaper-title">title</h2>
        <h4 className="wallHub__wallpaper-prompt">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem odio ipsa praesentium, deleniti nihil
          perferendis id non, atque necessitatibus animi facilis laborum pariatur aliquid maxime tenetur tempore ratione
          provident repudiandae.
        </h4>
        <div className="wallHub__wallpaper-about">
          <p>
            posted by: <a href="#">user031</a>
          </p>
          <p>upload date: 1/01/2020</p>
          <p>size: 300x900</p>
        </div>
      </div>
    </div>
  );
}

export default Wallpaper;

import React, { useEffect, useState } from 'react';
import './wallpaper.css';

import { useParams } from 'react-router-dom';
import { RiUserFill } from 'react-icons/ri';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';
import { saveAs } from 'file-saver';

import useScreenWidth from '../../hooks/useScreenWidth';
import axios from '../../api/axios';

function Wallpaper() {
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [imageDetails, setImageDetails] = useState({});
  const [abortController, setAbortController] = useState(null);
  const { id: imageId } = useParams();
  let screenSize = useScreenWidth();

  useEffect(() => {
    const controller = new AbortController();
    setAbortController(controller);
    const fetchImageDetails = async () => {
      try {
        const response = await axios.get(`/image/${imageId}`, {
          signal: controller.signal,
        });
        setImageDetails(response.data.imageDetails);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImageDetails();
    return () => {
      if (abortController) controller.abort();
    };
  }, []);

  // ? download image when user click download button
  const downloadImage = () => {
    saveAs(imageDetails.publicImgUrl, imageDetails.title);
  };

  return (
    <div className="wallHub__wallpaper">
      <div className="wallHub__wallpaper-image_container">
        <img className="wallHub__wallpaper-image" src={imageDetails.publicImgUrl} alt="wallpaper image" />
      </div>
      <div className="wallHub__wallpaper-info">
        <div className="wallHub__wallpaper-button-container">
          <div className="wallHub__wallpaper-button-like_container">
            {isUserLiked ? <IoMdHeart /> : <IoIosHeartEmpty />}
            <p>203</p>
          </div>
          <button className="wallHub__wallpaper-button-download" onClick={downloadImage}>
            Download
          </button>
        </div>
        <h2 className="wallHub__wallpaper-title">{imageDetails.title}</h2>
        <h4 className="wallHub__wallpaper-prompt">{imageDetails.prompt}</h4>
        <div className="wallHub__wallpaper-about">
          <p>
            posted by: <a href="#">{imageDetails.userEmail}</a>
          </p>
          <p>upload date:{imageDetails.date}</p>
          <p>
            size: {imageDetails.width}x{imageDetails.height}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Wallpaper;

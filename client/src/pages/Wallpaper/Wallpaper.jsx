import React, { useEffect, useState } from 'react';
import './wallpaper.css';

import { useParams } from 'react-router-dom';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';
import { saveAs } from 'file-saver';

import useScreenWidth from '../../hooks/useScreenWidth';
import axios from '../../api/axios';
import { LoadingSvg } from '../../components';

function Wallpaper() {
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [imageDetails, setImageDetails] = useState({});
  const [abortController, setAbortController] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        // await delay(30000);
        setImageDetails(response.data.imageDetails);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
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

  // ? convert to useful date format
  const convertDate = (date) => {
    if (imageDetails) {
      let dateObj = new Date(date);
      let month = dateObj.getMonth() + 1;
      let day = dateObj.getDate();
      let year = dateObj.getFullYear();
      let newDate = `${day}/${month}/${year}`;
      return newDate;
    }
  };
  return (
    <div className="wallHub__wallpaper">
      {isLoading ? (
        <LoadingSvg />
      ) : (
        <>
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
              <p>upload date: {convertDate(imageDetails.date)}</p>
              <p>
                size: {imageDetails.width}x{imageDetails.height}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Wallpaper;

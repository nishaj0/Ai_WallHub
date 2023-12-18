import React from 'react';
import { useEffect, useState } from 'react';

import { useSearchParams, useNavigate } from 'react-router-dom';
import PhotoAlbum from 'react-photo-album';

import './search.css';
import { SearchTag } from '../../components';
import axios from '../../api/axios';
import loadingSvg from '../../assets/svg/loading-svg-rolling.svg';

const SEARCH_URL = '/search';

function Search() {
  const [fetchedImages, setFetchedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [abortController, setAbortController] = useState(null);
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');
  const navigate = useNavigate();

  // ? this will fetch the images from the server
  // ? and convert to the format that react-photo-album accepts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = new AbortController();
        setAbortController(controller);

        const response = await axios.post(SEARCH_URL, { searchKeyword }, { signal: controller.signal });

        // ? giving manual delay
        // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        // await delay(3000);

        // console.log(response);

        const transformedData = response.data.searchImages.map((img, index) => ({
          key: img._id,
          src: img.publicImgUrl,
          width: img.width,
          height: img.height,
        }));
        setFetchedImages(transformedData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [searchKeyword]);

  return (
    <div className="wallHub__search">
      <div className="wallHub__search-header">
        <h2>{searchKeyword.charAt(0).toUpperCase() + searchKeyword.slice(1)}</h2>
        <p>Discover and download our AI-generated wallpapers.</p>
      </div>
      <div className="wallHub__search-tags" style={{ display: isLoading ? 'none' : 'flex' }}>
        <SearchTag searchText={'phone'} content={'Phone'} />
        <SearchTag searchText={'pc'} content={'PC'} />
        <SearchTag searchText={'nature'} content={'Nature'} />
        <SearchTag searchText={'landscape'} content={'Landscape'} />
      </div>
      {/* image gallery */}
      {isLoading ? (
        <div className="wallHub__search-loading">
          <img className="wallHub__search-loading_svg" src={loadingSvg} alt="loading svg" />
        </div>
      ) : (
        <div className="wallHub__search-images">
          <PhotoAlbum
            layout="masonry"
            photos={fetchedImages}
            columns={(containerWidth) => {
              if (containerWidth < 550) return 1;
              if (containerWidth < 768) return 3;
            }}
            onClick={(e) => navigate(`/image/${e.photo.key}`)}
          />
        </div>
      )}
    </div>
  );
}

export default Search;

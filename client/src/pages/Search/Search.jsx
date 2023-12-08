import React from 'react';
import { useEffect, useState } from 'react';

import { useSearchParams, Link } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import PhotoAlbum from "react-photo-album";

import './search.css';
import { SearchTag } from '../../components';
import axios from '../../api/axios';

function Search() {
  // using searchparams
  const [searchResult, setSearchResult] = useState([
    {
      title: 'jean at liyue',
      publicImgUrl:
        'https://res.cloudinary.com/dvsi6ulf3/image/upload/v1700900205/wallHub/wallpapers/yjkym6ddnptjvawm6cka.png',
      prompt: '1girl, blue sky, blue and white dress, liyue',
      hashTags: ['genshin,jean'],
      width: 480,
      height: 720,
    },
    {
      title: 'jean with new outfit',
      publicImgUrl:
        'https://res.cloudinary.com/dvsi6ulf3/image/upload/v1700900100/wallHub/wallpapers/rnuyvqjo46swwa3g4w7c.png',
      prompt: '1girl, blue sky, blonde hair',
      hashTags: ['genshin,jean,genshin-impact,girl'],
      width: 480,
      height: 720,
    },
    {
      title: 'Tokyo night',
      publicImgUrl:
        'https://res.cloudinary.com/dvsi6ulf3/image/upload/v1701268488/wallHub/wallpapers/xrpldga5l5yptlr7g6ma.jpg',
      prompt: 'tokyo night view, glowing lights, street',
      hashTags: ['tokyo,city,glowing'],
      width: 2016,
      height: 1120,
    },
    {
      title: 'skye from valorant',
      publicImgUrl:
        'https://res.cloudinary.com/dvsi6ulf3/image/upload/v1701267224/wallHub/wallpapers/touh2vgmn3v4dfjlkqxs.png',
      prompt: '1girl, orange hair, white mountain on background',
      hashTags: ['valorant,green,skye,mountain'],
      width: 1024,
      height: 1808,
    },
    {
      title: 'Night view of Japanese Shrine',
      publicImgUrl:
        'https://res.cloudinary.com/dvsi6ulf3/image/upload/v1701267971/wallHub/wallpapers/fchvrzxhiyk3c4q7pqsl.jpg',
      prompt: 'night view of japanese shrine, sakura tree on background',
      hashTags: ['japanese,shrine,night,dark'],
      width: 1176,
      height: 2072,
    },
    {
      title: 'night view of large mountain',
      publicImgUrl:
        'https://res.cloudinary.com/dvsi6ulf3/image/upload/v1701268673/wallHub/wallpapers/ejtjdhvsk87t2lk6gcak.jpg',
      prompt: 'night view of large mountain, high quality, realistic',
      hashTags: ['mountain,sky,night'],
      width: 3072,
      height: 1024,
    },
    {
      title: 'purple world',
      publicImgUrl:
        'https://res.cloudinary.com/dvsi6ulf3/image/upload/v1701268245/wallHub/wallpapers/rjzjgzumiexibosubgiz.jpg',
      prompt: 'world of electro, purple theme world, large mountains',
      hashTags: ['purple,electro,mountains'],
      width: 512,
      height: 904,
    },
  ]);

  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');

  const SEARCH_URL = '/search';

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.post(SEARCH_URL, { searchKeyword }, { signal: controller.signal });
        console.log(response.data);
        isMounted && setSearchResult(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request cancelled:', err.message);
        } else {
          console.error(err);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const images = searchResult.map((img, index) => ({
    src: img.publicImgUrl,
    width: img.width,
    height: img.height,
  }));

  console.log(images)

  return (
    <div className="wallHub__search">
      <div className="wallHub__search-header">
        <h2>
          {
            //converting first letter to capital
            searchKeyword.charAt(0).toUpperCase() + searchKeyword.slice(1)
          }
        </h2>
        <p>Discover and download our AI-generated wallpapers.</p>
      </div>
      <div className="wallHub__search-tags">
        <SearchTag searchText={'phone'} content={'Phone'} />
        <SearchTag searchText={'pc'} content={'PC'} />
        <SearchTag searchText={'nature'} content={'Nature'} />
        <SearchTag searchText={'landscape'} content={'Landscape'} />
      </div>
      <div className="wallHub__search-images">
        {/* wallpaper gallery */}
      <PhotoAlbum layout='masonry' photos={images} />
      </div>
    </div>
  );
}

export default Search;

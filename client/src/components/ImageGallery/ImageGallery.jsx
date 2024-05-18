import PhotoAlbum from 'react-photo-album';
import { formatToGalleryData } from '../../utils';
import './imageGallery.css';
import { CiImageOff } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import LoadingSvg from '../LoadingSvg/LoadingSvg';

function ImageGallery({
   className,
   images,
   isLoading,
   layout = 'masonry',
   noResultTitle = 'No images found!',
   noResultDescription,
   ...restProps
}) {
   const navigate = useNavigate();
   return (
      <div className={'wallHub__imageGallery ' + className}>
         {isLoading ? (
            <LoadingSvg />
         ) : !images ? (
            <div className="wallHub__imageGallery-noResult">
               <h3>{noResultTitle}</h3>
               {noResultDescription && <p>{noResultDescription}</p>}
               <CiImageOff size={40} color="#1b8dca" />
            </div>
         ) : (
            <PhotoAlbum
               layout={layout}
               photos={formatToGalleryData(images)}
               componentsProps={{
                  imageProps: {
                     loading: 'lazy',
                  },
               }}
               columns={(containerWidth) => {
                  if (containerWidth < 550) return 1;
                  if (containerWidth < 768) return 3;
               }}
               onClick={(e) => navigate(`/image/${e.photo.key}`)}
               {...restProps}
            />
         )}
      </div>
   );
}

export default ImageGallery;

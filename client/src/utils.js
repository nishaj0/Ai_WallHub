export const isSmallScreen = () => {
   if (window.innerWidth <= 550) {
      return 'small';
   } else if (window.innerWidth <= 768) {
      return 'medium';
   } else {
      return 'large';
   }
};

export const formatToGalleryData = (fetchedPosts) => {
   const transformedData = fetchedPosts.map((img) => ({
      key: img._id,
      src: img.url,
      width: img.width,
      height: img.height,
   }));
   return transformedData;
};

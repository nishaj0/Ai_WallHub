export const isSmallScreen = () => {
   if (window.innerWidth <= 550) {
      return "small";
   } else if (window.innerWidth <= 768) {
      return "medium";
   } else {
      return "large";
   }
};

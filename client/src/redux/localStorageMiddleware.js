const localStorageMiddleware = ({ getState }) => {
   return (next) => (action) => {
      const result = next(action);
      localStorage.setItem('persist', JSON.stringify(getState().persist));
      return result
   };
};

export default localStorageMiddleware
import { useDispatch } from 'react-redux';
import axios from '../api/axios';
import { removeUser } from '../redux/user/userSlice';

const useLogout = () => {
   const dispatch = useDispatch();

   const logout = async () => {
      try {
         const response = await axios('/logout', {
            withCredentials: true,
         });
         dispatch(removeUser());
      } catch (err) {
         console.error(err);
      }
   };

   return logout;
};

export default useLogout;

import { useDispatch } from 'react-redux';
import axios from '../api/axios';
import { removeUser } from '../redux/user/userSlice';
import { setPersistFalse } from '../redux/persist/persistSlice';

const useLogout = () => {
   const dispatch = useDispatch();

   const logout = async () => {
      try {
         const response = await axios('/api/auth/logout', {
            withCredentials: true,
         });
         dispatch(removeUser());
         dispatch(setPersistFalse())
      } catch (err) {
         console.error(err);
      }
   };

   return logout;
};

export default useLogout;

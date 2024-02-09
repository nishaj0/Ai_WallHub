import { useSelector, useDispatch } from 'react-redux';
import axios from '../api/axios';
import { setUser } from '../redux/user/userSlice';

const useRefreshToken = () => {
   const dispatch = useDispatch();
   const refresh = async () => {
      const response = await axios.get('/api/auth/refresh', {
         withCredentials: true,
      });
      dispatch(setUser({ user: response.data.username, token: response.data.accessToken }));
      return response.data.accessToken;
   };
   return refresh;
};

export default useRefreshToken;

import axios from 'axios';
const BASE_URL = 'http://localhost:5000/';

export default axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
});

export const axiosPrivate = axios.create({
   baseURL: BASE_URL,
   withCredentials: true,
});

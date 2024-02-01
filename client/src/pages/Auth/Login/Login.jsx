import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './login.css';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';
import FormError from '../../../components/FormError/FormError';
import { GoogleSignButton, InputBox } from '../../../components';

const LOGIN_URL = '/login';

function Login() {
   const [errorMessage, setErrorMessage] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const navigate = useNavigate();
   const location = useLocation();
   const { setAuth, persist, setPersist } = useAuth();

   const from = location.state?.from?.pathname || '/';

   useEffect(() => {
      localStorage.setItem('persist', persist);
   }, [persist]);

   const togglePersist = () => {
      setPersist((prev) => !prev);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'email') {
         setEmail(value);
         console.log(email);
      } else if (name === 'password') {
         setPassword(value);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         const res = await axios.post(LOGIN_URL, JSON.stringify({ email, password }), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
         });
         setAuth({ email: res.data.email, accessToken: res.data.accessToken });
         navigate(from, { replace: true });
      } catch (err) {
         if (!err?.response) {
            setErrorMessage('no Server Response');
         } else if (err.response?.status === 400) {
            setErrorMessage('missing email or password');
         } else if (err.response?.status === 401) {
            setErrorMessage('email or password not match');
         } else {
            setErrorMessage('login failed');
         }
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="wallHub__login">
         <div className="wallHub__login-head">
            <h2>Welcome back</h2>
         </div>
         <div className="wallHub__login-container">
            <form onSubmit={handleSubmit}>
               <InputBox
                  id="wallHub__login-email"
                  label={'Email'}
                  name="email"
                  placeholder="john.doe@example.com"
                  type="email"
                  required
                  value={email}
                  onChange={handleChange}
               />
               <InputBox
                  id="wallHub__login-password"
                  name="password"
                  placeholder="••••••••••••••"
                  label={'Password'}
                  link={{ to: '/', text: 'forgot?' }}
                  type={'password'}
                  marginTop={1}
                  required
                  value={password}
                  onChange={handleChange}
               />
               {errorMessage && <FormError errorMessage={errorMessage} />}
               <button disabled={isSubmitting} type="submit">
                  {isSubmitting ? 'logging...' : 'Log in'}
               </button>
               <div className="wallHub__login-checkbox">
                  <input type="checkbox" id="persist" onChange={togglePersist} checked={persist} />
                  <label htmlFor="persist">Trust this device</label>
               </div>
            </form>
            <hr className="wallHub__login-hr" />
            <GoogleSignButton />
            <Link className="wallHub__login-link_signup" to={'/signup'}>
               Don't have an account?
            </Link>
         </div>
      </div>
   );
}

export default Login;

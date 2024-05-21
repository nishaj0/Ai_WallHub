import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './login.css';
import axios from '../../../api/axios';
import FormError from '../../../components/FormError/FormError';
import { GoogleSignButton, InputBox, BlueButton } from '../../../components';
import { AuthPageContainer } from '../../../containers';
import { setUser } from '../../../redux/user/userSlice';
import { togglePersist } from '../../../redux/persist/persistSlice';

function Login() {
   const [errorMessage, setErrorMessage] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();
   const persist = useSelector((state) => state.persist);

   const from = location.state?.from?.pathname || '/';
   const LOGIN_URL = '/api/auth/login';

   const togglePersistValue = () => {
      dispatch(togglePersist());
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'email') {
         setEmail(value);
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
         dispatch(setUser({ user: res.data.username, userId: res.data.userId, token: res.data.accessToken }));
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
      <AuthPageContainer title={'Welcome Back!'}>
         <form className='wallHub__login-form' onSubmit={handleSubmit}>
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
            <BlueButton
               width={'100%'}
               height={'var(--login-input-y)'}
               marginTop={'1.75rem'}
               disabled={isSubmitting}
               type="submit"
            >
               {isSubmitting ? 'logging...' : 'Log in'}
            </BlueButton>
            <div className="wallHub__login-checkbox">
               <input type="checkbox" id="persist" onChange={togglePersistValue} checked={persist} />
               <label htmlFor="persist">Trust this device</label>
            </div>
         </form>
         <hr className="wallHub__login-hr" />
         <GoogleSignButton />
         <Link className="wallHub__login-link_signup" to={'/signup'}>
            Don't have an account?
         </Link>
      </AuthPageContainer>
   );
}

export default Login;

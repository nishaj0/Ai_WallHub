import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './signup.css';
import axios from '../../../api/axios';
import FormError from '../../../components/FormError/FormError';
import { GoogleSignButton, InputBox } from '../../../components';
import { setUser } from '../../../redux/user/userSlice';
import { togglePersist } from '../../../redux/persist/persistSlice';

function Signup() {
   const [errorMessage, setErrorMessage] = useState(false);
   const [formData, setFormData] = useState({ fullName: '', username: '', email: '' });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [passwordData, setPasswordData] = useState({
      tempPassword: '',
      password: '',
   });

   const navigate = useNavigate();
   const location = useLocation();

   const dispatch = useDispatch();
   const persist = useSelector((state) => state.persist);

   const from = location.state?.from?.pathname || '/';
   const SIGNUP_URL = '/api/auth/register';

   useEffect(() => {
      setErrorMessage(passwordData.password !== passwordData.tempPassword ? 'Password not matched' : false);
   }, [passwordData]);

   const togglePersistValue = () => {
      dispatch(togglePersist());
   };

   const handlePassword = (e) => {
      setPasswordData((prevPassword) => ({
         ...prevPassword,
         [e.target.name]: e.target.value,
      }));
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
         ...prevFormData,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         const res = await axios.post(SIGNUP_URL, JSON.stringify({ ...formData, password: passwordData.password }), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
         });
         dispatch(setUser({ user: res.data.username, token: res.data.accessToken }));
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
      <div className="wallHub__signup">
         <div className="wallHub__signup-head">
            <h2>Create your account</h2>
         </div>
         <div className="wallHub__signup-container">
            <form onSubmit={handleSubmit}>
               <InputBox
                  id="wallHub__signup-name"
                  label={'Full Name'}
                  name="fullName"
                  placeholder="John Doe"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
               />
               <InputBox
                  id="wallHub__signup-username"
                  label={'User Name'}
                  name="username"
                  placeholder="john.doe"
                  type="text"
                  pattern="^[a-z][a-z0-9_.]{3,15}$"
                  title="username must be 3-15 characters long and does not contain any space."
                  marginTop={1}
                  required
                  value={formData.username}
                  onChange={handleChange}
               />
               <InputBox
                  id="wallHub__signup-email"
                  label={'Email address'}
                  name="email"
                  placeholder={'john.doe@example.com'}
                  type="email"
                  marginTop={1}
                  required
                  value={formData.email}
                  onChange={handleChange}
               />
               <InputBox
                  id="wallHub__signup-password"
                  label='Password'
                  name="password"
                  placeholder="Enter password"
                  type='password'
                  pattern="^\S{8,16}$"
                  title="Password must be least 8-16 characters long and does not contain any space."
                  required
                  marginTop={1}
                  value={passwordData.password}
                  onChange={handlePassword}
               />
               <InputBox
                  id="wallHub__signup-confirmPassword"
                  name="tempPassword"
                  placeholder="Confirm Password"
                  type='password'
                  pattern="^\S{8,16}$"
                  title="Password must be least 8-16 characters long and does not contain any space."
                  required
                  value={passwordData.tempPassword}
                  onChange={handlePassword}
               />
               {errorMessage && <FormError errorMessage={errorMessage} />}
               <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing...' : 'Sign up'}
               </button>
               <div className="wallHub__login-checkbox">
                  <input type="checkbox" id="persist" onChange={togglePersistValue} checked={persist} />
                  <label htmlFor="persist">Trust this device</label>
               </div>
               <p className="wallHub__signup-agreement_p">
                  By registering, you agree to aiWallHub's <Link to={'/terms-condition'}>Terms and Condition</Link> and{' '}
                  <Link to={'/privacy-policy'}>Privacy and Policy</Link>
               </p>
            </form>
            <hr className="wallHub__signup-hr" />
            <GoogleSignButton />
            <Link className="wallHub__signup-link_login" to={'/login'}>
               Already have an account?
            </Link>
         </div>
      </div>
   );
}

export default Signup;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import './signup.css';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';
import FormError from '../../../components/FormError/FormError';
import { GoogleSignButton } from '../../../components';

const SIGNUP_URL = '/register';

function Signup() {
   const [isEyeToggle, setIsEyeToggle] = useState(true);
   const [errorMessage, setErrorMessage] = useState(false);
   const [formData, setFormData] = useState({ name: '', username: '', email: '' });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [passwordData, setPasswordData] = useState({
      tempPassword: '',
      password: '',
   });

   const navigate = useNavigate();
   const location = useLocation();

   const { setAuth, persist, setPersist } = useAuth();
   const from = location.state?.from?.pathname || '/';

   useEffect(() => {
      setErrorMessage(passwordData.password !== passwordData.tempPassword ? 'Password not matched' : false);
   }, [passwordData]);

   useEffect(() => {
      localStorage.setItem('persist', persist);
   }, [persist]);

   const togglePersist = () => {
      setPersist((prev) => !prev);
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
      <div className="wallHub__signup">
         <div className="wallHub__signup-head">
            <h2>Create your account</h2>
         </div>
         <div className="wallHub__signup-container">
            <form onSubmit={handleSubmit}>
               <div className="wallHub__signup-label_container">
                  <label htmlFor="wallHub__signup-name">Full Name</label>
               </div>
               <input
                  id="wallHub__signup-name"
                  className="wallHub__signup-name"
                  name="name"
                  placeholder="John Doe"
                  type="name"
                  onChange={handleChange}
                  required
               />
               <div className="wallHub__signup-label_container">
                  <label htmlFor="wallHub__signup-name">User Name</label>
               </div>
               <input
                  id="wallHub__signup-username"
                  className="wallHub__signup-username"
                  name="username"
                  placeholder="john.doe"
                  type="username"
                  onChange={handleChange}
                  required
               />
               <div className="wallHub__signup-label_container">
                  <label htmlFor="wallHub__signup-email">Email address</label>
               </div>
               <input
                  id="wallHub__signup-email"
                  className="wallHub__signup-email"
                  name="email"
                  placeholder="john.doe@example.com"
                  type="email"
                  onChange={handleChange}
                  required
               />
               <div className="wallHub__signup-label_container">
                  <label htmlFor="wallHub__signup-password">Password</label>
               </div>
               <div className="wallHub__signup-password_container">
                  <input
                     onChange={handlePassword}
                     name="tempPassword"
                     className="wallHub__signup-password"
                     placeholder="Enter password"
                     type={isEyeToggle ? 'password' : 'text'}
                     pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                     title="Password must be at least 8 characters long and contain at least one letter and one number"
                     required
                  />
                  <span className="wallHub__signup-password_eye-span" onClick={() => setIsEyeToggle((prev) => !prev)}>
                     {isEyeToggle ? <RiEyeOffLine color="#333" size={23} /> : <RiEyeLine color="#333" size={23} />}
                  </span>
               </div>
               <div className="wallHub__signup-password_container">
                  <input
                     onChange={handlePassword}
                     className="wallHub__signup-password"
                     name="password"
                     placeholder="Confirm password"
                     type={isEyeToggle ? 'password' : 'text'}
                     required
                  />
                  <span className="wallHub__signup-password_eye-span" onClick={() => setIsEyeToggle((prev) => !prev)}>
                     {isEyeToggle ? <RiEyeOffLine color="#333" size={23} /> : <RiEyeLine color="#333" size={23} />}
                  </span>
               </div>
               {errorMessage && <FormError errorMessage={errorMessage} />}
               <button disabled={isSubmitting}>{isSubmitting ? 'Signing...' : 'Sign up'}</button>
               <div className="wallHub__login-checkbox">
                  <input type="checkbox" id="persist" onChange={togglePersist} checked={persist} />
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

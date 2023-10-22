// ! this component is not working properly
// * this component is not used in the project
// ? this component is for future use

import React from 'react';
import './loginOtp.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine, RiGoogleFill } from 'react-icons/ri';

function LoginOtp() {
  const [isEyeToggle, setIsEyeToggle] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleFormData = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  // console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="wallHub__loginOtp">
      <div className="wallHub__loginOtp-head">
        <h2>Welcome back</h2>
      </div>
      <div className="wallHub__loginOtp-container">
        <form onSubmit={handleSubmit}>
          <div className="wallHub__loginOtp-label_container">
            <label htmlFor="wallHub__loginOtp-email">Email address</label>
          </div>
          <input
            id="wallHub__loginOtp-email"
            className="wallHub__loginOtp-email"
            name="email"
            onChange={handleFormData}
            placeholder="john.doe@example.com"
            type="email"
          />
          <div className="wallHub__loginOtp-label_container">
            <label htmlFor="wallHub__loginOtp-password">Password</label>
            <Link to={'/'}>forgot?</Link>
          </div>
          <div className="wallHub__loginOtp-password_container">
            <input
              id="wallHub__loginOtp-password"
              className="wallHub__loginOtp-password"
              name="password"
              onChange={handleFormData}
              placeholder="••••••••••••••"
              type={isEyeToggle ? 'password' : 'text'}
            />
            <span
              className="wallHub__loginOtp-password_eye-span"
              onClick={() => setIsEyeToggle((prev) => !prev)}
            >
              {isEyeToggle ? (
                <RiEyeOffLine color="#333" size={23} />
              ) : (
                <RiEyeLine color="#333" size={23} />
              )}
            </span>
          </div>
          <button>Sign in</button>
        </form>
        <hr className="wallHub__loginOtp-hr" />
        <button className="wallHub__loginOtp-google_button">
          <RiGoogleFill color="#333" size={24} />
          Sign in with Google
        </button>
        <Link className="wallHub__loginOtp-link_signup" to={'/signup'}>
          Don't have an account?
        </Link>
      </div>
    </div>
  );
}

export default LoginOtp;

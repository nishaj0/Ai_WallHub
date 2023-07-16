import React from "react";
import "./login.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine, RiGoogleFill } from "react-icons/ri";

function Login() {
   const [isEyeToggle, setIsEyeToggle] = useState(true);
   const [loginData, setLoginData] = useState({ email: "", password: "" });

   const handleLogin = (e) => {
      setLoginData((prevFormData) => {
         return{
            ...prevFormData,
            [e.target.name]: e.target.value
         }
      })
   }

   // console.log(loginData);

   const handleSubmit = (e) => {
      e.preventDefault();
   }

   return (
      <div className="wallHub__login">
         <div className="wallHub__login-head">
            <h2>Welcome back</h2>
         </div>
         <div className="wallHub__login-container">
            <form onSubmit={handleSubmit}>
               <div className="wallHub__login-label_container">
                  <label htmlFor="wallHub__login-email">Email address</label>
               </div>
               <input
                  id="wallHub__login-email"
                  className="wallHub__login-email"
                  name="email"
                  onChange={handleLogin}
                  placeholder="john.doe@example.com"
                  type="email"
               />
               <div className="wallHub__login-label_container">
                  <label htmlFor="wallHub__login-password">Password</label>
                  <Link to={"/"}>forgot?</Link>
               </div>
               <div className="wallHub__login-password_container">
                  <input
                     id="wallHub__login-password"
                     className="wallHub__login-password"
                     name="password"
                     onChange={handleLogin}
                     placeholder="••••••••••••••"
                     type={isEyeToggle ? "password" : "text"}
                  />
                  <span
                     className="wallHub__login-password_eye-span"
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
            <hr className="wallHub__login-hr" />
            <button className="wallHub__login-google_button">
               <RiGoogleFill color="#333" size={24} />
               Sign in with Google
            </button>
            <Link className="wallHub__login-link_signup" to={"/signup"}>
            Don't have an account?
         </Link>
         </div>
      </div>
   );
}

export default Login;

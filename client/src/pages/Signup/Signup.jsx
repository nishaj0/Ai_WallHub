import React from 'react'
import "./signup.css"

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine, RiGoogleFill } from "react-icons/ri";

function Signup() {
  const [isEyeToggle, setIsEyeToggle] = useState(true);
  const [signupData, setSignupData] = useState({ name:"", email: "",tempPassword:"" , password: "" });

  const handleSignup = (e) => {
     setSignupData((prevFormData) => {
        return{
           ...prevFormData,
           [e.target.name]: e.target.value
        }
     })
  }

  const handleSubmit = (e) => {
     e.preventDefault();
  }
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
                 onChange={handleSignup}
                 placeholder="John Doe"
                 type="email"
              />
              <div className="wallHub__signup-label_container">
                 <label htmlFor="wallHub__signup-email">Email address</label>
              </div>
              <input
                 id="wallHub__signup-email"
                 className="wallHub__signup-email"
                 name="email"
                 onChange={handleSignup}
                 placeholder="john.doe@example.com"
                 type="email"
              />
              <div className="wallHub__signup-label_container">
                 <label htmlFor="wallHub__signup-password">Password</label>
              </div>
              <div className="wallHub__signup-password_container">
                 <input
                    id="wallHub__signup-password"
                    name='tempPassword'
                    onChange={handleSignup}
                    className="wallHub__signup-password"
                    placeholder="Enter password"
                    type={isEyeToggle ? "password" : "text"}
                 />
                 <span
                    className="wallHub__signup-password_eye-span"
                    onClick={() => setIsEyeToggle((prev) => !prev)}
                 >
                    {isEyeToggle ? (
                       <RiEyeOffLine color="#333" size={23} />
                    ) : (
                       <RiEyeLine color="#333" size={23} />
                    )}
                 </span>
              </div>
              <div className="wallHub__signup-password_container">
                 <input
                    id="wallHub__signup-password"
                    className="wallHub__signup-password"
                    name="password"
                    onChange={handleSignup}
                    placeholder="Confirm password"
                    type={isEyeToggle ? "password" : "text"}
                 />
                 <span
                    className="wallHub__signup-password_eye-span"
                    onClick={() => setIsEyeToggle((prev) => !prev)}
                 >
                    {isEyeToggle ? (
                       <RiEyeOffLine color="#333" size={23} />
                    ) : (
                       <RiEyeLine color="#333" size={23} />
                    )}
                 </span>
              </div>
              <button>Sign up</button>
              <p className='wallHub__signup-agreement_p'>By registering, you agree to aiWallHub's <Link to={"/terms-condition"}>Terms and Condition</Link> and <Link to={"/privacy-policy"}>Privacy and Policy</Link></p>
           </form>
           <hr className="wallHub__signup-hr" />
           <button className="wallHub__signup-google_button">
              <RiGoogleFill color="#333" size={24} />
              Sign up with Google
           </button>
        <Link className="wallHub__signup-link_login" to={"/login"}>
           Already have an account?
        </Link>
        </div>
     </div>
  );
}


export default Signup
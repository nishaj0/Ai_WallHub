import React from "react";
import "./signup.css";

import { useState, useEffect } from "react";
import { Link, Form } from "react-router-dom";
import {
   RiEyeLine,
   RiEyeOffLine,
   RiGoogleFill,
   RiErrorWarningFill,
} from "react-icons/ri";

export async function action(obj) {
   const fromData = await obj.request.formData();
   const name = fromData.get("name");
   const email = fromData.get("email");
   const password = fromData.get("password");
   console.log({ name, email, password })
   return null
}

function Signup() {
   const [isEyeToggle, setIsEyeToggle] = useState(true);
   const [passwordData, setPasswordData] = useState({
      tempPassword: "",
      password: "",
   });
   const [isPasswordSame, setIsPasswordSame] = useState(true);

   const handleTempPassword = (e) => {
      setPasswordData((prevFormData) => {
         return {
            ...prevFormData,
            [e.target.name]: e.target.value,
         };
      });
   };
   const handlePassword = (e) => {
      if (passwordData.tempPassword != e.target.value) {
         setIsPasswordSame(false);
      } else {
         setIsPasswordSame(true);
      }
   };
   return (
      <div className="wallHub__signup">
         <div className="wallHub__signup-head">
            <h2>Create your account</h2>
         </div>
         <div className="wallHub__signup-container">
            <Form method="post">
               <div className="wallHub__signup-label_container">
                  <label htmlFor="wallHub__signup-name">Full Name</label>
               </div>
               <input
                  id="wallHub__signup-name"
                  className="wallHub__signup-name"
                  name="name"
                  placeholder="John Doe"
                  type="name"
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
               />
               <div className="wallHub__signup-label_container">
                  <label htmlFor="wallHub__signup-password">Password</label>
               </div>
               <div className="wallHub__signup-password_container">
                  <input
                     onChange={handleTempPassword}
                     name="tempPassword"
                     className="wallHub__signup-password"
                     placeholder="Enter password"
                     type={isEyeToggle ? "password" : "text"}
                     pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                     title="Password must be at least 8 characters long and contain at least one letter and one number"
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
                     onChange={handlePassword}
                     className="wallHub__signup-password"
                     name="password"
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
               {!isPasswordSame && (
                  <p className="wallHub__signup-password_error">
                     <RiErrorWarningFill />
                     password not match
                  </p>
               )}
               <button>Sign up</button>
               <p className="wallHub__signup-agreement_p">
                  By registering, you agree to aiWallHub's{" "}
                  <Link to={"/terms-condition"}>Terms and Condition</Link> and{" "}
                  <Link to={"/privacy-policy"}>Privacy and Policy</Link>
               </p>
            </Form>
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

export default Signup;

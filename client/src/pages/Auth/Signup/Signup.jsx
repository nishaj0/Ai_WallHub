import React from "react";
import "./signup.css";

import { useState, useEffect } from "react";
import { Link, Form, useActionData, useNavigation } from "react-router-dom";
import {
   RiEyeLine,
   RiEyeOffLine,
   RiGoogleFill,
   RiErrorWarningFill,
} from "react-icons/ri";

import axios from "../../../api/axios";
const SIGNUP_URL = '/register';

export async function action(obj) {
   const fromData = await obj.request.formData();
   const name = fromData.get("name");
   const email = fromData.get("email");
   const password = fromData.get("password");
   let errorMessage = false;
   try {
      const res = await axios.post(
         SIGNUP_URL,
         JSON.stringify({ name, email, password }),
         {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
         }
      );
   } catch (error) {
      errorMessage = error.response.data.message;
   }
   // axios.post("http://localhost:5000/api/user/ssignup", )
   return errorMessage;
}

function Signup() {
   const [isEyeToggle, setIsEyeToggle] = useState(true);
   const [errorMessage, setErrorMessage] = useState(false);
   const [passwordData, setPasswordData] = useState({
      tempPassword: "",
      password: "",
   });
   const actionData = useActionData();
   const navigation = useNavigation();

   useEffect(() => {
      setErrorMessage(actionData);
   }, [actionData, navigation.state]);

   const handlePassword = (e) => {
      setPasswordData((prevFormData) => {
         return {
            ...prevFormData,
            [e.target.name]: e.target.value,
         };
      });
   };

   useEffect(() => {
      if (passwordData.password !== passwordData.tempPassword) {
         setErrorMessage("Password not matched");
      } else {
         setErrorMessage(false);
      }
   }, [passwordData]);

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
                     onChange={handlePassword}
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
               {errorMessage && (
                  <p className="wallHub__signup-error">
                     <RiErrorWarningFill />
                     {errorMessage}
                  </p>
               )}
               <button disabled={navigation.state === "submitting"}>
                  {navigation.state === "submitting" ? "Signing..." : "Sign up"}
               </button>
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

import React from "react";
import "./login.css";
import axios from "axios"

import { useState, useEffect } from "react";
import { Link, Form, useActionData, useNavigation } from "react-router-dom";
import {
   RiEyeLine,
   RiEyeOffLine,
   RiGoogleFill,
   RiErrorWarningFill,
} from "react-icons/ri";

export async function action(obj) {
   const fromData = await obj.request.formData();
   const email = fromData.get("email");
   const password = fromData.get("password");
   let errorMessage = false;
   try {
      const res = await axios.post("http://localhost:5000/login", {
         email,
         password,
      });
      console.log(res);
   } catch (error) {
      errorMessage = error.response.data.message;
      // console.log(errorMessage);
   }
   return errorMessage;
}

function Login() {
   const [isEyeToggle, setIsEyeToggle] = useState(true);
   const [errorMessage, setErrorMessage] = useState(false);
   const actionData = useActionData();
   const navigation = useNavigation();
   // console.log(actionData);
   // console.log(navigation);

   useEffect(() => {
      setErrorMessage(actionData);
   }, [actionData, navigation.state]);

   return (
      <div className="wallHub__login">
         <div className="wallHub__login-head">
            <h2>Welcome back</h2>
         </div>
         <div className="wallHub__login-container">
            <Form method="post">
               <div className="wallHub__login-label_container">
                  <label htmlFor="wallHub__login-email">Email address</label>
               </div>
               <input
                  id="wallHub__login-email"
                  className="wallHub__login-email"
                  name="email"
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
               {errorMessage && (
                  <p className="wallHub__login_error">
                     <RiErrorWarningFill />
                     {errorMessage}
                  </p>
               )}
               <button disabled={navigation.state === "submitting"}>
                  {navigation.state === "submitting" ? "logging..." : "Log in"}
               </button>
            </Form>
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

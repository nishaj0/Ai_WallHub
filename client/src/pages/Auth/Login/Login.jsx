import React from "react";
import "./login.css";

import { useState, useEffect } from "react";
import {
   Link,
   Form,
   useActionData,
   useNavigation,
   useLocation,
} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useRefreshToken from "../../../hooks/useRefreshToken";
import {
   RiEyeLine,
   RiEyeOffLine,
   RiGoogleFill,
   RiErrorWarningFill,
} from "react-icons/ri";

import axios from "../../../api/axios";
const LOGIN_URL = "/login";

// ? action function that will be called when the form is submitted
export async function action(obj) {
   const formData = await obj.request.formData();
   const email = formData.get("email");
   const password = formData.get("password");
   let errorMessage = false;
   let accessToken;
   try {
      const res = await axios.post(
         LOGIN_URL,
         JSON.stringify({ email, password }),
         {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
         }
      );
      accessToken = res?.data?.accessToken;
      console.log(accessToken);
   } catch (error) {
      errorMessage = error?.response?.data?.message;
   }
   return { errorMessage, userData: { email, accessToken } };
}

function Login() {
   const [isEyeToggle, setIsEyeToggle] = useState(true);
   const [errorMessage, setErrorMessage] = useState(false);

   const actionData = useActionData();
   const navigation = useNavigation();
   const location = useLocation();
   
   const { auth, setAuth } = useAuth();
   const refresh = useRefreshToken();

   // ? useEffect to set the error message and auth state when action is called
   useEffect(() => {
      setErrorMessage(actionData?.errorMessage);
      setAuth(actionData?.userData);
   }, [actionData, navigation.state]);

   // console.log({ auth });

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
            <button onClick={() => refresh()}>refresh</button>
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

import React from "react";
import "./login.css";

import { useState, useEffect } from "react";
import {
   Link,
   Form,
   useActionData,
   useNavigation,
   useNavigate,
   useLocation,
   redirect,
} from "react-router-dom";
// import useRefreshToken from "../../../hooks/useRefreshToken";
import { RiEyeLine, RiEyeOffLine, RiErrorWarningFill } from "react-icons/ri";

import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import { GoogleSignButton } from "../../../components";
import FormError from "../../../components/FormError/FormError";
const LOGIN_URL = "/login";

// ? action function that will be called when the form is submitted
export async function action(obj) {
   const formData = await obj.request.formData();
   const email = formData.get("email");
   const password = formData.get("password");
   let errorMessage;
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
      // console.log(accessToken);
      // console.log({ email, accessToken });
   } catch (err) {
      if (!err?.response) {
         errorMessage = "no Server Response";
      } else if (err.response?.status === 400) {
         errorMessage = "missing email or password";
      } else if (err.response?.status === 401) {
         errorMessage = "email or password not match";
      } else {
         errorMessage = "login failed";
      }
   }
   return { errorMessage, userData: { email, accessToken } };
}

function Login() {
   const [isEyeToggle, setIsEyeToggle] = useState(true);
   const [errorMessage, setErrorMessage] = useState(false);

   const actionData = useActionData();
   const navigation = useNavigation();
   const navigate = useNavigate();
   const location = useLocation();

   const from = location.state?.from?.pathname || "/";
   const { auth, setAuth, persist, setPersist } = useAuth();
   // const refresh = useRefreshToken();

   // ? toggle the persist state
   const togglePersist = () => {
      setPersist((prev) => !prev);
   };

   // ? useEffect to set the persist state in the local storage
   useEffect(() => {
      localStorage.setItem("persist", persist);
   }, [persist]);

   // ? useEffect to set the error message and auth state when action is called
   useEffect(() => {
      setErrorMessage(actionData?.errorMessage);
      setAuth((prev) => {
         if (actionData?.userData) {
            return actionData.userData;
         } else {
            return prev;
         }
      });
   }, [actionData, navigation.state]);
   // console.log({ auth });

   // ? useEffect to redirect to the from path when the user is logged in
   useEffect(() => {
      if (actionData?.userData?.accessToken) navigate(from, { replace: true });
   }, [actionData]);

   return (
      <div className="wallHub__login">
         <div className="wallHub__login-head">
            <h2>Welcome back</h2>
         </div>
         <div className="wallHub__login-container">
            <Form method="post" replace>
               <div className="wallHub__login-label_container">
                  <label htmlFor="wallHub__login-email">Email address</label>
               </div>
               <input
                  id="wallHub__login-email"
                  className="wallHub__login-email"
                  name="email"
                  placeholder="john.doe@example.com"
                  type="email"
                  required
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
                     required
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
               {errorMessage && <FormError errorMessage={errorMessage} />}
               <button disabled={navigation.state === "submitting"}>
                  {navigation.state === "submitting" ? "logging..." : "Log in"}
               </button>
               <div className="wallHub__login-checkbox">
                  <input
                     type="checkbox"
                     id="persist"
                     onChange={togglePersist}
                     checked={persist}
                  />
                  {/* <span className="wallHub__login-checkbox_custom-icon"></span> */}
                  <label htmlFor="persist">Trust this device</label>
               </div>
            </Form>
            {/* <button onClick={() => refresh()}>refresh</button> */}

            <hr className="wallHub__login-hr" />
            <GoogleSignButton />
            <Link className="wallHub__login-link_signup" to={"/signup"}>
               Don't have an account?
            </Link>
         </div>
      </div>
   );
}

export default Login;

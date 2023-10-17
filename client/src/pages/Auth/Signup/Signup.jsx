import React from "react";
import "./signup.css";

import { useState, useEffect } from "react";
import {
   Link,
   Form,
   useActionData,
   useNavigation,
   useNavigate,
   useLocation,
} from "react-router-dom";
import { RiEyeLine, RiEyeOffLine, RiErrorWarningFill } from "react-icons/ri";

import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";

import { GoogleSignButton } from "../../../components";
import FormError from "../../../components/FormError/FormError";

const SIGNUP_URL = "/register";

export async function action(obj) {
   const formData = await obj.request.formData();
   const name = formData.get("name");
   const username = formData.get("username");
   const email = formData.get("email");
   const password = formData.get("password");
   let errorMessage;
   let accessToken;
   try {
      const res = await axios.post(
         SIGNUP_URL,
         JSON.stringify({ name, username, email, password }),
         {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
         }
      );
      accessToken = res?.data?.accessToken;
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

function Signup() {
   const [isEyeToggle, setIsEyeToggle] = useState(true);
   const [errorMessage, setErrorMessage] = useState(false);
   const [passwordData, setPasswordData] = useState({
      tempPassword: "",
      password: "",
   });
   const actionData = useActionData();
   const navigation = useNavigation();
   const navigate = useNavigate();
   const location = useLocation();

   const { auth, setAuth, persist, setPersist } = useAuth();
   const from = location.state?.from?.pathname || "/";

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

   // ? function to handle the password
   const handlePassword = (e) => {
      setPasswordData((prevFormData) => {
         return {
            ...prevFormData,
            [e.target.name]: e.target.value,
         };
      });
   };

   // ? useEffect to set the error message when the password is not matched
   useEffect(() => {
      if (passwordData.password !== passwordData.tempPassword) {
         setErrorMessage("Password not matched");
      } else {
         setErrorMessage(false);
      }
   }, [passwordData]);

   // ? useEffect to set the persist state in the local storage
   useEffect(() => {
      localStorage.setItem("persist", persist);
   }, [persist]);

   // ? toggle the persist state
   const togglePersist = () => {
      setPersist((prev) => !prev);
   };

   // ? useEffect to redirect to the from path when the user is signed up
   useEffect(() => {
      if (actionData?.userData?.accessToken) navigate(from, { replace: true });
   }, [actionData]);

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
                     type={isEyeToggle ? "password" : "text"}
                     pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                     title="Password must be at least 8 characters long and contain at least one letter and one number"
                     required
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
                     required
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
               {errorMessage && <FormError errorMessage={errorMessage} />}
               <button disabled={navigation.state === "submitting"}>
                  {navigation.state === "submitting" ? "Signing..." : "Sign up"}
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
               <p className="wallHub__signup-agreement_p">
                  By registering, you agree to aiWallHub's{" "}
                  <Link to={"/terms-condition"}>Terms and Condition</Link> and{" "}
                  <Link to={"/privacy-policy"}>Privacy and Policy</Link>
               </p>
            </Form>
            <hr className="wallHub__signup-hr" />
            <GoogleSignButton />
            <Link className="wallHub__signup-link_login" to={"/login"}>
               Already have an account?
            </Link>
         </div>
      </div>
   );
}

export default Signup;

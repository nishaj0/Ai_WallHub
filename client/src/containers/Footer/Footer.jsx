import React from "react";
import { Link } from "react-router-dom";
import {
   RiInstagramFill,
   RiDiscordFill,
   RiTwitterFill,
   RiGithubFill,
   RiCopyrightLine,
} from "react-icons/ri";

import logoImg from "../../assets/images/logo/main-logo_light.svg";

import "./footer.css";

function Footer() {
   return (
      <div className="footer__container">
         <div className="wallHub__footer container section__padding">
            <div className="wallHub__footer-links">
               <div className="wallHub__footer-links_logo">
                  <img src={logoImg} alt="logo image" />
                  <p>
                     Discover and download our AI-generated wallpapers for a
                     visually captivating experience.
                  </p>
               </div>
               <div className="wallHub__footer-link">
                  <h4>Company</h4>
                  <ul>
                     <li>
                        <a className="" href="">
                           About Us
                        </a>
                     </li>
                     <li>
                        <a href="">Contact Us</a>
                     </li>
                     <li>
                        <a href="">Terms and Conditions</a>
                     </li>
                     <li>
                        <a href="">Privacy Policy</a>
                     </li>
                  </ul>
               </div>
               <div className="wallHub__footer-link">
                  <h4>Helpful Links</h4>
                  <ul>
                     <li>
                        <a href="">FAQs</a>
                     </li>
                     <li>
                        <a href="">Help Center</a>
                     </li>
                  </ul>
               </div>
               <div className="wallHub__footer-link">
                  <h4>Connect with Us</h4>
                  <a href="">
                     <RiInstagramFill
                        color="#000"
                        size={27}
                        className="wallHub__footer-link_social"
                     />
                  </a>
                  <a href="">
                     <RiDiscordFill
                        color="#000"
                        size={27}
                        className="wallHub__footer-link_social"
                     />
                  </a>
                  <a href="">
                     <RiTwitterFill
                        color="#000"
                        size={27}
                        className="wallHub__footer-link_social"
                     />
                  </a>
                  <a href="">
                     <RiGithubFill
                        color="#000"
                        size={27}
                        className="wallHub__footer-link_social"
                     />
                  </a>
               </div>
            </div>
            <div className="wallHub__footer-copyright">
               <p>
                  © <a href="https://github.com/nishaj0">nishaj0</a> All right
                  reserved
               </p>
            </div>
         </div>
      </div>
   );
}

export default Footer;

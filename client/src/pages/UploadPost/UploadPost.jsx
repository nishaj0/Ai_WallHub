import React from "react";
import "./uploadPost.css";

import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import {BsImage} from "react-icons/bs";

function UploadPost() {
   const [image, setImage] = useState(null);
   const [formData, setFormData] = useState({
      title: "",
      prompt: "",
   });

   // useEffect(() => {
   //    console.log(image);
   // }, [image]);

   function handleImage(e) {
      if (e.target.files[0]) {
         setImage(URL.createObjectURL(e.target.files[0]));
      }
   }

   function containerHandleClick() {
      const input = document.getElementById(
         "wallHub__uploadPost-form_imgInput"
      );
      input.click();
   }

   function handleChange(e) {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   }

   return (
      <div className="wallHub__uploadPost">
         <button className="wallHub__uploadPost-backButton">
            <BiLeftArrowAlt />
         </button>
         <form className="wallHub__uploadPost-form">
            <input
               type="text"
               id="wallHub__uploadPost-form_titleInput"
               className="wallHub__uploadPost-form_textInput"
               name="title"
               placeholder="Add title"
               onChange={(e)=>handleChange(e)}
               value={formData.title}
               required
               maxLength="50"
            />
            {image ? (
               <div className="wallHub__uploadPost-form_image-container">
                  <img src={image} />
               </div>
            ) : (
               <div
                  className="wallHub__uploadPost-form_imgInput-container"
                  onClick={containerHandleClick}
               >
                  <BsImage color="#8ed7f8" size={70}/>
                  <h4>Upload image or <span>drag and drop</span></h4>
                  <input
                     type="file"
                     id="wallHub__uploadPost-form_imgInput"
                     className="wallHub__uploadPost-form_imgInput"
                     name="image"
                     accept="image/*"
                     multiple={false}
                     required
                     onChange={(e) => handleImage(e)}
                     hidden
                  />
               </div>
            )}
            <textarea
               type="text"
               id="wallHub__uploadPost-form_promptInput"
               className="wallHub__uploadPost-form_textarea"
               name="prompt"
               placeholder="Prompt (optional)"
               required
               onChange={(e)=>handleChange(e)}
               value={formData.prompt}
            />
            
         </form>
      </div>
   );
}

export default UploadPost;

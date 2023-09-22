import React from "react";
import "./uploadPost.css";

import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

function UploadPost() {
   const [image, setImage] = useState(null);
   const [formData, setFormData] = useState({
      title: "",
      prompt: "",
   });
   const [tags, setTags] = useState([]);
   const [tagInput, setTagInput] = useState("");

   useEffect(() => {
      console.log(tags);
   }, [tags]);

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

   function handleTagInput(e) {
      setTagInput(e.target.value);
   }

   function addTag() {
      if (tagInput.length > 0) {
         setTags([...tags, tagInput]);
         setTagInput("");
      }
   }

   function handleKeyDown(e) {
      if (e.key === "Enter") {
         addTag();
      }
   }

   // function for when user clicked close button on tag
   function handleTagClose(e) {
      let tag;
      if (e.target.tagName === "svg") {
         tag = e.target.parentElement.innerText;
      } else {
         tag = e.target.parentElement.parentElement.innerText;
      }
      const newTags = tags.filter((t) => t != tag);
      setTags(newTags);
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
               onChange={(e) => handleChange(e)}
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
                  <BsImage color="#8ed7f8" size={70} />
                  <h4>
                     Upload image or <span>drag and drop</span>
                  </h4>
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
               onChange={(e) => handleChange(e)}
               value={formData.prompt}
            />
            <h2 className="wallHub__uploadPost-form_tag-head">Tags</h2>
            <div className="wallHub__uploadPost-form_tag-container">
               {tags.length > 0 ? (
                  <div className="wallHub__uploadPost-form_tag-display">
                     {tags.map((tag, index) => (
                        <span
                           key={index}
                           className="wallHub__uploadPost-form_tag-box"
                        >
                           {tag}
                           <AiFillCloseCircle
                              onClick={(e) => handleTagClose(e)}
                           />
                        </span>
                     ))}
                  </div>
               ) : (
                  ""
               )}

               <div className="wallHub__uploadPost-form_tagInput-container">
                  <input
                     type="text"
                     id="wallHub__uploadPost-form_tagInput"
                     className="wallHub__uploadPost-form_tagInput"
                     name="tag"
                     placeholder="eg: anime, dark, forest"
                     maxLength={20}
                     autoComplete="off"
                     onChange={(e) => handleTagInput(e)}
                     onKeyDown={handleKeyDown}
                     value={tagInput}
                  />
                  <span
                     className="wallHub__uploadPost-form_tagButton"
                     onClick={addTag}
                  >
                     Add
                  </span>
               </div>
            </div>
            <div className="wallHub__uploadPost-form_submitButton-container">
               <p>
                  This post must follow <a href="#">Content Guidelines</a>
               </p>
               <button className="wallHub__uploadPost-form_submitButton">
                  Upload
               </button>
            </div>
         </form>
      </div>
   );
}

export default UploadPost;

import React from 'react';
import './uploadPost.css';

import { useState, useEffect, useRef } from 'react';
import { Form, useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BiLeftArrowAlt } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { RiDeleteBin2Fill } from 'react-icons/ri';

import useScreenWidth from '../../hooks/useScreenWidth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import FormError from '../../components/FormError/FormError';

function UploadPost() {
   const [imageUrl, setImageUrl] = useState(null);
   const [image, setImage] = useState(null);
   // console.log(imageUrl);
   const [formInputData, setFormInputData] = useState({
      title: '',
      prompt: '',
   });
   const [tags, setTags] = useState([]);
   const [tagInput, setTagInput] = useState('');
   const [isUploaded, setIsUploaded] = useState(false); // ? this state is used to check if the image is uploaded or not
   const [error, setError] = useState(false);
   const [tagError, setTagError] = useState(false); // ? this state is used to check if the tag is valid or not [only alphabets, numbers, _ and - are allowed
   const [loading, setLoading] = useState(false);
   const tagInputRef = useRef(null);

   const location = useLocation();
   const navigate = useNavigate();
   const from = location?.state?.from?.pathname || '/';
   // console.log(location);
   const axiosPrivate = useAxiosPrivate();
   let screenSize = useScreenWidth();

   const TAG_REGEX = /^[a-z0-9_-]+$/;

   // ? if the image is uploaded then navigate to the home page
   useEffect(() => {
      if (isUploaded) {
         navigate('/');
      }
   }, [isUploaded]);

   // useEffect(()=>{

   // })

   // ? this function is used to set the image url to the image state
   function handleImage(e) {
      if (e.target.files[0]) {
         // ? creating image url
         setImageUrl(URL.createObjectURL(e.target.files[0]));

         // ? setting image to image state
         setImage(e.target.files[0]);
      }
   }

   // ? this function is used to click the input element when user clicked on the container
   function containerHandleClick() {
      const input = document.getElementById('wallHub__uploadPost-form_imgInput');
      input.click();
   }

   function handleChange(e) {
      setFormInputData({
         ...formInputData,
         [e.target.name]: e.target.value,
      });
   }

   function handleTagInput(e) {
      setTagInput(e.target.value);
   }

   // ? this function is called when user clicked add button it will add tag to tags array
   function addTag() {
      if (tagInput.length > 0) {
         if (tags.includes(tagInput)) {
            setTagError('Tag already exists');
            return;
         } else if (!TAG_REGEX.test(tagInput)) {
            setTagError('Only lowercase  alphabets, numbers, _ and - are allowed');
            return;
         } else {
            setTagError(false);
            setTags([...tags, tagInput]);
            setTagInput('');
            tagInputRef.current.focus();
         }
      }
   }

   function handleKeyDown(e) {
      if (e.key === 'Enter') {
         e.preventDefault(); // ? Prevent form submission when enter is clicked
         addTag();
      }
   }

   // ? function for when user clicked close button on tag
   function handleTagClose(e) {
      let tag;
      if (e.target.tagName === 'svg') {
         tag = e.target.parentElement.innerText;
      } else {
         tag = e.target.parentElement.parentElement.innerText;
      }
      const newTags = tags.filter((t) => t != tag);
      setTags(newTags);
   }

   // ? this function is called when user clicked upload button
   async function handleSubmit(e) {
      e.preventDefault();
      const controller = new AbortController();
      try {
         if (formInputData.title && image) {
            setLoading(true);

            // ? creating form data
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', formInputData.title);
            formData.append('prompt', formInputData.prompt);
            formData.append('tags', tags);

            // ? sending request to server
            const response = await axiosPrivate.post('api/upload', formData);

            console.log(response);
            setIsUploaded(true);
         } else {
            setError('Title and Image are required');
         }
      } catch (err) {
         if (axios.isCancel(err)) {
            console.log('Request cancelled:', err.message);
            setError('Request cancelled');
         } else {
            console.error(err);
            setError('Something went wrong');
         }
      } finally {
         controller.abort();
         setLoading(false);
      }
   }

   return (
      <div className="wallHub__uploadPost">
         <Link className="wallHub__uploadPost-backButton" to={from}>
            <BiLeftArrowAlt />
         </Link>
         <form className="wallHub__uploadPost-form" onSubmit={(e) => handleSubmit(e)}>
            <input
               type="text"
               id="wallHub__uploadPost-form_titleInput"
               className="wallHub__uploadPost-form_textInput"
               name="title"
               placeholder="Add title"
               onChange={(e) => handleChange(e)}
               value={formInputData.title}
               maxLength="50"
            />
            {imageUrl ? (
               <div className="wallHub__uploadPost-form_image-container">
                  <div className="wallHub__uploadPost-form_image-remove_container">
                     <RiDeleteBin2Fill
                        className="wallHub__uploadPost-form_image-remove"
                        onClick={() => setImageUrl(null)}
                     />
                  </div>
                  <img src={imageUrl} />
               </div>
            ) : (
               <div className="wallHub__uploadPost-form_imgInput-container" onClick={containerHandleClick}>
                  <BsImage color="#8ed7f8" size={screenSize === 'small' ? 50 : 70} />
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
               value={formInputData.prompt}
            />
            <h2 className="wallHub__uploadPost-form_tag-head">Tags</h2>
            <div className="wallHub__uploadPost-form_tag-container">
               {tags.length > 0 ? (
                  <div className="wallHub__uploadPost-form_tag-display">
                     {tags.map((tag, index) => (
                        <span key={index} className="wallHub__uploadPost-form_tag-box">
                           {tag}
                           <AiFillCloseCircle onClick={(e) => handleTagClose(e)} />
                        </span>
                     ))}
                  </div>
               ) : (
                  ''
               )}

               <div className="wallHub__uploadPost-form_tagInput-container">
                  <div className="wallHub__uploadPost-form_tagInput-container_col1">
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
                        ref={tagInputRef}
                     />
                     <span className="wallHub__uploadPost-form_tagButton" onClick={addTag}>
                        Add
                     </span>
                  </div>
                  {tagError && <FormError errorMessage={tagError} />}
               </div>
            </div>
            <div className="wallHub__uploadPost-form_submitButton-container">
               {error && <FormError errorMessage={error} />}
               <p className="wallHub__uploadPost-form_guidelines-p">
                  This post must follow <a href="#">Content Guidelines</a>
               </p>
               <button
                  className="wallHub__uploadPost-form_submitButton"
                  // onClick={(e) => handleSubmit(e)}
               >
                  {loading ? 'Uploading...' : 'Upload'}
               </button>
            </div>
         </form>
      </div>
   );
}

export default UploadPost;

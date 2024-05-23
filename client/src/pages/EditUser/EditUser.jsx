import { useEffect, useState } from 'react';
import { BlueButton, InputBox, LoadingSvg, FormError } from '../../components';
import { AuthPageContainer } from '../../containers';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import userNullProfile from './../../assets/svg/user-null-profile.svg';
import './editUser.css';

function EditUser() {
   const [userData, setUserData] = useState({ fullName: '', username: '' });
   const [imageUrl, setImageUrl] = useState(null);
   const [image, setImage] = useState(null);
   const [abortController, setAbortController] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [errorMessage, setErrorMessage] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const axiosPrivate = useAxiosPrivate();

   const USER_URL = '/api/user';

   useEffect(() => {
      const controller = new AbortController();
      setAbortController(controller);

      const getUserData = async () => {
         setIsLoading(true);
         try {
            const response = await axiosPrivate.get(`${USER_URL}/profile`, {
               signal: controller.signal,
            });

            // ? giving manual delay
            const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            await delay(3000);

            setUserData({ fullName: response.data.fullName, username: response.data.username });
            // * setting image url
         } catch (err) {
            console.error(err);
         } finally {
            setIsLoading(false);
         }
      };
      getUserData();

      return () => {
         if (abortController) {
            abortController.abort();
         }
      };
   }, []);

   // * this function is used to upload image to server
   const handleImageUpload = async () => {};

   // ? this function is used to click the input element when user clicked on the container
   function handleImageFormClick() {
      const input = document.getElementById('wallHub__editUser-imageInput');
      input.click();
   }

   function handleImage(e) {
      if (e.target.files[0]) {
         // ? creating image url
         setImageUrl(URL.createObjectURL(e.target.files[0]));

         // ? setting image to image state
         setImage(e.target.files[0]);
      }
   }

   return (
      <AuthPageContainer title={'Edit Profile'}>
         {isLoading ? (
            <LoadingSvg />
         ) : (
            <>
               <form className="wallHub__editUser-imageForm" onClick={handleImageFormClick}>
                  <input
                     type="file"
                     id="wallHub__editUser-imageInput"
                     className="wallHub__editUser-imageInput"
                     name="image"
                     accept="image/*"
                     multiple={false}
                     onChange={(e) => handleImage(e)}
                     hidden
                  />
                  <img
                     className="wallHub__editUser-imageForm-image"
                     src={imageUrl ? imageUrl : userNullProfile}
                     alt="user profile"
                  />
                  <div className="wallHub__editUser-imageForm-hover">
                     <p>Change Profile Picture</p>
                  </div>
               </form>
               <form className="wallHub__editUser-textForm">
                  <InputBox
                     id="wallHub__editUser-name"
                     label={'Full Name'}
                     name="fullName"
                     placeholder="John Doe"
                     type="text"
                     onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                     value={userData.fullName}
                  />
                  <InputBox
                     id="wallHub__editUser-email"
                     label={'Username'}
                     name="username"
                     placeholder="john.doe"
                     type="text"
                     pattern="^[a-z][a-z0-9_.]{3,15}$"
                     title="username must be 3-15 characters long and does not contain any space."
                     marginTop={1}
                     onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                     value={userData.username}
                  />
                  {errorMessage && <FormError errorMessage={errorMessage} />}
                  <BlueButton
                     width={'100%'}
                     height={'var(--login-input-y)'}
                     marginTop={'1.75rem'}
                     type="submit"
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? 'Updating...' : 'Update'}
                  </BlueButton>
               </form>
            </>
         )}
      </AuthPageContainer>
   );
}

export default EditUser;

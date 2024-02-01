import { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import './inputBox.css';

function InputBox({ label, type, link, id, marginTop, ...rest }) {
   const [isEyeToggle, setIsEyeToggle] = useState(false);

   let inputField = null;

   if (type === 'password') {
      inputField = <input type={isEyeToggle ? 'text' : 'password'} id={id} {...rest} />;
   } else {
      inputField = <input type={type} id={id} {...rest} />;
   }

   return (
      <div className="wallHub__inputBox" style={{ marginTop: `${marginTop}rem` }}>
         <div className="wallHub__inputBox-labelAndLink_container">
            <label htmlFor={id}>{label}</label>
            {link && <Link to={link.to}>{link.text}</Link>}
         </div>
         {inputField}
         {type === 'password' && (
            <span onClick={() => setIsEyeToggle((prev) => !prev)}>
               {isEyeToggle ? <RiEyeLine color="#333" size={23} /> : <RiEyeOffLine color="#333" size={23} />}
            </span>
         )}
      </div>
   );
}

export default InputBox;

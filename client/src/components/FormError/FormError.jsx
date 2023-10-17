import React from "react";
import "./formError.css";

import { RiErrorWarningFill } from "react-icons/ri";

function FormError({errorMessage}) {
   return (
      <>
         <p className="wallHub__form-error">
            <RiErrorWarningFill />
            {errorMessage}
         </p>
      </>
   );
}

export default FormError;

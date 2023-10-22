import React from 'react';
import { RiGoogleFill } from 'react-icons/ri';
import './googleSignButton.css';

function GoogleSignButton() {
  return (
    <button className="wallHub__google-sign_button">
      <RiGoogleFill color="#333" size={24} />
      Sign in with Google
    </button>
  );
}

export default GoogleSignButton;

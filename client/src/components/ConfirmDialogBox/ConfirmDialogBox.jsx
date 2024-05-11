import './confirmDialogBox.css';

// * children: two buttons
// ? if u want to change the color of the buttons, u can do it in the css file with "!important"
function ConfirmDialogBox({ isOpen, question, description, children }) {
   if (!isOpen) return null;

   return (
      <div className="wallHub__confirmBox">
         <h4>{question}</h4>
         {description && <p>{description}</p>}
         <div className="wallHub__confirmBox-buttons">{children}</div>
      </div>
   );
}

export default ConfirmDialogBox;

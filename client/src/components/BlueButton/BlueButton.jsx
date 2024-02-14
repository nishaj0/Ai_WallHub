import './blueButton.css';

function BlueButton({ marginTop, width, height, children, ...rest }) {
   const style = {
      marginTop,
      width: width || 'auto',
      height: height || 'auto',
   };
   return (
      <button className="wallHub__button" style={style} {...rest}>
         {children}
      </button>
   );
}

export default BlueButton;

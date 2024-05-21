import './authPageContainer.css';

function AuthPageContainer({ title, className, children }) {
   return (
      <div className={'wallHub__AuthPage ' + className}>
         {title && (
            <div className="wallHub__AuthPage-head">
               <h2>{title}</h2>
            </div>
         )}
         <div className="wallHub__AuthPage-container">{children}</div>
      </div>
   );
}

export default AuthPageContainer;

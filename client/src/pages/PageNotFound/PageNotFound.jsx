import { useLocation, useNavigate } from 'react-router-dom';
import mountainSvg from '../../assets/svg/page-not-found-mountain.svg';
import './pageNotFound.css';

function PageNotFound() {
   const navigate = useNavigate();
   const location = useLocation();

   const from = location.state?.from?.pathname || '/';

   const handleNavigate = () => {
      navigate(from);
   };
   return (
      <div className="wallHub__pageNotFound section__margin">
         <img src={mountainSvg} alt="404 mountain svg" />
         <h2>Page Not Found</h2>
         <button onClick={handleNavigate}>Go Back</button>
      </div>
   );
}

export default PageNotFound;

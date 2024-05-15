import { MdNavigateNext, MdNavigateBefore, MdLastPage, MdFirstPage } from 'react-icons/md';
import './PaginationBar.css';

function PaginationBar({ currentPage, totalPage, onPageChange, className, isDisabled }) {
   return (
      <div className={'wallHub__pageBar ' + className}>
         <button
            className="wallHub__pageBar__button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || isDisabled}
         >
            <MdFirstPage color="#333333" size={25} />
         </button>
         <button
            className="wallHub__pageBar__button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isDisabled}
         >
            <MdNavigateBefore color="#333333" size={25} />
         </button>
         <span>{currentPage}</span>
         <button
            className="wallHub__pageBar__button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPage || isDisabled}
         >
            <MdNavigateNext color="#333333" size={25} />
         </button>
         <button
            className="wallHub__pageBar__button"
            onClick={() => onPageChange(totalPage)}
            disabled={currentPage === totalPage || isDisabled}
         >
            <MdLastPage color="#333333" size={25} />
         </button>
      </div>
   );
}

export default PaginationBar;

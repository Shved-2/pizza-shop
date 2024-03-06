import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';

const Pagination = ({ onCangePage }) => {
  return (
    <div>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => onCangePage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={4}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
export default Pagination;

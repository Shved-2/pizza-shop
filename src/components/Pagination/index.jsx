import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';
import { useDispatch } from 'react-redux';
import { setPageCount } from '../../redux/slices/filterSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const onCangePage = (e) => {
    console.log(e);
    dispatch(setPageCount(e.selected + 1));
  };
  return (
    <div>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={onCangePage}
        pageRangeDisplayed={5}
        pageCount={4}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
export default Pagination;

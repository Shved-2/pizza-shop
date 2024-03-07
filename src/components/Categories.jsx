// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, setCategoryId } from '../redux/slices/filterSlice';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories() {
  const value = useSelector(selectCategory);
  const dispatch = useDispatch();
  const onClickCategory = (i) => {
    dispatch(setCategoryId(i));
  };
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;

// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, setCategoryId } from '../redux/slices/filterSlice';
import { FunctionComponent } from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const  Categories:FunctionComponent=()=> {
  const value:number = useSelector(selectCategory);
  const dispatch = useDispatch();
  const onClickCategory = (i:number) => {
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

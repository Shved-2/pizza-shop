import { FunctionComponent, useCallback, useRef, useState } from 'react';
import style from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search:FunctionComponent = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const onFocus = () => {
    setValue('');
    dispatch(setSearchValue(''));

    inputRef.current?.focus();
    //или
    //if( inputRef.current){
    //   inputRef.current.focus();
    // }
  };

  const updateSearchValue = useCallback(
    debounce((str:string) => {
      dispatch(setSearchValue(str));
      // console.log(str);
    }, 1000),
    [],
  );
  const onChangeInput = (e:any) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  return (
    <div className={style.root}>
      <svg className={style.iconSearch} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
      </svg>

      <input
        onChange={onChangeInput}
        value={value}
        ref={inputRef}
        className={style.input}
        placeholder="Поиск пиццы...."
      />

      {value && (
        <svg
          // onClick={() => setSearchValue('')}
          onClick={onFocus}
          //   onClick={Close}
          className={style.iconClose}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
};
export default Search;

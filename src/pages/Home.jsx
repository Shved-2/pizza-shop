import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/Pagination';
import { useContext } from 'react';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategory,
  selectPageCount,
  selectSort,
  setFilters,
} from '../redux/slices/filterSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchValue } = useContext(SearchContext);
  // const [categoryId, setCategoryId] = useState(0);
  const categoryId = useSelector(selectCategory);
  const sort = useSelector(selectSort);
  // const [sort, setSort] = useState({ name: 'популярности', sortProperty: 'rating' });

  const [pizzaJson, setPizzaJson] = useState([]); //все пиццы с бэкенда
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1); //номер вызываемой страницы
  const currentPage = useSelector(selectPageCount);
  const pizzas = pizzaJson
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map((item, ind) => <PizzaBlock {...item} key={ind} />);
  const skeleton = [...new Array(4)].map((_, index) => <Sceleton key={index} />);
  const url = 'https://62eaca76ad29546325946cf8.mockapi.io/items';
  const fetchPizza = () => {
    setIsLoading(true);
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(`${url}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((response) => {
        setPizzaJson(response.data);
        setIsLoading(false);
      });
    setIsLoading(false);
  };
  //отвечает за парсинг тех параметроав что фильтруем и вшиваем их в адресную строку
  //при первом рендеринге
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  //проверяем , есть ли в url параметры, сли был первый рендер
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  //если был певый рендер, то запрвашиваем  рендер пиццы
  useEffect(() => {
    // console.log(
    //   `${url}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
    // );

    // fetch(`${url}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     // console.log(data);
    //     setPizzaJson(data);
    //     setIsLoading(false);
    //   });
    if (!isSearch.current) {
      fetchPizza();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination />
    </div>
  );
}
export default Home;

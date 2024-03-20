import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { FunctionComponent, useEffect, useRef } from 'react';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategory,
  selectPageCount,
  selectSearchValue,
  selectSort,
  setFilters,
} from '../redux/slices/filterSlice';

import { useNavigate } from 'react-router-dom';
import { selectPizza, fetchPizzas, selectStatus } from '../redux/slices/pizzaSlice';

const Home:FunctionComponent=()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // const { searchValue } = useContext(SearchContext);
  const searchValue = useSelector(selectSearchValue);
  // const [categoryId, setCategoryId] = useState(0);
  const categoryId = useSelector(selectCategory);
  const sort = useSelector(selectSort);
  // const [sort, setSort] = useState({ name: 'популярности', sortProperty: 'rating' });

  // const [pizzaJson, setPizzaJson] = useState([]); //все пиццы с бэкенда
  const pizzaJson = useSelector(selectPizza); //все пиццы с бэкенда
  // const [isLoading, setIsLoading] = useState(true);
  const isLoading = useSelector(selectStatus);
  // const [currentPage, setCurrentPage] = useState(1); //номер вызываемой страницы
  const currentPage = useSelector(selectPageCount);
  const pizzas = pizzaJson
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map((item:any, ind:number) => <PizzaBlock {...item} key={ind} />);
  const skeleton = [...new Array(4)].map((_, index) => <Sceleton key={index} />);
  const url = 'https://62eaca76ad29546325946cf8.mockapi.io/items';
  const fetchPizza = async () => {
    // setIsLoading(true);
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    // await
    // axios
    //   .get(`${url}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
    //   .then((response) => {
    //     setPizzaJson(response.data);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     setPizzaJson([]);
    //   });
    // setIsLoading(false);

    // try {
    // const { data } = await axios.get(
    //   `${url}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
    // );
    dispatch(
      //@ts-ignore
      fetchPizzas({
        url,
        category,
        sortBy,
        order,
        search,
        currentPage,
      }),
    );
    //   // setPizzaJson(res.data);
    // } catch (error) {
    //   console.log(error);
    //   // setPizzaJson([]);
    //   alert('по вашему запросу ничего не найдено');
    // } finally {
    //   setIsLoading(false);
    // }
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

  //если был певый рендер, то запрвашиваем  рендер пиццы
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizza();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
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

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {isLoading === 'error' ? (
        <div className="content__error-info">
          <h2>произошла ошибка</h2>
          <p>К сожалению ге получилось найти пиццы, Попоробоуйте позже</p>
        </div>
      ) : (
        <div className="content__items">{isLoading === 'loading' ? skeleton : pizzas}</div>
      )}

      <Pagination />
    </div>
  );
}
export default Home;

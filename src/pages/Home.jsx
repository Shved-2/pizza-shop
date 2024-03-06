import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { useContext } from 'react';
import { SearchContext } from '../App';

function Home() {
  const { searchValue } = useContext(SearchContext);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

  const [pizzaJson, setPizzaJson] = useState([]); //все пиццы с бэкенда
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); //номер вызываемой страницы
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

  useEffect(() => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    setIsLoading(true);
    fetch(`${url}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setPizzaJson(data);
        setIsLoading(false);
      });

    window.scroll(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination onCangePage={(num) => setCurrentPage(num)} />
    </div>
  );
}
export default Home;

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { useEffect, useState } from 'react';

function Home() {
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

  const [pizzaJson, setPizzaJson] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = 'https://62eaca76ad29546325946cf8.mockapi.io/items';

  useEffect(() => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? { categoryId } : '';

    setIsLoading(true);
    fetch(`${url}?${category}&sortBy=${sortBy}&order=${order}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setPizzaJson(data);
        setIsLoading(false);
      });

    window.scroll(0, 0);
  }, [categoryId, sortType]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
          <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Sceleton key={index} />)
            : pizzaJson.map((item, ind) => <PizzaBlock {...item} key={ind} />)}
        </div>
      </div>
    </>
  );
}
export default Home;

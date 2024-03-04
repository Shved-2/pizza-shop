import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';

import { useEffect, useState } from 'react';
function Home() {
  const [pizzaJson, setPizzaJson] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://62eaca76ad29546325946cf8.mockapi.io/items')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPizzaJson(data);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
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

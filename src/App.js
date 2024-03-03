import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
// import pizzas from './asset/pizza.json';
import { useEffect, useState } from 'react';
function App() {
  const [pizzaJson, setPizzaJson] = useState([]);

  useEffect(() => {
    fetch('https://62eaca76ad29546325946cf8.mockapi.io/items')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPizzaJson(data);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzaJson.map((item, ind) => (
              <PizzaBlock {...item} key={ind} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

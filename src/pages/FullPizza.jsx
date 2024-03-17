import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
function FullPizza() {
  const { id } = useParams();
  //   console.log(id);
  const [pizzaData, setPizzaData] = useState();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://62eaca76ad29546325946cf8.mockapi.io/items/${id}`);
        // console.log(data);
        setPizzaData(data);
      } catch (error) {
        alert('ошибка при получении пиццы');
      }
    }

    fetchPizza();
  }, []);

  if (!pizzaData) {
    return 'Загрузка.....';
  }
  return (
    <div className="cart_fool">
      <img src={pizzaData.imageUrl} alt="" />
      <div className="discription">
        <h2>{pizzaData.title} </h2>
        <h3>Цена: {pizzaData.price} p </h3>
        <p>{pizzaData.discription}</p>
      </div>
    </div>
  );
}
export default FullPizza;

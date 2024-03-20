import { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartById } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const typeNames = ['тонкое', 'традиционноу'];

type PizzaBlockProps={
  id:string;
   imageUrl:string;
   title:string; 
   types:number[];
   sizes:number[];
   price:number;    
   rating: number;
}
const  PizzaBlock:FunctionComponent<PizzaBlockProps>=({ id, imageUrl, title, types, sizes, price,  rating }) =>{
  const [activeType, setActiveType] = useState(0); //тип теста
  const [activeSize, setActiveSize] = useState(0); //размер пиццы

  const dispatch = useDispatch();
  // const items = useSelector(selectItems);
  // const cartItem = items.find((obj) => obj.id === id);
  const cartItem = useSelector(selectCartById(id));
  const countAdded = cartItem ? cartItem.count : 0;

  const addGood = () => {
    const obj = {
      id,
      imageUrl,
      title,
      price,
      types: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(obj));
  };
  return (
    <div className="pizza-block_wrapper">
      <div className="pizza-block">
        {/* <Link to={`pizza/${item.id}`}><Link/> */}
        <Link to={`pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId, index) => (
              <li
                onClick={() => setActiveType(index)}
                key={index}
                className={activeType === index ? 'active' : ''}>
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((item, index) => (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}>
                {item} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div onClick={addGood} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {countAdded > 0 && <i>{countAdded}</i>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PizzaBlock;

import { FunctionComponent } from 'react';
import style from './Error404.module.scss';
const ErrorBlock:FunctionComponent=()=> {
  return (
    <div className={style.root}>
      <div>
        <h1 className={style.strong}>
          <span>😕</span>
          <br />
          Страница не найдена
        </h1>

        <h1 className={style.strong}>404</h1>
        <p className={style.description}>
          К сожалению запрашиваемая информация отсутствует на нашем сайте
        </p>
      </div>
    </div>
  );
}
export default ErrorBlock;

import style from './Error404.module.scss';
function ErrorBlock() {
  return (
    <div className={style.root}>
      <div>
        <h1 className={style.strong}>
          <icon>😕</icon>
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

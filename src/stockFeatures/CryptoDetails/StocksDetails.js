import { StocksCurrent } from '../StocksDetails/StocksCurrent';
import { StocksRecomandation } from '../StocksDetails/StocksRecomandation';
import style from '../../mcss/StockDetailsContainer.module.css';
export function StockDetails({ keye, Id }) {
  console.log(keye);
  return (
    <article className={style.stock_details__container}>
      <p>stocks</p>
      <StocksCurrent
        keye={keye}
        Id={Id}
        className={style.stock_details__current}
      />
      <StocksRecomandation
        title={keye}
        className={style.stock_details__recomandation}
      />
    </article>
  );
}

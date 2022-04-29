import { StocksCurrent } from '../StocksDetails/StocksCurrent';
import { StocksRecomandation } from '../StocksDetails/StocksRecomandation';

export function StockDetails({ keye, Id }) {
  console.log(keye);
  return (
    <>
      <p>stocks</p>
      <StocksCurrent keye={keye} Id={Id} />
      <StocksRecomandation />
    </>
  );
}

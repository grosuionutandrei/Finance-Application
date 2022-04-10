import style from '../../mcss/CryptoDetails.module.css';
import { CurrentValue } from './CryptoDetailsCurrentValue';
import { EndDate } from './EndDate';
import { Remove } from './Remove';
import { ChangeDateForm } from '../CryptoDetails/GraphDateData';
import { CryptoGraph } from './CryptoGraph';
import { CryptoInfo } from './CryptoInfo';
export function CryptoDetails({ keye }) {
  return (
    <div className={style.details_main_container}>
      <CurrentValue title={keye} />
      <EndDate />
      <Remove />
      <ChangeDateForm />
      <CryptoGraph />
      <CryptoInfo />
    </div>
  );
}

import style from '../../mcss/CryptoDetails.module.css';
import { Loading } from '../../stockComponents/Loading';

export const CryptoInfo = ({ data }) => {
  if (!data) {
    return <Loading />;
  }
  let average = data.o.reduce((item, sum) => sum + item, 0) / data.o.length;
  let maximum = Math.max(...data.o);
  let minimum = Math.min(...data.o);
  return (
    <div className={style.crypto_info}>
      <p>{`Average ${average}`}</p>
      <p>{`Maximum ${maximum}`}</p>
      <p>{`Minimum ${minimum}`}</p>
    </div>
  );
};

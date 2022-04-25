import style from '../../mcss/CryptoDetails.module.css';
import { Loading } from '../../stockComponents/Loading';

export const CryptoInfo = ({ data }) => {
  if (!data) {
    return (
      <div className={style.crypto_info}>
        <Loading />
      </div>
    );
  }
  let average = data.c.reduce((item, sum) => sum + item, 0) / data.c.length;
  let maximum = Math.max(...data.h);
  let minimum = Math.min(...data.l);
  return (
    <div className={style.crypto_info}>
      <p>{`Average ${average}`}</p>
      <p>{`Maximum ${maximum}`}</p>
      <p>{`Minimum ${minimum}`}</p>
    </div>
  );
};

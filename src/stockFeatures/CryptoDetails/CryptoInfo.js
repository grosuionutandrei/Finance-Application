import style from '../../mcss/CryptoDetails.module.css';
import style1 from '../../mcss/StockDetailsContainer.module.css';
import { Loading } from '../../stockComponents/Loading';
import { currentStyle } from '../../stockComponents/Helpers';

export const CryptoInfo = ({ data, viewStyle }) => {
  let actualStyle = currentStyle(style, style1, viewStyle);
  if (!data) {
    return (
      <div className={actualStyle[viewStyle]}>
        <Loading />
      </div>
    );
  }
  let average = data.c.reduce((item, sum) => sum + item, 0) / data.c.length;
  let maximum = Math.max(...data.h);
  let minimum = Math.min(...data.l);
  return (
    <div className={actualStyle[viewStyle]}>
      <p>{`Average ${average}`}</p>
      <p>{`Maximum ${maximum}`}</p>
      <p>{`Minimum ${minimum}`}</p>
    </div>
  );
};

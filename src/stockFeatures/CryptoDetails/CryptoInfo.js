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
  let averageCalc = data.c.reduce((item, sum) => sum + item, 0) / data.c.length;
  let average = isNaN(averageCalc) ? 0 : averageCalc;
  let maximum = data.h.length > 0 ? Math.max(...data.h) : 0;
  let minimum = data.l.length > 0 ? Math.min(...data.l) : 0;
  return (
    <div className={actualStyle[viewStyle]}>
      <p>{`Average ${average}`}</p>
      <p>{`Maximum ${maximum}`}</p>
      <p>{`Minimum ${minimum}`}</p>
    </div>
  );
};

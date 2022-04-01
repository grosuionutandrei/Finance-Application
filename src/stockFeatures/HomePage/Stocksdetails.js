import { useState, useEffect } from 'react';
import {
  getValueFromStorage,
  useAuthContext,
} from '../../features/Auth/Auth.context';
import styles from '../../mcss/Details.module.css';
import { Loading } from '../../stockComponents/Loading';

export function StocksDetails({ parameter, setShow, show, details, errors }) {
  const [param, setParam] = useState(null);
  const { user, token, trackedItems } = useAuthContext();
  const [message, setMessage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setParam(parameter);
  }, [parameter]);

  if (!param || !details) {
    return <p></p>;
  }

  let colorCurrent = param.c > param.pc ? 'bg-lime-500' : 'bg-red-500';
  let colorPrevious = param.pc > param.c ? 'bg-red-500' : 'bg-lime-500';
  let colorPercent = param.d > 0 ? 'bg-lime-500' : 'bg-red-500';

  async function updateTrackedList() {
    const searchedParam = getValueFromStorage('searchedParameter');
    const temp = [...trackedItems];
    // if already added return
    if (temp[0].items.includes(searchedParam)) {
      return;
    }
    temp[0]?.items?.push(searchedParam);

    localStorage.setItem('trackedItems', JSON.stringify(temp));
    await fetch(`http://localhost:3005/trackedItems/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        userId: user.id,
        items: temp[0].items,
      }),

      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    setMessage(`${searchedParam} added to the tracked list`);
  }

  function saveTrackItem(e) {
    e.preventDefault();
    updateTrackedList();
    setDisabled(true);
  }

  function closeResultBox(e) {
    setShow('none');
    setMessage('');
    setParam(null);
  }

  return (
    <article className={styles[show]}>
      <p data-close="close" onClick={closeResultBox}>
        &times;
      </p>
      <div className={styles.details_inside}>
        {errors.noDescription && (
          <p className="bg-red-200 text-red-600 bold p-2">
            {errors.noDescription}
          </p>
        )}
        {errors.serverError && (
          <p className="bg-red-200 text-red-600 bold p-2">
            {errors.serverError}
          </p>
        )}

        <a
          href={details.quoteSummary.result[0]?.assetProfile.website}
          target="_blank"
          rel="noreferrer"
        >
          Website :{details.quoteSummary.result[0]?.assetProfile.website}
        </a>
        <p>Industry: {details.quoteSummary.result[0].assetProfile.industry}</p>
        <p>Sector:{details.quoteSummary.result[0]?.assetProfile.sector}</p>
        <p>{`Open price: ${param.o} `} &#36;</p>
        <p>
          Change: <span className={colorCurrent}>{param.d} &#36;</span>
        </p>
        <p>
          Percent Change: <span className={colorPercent}>{param.dp} &#37;</span>
        </p>
        <p>
          Current price: <span className={colorCurrent}> {param.c} &#36;</span>
        </p>
        <p>
          Previous closing price:
          <span className={colorPrevious}>{param.pc} &#36;</span>
        </p>
        <p>
          Lowest price:
          <span className="bg-red-500">{param.l} &#36;</span>
        </p>
        <p>
          Highest Price:
          <span className="bg-lime-500">{param.h} &#36;</span>
        </p>
        <button onClick={saveTrackItem} disabled={disabled}>
          Add to track list
        </button>
        {message && <p>{message}</p>}
      </div>
    </article>
  );
}

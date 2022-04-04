import { useState, useEffect, useRef } from 'react';
import {
  getValueFromStorage,
  useAuthContext,
} from '../../features/Auth/Auth.context';
import styles from '../../mcss/Details.module.css';
import { handleResponse } from './HomePage';

export function StocksDetails({
  parameter,
  setShow,
  show,
  details,
  errors,
  follow,
}) {
  const [param, setParam] = useState(null);
  const { user, token, setTrackedListLocal, logout } = useAuthContext();
  const [message, setMessage] = useState(null);

  const [trackedList, setTrackList] = useState(null);

  useEffect(() => {
    if (follow) {
      const data = window.localStorage.getItem('trackedItems');
      if (data) {
        setTrackList(JSON.parse(data));
      }
      console.log(follow);
      follow.current = false;
    }
  }, [follow]);

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
    const temp = [...trackedList];
    console.log(temp);
    // if already added return
    if (temp.includes(searchedParam)) {
      setMessage(`${searchedParam} already added to the tracked list`);
      return;
    }
    const response = window.confirm(
      `Are you sure that you want to follow ${searchedParam} `
    );
    if (response) {
      temp.push(searchedParam);

      const objPatch = {
        userId: user.id,
        item: searchedParam,
      };
      console.log(user.id, searchedParam, 'sssewfwfwefwedw');
      const data = await fetch(`http://localhost:3005/trackedList`, {
        method: 'POST',
        body: JSON.stringify(objPatch),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => handleResponse(res));

      // did not manage to test when token has expired need to test the bellow code

      if (data === 'jwt expired') {
        console.log('jwt expired');
        logout();
      }
      setTrackedListLocal(temp);
      setMessage(`${searchedParam} added to the tracked list`);
    }
  }

  function saveTrackItem(e) {
    e.preventDefault();
    updateTrackedList();
  }

  function closeResultBox(e) {
    setShow('none');
    setMessage('');
    setParam(null);
    // setDisabled(false);
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
        {details.quoteSummary.result && (
          <>
            <a
              href={details.quoteSummary.result[0]?.assetProfile.website}
              target="_blank"
              rel="noreferrer"
            >
              Website :{details.quoteSummary.result[0]?.assetProfile.website}
            </a>
            <p>
              Industry: {details.quoteSummary.result[0].assetProfile.industry}
            </p>
            <p>Sector:{details.quoteSummary.result[0]?.assetProfile.sector}</p>
          </>
        )}
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
        <button onClick={saveTrackItem}>Add to track list</button>
        {message && <p>{message}</p>}
      </div>
    </article>
  );
}

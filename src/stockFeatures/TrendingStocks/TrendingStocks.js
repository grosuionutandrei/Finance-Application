import styles from '../../mcss/Details.module.css';
import { useState, useEffect, useRef } from 'react';
import { Loading } from '../../stockComponents/Loading';
import { useAuthContext } from '../../features/Auth/Auth.context';
import { handleResponse } from '../HomePage/HomePage';
import { fromStorageTracked } from '../../stockComponents/Helpers';

export function Trending() {
  const [trending, setTrending] = useState(null);
  const [trendDetails, setTrendDetails] = useState({
    data: '',
    trending: '',
  });

  const { user, token, setTrackedListLocal, logout, setJwtError } =
    useAuthContext();
  const [serverError, setServerError] = useState({
    serverError: '',
  });
  const abortController = new AbortController();
  //   get trending stocks from yahoo
  useEffect(() => {
    const { signal } = abortController;
    setServerError('');
    let aborted = true;
    async function getTrending() {
      const trending = [];
      try {
        const data = await fetch(`https://yfapi.net/v1/finance/trending/US`, {
          signal,
          headers: {
            'x-api-key': 'z8C7ctfvZY4yf4K9rTOjr9LUpxNElFDa8zKB2Jeo',
          },
        }).then((res) => handleResponse(res));

        trending.push(data.finance.result[0].quotes);
        setTrending(trending);
        aborted = false;
      } catch (error) {
        console.log(error);
        setServerError(' A Server Error has occured ');
      }

      return trending;
    }

    async function getTrendDetails(trending) {
      if (aborted) {
        return;
      }
      const tempPromises = [];
      for (const trend of trending[0].slice(0, 15)) {
        tempPromises.push(
          await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${trend.symbol}&token=c9i5r6qad3i9bpe27lm0`
          ).then((res) => res.json())
        );
      }

      const data = await Promise.allSettled(tempPromises).then((elems) =>
        elems.map((elem) => elem.value)
      );
      setTrendDetails({ ...trendDetails, data: data, trending: trending });
    }

    const getData = () => {
      Promise.all([getTrending()]).then((results) => {
        getTrendDetails(results[0]);
      });
    };
    getData();

    return () => {
      abortController.abort();
    };
  }, []);

  if (!trending || !trendDetails.data) {
    return <Loading />;
  }

  // add to tracked stocks ,delete from tracked stocks
  function editTrackList(e) {
    e.preventDefault();
    updateTracked(e.target.value);
  }

  // add to tracked items
  async function updateTracked(item) {
    const temp = [...fromStorageTracked('trackedItems')];

    if (temp.includes(item)) {
      return;
    }
    const response = window.confirm(
      `Are you sure that you want to follow ${item} `
    );

    if (response) {
      const objPatch = {
        userId: user.id,
        item: item,
      };

      const data = await fetch(`http://localhost:3005/trackedList`, {
        method: 'POST',
        body: JSON.stringify(objPatch),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());

      if (data === 'jwt expired') {
        setJwtError('Your token has expired');
        logout();
        return;
      }
      temp.push(item);
      setTrackedListLocal(temp);
    }
  }

  // create render object
  const renderDetails = [];
  for (let i = 0; i < trendDetails.data.length; i++) {
    let colorCurrent =
      trendDetails.data[i].c > trendDetails.data[i].pc
        ? 'bg-lime-500'
        : 'bg-red-500';
    let colorPrevious =
      trendDetails.data[i].pc > trendDetails.data[i].c
        ? 'bg-red-500'
        : 'bg-lime-500';
    let colorPercent =
      trendDetails.data[i].d > 0 ? 'bg-lime-500' : 'bg-red-500';

    if (trendDetails.data[i].error) {
      continue;
    } else {
      renderDetails.push(
        <article
          key={trendDetails.trending[0][i]?.symbol}
          className={styles.trending_details}
        >
          <p title={`Stock Symbol`}>{trendDetails.trending[0][i]?.symbol}</p>
          <p title={`Change ${trendDetails.data[i]?.d}`}>
            C:
            <span className={colorCurrent}>
              {trendDetails.data[i]?.d.toFixed(2)}
            </span>
          </p>

          <p title={`Percent Price ${trendDetails.data[i]?.dp}`}>
            PC:
            <span className={colorPercent}>
              {trendDetails.data[i]?.dp.toFixed(2)}
            </span>
          </p>
          <p title={`Current Price ${trendDetails.data[i]?.c}`}>
            CP:
            <span className={colorCurrent}>
              {trendDetails.data[i]?.c.toFixed(2)}
            </span>
          </p>
          <p title={`Previous Closing Price ${trendDetails.data[i].pc}`}>
            PCP:
            <span className={colorPrevious}>
              {trendDetails.data[i].pc.toFixed(2)}
            </span>
          </p>

          <p title={`Lowest Price ${trendDetails.data[i].l}`}>
            LP:
            <span className="bg-red-500">
              {trendDetails.data[i].l.toFixed(2)}
            </span>
          </p>
          <p title={`Highest Price ${trendDetails.data[i].h}`}>
            HP:
            <span className="bg-lime-500">
              {trendDetails.data[i].h.toFixed(2)}
            </span>
          </p>

          <button
            onClick={editTrackList}
            value={trendDetails.trending[0][i]?.symbol}
          >
            Follow
          </button>
        </article>
      );
    }
  }

  return (
    <div className={styles.trending_container}>
      {serverError.serverError && <p>{serverError.serverError}</p>}
      <h3>Top 15 trending</h3>
      {renderDetails}
    </div>
  );
}

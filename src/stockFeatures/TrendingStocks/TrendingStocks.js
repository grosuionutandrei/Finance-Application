import styles from '../../mcss/Details.module.css';
import { useState, useEffect } from 'react';
import { Loading } from '../../stockComponents/Loading';
import { useAuthContext } from '../../features/Auth/Auth.context';

export function Trending() {
  const [trending, setTrending] = useState(null);
  const [trendDetails, setTrendDetails] = useState({
    data: '',
    trending: '',
  });

  const [button, setButton] = useState('Follow');
  const { user, token, trackedItems } = useAuthContext();

  //   get trending stocks from yahoo
  useEffect(() => {
    async function getTrending() {
      const trending = [];
      const data = await fetch(`https://yfapi.net/v1/finance/trending/US`, {
        headers: {
          'x-api-key': 'L3dhdg23zyWMjriBQhaBfmJCsvN6N81xIia5WB90',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          trending.push(res.finance.result[0].quotes);
          setTrending(trending);
        });

      return trending;
    }

    async function getTrendDetails(trending) {
      const tempPromises = [];
      for (const trend of trending[0]) {
        tempPromises.push(
          await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${trend.symbol}&token=c8p0kuaad3id3q613c3g`
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
    // getData();
  }, []);

  if (!trending || !trendDetails.data) {
    return <Loading />;
  }

  // add to tracked stocks ,delete from tracked stocks
  function displayDetails(e) {
    e.preventDefault();
    switch (e.target.innerText) {
      case 'Follow':
        e.target.innerText = 'Unfollow';
        updateTracked(e.target.value);
        break;
      case 'Unfollow':
        e.target.innerText = 'Follow';
        deleteFromTrackedList(e.target.value);
        break;
      default:
    }
  }

  // add to tracked items
  async function updateTracked(item) {
    const temp = [...trackedItems];

    if (temp[0].items.includes(item)) {
      return;
    }

    temp[0]?.items?.push(item);

    localStorage.setItem('trackedItems', JSON.stringify(temp[0].items));
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
  }

  async function deleteFromTrackedList(elem) {
    const temp = [...trackedItems];
    if (!temp[0].items.includes(elem)) {
      return;
    }
    const deleted = temp[0].items.filter((item) => item !== elem);

    localStorage.setItem('trackedItems', JSON.stringify(deleted));
    await fetch(`http://localhost:3005/trackedItems/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        userId: user.id,
        items: deleted,
      }),

      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // create render object
  const renderDetails = [];
  for (let i = 0; i < trendDetails.trending[0].length; i++) {
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
          <p title="Change">
            C:
            <span className={colorCurrent}>
              {trendDetails.data[i]?.d} &#36;
            </span>
          </p>

          <p title="Percent Price">
            PC:
            <span className={colorPercent}>
              {trendDetails.data[i]?.dp} &#37;
            </span>
          </p>
          <p title="Current Price">
            CP:
            <span className={colorCurrent}>
              {trendDetails.data[i]?.c} &#36;
            </span>
          </p>
          <p title="Previous Closing Price">
            PCP:
            <span className={colorPrevious}>
              {trendDetails.data[i].pc} &#36;
            </span>
          </p>

          <p title="Lowest Price">
            LP:
            <span className="bg-red-500">{trendDetails.data[i].l} &#36;</span>
          </p>
          <p title="Highest Price">
            HP:
            <span className="bg-lime-500">{trendDetails.data[i].h} &#36;</span>
          </p>

          <button
            onClick={displayDetails}
            value={trendDetails.trending[0][i]?.symbol}
          >
            {button}
          </button>
        </article>
      );
    }
  }

  return <div className={styles.trending_container}>{renderDetails}</div>;
}

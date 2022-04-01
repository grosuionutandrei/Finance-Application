import { useState, useEffect } from 'react';
// De revenit peste nu merge ca la stocks
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryCandlestick,
  VictoryTooltip,
} from 'victory';
import { convertEpochToDate } from '../../stockComponents/Date';
import style from '../../mcss/Details.module.css';
import { getCryptoQuerryFromStorage } from '../../stockComponents/Helpers';
import { useAuthContext } from '../../features/Auth/Auth.context';
export function CryptoDetailsLarge({ data, setShow, show }) {
  const { user, token, trackedItems } = useAuthContext();
  // candle data for details chart
  const [candleDataArr, setCandleDataArr] = useState([]);
  // message to display if added to trck list
  const [message, setMessage] = useState(null);
  // retrieve searcehd crypto from local storage
  const searchedCrypto = getCryptoQuerryFromStorage();
  // enable/disable add to track list button
  const [disabled, setDisabled] = useState(false);

  // if no data
  const [error, setError] = useState({
    noData: '',
  });

  // convert fetched candel data to chart supported data
  useEffect(() => {
    if (data) {
      if (data.s === 'no_data') {
        setError({ ...error, noData: 'Not available data' });
        return;
      }
      const candleData = [];
      for (let i = 0; i < data.o.length; i++) {
        const dateForChart = convertEpochToDate(data.t[i]);
        const dataObject = {
          x: new Date(dateForChart[0], dateForChart[2], dateForChart[1]),
          open: data.o[i],
          close: data.c[i],
          high: data.h[i],
          low: data.l[i],
        };
        candleData.push(dataObject);
      }
      setCandleDataArr(candleData);
    }
  }, [data]);

  if (!data) {
    return <p></p>;
  }

  // add crypto to track list
  async function updateTrackedList() {
    const temp = [...trackedItems];
    if (temp[0].items.includes(searchedCrypto)) {
      return;
    }
    temp[0]?.items?.push(searchedCrypto);

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
    setMessage(`${searchedCrypto} added to the tracked list`);
  }

  function saveTrackItem(e) {
    e.preventDefault();
    updateTrackedList();
    setDisabled(true);
  }

  function closeResultBox(e) {
    setShow('none');
    setMessage('');
    setError({ ...error, noData: '' });
  }
  console.log(searchedCrypto);

  return (
    <div className={style[show]}>
      {error.noData && <p>{error.noData}</p>}
      <p>{searchedCrypto}</p>
      <button onClick={closeResultBox} data-close="crypto">
        close
      </button>
      <button onClick={saveTrackItem} disabled={disabled}>
        Add to track list
      </button>
      {message && <p>{message}</p>}
      {!error.noData && (
        <VictoryChart
          theme={VictoryTheme.material}
          width={900}
          height={400}
          domainPadding={{ x: 25 }}
          scale={{ x: 'time' }}
        >
          <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`} />
          <VictoryAxis dependentAxis />
          <VictoryCandlestick
            candleColors={{ positive: '#30f10e', negative: '#c43a31' }}
            candleRatio={0.3}
            data={candleDataArr}
            lowLabels={({ datum }) =>
              `Date ${`${datum.x.getFullYear()}-${datum.x.getDate()}-${datum.x.getMonth()}`}\nOpen ${
                datum.open
              }\nClose ${datum.close}\nHigh ${datum.high}\nLow ${
                datum.low
              }\nEvolution ${(datum.close - datum.open).toFixed(4)}`
            }
            lowLabelComponent={<VictoryTooltip pointerLength={0} />}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onMouseOver: () => ({
                    target: 'lowLabels',
                    mutation: () => ({ active: true }),
                  }),
                  onMouseOut: () => ({
                    target: 'lowLabels',
                    mutation: () => ({ active: false }),
                  }),
                },
              },
            ]}
            style={{
              data: {
                stroke: '#000',
                strokeWidth: 1,
              },

              closeLabels: { fill: 'black', padding: 2 },
              highLabels: { fill: 'green', padding: 2 },
              lowLabels: { fill: 'red', padding: 2 },
              openLabels: { fill: 'blue', padding: 2 },
            }}
          />
        </VictoryChart>
      )}
    </div>
  );
}

export function CryptoDetailsSmall({ data }) {
  return (
    <div style={{ width: '200px' }}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 5 }}
        width={200}
        height={150}
        scale={{ x: 'time' }}
      >
        <VictoryAxis
          tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}
          style={{
            grid: { stroke: 'grey' },
            ticks: { stroke: 'grey', size: 1 },
            tickLabels: { fontSize: 5, padding: 5 },
          }}
        />
        <VictoryAxis
          style={{
            grid: { stroke: '' },
            ticks: { stroke: 'grey', size: 1 },
            tickLabels: { fontSize: 5, padding: 5 },
          }}
          dependentAxis
        />
        <VictoryCandlestick
          candleColors={{ positive: '#30f10e', negative: '#c43a31' }}
          candleRatio={0.3}
          data={[
            { x: new Date(2016, 6, 1), open: 10, close: 15, high: 20, low: 5 },
            { x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5 },
            { x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10 },
            { x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7 },
            { x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5 },
            { x: new Date(2016, 6, 6), open: 10, close: 15, high: 20, low: 5 },
            { x: new Date(2016, 6, 7), open: 10, close: 15, high: 20, low: 5 },
            { x: new Date(2016, 6, 8), open: 15, close: 20, high: 22, low: 10 },
            { x: new Date(2016, 6, 9), open: 20, close: 10, high: 25, low: 7 },
            { x: new Date(2016, 6, 10), open: 10, close: 8, high: 15, low: 5 },
            { x: new Date(2016, 6, 11), open: 20, close: 10, high: 25, low: 7 },
            { x: new Date(2016, 6, 12), open: 10, close: 8, high: 15, low: 5 },
          ]}
        />
      </VictoryChart>
    </div>
  );
}

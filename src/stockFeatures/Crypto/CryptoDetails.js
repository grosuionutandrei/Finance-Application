import { useState, useEffect, useRef } from 'react';
// De revenit peste nu merge ca la stocks
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryCandlestick,
  VictoryTooltip,
  VictoryBar,
  VictoryLabel,
} from 'victory';
import { convertEpochToDate } from '../../stockComponents/Date';
import style from '../../mcss/Details.module.css';
import { getCryptoQuerryFromStorage } from '../../stockComponents/Helpers';
import { useAuthContext } from '../../features/Auth/Auth.context';

export function CryptoDetailsLarge({
  data,
  setShow,
  show,
  areDatesEqual,
  setDatesEqual,
  errorTimeFrames,
  setErrorTimeFrames,
  message,
  setMessage,
}) {
  const { user, token, setTrackedListLocal, logout, setJwtError } =
    useAuthContext();
  // candle data for details chart
  const [candleDataArr, setCandleDataArr] = useState([]);
  // message to display if added to trck list
  // const [message, setMessage] = useState(null);
  // retrieve searcehd crypto from local storage
  const searchedCrypto = getCryptoQuerryFromStorage();
  // enable/disable add to track list button
  const [disabled, setDisabled] = useState(false);
  // set bar data for the same day fetch data
  const [barData, setBarData] = useState([]);
  const [colorBar, setColorBar] = useState('');
  // tracked items from local Storage
  const [trackedList, setTrackList] = useState(null);
  // necessary to update the trackedList from local storage;
  const follow = useRef(false);

  useEffect(() => {
    if (follow) {
      const data = window.localStorage.getItem('trackedItems');
      if (data) {
        setTrackList(JSON.parse(data));
      }
      console.log(follow);
      follow.current = false;
    }
  }, []);

  // convert fetched candel data to chart supported data
  useEffect(() => {
    if (data) {
      if (data.s === 'no_data') {
        setErrorTimeFrames({
          ...errorTimeFrames,
          noData: 'Not available data',
        });
        return;
      }
      if (areDatesEqual) {
        setBarData([
          ['open', data.o],
          ['close', data.c],
          ['high', data.h],
          ['low', data.l],
        ]);
        setColorBar(data.c < data.o ? 'red' : 'green');
        setDisabled(false);
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
      setDisabled(false);
    }
  }, [data]);

  if (!data) {
    return <p></p>;
  }

  // add crypto to track list
  async function updateTrackedList() {
    const temp = [...trackedList];
    // if already added return

    if (temp.includes(searchedCrypto)) {
      setMessage('Already added to your tracked list');
      return;
    }
    const response = window.confirm(
      `Are you sure that you want to follow ${searchedCrypto} `
    );
    if (response) {
      const objPatch = {
        userId: user.id,
        item: searchedCrypto,
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

      if (!data.userId) {
        setMessage('Server error , please try again');
        console.log(data);
        return;
      }
      temp.push(searchedCrypto);
      setTrackedListLocal(temp);
      setDisabled(true);
      setMessage(`${searchedCrypto} added to the tracked list`);
    }
  }

  function saveTrackItem(e) {
    e.preventDefault();
    follow.current = true;
    updateTrackedList();
  }

  function closeResultBox(e) {
    setShow('none');
    setMessage('');
    setErrorTimeFrames('');
    setDatesEqual(false);
  }

  return (
    <div className={style[show]}>
      {errorTimeFrames.noData && <p>{errorTimeFrames.noData}</p>}
      <div className={style.interaction_container}>
        <p data-search="cryptoSymbol">{searchedCrypto}</p>
        <button onClick={closeResultBox} data-close="crypto">
          close
        </button>
        <button
          onClick={saveTrackItem}
          data-add="cryptoAdd"
          disabled={disabled}
        >
          Add to track list
        </button>
      </div>

      {message && <p>{message}</p>}
      {!errorTimeFrames.noData && !areDatesEqual && (
        <div className={style.chartContainer}>
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
        </div>
      )}
      {areDatesEqual && <BarChart color={colorBar} data={barData} />}
    </div>
  );
}

export function BarChart({ color, data }) {
  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={15}>
      <VictoryBar
        style={{
          data: {
            fill: () => color,
            stroke: ({ index }) => '#000000',
            fillOpacity: 0.7,
            strokeWidth: 1,
          },
          labels: {
            fontSize: 15,
            fill: ({ datum }) => '#000000',
          },
        }}
        data={data}
        x={0}
        y={1}
      />
    </VictoryChart>
  );
}

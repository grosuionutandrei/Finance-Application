// De revenit peste nu merge ca la stocks
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryCandlestick,
  VictoryLabel,
  VictoryTooltip,
} from 'victory';

export function CryptoDetailsLarge({ data }) {
  return (
    <div>
      <p>Previous year monthly evolution</p>
      <VictoryChart
        theme={VictoryTheme.material}
        width={300}
        height={400}
        domainPadding={{ x: 25 }}
        scale={{ x: 'time' }}
      >
        <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`} />
        <VictoryAxis dependentAxis />
        <VictoryCandlestick
          candleColors={{ positive: '#30f10e', negative: '#c43a31' }}
          candleRatio={0.3}
          data={[
            { x: new Date(2016, 6, 1), open: 10, close: 15, high: 20, low: 5 },
            { x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5 },
            { x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10 },
            { x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7 },
            { x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5 },
          ]}
          closeLabels
          closeLabelComponent={<VictoryLabel dx={-15} textAnchor="middle" />}
          openLabels
          openLabelComponent={<VictoryLabel dx={15} textAnchor="middle" />}
          lowLabels
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
          highLabels
          highLabelComponent={
            <VictoryLabel dx={0} dy={-10} textAnchor="middle" />
          }
          style={{
            data: {
              stroke: '#000',
              strokeWidth: 1,
            },

            closeLabels: { fill: 'orange', padding: 2 },
            highLabels: { fill: 'green', padding: 2 },
            lowLabels: { fill: 'red', padding: 2 },
            openLabels: { fill: 'blue', padding: 2 },
          }}
        />
      </VictoryChart>
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

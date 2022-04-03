import { useState } from 'react';
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryCandlestick,
  VictoryTooltip,
} from 'victory';

export function ChartDetails({ data }) {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={900}
      height={400}
      domainPadding={{ x: 25 }}
      scale={{ x: 'time' }}
    >
      <VictoryAxis
        tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}
        style={{ tickLabels: { padding: 5, fontSize: 20 } }}
      />
      <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 14 } }} />
      <VictoryCandlestick
        candleColors={{ positive: '#30f10e', negative: '#c43a31' }}
        candleRatio={0.3}
        data={data}
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
          lowLabels: { fill: 'red', padding: 5 },
        }}
      />
    </VictoryChart>
  );
}

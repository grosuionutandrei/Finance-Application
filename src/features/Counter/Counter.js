import clsx from 'clsx';
import { useState } from 'react';

import styles from './Counter.module.css';

export function Counter({ delta, initialValue }) {
  const [counterValue, setCounterValue] = useState(initialValue);
  // let cls = '';

  function handleClick(e) {
    let newCounterValue;

    switch (e.target.dataset.counter) {
      case 'inc':
        newCounterValue = counterValue + delta;
        break;
      case 'dec':
        newCounterValue = counterValue - delta;
        break;
      case 'reset':
        newCounterValue = initialValue;
        break;
      default:
        newCounterValue = counterValue;
    }

    setCounterValue(newCounterValue);
  }

  // if (counterValue < 0) {
  //   cls = styles.negative;
  // } else if (counterValue > 0) {
  //   cls = styles.positive;
  // }

  return (
    <>
      <h1>Counter</h1>
      <div>
        <output
          className={clsx({
            [styles.positive]: counterValue > 0,
            [styles.negative]: counterValue < 0,
          })}
          htmlFor="increment decrement reset"
        >
          {counterValue}
        </output>
      </div>
      <div>
        <button id="decrement" data-counter="dec" onClick={handleClick}>
          -
        </button>
        <button id="increment" data-counter="inc" onClick={handleClick}>
          +
        </button>
      </div>
      <div>
        <button id="reset" data-counter="reset" onClick={handleClick}>
          Reset
        </button>
      </div>
    </>
  );
}

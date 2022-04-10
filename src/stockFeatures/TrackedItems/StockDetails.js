import { useAuthContext } from '../../features/Auth/Auth.context';
import styles from '../../mcss/Details.module.css';
import { deleteFromTrackedList } from '../../stockComponents/Helpers';
export function TrackedStocksDetails({
  data,
  stocks,
  setDeleteItem,
  trackedItems,
  setTrackedItems,
}) {
  const { user, token } = useAuthContext();

  async function removeItem(e) {
    const response = window.confirm(
      `Are you sure that you want to delete ${e.target.value}`
    );
    if (response) {
      deleteFromTrackedList(e.target.value, trackedItems, user, token);
      setTrackedItems(
        trackedItems.filter((elem) => elem.item !== e.target.value)
      );
      setDeleteItem(true);
    }
  }

  const renderDetails = [];
  for (let i = 0; i < data.length; i++) {
    let colorCurrent = data[i].c > data[i].pc ? 'bg-lime-500' : 'bg-red-500';
    let colorPrevious = data[i].pc > data[i].c ? 'bg-red-500' : 'bg-lime-500';
    let colorPercent = data[i].d > 0 ? 'bg-lime-500' : 'bg-red-500';

    if (data[i].error) {
      continue;
    } else {
      renderDetails.push(
        <article key={stocks[i]} className={styles.trending_details}>
          <p title={`Stock Symbol`}>{stocks[i]}</p>
          <p title={`Open ${data[i]?.o}`}>
            O:
            <span className="bg-violet-600">{data[i]?.o.toFixed(2)}</span>
          </p>

          <p title={`Change ${data[i]?.d}`}>
            C:
            <span className={colorCurrent}>{data[i]?.d.toFixed(2)}</span>
          </p>

          <p title={`Percent Price ${data[i]?.dp}`}>
            PC:
            <span className={colorPercent}>{data[i]?.dp.toFixed(2)}</span>
          </p>
          <p title={`Current Price ${data[i]?.c}`}>
            CP:
            <span className={colorCurrent}>{data[i]?.c.toFixed(2)}</span>
          </p>
          <p title={`Previous Closing Price ${data[i].pc}`}>
            PCP:
            <span className={colorPrevious}>{data[i].pc.toFixed(2)}</span>
          </p>

          <p title={`Lowest Price ${data[i].l}`}>
            LP:
            <span className="bg-red-500">{data[i].l.toFixed(2)}</span>
          </p>
          <p title={`Highest Price ${data[i].h}`}>
            HP:
            <span className="bg-lime-500">{data[i].h.toFixed(2)}</span>
          </p>

          <button
            data-button="removeFromTrackList"
            onClick={removeItem}
            value={stocks[i]}
          >
            Remove
          </button>
        </article>
      );
    }
  }

  return renderDetails;
}

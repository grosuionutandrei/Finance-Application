import { useEffect, useState } from 'react';
import styles from '../../mcss/Autocomplete.module.css';
import { Loading } from '../../stockComponents/Loading';
export function Autocomplete({
  data,
  setAutocomplete,
  setStyle,
  setSugestionsStyle,
  enableFetch,
  follow,
}) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(data);
  }, [data]);

  if (!items) {
    return <Loading />;
  }

  function setSelectedOption(e) {
    console.log(e.target.innerText);
    follow.current = true;
    setAutocomplete(e.target.innerText);
    setStyle('none');
    setSugestionsStyle('none');
    enableFetch(true);
  }

  return items.result?.map((item) => (
    <div
      key={item?.symbol}
      className={styles.autocompleteOption}
      onClick={setSelectedOption}
    >
      <p data-symbol="" title={item?.symbol}>
        {item?.symbol}
      </p>
      <p title={item?.description}>{item?.description}</p>
      <p title={item?.type}>{item?.type}</p>
    </div>
  ));
}

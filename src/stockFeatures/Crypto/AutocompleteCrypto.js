import { useEffect, useState } from 'react';
import styles from '../../mcss/Autocomplete.module.css';
import { Loading } from '../../stockComponents/Loading';
export function AutocompleteCrypto({
  data,
  setAutocomplete,
  setStyle,
  setSugestionsStyle,
}) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(data);
  }, [data]);

  if (!items) {
    return <Loading />;
  }

  function setSelectedOption(e) {
    setAutocomplete(e.target.innerText);
    setStyle('none');
    setSugestionsStyle('none');
  }

  return items.result?.map((item) => (
    <div
      key={item?.symbol}
      className={styles.autocompleteOption}
      onClick={setSelectedOption}
    >
      <p data-symbol="" title={item?.displaySymbol}>
        {item?.displaySymbol}
      </p>
      <p title={item?.description}>{item?.description}</p>
      <p title={item?.type}>{item?.type}</p>
    </div>
  ));
}

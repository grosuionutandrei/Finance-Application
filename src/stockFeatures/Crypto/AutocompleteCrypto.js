import { useEffect, useState } from 'react';
import styles from '../../mcss/Autocomplete.module.css';
import { Loading } from '../../stockComponents/Loading';
export function AutocompleteCrypto({
  data,
  setAutocomplete,
  setStyle,
  setSugestionsStyle,
  suported,
}) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(data);
  }, [data]);

  if (!items) {
    return <Loading />;
  }
  if (items.length === 0) {
    return <p>No results for your search</p>;
  }

  function setSelectedOption(e) {
    setAutocomplete(e.target.innerText);
    setStyle('none');
    setSugestionsStyle('none');
  }

  return items.map((item) => (
    <div
      key={item?.symbol}
      className={styles.autocompleteOption}
      onClick={setSelectedOption}
    >
      <p data-symbol="" title={item?.displaySymbol}>
        {item?.symbol.toUpperCase()}
      </p>
      <p title={item?.description}>{item?.description}</p>
      <p title={item?.displaySymbol}>{item?.displaySymbol}</p>
    </div>
  ));
}

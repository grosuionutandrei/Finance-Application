import { useState, useEffect, useRef } from 'react';
import { Autocomplete } from './Autocomplete';
import styles from '../../mcss/Autocomplete.module.css';
import { StocksDetails } from './Stocksdetails';
import { Trending } from '../TrendingStocks/TrendingStocks';

export function HomePage() {
  const [query, setQuery] = useState('');
  const [regions, setRegions] = useState(null);
  const [errors, setErrors] = useState({
    serverError: '',
    userError: '',
    noResponse: '',
    noData: '',
    noDetails: '',
    noDescription: '',
    notSupported: '',
  });

  const [sugestions, setSugestions] = useState(null);
  const [rendersugestions, setRenderSugestions] = useState(false);
  const [stockDetails, setStockDetails] = useState(null);
  const [atcContainer, setAtcContainer] = useState('none');
  const [showSugestions, setShowSugestions] = useState('none');
  const [showResults, setShowResults] = useState('none');
  const [executeFetchDetails, setExecuteFetchDetails] = useState(false);
  const [stocksData, setStocksData] = useState(null);
  const follow = useRef(false);

  // get exchanges for stocks
  useEffect(() => {
    async function getExchanges() {
      const exchanges = await fetch(`http://localhost:3005/exchanges`).then(
        (res) => res.json()
      );

      setRegions(exchanges);
    }
    // getExchanges();
  }, []);

  const regionOptions = function () {
    return regions.map((elem) => (
      <option key={elem.code} value={elem.code}>
        {elem.code}
      </option>
    ));
  };

  // sugestions for stocks search
  //set input value
  function setInput(e) {
    setErrors({
      ...errors,
      userError: '',
      noResponse: '',
      serverError: '',
      noDetails: '',
      noDescription: '',
      notSupported: '',
    });
    setQuery(e.target.value.toUpperCase());
    if (e.target.value.length === 0) {
      setRenderSugestions(false);
      return;
    }
    if (e.target.value.length > 0) {
      async function getAutoCompleteData() {
        try {
          const sugestions = await fetch(
            `https://finnhub.io/api/v1/search?q=${e.target.value.toUpperCase()}&token=c96t0k2ad3ibs388bpdg`
          ).then((res) => handleResponse(res));

          if (sugestions.count === 0) {
            setSugestions({
              count: 0,
              result: [
                {
                  symbol: 'No data',
                  description: 'No data ',
                  type: 'N/A',
                },
                {
                  symbol: 'Not available',
                  description: 'No data ',
                  type: 'N/A',
                },
              ],
            });
            return;
          }
          setSugestions(sugestions);
        } catch (eror) {
          setErrors({ ...errors, serverError: sugestions });
        }
      }
      const callBack = () => {
        getAutoCompleteData();
        setRenderSugestions(true);
      };
      setTimeout(callBack, 0);
    }
    setAtcContainer('autocomplete');
    setShowSugestions('sugestionsShow');
    setShowResults('none');
    setStockDetails(null);
  }

  //   get the data for searched parameter
  async function getSearchedData() {
    try {
      const data = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${query}&token=c96t0k2ad3ibs388bpdg`
      ).then((res) => handleResponse(res));
      if (data.d === null) {
        setErrors({ ...errors, noDetails: 'No data for your search.' });
        return;
      }

      setStockDetails(data);
    } catch (error) {
      setErrors({
        ...errors,
        serverError: error.message,
      });
    }
  }

  // get summary details for the saerched Stocks
  async function getDetails() {
    try {
      const data = await fetch(
        `https://yfapi.net/v11/finance/quoteSummary/${query}?lang=en&region=US&modules=assetProfile`,
        {
          headers: {
            'x-api-key': 'XBw8i4nDMTbazQGtmWqJ6gNhOPV7ZTZ9ivz0qs0b',
          },
        }
      ).then((res) => handleResponse(res));
      if (data.error) {
        setErrors({
          ...errors,
          noDescription: 'No detailed description',
        });
        return;
      }
      setStocksData(data);
    } catch (error) {
      setErrors({
        ...errors,
        serverError: 'A error has occured try again later',
      });
      console.log(error);
    }
  }

  //  manage the input value and get resultes for the searched parameter
  function getStocks() {
    if (!query) {
      setErrors({
        ...errors,
        userError: 'Please insert a value in the search box',
      });
      return;
    }
    getSearchedData();
    getDetails();
    setShowResults('details_container');
    localStorage.setItem('searchedParameter', JSON.stringify(query));
    setQuery('');
    setRenderSugestions(false);
    setExecuteFetchDetails(false);
  }
  if (executeFetchDetails) {
    getStocks();
  }

  return (
    <>
      <form onSubmit={getStocks} className={styles.form_container_home}>
        <input
          id="search_query"
          type="text"
          name="query"
          value={query}
          placeholder="Search for stocks"
          onChange={setInput}
          className={styles.searchInput_home}
        ></input>
        <button disabled className={styles.buttonDisabledRight}></button>
        <button disabled className={styles.buttonDisabled}></button>
      </form>
      {errors.noDescription && (
        <p className="bg-red-200 text-red-600 bold p-2">
          {errors.noDescription}
        </p>
      )}
      {errors.userError && (
        <p className="bg-red-200 text-red-600 bold p-2">{errors.userError}</p>
      )}
      {errors.noResponse && (
        <p className="bg-red-200 text-red-600 bold p-2">{errors.noResponse}</p>
      )}
      {rendersugestions && (
        <>
          <p className={styles[showSugestions]}>results</p>
          <div className={styles[atcContainer]}>
            <Autocomplete
              data={sugestions}
              setAutocomplete={(value) => setQuery(value)}
              setStyle={(value) => setAtcContainer(value)}
              setSugestionsStyle={(value) => setShowSugestions(value)}
              enableFetch={(value) => setExecuteFetchDetails(value)}
              follow={follow}
            />
          </div>
        </>
      )}
      <div className={styles.results_container}>
        {errors.noDetails && (
          <p className="bg-red-200 text-red-600 bold p-2">{errors.noDetails}</p>
        )}
        {errors.serverError && (
          <p className="bg-red-200 text-red-600 bold p-2">
            {errors.serverError}
          </p>
        )}
        <StocksDetails
          parameter={stockDetails}
          setShow={(value) => setShowResults(value)}
          show={showResults}
          details={stocksData}
          errors={errors}
          follow={follow}
        />
      </div>
      <article>
        <Trending />
      </article>
    </>
  );
}

//   function to treat the server response
export function handleResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('A fetch error has occured');
  }
}

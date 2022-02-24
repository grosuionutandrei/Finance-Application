import { useEffect, useState } from 'react';

function kelvinToCelsius(degK) {
  return (degK - 272.15).toFixed(1);
}

export function Weather() {
  const initialCity = 'Cluj-Napoca';
  const [data, setData] = useState(null);
  const [formValues, setFormValues] = useState({
    city: initialCity,
    country: '',
  });
  const [geo, setGeo] = useState({
    lat: null,
    lon: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) =>
      setGeo({ lat: data.coords.latitude, lon: data.coords.longitude })
    );
  }, []);

  useEffect(() => {
    async function getWeatherByCoords() {
      const d = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geo.lat}&lon=${geo.lon}&appid=926472c73ad8d9cf097a3d5e9e7d7bb2`
      ).then((res) => res.json());

      setFormValues({ city: d.name, country: d.sys.country });
      setData(d);
    }

    if (geo?.lat) {
      getWeatherByCoords();
    } else {
      getWeatherData();
    }
  }, [geo.lat, geo.lon]);

  async function getWeatherData(city = initialCity, countryCode = 'RO') {
    const d = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=926472c73ad8d9cf097a3d5e9e7d7bb2`
    ).then((res) => res.json());

    setData(d);
  }

  function handleSubmit(e) {
    e.preventDefault();

    getWeatherData(formValues.city, formValues.country);
  }

  function handleInputChange(e) {
    // const newValues = {...formValues};
    // newValues[e.target.name] = e.target.value;
    // setFormValues(newValues);

    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  if (!data) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <h1>Weather for {data?.name}</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formValues.city}
          onChange={handleInputChange}
        />

        <label htmlFor="country">Country: </label>
        <select
          id="country"
          name="country"
          value={formValues.country}
          onChange={handleInputChange}
        >
          <option value="RO">Romania</option>
          <option value="DE">Germany</option>
        </select>

        <button type="submit">Go</button>
      </form>

      <strong>{kelvinToCelsius(data.main.temp)}&deg; C</strong>
      <p>
        <span>Min: {kelvinToCelsius(data.main.temp_min)}&deg; C</span>{' '}
        <span>Max: {kelvinToCelsius(data.main.temp_max)}&deg; C</span>
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}.png`}
        alt={data?.weather[0].main}
      />
      <p>{data?.weather[0].description}</p>
    </>
  );
}

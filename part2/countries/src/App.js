import { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import SingleCountry from "./components/SingleCountry";
import CountryList from "./components/CountryList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchCountry = (event) => {
    setSearchQuery(event.target.value);
    setCountry({});
  };

  const handleSetCountry = (newCountry) => {
    setCountry(newCountry);
  };

  return (
    <div>
      <SearchBox query={searchQuery} onChange={handleSearchCountry} />
      {Object.keys(country).length !== 0 ? (
        <SingleCountry country={country} />
      ) : (
        <CountryList
          countries={countriesToShow}
          handleClick={handleSetCountry}
        />
      )}
    </div>
  );
};

export default App;

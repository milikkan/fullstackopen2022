const CountryList = ({ countries, handleClick }) => {
  if (countries.length === 0) {
    return <div>No match</div>;
  }
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleClick(country)}>show</button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;

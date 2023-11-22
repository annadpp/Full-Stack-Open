const CountriesList = ({ countries, handleCountrySelection, searchText }) => {
  if (!searchText) {
    return null;
  }
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.id}>
            {country.name}{" "}
            <button onClick={() => handleCountrySelection(country.id)}>
              show
            </button>
          </li>
        ))}
      </ul>
    );
  }
  return null;
};

export default CountriesList;

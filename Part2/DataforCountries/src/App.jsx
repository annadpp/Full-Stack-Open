import { useState, useEffect } from "react";
import axios from "axios";
import CountriesList from "./components/CountriesList";
import Country from "./components/Country";
import Weather from "./components/Weather";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
          const data = response.data;
          const countries = data.map((country) => ({
            id: country.cca3,
            name: country.name.common,
            capital: Array.isArray(country.capital) ? country.capital : [],
            area: country.area,
            flag: country.flags.png,
            languages: Object.values(country.languages || {}),
          }));
          setCountries(countries);
        })
        .catch((error) => {
          console.log(`Error fetching countries: ${error.message}`);
        });
    };

    fetchData();
  }, []);

  const handleCountryFilter = (event) => {
    setSearchText(event.target.value);
    setId("");
  };

  const handleCountrySelection = (id) => {
    setId(id);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const selectedCountry =
    filteredCountries.length === 1
      ? filteredCountries[0]
      : countries.find((country) => country.id === id);

  return (
    <div>
      <div>
        Find countries{" "}
        <input value={searchText} onChange={handleCountryFilter} />
      </div>
      <CountriesList
        countries={filteredCountries}
        handleCountrySelection={handleCountrySelection}
        searchText={searchText}
      />
      <Country country={selectedCountry} />
      {selectedCountry && (
        <Weather
          countryName={selectedCountry.name}
          capitalName={selectedCountry.capital[0]}
        />
      )}
    </div>
  );
};

export default App;

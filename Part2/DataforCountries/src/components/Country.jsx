const Country = ({ country }) => {
  if (country === undefined) {
    return null;
  }
  return (
    <div>
      <h1>{country.name}</h1>
      <ul>
        <li>Capital: {country.capital.join("; ")}</li>
        <li>Area: {country.area} m2</li>
      </ul>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flag} />
    </div>
  );
};

export default Country;

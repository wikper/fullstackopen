const SingleCountry = ({ country }) => {
  const languages = Object.values(country.languages)

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        capital {country.capital}
        <br />
        area {country.area}
      </p>
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`${country.name.common} flag`}
        style={{ width: '140px' }}
      />
    </div>
  )
}

export default SingleCountry

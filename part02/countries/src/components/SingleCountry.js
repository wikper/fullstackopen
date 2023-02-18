import Weather from './Weather'

const SingleCountry = ({ country }) => {
  const languages = Object.values(country.languages)

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        capital {country.capital[0]}
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
      <Weather capital={country.capital[0]} />
    </div>
  )
}

export default SingleCountry

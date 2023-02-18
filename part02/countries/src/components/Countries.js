import Country from './Country'
import SingleCountry from './SingleCountry'

const Countries = ({ countries, searchQuery }) => {
  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countriesToShow.length === 1) {
    return <SingleCountry country={countriesToShow[0]} />
  } else {
    return (
      <div>
        {countriesToShow.map((country) => (
          <Country key={country.name.official} country={country} />
        ))}
      </div>
    )
  }
}

export default Countries

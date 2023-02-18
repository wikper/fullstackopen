const Country = ({ country, handleSelectedCountry }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={() => handleSelectedCountry(country)}>show</button>
    </div>
  )
}

export default Country

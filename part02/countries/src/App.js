import { useEffect, useState } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value)
    setSelectedCountry(null)
  }

  const handleSelectedCountry = (country) => {
    setSelectedCountry(country)
  }

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries)
    })
  }, [])

  return (
    <div>
      <div>
        find countries{' '}
        <input value={searchQuery} onChange={handleSearchQuery} />
      </div>
      <Countries
        countries={countries}
        searchQuery={searchQuery}
        selectedCountry={selectedCountry}
        handleSelectedCountry={handleSelectedCountry}
      />
    </div>
  )
}

export default App

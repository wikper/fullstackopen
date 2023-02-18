import { useEffect, useState } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value)
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
      <Countries countries={countries} searchQuery={searchQuery} />
    </div>
  )
}

export default App
